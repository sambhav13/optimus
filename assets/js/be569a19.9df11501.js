"use strict";(self.webpackChunkoptimus=self.webpackChunkoptimus||[]).push([[2867],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),p=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return o.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),h=a,m=u["".concat(s,".").concat(h)]||u[h]||d[h]||r;return n?o.createElement(m,i(i({ref:t},c),{},{components:n})):o.createElement(m,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var p=2;p<r;p++)i[p]=n[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}h.displayName="MDXCreateElement"},5445:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var o=n(7462),a=(n(7294),n(3905));const r={id:"create-job",title:"Using Optimus to create a Job"},i=void 0,l={unversionedId:"guides/create-job",id:"guides/create-job",title:"Using Optimus to create a Job",description:"A Job is the fundamental execution unit of an Optimus data pipeline.",source:"@site/docs/guides/create-job.md",sourceDirName:"guides",slug:"/guides/create-job",permalink:"/optimus/docs/guides/create-job",draft:!1,editUrl:"https://github.com/odpf/optimus/edit/master/docs/docs/guides/create-job.md",tags:[],version:"current",lastUpdatedBy:"Ravi Suhag",lastUpdatedAt:1679022512,formattedLastUpdatedAt:"Mar 17, 2023",frontMatter:{id:"create-job",title:"Using Optimus to create a Job"},sidebar:"docsSidebar",previous:{title:"Configurations",permalink:"/optimus/docs/getting-started/configuration"},next:{title:"Adding hook to a Job",permalink:"/optimus/docs/guides/adding-hook"}},s={},p=[{value:"Creating a Job",id:"creating-a-job",level:2}],c={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"A Job is the fundamental execution unit of an Optimus data pipeline.\nIt can be scheduled, configured and is always mapped to a single transformation type\n(eg, BQ-to-BQ, GCS-to-BQ, etc). It can have dependencies over other jobs and should\nonly execute once the dependent job is successfully completed. "),(0,a.kt)("p",null,"A job can also be configured with Hooks as part of its lifecycle, which can be\ntriggered before or after the job. Please go through ",(0,a.kt)("a",{parentName:"p",href:"/optimus/docs/concepts/overview"},"concepts"),"\nto know more about it."),(0,a.kt)("p",null,'Let\'s start with a basic example. For our tutorial, we\'ll be creating a job that\nwrites "hello YYYY-MM-DD" to a table every day at 3 am. We\'ll use BQ-to-BQ transformation type.\nFor the purpose of this tutorial, we\'ll assume that the Google Cloud Project name\nis "example" & dataset is just called "data".'),(0,a.kt)("h2",{id:"creating-a-job"},"Creating a Job"),(0,a.kt)("p",null,"Open your terminal and create a new directory that will hold the specifications\ncreated by ",(0,a.kt)("inlineCode",{parentName:"p"},"optimus")," (The CLI of Optimus). Once ready, you can run the following\ncommand and answer the corresponding prompts (do note that some prompts\nwould be to select from options instead of input):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"$ optimus job create\n? What is the job name? example_job\n? Who is the owner of this job? example@example.com\n? Which task to run? bq2bq\n? Specify the start date 2021-02-18\n? Specify the interval (in crontab notation) 0 3 * * *\n? Project ID: example\n? Dataset Name: data\n? Table Name: hello_table\n? Load method to use on destination? APPEND\n")),(0,a.kt)("p",null,"Note: The cron schedule of a Job is as per UTC timezone.\nWith the above prompt, we have created a Job with name example_job that writes to table ",(0,a.kt)("inlineCode",{parentName:"p"},"hello_table"),"\nevery day at 3 AM UTC, with the load method APPEND (we'll come back to this later).\nThe task ",(0,a.kt)("inlineCode",{parentName:"p"},"bq2bq"),' refers to "BigQuery to BigQuery" transformation. As you can notice,\neach Job is mapped with a specific table. This will create the following files:'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},".\n\u2514\u2500\u2500 example_job\n    \u251c\u2500\u2500 assets\n    \u2502 \u2514\u2500\u2500 query.sql\n    \u2514\u2500\u2500 job.yaml\n")),(0,a.kt)("p",null,"You can now edit ",(0,a.kt)("inlineCode",{parentName:"p"},"query.sql")," and write the SQL query in it. for example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'$ cat > example_job/assets/query.sql <<_EOF\nselect CONCAT("Hello, ", "{{.DEND}}") as message\n_EOF\n')),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"{{.DEND}}")," is a macro that is replaced with the current execution date (in YYYY-MM-DD format)\nof the task (note that this is the execution date of when the task was supposed to run,\nnot when it actually runs). There's another corresponding macro for start date called ",(0,a.kt)("inlineCode",{parentName:"p"},"\n{{.DSTART}}")," the value of which is DEND minus the task window. If the task window is DAILY,\nDSTART is one day behind DEND, if the window is weekly, DSTART is 7 days before DEND.\nDo note the format of macros, these are as per ",(0,a.kt)("a",{parentName:"p",href:"https://golang.org/pkg/text/template/"},"golang template"),"."),(0,a.kt)("p",null,"What about the load method then? Load method specifies write disposition of the task.\nThere are currently 3 configurations available:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"APPEND"),(0,a.kt)("li",{parentName:"ul"},"REPLACE"),(0,a.kt)("li",{parentName:"ul"},"MERGE")),(0,a.kt)("p",null,"When the load method is set to APPEND new rows are inserted to the table/partition\nwhen the job runs, REPLACE will truncate the table/partition before writing new rows\nand MERGE is used when you want to use BigQuery DML/Scripts. Which load method you use depends\non the nature of the transformation, however it's advised to use the REPLACE method\nwith a partitioned table to keep your queries idempotent. Another alternative would\nbe to use the MERGE load method with DML. Keeping queries idempotent helps backfilling data."),(0,a.kt)("p",null,"Finally, this is how our Job Specification will look like (example_job/job.yaml):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},'version: 1\nname: example_job\nowner: example@example.com\nschedule:\n  start_date: "2021-02-18"\n  interval: 0 3 * * *\nbehavior:\n  depends_on_past: false\n  catch_up: true\ntask:\n  name: bq2bq\n  config:\n    PROJECT: example\n    DATASET: data\n    TABLE: hello_table\n    LOAD_METHOD: APPEND\n    SQL_TYPE: STANDARD\n  window:\n    size: 24h\n    offset: "0"\n    truncate_to: d\nlabels:\n   orchestrator: optimus\ndependencies: []\nhooks: []\n')),(0,a.kt)("p",null,"Now you can finally push all the files in a git repository. Create a commit and\npush to repository which will initiate gitlab pipeline and apply all of your changes.\nIn this case:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Table is migrated in BigQuery for above bq2bq task ","[TODO]"),(0,a.kt)("li",{parentName:"ol"},"Compiles your job specifications as Airflow DAG definitions and upload them to\nGoogle cloud storage (or any other configured store) that gets synced to airflow\n(or any other configured scheduler) linked with this git repository.")),(0,a.kt)("p",null,"Optimus also supports managing Job Specifications via APIs. We'll talk about this in other sections.\nYou have now successfully deployed your transformation job onto your infrastructure."))}d.isMDXComponent=!0}}]);