"use strict";(self.webpackChunkoptimus=self.webpackChunkoptimus||[]).push([[8571],{3905:(e,t,a)=>{a.d(t,{Zo:()=>l,kt:()=>g});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=r.createContext({}),c=function(e){var t=r.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},l=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=c(a),m=n,g=d["".concat(p,".").concat(m)]||d[m]||u[m]||o;return a?r.createElement(g,i(i({ref:t},l),{},{components:a})):r.createElement(g,i({ref:t},l))}));function g(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[d]="string"==typeof e?e:n,i[1]=s;for(var c=2;c<o;c++)i[c]=a[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},1549:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=a(7462),n=(a(7294),a(3905));const o={id:"create-bigquery-dataset",title:"Create bigquery dataset"},i=void 0,s={unversionedId:"guides/create-bigquery-dataset",id:"guides/create-bigquery-dataset",title:"Create bigquery dataset",description:"A dataset is contained within a specific Google project. Datasets are top-level",source:"@site/docs/guides/create-bigquery-dataset.md",sourceDirName:"guides",slug:"/guides/create-bigquery-dataset",permalink:"/optimus/docs/guides/create-bigquery-dataset",draft:!1,editUrl:"https://github.com/odpf/optimus/edit/master/docs/docs/guides/create-bigquery-dataset.md",tags:[],version:"current",lastUpdatedBy:"Arinda Arif",lastUpdatedAt:1679911773,formattedLastUpdatedAt:"Mar 27, 2023",frontMatter:{id:"create-bigquery-dataset",title:"Create bigquery dataset"},sidebar:"docsSidebar",previous:{title:"Adding hook to a Job",permalink:"/optimus/docs/guides/adding-hook"},next:{title:"Create bigquery table",permalink:"/optimus/docs/guides/create-bigquery-table"}},p={},c=[{value:"Creating dataset with Optimus",id:"creating-dataset-with-optimus",level:3},{value:"Creating dataset over REST",id:"creating-dataset-over-rest",level:3},{value:"Creating dataset over GRPC",id:"creating-dataset-over-grpc",level:3}],l={toc:c},d="wrapper";function u(e){let{components:t,...a}=e;return(0,n.kt)(d,(0,r.Z)({},l,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"A dataset is contained within a specific Google project. Datasets are top-level\ncontainers that are used to organize and control access to your tables and views.\nA table or view must belong to a dataset, so you need to create at least one."),(0,n.kt)("p",null,"There are 3 ways to create a dataset:"),(0,n.kt)("h3",{id:"creating-dataset-with-optimus"},"Creating dataset with Optimus"),(0,n.kt)("p",null,"Supported datastore can be selected by calling"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"optimus resource create\n")),(0,n.kt)("p",null,"Optimus will request a resource name which should be unique across whole datastore.\nAll resource specification contains a name field which conforms to a fixed format.\nIn case of bigquery dataset, format should be\n",(0,n.kt)("inlineCode",{parentName:"p"},"projectname.datasetname"),".\nAfter the name is provided, ",(0,n.kt)("inlineCode",{parentName:"p"},"optimus")," will create a file in configured datastore\ndirectory. Open the created specification file and add additional spec details\nas follows:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-yaml"},'version: 1\nname: temporary-project.optimus-playground\ntype: dataset\nlabels:\n  usage: testdataset\n  owner: optimus\nspec:\n  description: "example description"\n  table_expiration: 24 # in hours\n')),(0,n.kt)("p",null,"This will add labels, description and default table expiration(in hours) to dataset\nonce the ",(0,n.kt)("inlineCode",{parentName:"p"},"deploy")," command is invoked."),(0,n.kt)("h3",{id:"creating-dataset-over-rest"},"Creating dataset over REST"),(0,n.kt)("p",null,"Optimus exposes Create/Update rest APIS"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"Create: POST /api/v1beta1/project/{project_name}/namespace/{namespace}/datastore/{datastore_name}/resource\nUpdate: PUT /api/v1beta1/project/{project_name}/namespace/{namespace}/datastore/{datastore_name}/resource\nRead: GET /api/v1beta1/project/{project_name}/namespace/{namespace}/datastore/{datastore_name}/resource/{resource_name}\n")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "resource": {\n        "version": 1,\n        "name" : "temporary-project.optimus-playground",\n        "datastore" : "bigquery",\n        "type" : "dataset",\n        "labels": {\n          "usage": "testdataset",\n          "owner": "optimus"\n        },\n        "spec" : {\n          "description": "example description",\n          "table_expiration": 24\n        }\n    }\n}\n')),(0,n.kt)("h3",{id:"creating-dataset-over-grpc"},"Creating dataset over GRPC"),(0,n.kt)("p",null,"Optimus in RuntimeService exposes an RPC "),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-protobuf"},"rpc CreateResource(CreateResourceRequest) returns (CreateResourceResponse) {}\n\nmessage CreateResourceRequest {\n    string project_name = 1;\n    string datastore_name = 2;\n    ResourceSpecification resource = 3;\n    string namespace = 4;\n}\n")),(0,n.kt)("p",null,"Function payload should be self-explanatory other than the struct ",(0,n.kt)("inlineCode",{parentName:"p"},"spec")," part which\nis very similar to how json representation look."),(0,n.kt)("p",null,"Spec will use ",(0,n.kt)("inlineCode",{parentName:"p"},"structpb")," struct created with ",(0,n.kt)("inlineCode",{parentName:"p"},"map[string]interface{}"),"\nFor example:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-go"},'map[string]interface{\n    "description": "example description",\n    "table_expiration": 24\n}\n')))}u.isMDXComponent=!0}}]);