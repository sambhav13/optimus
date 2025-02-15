package service

import (
	"context"
	"fmt"
	"reflect"
	"strings"

	"github.com/kushsharma/parallel"
	"github.com/odpf/salt/log"

	"github.com/odpf/optimus/core/job"
	"github.com/odpf/optimus/core/job/service/filter"
	"github.com/odpf/optimus/core/tenant"
	"github.com/odpf/optimus/internal/errors"
	"github.com/odpf/optimus/internal/lib/tree"
	"github.com/odpf/optimus/internal/telemetry"
	"github.com/odpf/optimus/internal/writer"
	"github.com/odpf/optimus/sdk/plugin"
)

const (
	ConcurrentTicketPerSec = 40
	ConcurrentLimit        = 600
)

type JobService struct {
	repo JobRepository

	pluginService    PluginService
	upstreamResolver UpstreamResolver

	tenantDetailsGetter TenantDetailsGetter

	logger log.Logger
}

func NewJobService(repo JobRepository, pluginService PluginService, upstreamResolver UpstreamResolver, tenantDetailsGetter TenantDetailsGetter, logger log.Logger) *JobService {
	return &JobService{
		repo:                repo,
		pluginService:       pluginService,
		upstreamResolver:    upstreamResolver,
		tenantDetailsGetter: tenantDetailsGetter,
		logger:              logger,
	}
}

type PluginService interface {
	Info(context.Context, job.TaskName) (*plugin.Info, error)
	GenerateDestination(context.Context, *tenant.WithDetails, job.Task) (job.ResourceURN, error)
	GenerateUpstreams(ctx context.Context, jobTenant *tenant.WithDetails, spec *job.Spec, dryRun bool) ([]job.ResourceURN, error)
}

type TenantDetailsGetter interface {
	GetDetails(ctx context.Context, jobTenant tenant.Tenant) (*tenant.WithDetails, error)
}

type JobRepository interface {
	// TODO: remove `savedJobs` since the method's main purpose is to add, not to get
	Add(context.Context, []*job.Job) (addedJobs []*job.Job, err error)
	Update(context.Context, []*job.Job) (updatedJobs []*job.Job, err error)
	Delete(ctx context.Context, projectName tenant.ProjectName, jobName job.Name, cleanHistory bool) error

	GetByJobName(ctx context.Context, projectName tenant.ProjectName, jobName job.Name) (*job.Job, error)
	GetAllByResourceDestination(ctx context.Context, resourceDestination job.ResourceURN) ([]*job.Job, error)
	GetAllByTenant(ctx context.Context, jobTenant tenant.Tenant) ([]*job.Job, error)
	GetAllByProjectName(ctx context.Context, projectName tenant.ProjectName) ([]*job.Job, error)

	ResolveUpstreams(context.Context, tenant.ProjectName, []job.Name) (map[job.Name][]*job.Upstream, error)
	ReplaceUpstreams(context.Context, []*job.WithUpstream) error
	GetUpstreams(ctx context.Context, projectName tenant.ProjectName, jobName job.Name) ([]*job.Upstream, error)

	GetDownstreamByDestination(ctx context.Context, projectName tenant.ProjectName, destination job.ResourceURN) ([]*job.Downstream, error)
	GetDownstreamByJobName(ctx context.Context, projectName tenant.ProjectName, jobName job.Name) ([]*job.Downstream, error)
}

type UpstreamResolver interface {
	BulkResolve(ctx context.Context, projectName tenant.ProjectName, jobs []*job.Job, logWriter writer.LogWriter) (jobWithUpstreams []*job.WithUpstream, err error)
	Resolve(ctx context.Context, subjectJob *job.Job, logWriter writer.LogWriter) ([]*job.Upstream, error)
}

func (j *JobService) Add(ctx context.Context, jobTenant tenant.Tenant, specs []*job.Spec) error {
	logWriter := writer.NewLogWriter(j.logger)
	me := errors.NewMultiError("add specs errors")

	tenantWithDetails, err := j.tenantDetailsGetter.GetDetails(ctx, jobTenant)
	if err != nil {
		return err
	}

	jobs, err := j.generateJobs(ctx, tenantWithDetails, specs, logWriter)
	me.Append(err)

	addedJobs, err := j.repo.Add(ctx, jobs)
	me.Append(err)

	jobsWithUpstreams, err := j.upstreamResolver.BulkResolve(ctx, jobTenant.ProjectName(), addedJobs, logWriter)
	me.Append(err)

	err = j.repo.ReplaceUpstreams(ctx, jobsWithUpstreams)
	me.Append(err)

	return errors.MultiToError(me)
}

func (j *JobService) Update(ctx context.Context, jobTenant tenant.Tenant, specs []*job.Spec) error {
	logWriter := writer.NewLogWriter(j.logger)
	me := errors.NewMultiError("update specs errors")

	tenantWithDetails, err := j.tenantDetailsGetter.GetDetails(ctx, jobTenant)
	if err != nil {
		return err
	}

	jobs, err := j.generateJobs(ctx, tenantWithDetails, specs, logWriter)
	me.Append(err)

	updatedJobs, err := j.repo.Update(ctx, jobs)
	me.Append(err)

	jobsWithUpstreams, err := j.upstreamResolver.BulkResolve(ctx, jobTenant.ProjectName(), updatedJobs, logWriter)
	me.Append(err)

	err = j.repo.ReplaceUpstreams(ctx, jobsWithUpstreams)
	me.Append(err)

	return errors.MultiToError(me)
}

func (j *JobService) Delete(ctx context.Context, jobTenant tenant.Tenant, jobName job.Name, cleanFlag, forceFlag bool) (affectedDownstream []job.FullName, err error) {
	downstreamList, err := j.repo.GetDownstreamByJobName(ctx, jobTenant.ProjectName(), jobName)
	if err != nil {
		return nil, err
	}

	downstreamFullNames := job.DownstreamList(downstreamList).GetDownstreamFullNames()

	if len(downstreamList) > 0 && !forceFlag {
		errorMsg := fmt.Sprintf("%s depends on this job. consider do force delete to proceed.", downstreamFullNames)
		return nil, errors.NewError(errors.ErrFailedPrecond, job.EntityJob, errorMsg)
	}

	return downstreamFullNames, j.repo.Delete(ctx, jobTenant.ProjectName(), jobName, cleanFlag)
}

func (j *JobService) Get(ctx context.Context, jobTenant tenant.Tenant, jobName job.Name) (*job.Job, error) {
	jobs, err := j.GetByFilter(ctx,
		filter.WithString(filter.ProjectName, jobTenant.ProjectName().String()),
		filter.WithString(filter.JobName, jobName.String()),
	)
	if err != nil {
		return nil, err
	}
	if len(jobs) == 0 {
		return nil, errors.NotFound(job.EntityJob, fmt.Sprintf("job %s is not found", jobName))
	}
	return jobs[0], nil
}

func (j *JobService) GetTaskInfo(ctx context.Context, task job.Task) (*plugin.Info, error) {
	return j.pluginService.Info(ctx, task.Name())
}

func (j *JobService) GetByFilter(ctx context.Context, filters ...filter.FilterOpt) ([]*job.Job, error) {
	f := filter.NewFilter(filters...)

	// when resource destination exist, filter by destination
	if f.Contains(filter.ResourceDestination) {
		resourceDestination := job.ResourceURN(f.GetStringValue(filter.ResourceDestination))
		return j.repo.GetAllByResourceDestination(ctx, resourceDestination)
	}

	// when project name and job names exist, filter by project and job names
	if f.Contains(filter.ProjectName, filter.JobNames) {
		me := errors.NewMultiError("get all job specs errors")

		projectName, _ := tenant.ProjectNameFrom(f.GetStringValue(filter.ProjectName))
		jobNames := f.GetStringArrayValue(filter.JobNames)

		var jobs []*job.Job
		for _, jobNameStr := range jobNames {
			jobName, _ := job.NameFrom(jobNameStr)
			fetchedJob, err := j.repo.GetByJobName(ctx, projectName, jobName)
			if err != nil {
				if !errors.IsErrorType(err, errors.ErrNotFound) {
					me.Append(err)
				}
				continue
			}
			jobs = append(jobs, fetchedJob)
		}
		return jobs, errors.MultiToError(me)
	}

	// when project name and job name exist, filter by project name and job name
	if f.Contains(filter.ProjectName, filter.JobName) {
		projectName, _ := tenant.ProjectNameFrom(f.GetStringValue(filter.ProjectName))
		jobName, _ := job.NameFrom(f.GetStringValue(filter.JobName))
		fetchedJob, err := j.repo.GetByJobName(ctx, projectName, jobName)
		if err != nil {
			if errors.IsErrorType(err, errors.ErrNotFound) {
				return []*job.Job{}, nil
			}
			return nil, err
		}
		return []*job.Job{fetchedJob}, nil
	}

	// when project name and namespace names exist, filter by tenant
	if f.Contains(filter.ProjectName, filter.NamespaceNames) {
		var jobs []*job.Job
		namespaceNames := f.GetStringArrayValue(filter.NamespaceNames)
		for _, namespaceName := range namespaceNames {
			jobTenant, err := tenant.NewTenant(f.GetStringValue(filter.ProjectName), namespaceName)
			if err != nil {
				return nil, err
			}
			tenantJobs, err := j.repo.GetAllByTenant(ctx, jobTenant)
			if err != nil {
				return nil, err
			}
			jobs = append(jobs, tenantJobs...)
		}
		return jobs, nil
	}

	// when project name and namespace name exist, filter by tenant
	if f.Contains(filter.ProjectName, filter.NamespaceName) {
		jobTenant, err := tenant.NewTenant(f.GetStringValue(filter.ProjectName), f.GetStringValue(filter.NamespaceName))
		if err != nil {
			return nil, err
		}
		return j.repo.GetAllByTenant(ctx, jobTenant)
	}

	// when project name exist, filter by project name
	if f.Contains(filter.ProjectName) {
		projectName, _ := tenant.ProjectNameFrom(f.GetStringValue(filter.ProjectName))
		return j.repo.GetAllByProjectName(ctx, projectName)
	}

	return nil, fmt.Errorf("no filter matched")
}

func (j *JobService) ReplaceAll(ctx context.Context, jobTenant tenant.Tenant, specs []*job.Spec, jobNamesWithValidationError []job.Name, logWriter writer.LogWriter) error {
	me := errors.NewMultiError("replace all specs errors")

	toAdd, toUpdate, toDelete, err := j.differentiateSpecs(ctx, jobTenant, specs, jobNamesWithValidationError)
	logWriter.Write(writer.LogLevelInfo, fmt.Sprintf("[%s] found %d new, %d modified, and %d deleted job specs", jobTenant.NamespaceName().String(), len(toAdd), len(toUpdate), len(toDelete)))
	me.Append(err)

	tenantWithDetails, err := j.tenantDetailsGetter.GetDetails(ctx, jobTenant)
	if err != nil {
		me.Append(err)
		return errors.MultiToError(me)
	}

	addedJobs, err := j.bulkAdd(ctx, tenantWithDetails, toAdd, logWriter)
	me.Append(err)

	updatedJobs, err := j.bulkUpdate(ctx, tenantWithDetails, toUpdate, logWriter)
	me.Append(err)

	err = j.bulkDelete(ctx, jobTenant, toDelete, logWriter)
	me.Append(err)

	err = j.resolveAndSaveUpstreams(ctx, jobTenant, logWriter, addedJobs, updatedJobs)
	me.Append(err)

	return errors.MultiToError(me)
}

func (j *JobService) Refresh(ctx context.Context, projectName tenant.ProjectName, namespaceNames, jobNames []string, logWriter writer.LogWriter) (err error) {
	projectFilter := filter.WithString(filter.ProjectName, projectName.String())
	namespacesFilter := filter.WithStringArray(filter.NamespaceNames, namespaceNames)
	jobNamesFilter := filter.WithStringArray(filter.JobNames, jobNames)

	allJobs, err := j.GetByFilter(ctx, projectFilter, namespacesFilter, jobNamesFilter)
	if err != nil {
		return err
	}

	me := errors.NewMultiError("refresh all specs errors")
	namespaceAndJobsMap := job.Jobs(allJobs).GetNamespaceNameAndJobsMap()
	for namespaceName, jobs := range namespaceAndJobsMap {
		jobTenant, err := tenant.NewTenant(projectName.String(), namespaceName.String())
		if err != nil {
			me.Append(err)
			continue
		}

		tenantWithDetails, err := j.tenantDetailsGetter.GetDetails(ctx, jobTenant)
		if err != nil {
			me.Append(err)
			continue
		}

		specs := job.Jobs(jobs).GetSpecs()
		updatedJobs, err := j.bulkUpdate(ctx, tenantWithDetails, specs, logWriter)
		me.Append(err)

		j.logger.Debug("resolving upstreams for %d jobs of project [%s] namespace [%s]", len(updatedJobs), projectName, namespaceName)
		jobsWithUpstreams, err := j.upstreamResolver.BulkResolve(ctx, projectName, updatedJobs, logWriter)
		me.Append(err)

		j.logger.Debug("replacing upstreams for %d jobs of project [%s] namespace [%s]", len(jobsWithUpstreams), projectName, namespaceName)
		err = j.repo.ReplaceUpstreams(ctx, jobsWithUpstreams)
		me.Append(err)
	}

	return errors.MultiToError(me)
}

func (j *JobService) Validate(ctx context.Context, jobTenant tenant.Tenant, jobSpecs []*job.Spec, logWriter writer.LogWriter) error {
	me := errors.NewMultiError("validate specs errors")

	tenantWithDetails, err := j.tenantDetailsGetter.GetDetails(ctx, jobTenant)
	if err != nil {
		return err
	}

	jobs, err := j.generateJobs(ctx, tenantWithDetails, jobSpecs, logWriter)
	me.Append(err)

	jobsWithUnresolvedUpstreams, err := job.Jobs(jobs).GetJobsWithUnresolvedUpstreams()
	me.Append(err)

	if len(me.Errors) > 0 {
		return errors.MultiToError(me)
	}

	// NOTE: only check cyclic deps across internal upstreams (sources), need further discussion to check cyclic deps for external upstream
	// assumption, all job specs from input are also the job within same project

	// populate all jobs in project
	jobsInProjectWithUpstreams, err := j.getJobsInProjectWithUpstreams(ctx, jobTenant.ProjectName())
	if err != nil {
		return err
	}

	jobMap := make(map[job.Name]*job.WithUpstream)
	identifierToJobsMap := make(map[string][]*job.WithUpstream)
	for _, jobEntity := range append(jobsWithUnresolvedUpstreams, jobsInProjectWithUpstreams...) {
		jobSpecName := jobEntity.Job().Spec().Name()
		if _, ok := jobMap[jobSpecName]; ok {
			continue
		}
		jobMap[jobSpecName] = jobEntity

		jobIdentifiers := []string{jobEntity.Job().FullName()}
		if jobDestination := jobEntity.Job().Destination().String(); jobDestination != "" {
			jobIdentifiers = append(jobIdentifiers, jobDestination)
		}
		for _, jobIdentifier := range jobIdentifiers {
			if _, ok := identifierToJobsMap[jobIdentifier]; !ok {
				identifierToJobsMap[jobIdentifier] = []*job.WithUpstream{}
			}
			identifierToJobsMap[jobIdentifier] = append(identifierToJobsMap[jobIdentifier], jobEntity)
		}
	}

	// check cyclic deps for every job
	for _, jobEntity := range jobsWithUnresolvedUpstreams {
		if _, err := j.validateCyclic(jobEntity.Job().Spec().Name(), jobMap, identifierToJobsMap); err != nil {
			me.Append(err)
			break
		}
	}

	if len(me.Errors) > 0 {
		return me
	}

	return nil
}

func (j *JobService) resolveAndSaveUpstreams(ctx context.Context, jobTenant tenant.Tenant, logWriter writer.LogWriter, jobsToResolve ...[]*job.Job) error {
	var allJobsToResolve []*job.Job
	for _, group := range jobsToResolve {
		allJobsToResolve = append(allJobsToResolve, group...)
	}
	if len(allJobsToResolve) == 0 {
		return nil
	}

	me := errors.NewMultiError("resolve and save upstream errors")

	j.logger.Debug("resolving upstreams for %d jobs of project [%s] namespace [%s]", len(allJobsToResolve), jobTenant.ProjectName(), jobTenant.NamespaceName())
	jobsWithUpstreams, err := j.upstreamResolver.BulkResolve(ctx, jobTenant.ProjectName(), allJobsToResolve, logWriter)
	me.Append(err)

	j.logger.Debug("replacing upstreams for %d jobs of project [%s] namespace [%s]", len(jobsWithUpstreams), jobTenant.ProjectName(), jobTenant.NamespaceName())
	err = j.repo.ReplaceUpstreams(ctx, jobsWithUpstreams)
	me.Append(err)

	return errors.MultiToError(me)
}

func (j *JobService) bulkAdd(ctx context.Context, tenantWithDetails *tenant.WithDetails, specsToAdd []*job.Spec, logWriter writer.LogWriter) ([]*job.Job, error) {
	j.logger.Debug("adding %d jobs to project [%s] namespace [%s]", len(specsToAdd), tenantWithDetails.Project().Name(), tenantWithDetails.Namespace().Name())
	me := errors.NewMultiError("bulk add specs errors")

	jobsToAdd, err := j.generateJobs(ctx, tenantWithDetails, specsToAdd, logWriter)
	me.Append(err)

	if len(jobsToAdd) == 0 {
		return nil, errors.MultiToError(me)
	}

	// TODO: consider do add inside parallel
	addedJobs, err := j.repo.Add(ctx, jobsToAdd)
	if err != nil {
		logWriter.Write(writer.LogLevelError, fmt.Sprintf("[%s] add jobs failure found: %s", tenantWithDetails.Namespace().Name().String(), err.Error()))
		me.Append(err)
	}

	if len(addedJobs) > 0 {
		logWriter.Write(writer.LogLevelDebug, fmt.Sprintf("[%s] successfully added %d jobs", tenantWithDetails.Namespace().Name().String(), len(addedJobs)))
	}

	return addedJobs, errors.MultiToError(me)
}

func (j *JobService) bulkUpdate(ctx context.Context, tenantWithDetails *tenant.WithDetails, specsToUpdate []*job.Spec, logWriter writer.LogWriter) ([]*job.Job, error) {
	j.logger.Debug("updating %d jobs of project [%s] namespace [%s]", len(specsToUpdate), tenantWithDetails.Project().Name(), tenantWithDetails.Namespace().Name())
	me := errors.NewMultiError("bulk update specs errors")

	jobsToUpdate, err := j.generateJobs(ctx, tenantWithDetails, specsToUpdate, logWriter)
	me.Append(err)

	if len(jobsToUpdate) == 0 {
		return nil, errors.MultiToError(me)
	}

	updatedJobs, err := j.repo.Update(ctx, jobsToUpdate)
	if err != nil {
		logWriter.Write(writer.LogLevelError, fmt.Sprintf("[%s] update jobs failure found: %s", tenantWithDetails.Namespace().Name().String(), err.Error()))
		me.Append(err)
	}

	if len(updatedJobs) > 0 {
		logWriter.Write(writer.LogLevelDebug, fmt.Sprintf("[%s] successfully updated %d jobs", tenantWithDetails.Namespace().Name().String(), len(updatedJobs)))
	}

	return updatedJobs, errors.MultiToError(me)
}

func (j *JobService) bulkDelete(ctx context.Context, jobTenant tenant.Tenant, toDelete []*job.Spec, logWriter writer.LogWriter) error {
	j.logger.Debug("deleting %d jobs of project [%s] namespace [%s]", len(toDelete), jobTenant.ProjectName(), jobTenant.NamespaceName())
	me := errors.NewMultiError("bulk delete specs errors")
	deletedJob := 0
	for _, spec := range toDelete {
		// TODO: reuse Delete method and pass forceFlag as false
		downstreamList, err := j.repo.GetDownstreamByJobName(ctx, jobTenant.ProjectName(), spec.Name())
		if err != nil {
			logWriter.Write(writer.LogLevelError, fmt.Sprintf("[%s] pre-delete check for job %s failed: %s", jobTenant.NamespaceName().String(), spec.Name().String(), err.Error()))
			me.Append(err)
			continue
		}

		if len(downstreamList) > 0 {
			downstreamFullNames := job.DownstreamList(downstreamList).GetDownstreamFullNames()
			errorMsg := fmt.Sprintf("deleting job %s failed. job is being used by %s", spec.Name().String(), downstreamFullNames.String())
			logWriter.Write(writer.LogLevelError, fmt.Sprintf("[%s] %s", jobTenant.NamespaceName().String(), errorMsg))
			me.Append(errors.NewError(errors.ErrFailedPrecond, job.EntityJob, errorMsg))
			continue
		}

		logWriter.Write(writer.LogLevelDebug, fmt.Sprintf("[%s] deleting job %s", jobTenant.NamespaceName().String(), spec.Name().String()))

		if err = j.repo.Delete(ctx, jobTenant.ProjectName(), spec.Name(), false); err != nil {
			logWriter.Write(writer.LogLevelError, fmt.Sprintf("[%s] deleting job %s failed: %s", jobTenant.NamespaceName().String(), spec.Name().String(), err.Error()))
			me.Append(err)
		} else {
			deletedJob++
		}
	}
	if deletedJob > 0 {
		logWriter.Write(writer.LogLevelDebug, fmt.Sprintf("[%s] successfully deleted %d jobs", jobTenant.NamespaceName().String(), deletedJob))
	}
	return errors.MultiToError(me)
}

func (j *JobService) differentiateSpecs(ctx context.Context, jobTenant tenant.Tenant, specs []*job.Spec, jobNamesWithValidationError []job.Name) (added, modified, deleted []*job.Spec, err error) {
	me := errors.NewMultiError("differentiate specs errors")

	existingJobs, err := j.repo.GetAllByTenant(ctx, jobTenant)
	me.Append(err)

	var addedSpecs, modifiedSpecs, deletedSpecs []*job.Spec

	existingSpecsMap := job.Jobs(existingJobs).GetNameAndSpecMap()
	for _, jobNameToSkip := range jobNamesWithValidationError {
		delete(existingSpecsMap, jobNameToSkip)
	}

	for _, incomingSpec := range specs {
		if spec, ok := existingSpecsMap[incomingSpec.Name()]; !ok {
			addedSpecs = append(addedSpecs, incomingSpec)
		} else if !reflect.DeepEqual(spec, incomingSpec) {
			modifiedSpecs = append(modifiedSpecs, incomingSpec)
		}
	}
	telemetry.NewCounter("total_jobs_modified", map[string]string{
		"project":   jobTenant.ProjectName().String(),
		"namespace": jobTenant.NamespaceName().String(),
	}).Add(float64(len(modifiedSpecs)))

	incomingSpecsMap := job.Specs(specs).ToNameAndSpecMap()
	for existingJobName, existingJobSpec := range existingSpecsMap {
		if _, ok := incomingSpecsMap[existingJobName]; !ok {
			deletedSpecs = append(deletedSpecs, existingJobSpec)
		}
	}
	return addedSpecs, modifiedSpecs, deletedSpecs, errors.MultiToError(me)
}

func (j *JobService) generateJobs(ctx context.Context, tenantWithDetails *tenant.WithDetails, specs []*job.Spec, logWriter writer.LogWriter) ([]*job.Job, error) {
	me := errors.NewMultiError("bulk generate jobs errors")

	runner := parallel.NewRunner(parallel.WithTicket(ConcurrentTicketPerSec), parallel.WithLimit(ConcurrentLimit))
	for _, spec := range specs {
		runner.Add(func(currentSpec *job.Spec, lw writer.LogWriter) func() (interface{}, error) {
			return func() (interface{}, error) {
				generatedJob, err := j.generateJob(ctx, tenantWithDetails, currentSpec)
				if err != nil {
					lw.Write(writer.LogLevelError, fmt.Sprintf("[%s] unable to generate job %s: %s", tenantWithDetails.Namespace().Name().String(), currentSpec.Name().String(), err.Error()))
					return nil, err
				}
				lw.Write(writer.LogLevelDebug, fmt.Sprintf("[%s] processing job %s", tenantWithDetails.Namespace().Name().String(), currentSpec.Name().String()))
				return generatedJob, nil
			}
		}(spec, logWriter))
	}

	var generatedJobs []*job.Job
	for _, result := range runner.Run() {
		if result.Err != nil {
			me.Append(result.Err)
		} else {
			specVal := result.Val.(*job.Job)
			generatedJobs = append(generatedJobs, specVal)
		}
	}
	return generatedJobs, errors.MultiToError(me)
}

func (j *JobService) generateJob(ctx context.Context, tenantWithDetails *tenant.WithDetails, spec *job.Spec) (*job.Job, error) {
	destination, err := j.pluginService.GenerateDestination(ctx, tenantWithDetails, spec.Task())
	if err != nil && !errors.Is(err, ErrUpstreamModNotFound) {
		errorMsg := fmt.Sprintf("unable to add %s: %s", spec.Name().String(), err.Error())
		return nil, errors.NewError(errors.ErrInternalError, job.EntityJob, errorMsg)
	}

	sources, err := j.pluginService.GenerateUpstreams(ctx, tenantWithDetails, spec, true)
	if err != nil && !errors.Is(err, ErrUpstreamModNotFound) {
		errorMsg := fmt.Sprintf("unable to add %s: %s", spec.Name().String(), err.Error())
		return nil, errors.NewError(errors.ErrInternalError, job.EntityJob, errorMsg)
	}

	return job.NewJob(tenantWithDetails.ToTenant(), spec, destination, sources), nil
}

func (j *JobService) getJobsInProjectWithUpstreams(ctx context.Context, projectName tenant.ProjectName) ([]*job.WithUpstream, error) {
	jobsInProject, err := j.GetByFilter(ctx, filter.WithString(filter.ProjectName, projectName.String()))
	if err != nil {
		return nil, err
	}

	return job.Jobs(jobsInProject).GetJobsWithUnresolvedUpstreams()
}

func (j *JobService) validateCyclic(rootName job.Name, jobMap map[job.Name]*job.WithUpstream, identifierToJobMap map[string][]*job.WithUpstream) ([]string, error) {
	dagTree := j.buildDAGTree(rootName, jobMap, identifierToJobMap)
	return dagTree.ValidateCyclic()
}

func (*JobService) buildDAGTree(rootName job.Name, jobMap map[job.Name]*job.WithUpstream, identifierToJobMap map[string][]*job.WithUpstream) *tree.MultiRootTree {
	rootJob := jobMap[rootName]

	dagTree := tree.NewMultiRootTree()
	dagTree.AddNode(tree.NewTreeNode(rootJob))

	for _, childJob := range jobMap {
		childNode := findOrCreateDAGNode(dagTree, childJob)
		for _, upstream := range childJob.Upstreams() {
			identifier := upstream.Resource().String()
			if _, ok := identifierToJobMap[identifier]; !ok {
				identifier = upstream.FullName()
				if _, ok := identifierToJobMap[identifier]; !ok {
					// resource maybe from external optimus or outside project,
					// as of now, we're not providing the capability to build tree from external optimus or outside project. skip
					continue
				}
			}

			parents := identifierToJobMap[identifier]
			for _, parentJob := range parents {
				parentNode := findOrCreateDAGNode(dagTree, parentJob)
				parentNode.AddDependent(childNode)
				dagTree.AddNode(parentNode)
			}
		}

		if len(childJob.Upstreams()) == 0 {
			dagTree.MarkRoot(childNode)
		}
	}

	return dagTree
}

// sources: https://github.com/odpf/optimus/blob/a6dafbc1fbeb8e1f1eb8d4a6e9582ada4a7f639e/job/replay.go#L101
func findOrCreateDAGNode(dagTree *tree.MultiRootTree, dag tree.TreeData) *tree.TreeNode {
	node, ok := dagTree.GetNodeByName(dag.GetName())
	if !ok {
		node = tree.NewTreeNode(dag)
		dagTree.AddNode(node)
	}
	return node
}

func (j *JobService) GetJobBasicInfo(ctx context.Context, jobTenant tenant.Tenant, jobName job.Name, spec *job.Spec) (*job.Job, writer.BufferedLogger) {
	var subjectJob *job.Job
	var logger writer.BufferedLogger
	var err error
	if spec != nil {
		tenantWithDetails, err := j.tenantDetailsGetter.GetDetails(ctx, jobTenant)
		if err != nil {
			logger.Write(writer.LogLevelError, fmt.Sprintf("unable to get tenant detail, err: %v", err))
			return nil, logger
		}
		subjectJob, err = j.generateJob(ctx, tenantWithDetails, spec)
		if err != nil {
			logger.Write(writer.LogLevelError, fmt.Sprintf("unable to generate job, err: %v", err))
			return nil, logger
		}
	} else {
		subjectJob, err = j.Get(ctx, jobTenant, jobName)
		if err != nil {
			logger.Write(writer.LogLevelError, fmt.Sprintf("unable to get job, err: %v", err))
			return nil, logger
		}
	}

	if len(subjectJob.Sources()) == 0 {
		logger.Write(writer.LogLevelInfo, "no job sources detected")
	}

	if subjectJob.Spec().Schedule().CatchUp() {
		logger.Write(writer.LogLevelWarning, "catchup is enabled")
	}

	if dupDestJobNames, err := j.getJobNamesWithSameDestination(ctx, subjectJob); err != nil {
		logger.Write(writer.LogLevelError, "could not perform duplicate job destination check, err: "+err.Error())
	} else if dupDestJobNames != "" {
		logger.Write(writer.LogLevelWarning, "job already exists with same Destination: "+subjectJob.Destination().String()+" existing jobNames: "+dupDestJobNames)
	}
	return subjectJob, logger
}

func (j *JobService) getJobNamesWithSameDestination(ctx context.Context, subjectJob *job.Job) (string, error) {
	sameDestinationJobs, err := j.repo.GetAllByResourceDestination(ctx, subjectJob.Destination())
	if err != nil {
		return "", err
	}
	var jobNames []string
	for _, sameDestinationJob := range sameDestinationJobs {
		if sameDestinationJob.FullName() == subjectJob.FullName() {
			continue
		}
		jobNames = append(jobNames, sameDestinationJob.GetName())
	}
	return strings.Join(jobNames, ", "), nil
}

func (j *JobService) GetUpstreamsToInspect(ctx context.Context, subjectJob *job.Job, localJob bool) ([]*job.Upstream, error) {
	logWriter := writer.NewLogWriter(j.logger)
	if localJob {
		return j.upstreamResolver.Resolve(ctx, subjectJob, logWriter)
	}
	return j.repo.GetUpstreams(ctx, subjectJob.ProjectName(), subjectJob.Spec().Name())
}

func (j *JobService) GetDownstream(ctx context.Context, subjectJob *job.Job, localJob bool) ([]*job.Downstream, error) {
	if localJob {
		return j.repo.GetDownstreamByDestination(ctx, subjectJob.ProjectName(), subjectJob.Destination())
	}
	return j.repo.GetDownstreamByJobName(ctx, subjectJob.ProjectName(), subjectJob.Spec().Name())
}
