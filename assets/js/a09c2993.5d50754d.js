"use strict";(self.webpackChunkoptimus=self.webpackChunkoptimus||[]).push([[4128],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),l=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,u=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=l(n),m=a,f=p["".concat(u,".").concat(m)]||p[m]||d[m]||i;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=p;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},8495:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return u},metadata:function(){return l},toc:function(){return c},default:function(){return p}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],s={id:"introduction",title:"Introduction"},u="Optimus",l={unversionedId:"introduction",id:"introduction",isDocsHomePage:!1,title:"Introduction",description:"Optimus is an ETL orchestration tool that helps manage warehouse resources and",source:"@site/docs/introduction.md",sourceDirName:".",slug:"/introduction",permalink:"/optimus/docs/introduction",editUrl:"https://github.com/odpf/optimus/edit/master/docs/docs/introduction.md",tags:[],version:"current",lastUpdatedBy:"Dery Rahman Ahaddienata",lastUpdatedAt:1674026887,formattedLastUpdatedAt:"1/18/2023",frontMatter:{id:"introduction",title:"Introduction"},sidebar:"docsSidebar",next:{title:"Installation",permalink:"/optimus/docs/getting-started/installation"}},c=[{value:"Features",id:"features",children:[]}],d={toc:c};function p(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"optimus"},"Optimus"),(0,i.kt)("p",null,"Optimus is an ETL orchestration tool that helps manage warehouse resources and\nschedule transformation over cron interval. Warehouses like Bigquery can be used\nto create, update, read, delete different types of resources(dataset/table/standard view).\nSimilarly, jobs can be SQL transformations taking inputs from single/multiple\nsource tables executing over fixed schedule interval. Optimus was made from start\nto be extensible, which is, adding support for different kind of warehouses,\ntransformations and executors can be done easily."),(0,i.kt)("h2",{id:"features"},"Features"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"BigQuery",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Schedule BigQuery transformation"),(0,i.kt)("li",{parentName:"ul"},"Query compile time templating (variables, loop, if statements, macros, etc)"),(0,i.kt)("li",{parentName:"ul"},"BigQuery Dataset/Table/View creation"),(0,i.kt)("li",{parentName:"ul"},"BigQuery UDF creation ",(0,i.kt)("strong",{parentName:"li"},"[in roadmap]")),(0,i.kt)("li",{parentName:"ul"},"Audit/Profile BigQuery tables"),(0,i.kt)("li",{parentName:"ul"},"Sink BigQuery tables to Kafka"),(0,i.kt)("li",{parentName:"ul"},"Automatic dependency resolution: In BigQuery if a query references\ntables/views as source, jobs required to create these tables will be added\nas dependencies automatically and optimus will wait for them to finish first."),(0,i.kt)("li",{parentName:"ul"},"Cross tenant dependency: Optimus is a multi-tenant service, if there are two\ntenants registered, serviceA and serviceB then service B can write queries\nreferencing serviceA as source and Optimus will handle this dependency as well"),(0,i.kt)("li",{parentName:"ul"},"Dry run query: Before SQL query is scheduled for transformation, during\ndeployment query will be dry-run to make sure it passes basic sanity\nchecks"))),(0,i.kt)("li",{parentName:"ul"},"Extensibility to support Python transformation"),(0,i.kt)("li",{parentName:"ul"},"Git based specification management"),(0,i.kt)("li",{parentName:"ul"},"GRPC/REST based APIs")),(0,i.kt)("p",null,"NOTE: This is still in early stages and very close to use for production.\nWe are taking feedback and making breaking changes based on user requirements."))}p.isMDXComponent=!0}}]);