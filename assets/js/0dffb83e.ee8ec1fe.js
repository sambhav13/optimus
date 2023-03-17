"use strict";(self.webpackChunkoptimus=self.webpackChunkoptimus||[]).push([[5075],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>h});var i=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,i,o=function(e,t){if(null==e)return{};var r,i,o={},n=Object.keys(e);for(i=0;i<n.length;i++)r=n[i],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(i=0;i<n.length;i++)r=n[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=i.createContext({}),u=function(e){var t=i.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=u(e.components);return i.createElement(l.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},m=i.forwardRef((function(e,t){var r=e.components,o=e.mdxType,n=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=u(r),m=o,h=d["".concat(l,".").concat(m)]||d[m]||c[m]||n;return r?i.createElement(h,a(a({ref:t},p),{},{components:r})):i.createElement(h,a({ref:t},p))}));function h(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var n=r.length,a=new Array(n);a[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:o,a[1]=s;for(var u=2;u<n;u++)a[u]=r[u];return i.createElement.apply(null,a)}return i.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3208:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>n,metadata:()=>s,toc:()=>u});var i=r(7462),o=(r(7294),r(3905));const n={id:"roadmap",title:"Roadmap",slug:"/roadmap"},a=void 0,s={unversionedId:"roadmap",id:"roadmap",title:"Roadmap",description:"This is a live document which gives an idea for all the users of Optimus on what are we upto.",source:"@site/docs/roadmap.md",sourceDirName:".",slug:"/roadmap",permalink:"/optimus/docs/roadmap",draft:!1,editUrl:"https://github.com/odpf/optimus/edit/master/docs/docs/roadmap.md",tags:[],version:"current",lastUpdatedBy:"Ravi Suhag",lastUpdatedAt:1679022512,formattedLastUpdatedAt:"Mar 17, 2023",frontMatter:{id:"roadmap",title:"Roadmap",slug:"/roadmap"},sidebar:"docsSidebar",previous:{title:"Contributing",permalink:"/optimus/docs/contribute/contributing"},next:{title:"API",permalink:"/optimus/docs/reference/api"}},l={},u=[{value:"Secret Management in Optimus",id:"secret-management-in-optimus",level:3},{value:"Test Your Jobs",id:"test-your-jobs",level:3},{value:"Telemetry",id:"telemetry",level:3},{value:"Add More Plugins",id:"add-more-plugins",level:3},{value:"Task Versioning",id:"task-versioning",level:3},{value:"Improved Window Support",id:"improved-window-support",level:3},{value:"SLA Tracking",id:"sla-tracking",level:3},{value:"SQLite Support",id:"sqlite-support",level:3},{value:"Custom Macro Support",id:"custom-macro-support",level:3},{value:"Inbuilt Testing F/w",id:"inbuilt-testing-fw",level:3},{value:"Inter Task/Hook Communication",id:"inter-taskhook-communication",level:3}],p={toc:u},d="wrapper";function c(e){let{components:t,...r}=e;return(0,o.kt)(d,(0,i.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"This is a live document which gives an idea for all the users of Optimus on what are we upto. "),(0,o.kt)("h3",{id:"secret-management-in-optimus"},"Secret Management in Optimus"),(0,o.kt)("p",null,"As optimus meant to deal with various warehouse systems & with the plugin support provides the capability to interact with other third party systems.\nIt brings a need for proper secret management to store & use securely for all users onboard."),(0,o.kt)("h3",{id:"test-your-jobs"},"Test Your Jobs"),(0,o.kt)("p",null,"Giving a provision for users to test the jobs before deploying helps users with faster feedbacks."),(0,o.kt)("h3",{id:"telemetry"},"Telemetry"),(0,o.kt)("p",null,"With proper monitoring we can get many insights into Optimus, which helps in debugging any failures. May not be a direct end user feature but this is very important.  "),(0,o.kt)("h3",{id:"add-more-plugins"},"Add More Plugins"),(0,o.kt)("p",null,"Once the data is analyzed in warehouse, there is always a need for getting the data out of the system for visualizations or for consumption. This is a constant effort to improve the ecosystem that optimus supports.\nThe plugins that we will be adding support is to pull data from BQ to Kafka, JDBC, FTP."),(0,o.kt)("h3",{id:"task-versioning"},"Task Versioning"),(0,o.kt)("p",null,"Versioning of tasks comes to handy when there is a time significance associated to task.\nOn replay, an older version of task has to run which was active at that time and the newer version on the coming days."),(0,o.kt)("h3",{id:"improved-window-support"},"Improved Window Support"),(0,o.kt)("p",null,"The current windowing which is used by for automated dependency resoultion & the macros which are derived from it are being used for input data filtering is little confusing & limiting in nature.\nThis will be an effort to easy the same."),(0,o.kt)("h3",{id:"sla-tracking"},"SLA Tracking"),(0,o.kt)("p",null,"Giving a provision for defining the SLAs & providing a dashboard to visualize how the slas are met is a must.\nWith this users will be able to monitor any slas that are breached out of the box."),(0,o.kt)("h3",{id:"sqlite-support"},"SQLite Support"),(0,o.kt)("p",null,"With support of SQLlite database, just helps users to kick start Optimus fast & easy to try on without having a dependency on postgres."),(0,o.kt)("h3",{id:"custom-macro-support"},"Custom Macro Support"),(0,o.kt)("p",null,"Custom Macros will unleash many capabilities, this will help users to template their queries to avoid any duplication."),(0,o.kt)("h3",{id:"inbuilt-testing-fw"},"Inbuilt Testing F/w"),(0,o.kt)("p",null,"Currently Optimus relies on Predator for Quality Checks, instead of relying on predator which is not extensible & supports only BQ, providing a capability to test the job runs directly."),(0,o.kt)("h3",{id:"inter-taskhook-communication"},"Inter Task/Hook Communication"),(0,o.kt)("p",null,"As we scale, there are situations where tasks & hooks has to share information directly instead of relying on another system. This opens up many capabilities."))}c.isMDXComponent=!0}}]);