"use strict";(self.webpackChunkoptimus=self.webpackChunkoptimus||[]).push([[9353],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return m}});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var i=a.createContext({}),u=function(e){var t=a.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=u(e.components);return a.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,i=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=u(r),m=n,y=d["".concat(i,".").concat(m)]||d[m]||c[m]||l;return r?a.createElement(y,s(s({ref:t},p),{},{components:r})):a.createElement(y,s({ref:t},p))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,s=new Array(l);s[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"==typeof e?e:n,s[1]=o;for(var u=2;u<l;u++)s[u]=r[u];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},5550:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return o},contentTitle:function(){return i},metadata:function(){return u},toc:function(){return p},default:function(){return d}});var a=r(7462),n=r(3366),l=(r(7294),r(3905)),s=["components"],o={id:"replay",title:"Backfill jobs using Replay"},i=void 0,u={unversionedId:"guides/replay",id:"guides/replay",isDocsHomePage:!1,title:"Backfill jobs using Replay",description:"Some old dates of a job might need to be re-run (backfill) due to business requirement changes, corrupt data, or other",source:"@site/docs/guides/replay.md",sourceDirName:"guides",slug:"/guides/replay",permalink:"/optimus/docs/guides/replay",editUrl:"https://github.com/odpf/optimus/edit/master/docs/docs/guides/replay.md",tags:[],version:"current",lastUpdatedBy:"Yash Bhardwaj",lastUpdatedAt:1673002393,formattedLastUpdatedAt:"1/6/2023",frontMatter:{id:"replay",title:"Backfill jobs using Replay"},sidebar:"docsSidebar",previous:{title:"Backup Resources",permalink:"/optimus/docs/guides/backup"},next:{title:"Manage Secrets",permalink:"/optimus/docs/guides/secret"}},p=[{value:"Run a replay",id:"run-a-replay",children:[]},{value:"Get a replay status",id:"get-a-replay-status",children:[]},{value:"Get list of replays",id:"get-list-of-replays",children:[]},{value:"Run a replay dry run",id:"run-a-replay-dry-run",children:[]}],c={toc:p};function d(e){var t=e.components,r=(0,n.Z)(e,s);return(0,l.kt)("wrapper",(0,a.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"Some old dates of a job might need to be re-run (backfill) due to business requirement changes, corrupt data, or other\nvarious reasons. Optimus provides an easy way to do this using Replay. Please go through\n",(0,l.kt)("a",{parentName:"p",href:"/optimus/docs/concepts/overview"},"concepts")," to know more about it."),(0,l.kt)("h2",{id:"run-a-replay"},"Run a replay"),(0,l.kt)("p",null,"In order to run a replay, run the following command:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"$ optimus replay create sample-job 2021-01-01 2021-02-01 --project sample-project --namespace sample-namespace\n")),(0,l.kt)("p",null,"Replay accepts three arguments, first is the DAG name that is used in optimus specification, second is\nstart date of replay, third is end date (optional) of replay."),(0,l.kt)("p",null,"If the replay request passes the basic validation, you will see all the tasks including the downstream that will be\nreplayed. You can confirm to proceed to run replay if the run simulation is as expected."),(0,l.kt)("p",null,"Once your request has been successfully replayed, this means that Replay has cleared the mentioned task in the scheduler.\nPlease wait until the scheduler finishes scheduling and running those tasks. "),(0,l.kt)("h2",{id:"get-a-replay-status"},"Get a replay status"),(0,l.kt)("p",null,"You can check the replay status using the replay ID given previously and use in this command:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"$ optimus replay status {replay_id} --project sample-project\n")),(0,l.kt)("p",null,"You will see the latest replay status including the status of each run of your replay."),(0,l.kt)("h2",{id:"get-list-of-replays"},"Get list of replays"),(0,l.kt)("p",null,"List of recent replay of a project can be checked using this sub command:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"$ optimus replay list --project sample-project\n")),(0,l.kt)("p",null,"Recent replay ID including the job, time window, replay time, and status will be shown. To check the detailed status of a\nreplay, please use the ",(0,l.kt)("inlineCode",{parentName:"p"},"status")," sub command."),(0,l.kt)("h2",{id:"run-a-replay-dry-run"},"Run a replay dry run"),(0,l.kt)("p",null,"A dry run is also available to simulate all the impacted tasks without actually re-running the tasks. Example of dry run\nusage:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"$ optimus replay create sample-job 2021-01-01 2021-02-01 --project sample-project --namespace sample-namespace --dry-run\n")))}d.isMDXComponent=!0}}]);