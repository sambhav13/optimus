package namespace

import (
	"errors"
	"fmt"
	"path"
	"time"

	"github.com/odpf/salt/log"
	"github.com/spf13/cobra"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/odpf/optimus/client/cmd/internal/connectivity"
	"github.com/odpf/optimus/client/cmd/internal/logger"
	"github.com/odpf/optimus/config"
	pb "github.com/odpf/optimus/protos/odpf/optimus/core/v1beta1"
)

const registerTimeout = time.Minute * 15

type registerCommand struct {
	logger log.Logger

	dirPath       string
	namespaceName string
}

// NewRegisterCommand initializes command for registering namespace
func NewRegisterCommand() *cobra.Command {
	register := &registerCommand{
		logger: logger.NewClientLogger(),
	}

	cmd := &cobra.Command{
		Use:     "register",
		Short:   "Register namespace if it does not exist and update if it does",
		Example: "optimus namespace register [--flag]",
		RunE:    register.RunE,
	}
	cmd.Flags().StringVar(&register.dirPath, "dir", register.dirPath, "Directory where the Optimus client config resides")
	cmd.Flags().StringVar(&register.namespaceName, "name", register.namespaceName, "If set, then only that namespace will be registered")
	return cmd
}

func (r *registerCommand) RunE(_ *cobra.Command, _ []string) error {
	filePath := path.Join(r.dirPath, config.DefaultFilename)
	clientConfig, err := config.LoadClientConfig(filePath)
	if err != nil {
		return err
	}
	if r.namespaceName != "" {
		r.logger.Info("Registering namespace [%s] to [%s]", r.namespaceName, clientConfig.Host)
		namespace, err := clientConfig.GetNamespaceByName(r.namespaceName)
		if err != nil {
			return err
		}
		return RegisterNamespace(r.logger, clientConfig.Host, clientConfig.Project.Name, namespace)
	}
	r.logger.Info("Registering all available namespaces from client config to [%s]", clientConfig.Host)
	return RegisterSelectedNamespaces(r.logger, clientConfig.Host, clientConfig.Project.Name, clientConfig.Namespaces...)
}

// RegisterSelectedNamespaces registers all selected namespaces
func RegisterSelectedNamespaces(l log.Logger, serverHost, projectName string, selectedNamespaces ...*config.Namespace) error {
	ch := make(chan error, len(selectedNamespaces))
	defer close(ch)

	for _, namespace := range selectedNamespaces {
		go func(namespace *config.Namespace) {
			ch <- RegisterNamespace(l, serverHost, projectName, namespace)
		}(namespace)
	}
	var errMsg string
	for i := 0; i < len(selectedNamespaces); i++ {
		if err := <-ch; err != nil {
			errMsg += err.Error() + "\n"
		}
	}
	if len(errMsg) > 0 {
		return errors.New(errMsg)
	}
	return nil
}

// RegisterNamespace registers one namespace to the targeted server
func RegisterNamespace(l log.Logger, serverHost, projectName string, namespace *config.Namespace) error {
	conn, err := connectivity.NewConnectivity(serverHost, registerTimeout)
	if err != nil {
		return err
	}
	defer conn.Close()

	namespaceServiceClient := pb.NewNamespaceServiceClient(conn.GetConnection())
	_, err = namespaceServiceClient.RegisterProjectNamespace(conn.GetContext(), &pb.RegisterProjectNamespaceRequest{
		ProjectName: projectName,
		Namespace: &pb.NamespaceSpecification{
			Name:   namespace.Name,
			Config: namespace.Config,
		},
	})
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			l.Warn("Ignoring namespace [%s] config changes: %v", namespace.Name, err)
			return nil
		}
		return fmt.Errorf("failed to register or update namespace [%s]: %w", namespace.Name, err)
	}
	l.Info("Namespace [%s] registration finished successfully", namespace.Name)
	return nil
}
