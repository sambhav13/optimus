"use strict";(self.webpackChunkoptimus=self.webpackChunkoptimus||[]).push([[4128],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=u(r),m=a,f=d["".concat(l,".").concat(m)]||d[m]||p[m]||i;return r?n.createElement(f,o(o({ref:t},c),{},{components:r})):n.createElement(f,o({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:a,o[1]=s;for(var u=2;u<i;u++)o[u]=r[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8495:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>u});var n=r(7462),a=(r(7294),r(3905));const i={id:"introduction",title:"Introduction"},o="Optimus",s={unversionedId:"introduction",id:"introduction",title:"Introduction",description:"Optimus is an ETL orchestration tool that helps manage warehouse resources and",source:"@site/docs/introduction.md",sourceDirName:".",slug:"/introduction",permalink:"/optimus/docs/introduction",draft:!1,editUrl:"https://github.com/odpf/optimus/edit/master/docs/docs/introduction.md",tags:[],version:"current",lastUpdatedBy:"Arinda Arif",lastUpdatedAt:1679911773,formattedLastUpdatedAt:"Mar 27, 2023",frontMatter:{id:"introduction",title:"Introduction"},sidebar:"docsSidebar",next:{title:"Installation",permalink:"/optimus/docs/getting-started/installation"}},l={},u=[{value:"Features",id:"features",level:2}],c={toc:u},d="wrapper";function p(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"optimus"},"Optimus"),(0,a.kt)("p",null,"Optimus is an ETL orchestration tool that helps manage warehouse resources and\nschedule transformation over cron interval. Warehouses like Bigquery can be used\nto create, update, read, delete different types of resources(dataset/table/standard view).\nSimilarly, jobs can be SQL transformations taking inputs from single/multiple\nsource tables executing over fixed schedule interval. Optimus was made from start\nto be extensible, which is, adding support for different kind of warehouses,\ntransformations and executors can be done easily."),(0,a.kt)("h2",{id:"features"},"Features"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"BigQuery",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Schedule BigQuery transformation"),(0,a.kt)("li",{parentName:"ul"},"Query compile time templating (variables, loop, if statements, macros, etc)"),(0,a.kt)("li",{parentName:"ul"},"BigQuery Dataset/Table/View creation"),(0,a.kt)("li",{parentName:"ul"},"BigQuery UDF creation ",(0,a.kt)("strong",{parentName:"li"},"[in roadmap]")),(0,a.kt)("li",{parentName:"ul"},"Audit/Profile BigQuery tables"),(0,a.kt)("li",{parentName:"ul"},"Sink BigQuery tables to Kafka"),(0,a.kt)("li",{parentName:"ul"},"Automatic dependency resolution: In BigQuery if a query references\ntables/views as source, jobs required to create these tables will be added\nas dependencies automatically and optimus will wait for them to finish first."),(0,a.kt)("li",{parentName:"ul"},"Cross tenant dependency: Optimus is a multi-tenant service, if there are two\ntenants registered, serviceA and serviceB then service B can write queries\nreferencing serviceA as source and Optimus will handle this dependency as well"),(0,a.kt)("li",{parentName:"ul"},"Dry run query: Before SQL query is scheduled for transformation, during\ndeployment query will be dry-run to make sure it passes basic sanity\nchecks"))),(0,a.kt)("li",{parentName:"ul"},"Extensibility to support Python transformation"),(0,a.kt)("li",{parentName:"ul"},"Git based specification management"),(0,a.kt)("li",{parentName:"ul"},"GRPC/REST based APIs")),(0,a.kt)("p",null,"NOTE: This is still in early stages and very close to use for production.\nWe are taking feedback and making breaking changes based on user requirements."))}p.isMDXComponent=!0}}]);