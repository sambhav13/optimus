"use strict";(self.webpackChunkoptimus=self.webpackChunkoptimus||[]).push([[4112],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var i=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=i.createContext({}),c=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return i.createElement(s.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(n),d=r,f=p["".concat(s,".").concat(d)]||p[d]||m[d]||o;return n?i.createElement(f,a(a({ref:t},u),{},{components:n})):i.createElement(f,a({ref:t},u))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:r,a[1]=l;for(var c=2;c<o;c++)a[c]=n[c];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7912:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var i=n(7462),r=(n(7294),n(3905));const o={},a="Contributing",l={unversionedId:"contribute/contributing",id:"contribute/contributing",title:"Contributing",description:"First off, thanks for taking the time to contribute! \ud83c\udf1f\ud83e\udd73",source:"@site/docs/contribute/contributing.md",sourceDirName:"contribute",slug:"/contribute/contributing",permalink:"/optimus/docs/contribute/contributing",draft:!1,editUrl:"https://github.com/odpf/optimus/edit/master/docs/docs/contribute/contributing.md",tags:[],version:"current",lastUpdatedBy:"Ravi Suhag",lastUpdatedAt:1679022512,formattedLastUpdatedAt:"Mar 17, 2023",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Developing plugins",permalink:"/optimus/docs/development/building-plugin"},next:{title:"Roadmap",permalink:"/optimus/docs/roadmap"}},s={},c=[{value:"Best practices",id:"best-practices",level:2},{value:"Code of Conduct",id:"code-of-conduct",level:2}],u={toc:c},p="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(p,(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"contributing"},"Contributing"),(0,r.kt)("p",null,"First off, thanks for taking the time to contribute! \ud83c\udf1f\ud83e\udd73"),(0,r.kt)("p",null,"When contributing to this repository, please first discuss the change you wish to make via issue,\nemail, or any other method with the owners of this repository before making a change."),(0,r.kt)("p",null,"Please note we have a code of conduct, please follow it in all your interactions with the project."),(0,r.kt)("h2",{id:"best-practices"},"Best practices"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Write clear and meaningful git commit messages."),(0,r.kt)("li",{parentName:"ul"},"If the PR will ",(0,r.kt)("em",{parentName:"li"},"completely")," fix a specific issue, include ",(0,r.kt)("inlineCode",{parentName:"li"},"fixes #123")," in the PR body (where 123 is the specific issue number the PR will fix. This will automatically close the issue when the PR is merged."),(0,r.kt)("li",{parentName:"ul"},"Make sure you don't include ",(0,r.kt)("inlineCode",{parentName:"li"},"@mentions")," or ",(0,r.kt)("inlineCode",{parentName:"li"},"fixes")," keywords in your git commit messages. These should be included in the PR body instead."),(0,r.kt)("li",{parentName:"ul"},"When you make a PR for small change (such as fixing a typo, style change, or grammar fix), please squash your commits so that we can maintain a cleaner git history."),(0,r.kt)("li",{parentName:"ul"},"Make sure you include a clear and detailed PR description explaining the reasons for the changes, and ensuring there is sufficient information for the reviewer to understand your PR."),(0,r.kt)("li",{parentName:"ul"},"Additional Readings:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://chris.beams.io/posts/git-commit/"},"chris.beams.io/posts/git-commit/")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/blog/1506-closing-issues-via-pull-requests"},"github.com/blog/1506-closing-issues-via-pull-requests ")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://davidwalsh.name/squash-commits-git"},"davidwalsh.name/squash-commits-git ")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://mtlynch.io/code-review-love/"},"https://mtlynch.io/code-review-love/"))))),(0,r.kt)("h2",{id:"code-of-conduct"},"Code of Conduct"),(0,r.kt)("p",null,"Examples of behavior that contributes to creating a positive environment\ninclude:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Using welcoming and inclusive language"),(0,r.kt)("li",{parentName:"ul"},"Being respectful of differing viewpoints and experiences"),(0,r.kt)("li",{parentName:"ul"},"Gracefully accepting constructive criticism"),(0,r.kt)("li",{parentName:"ul"},"Focusing on what is best for the project")),(0,r.kt)("p",null,"Things to keep in mind before creating a new commit:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Go through the project code conventions."),(0,r.kt)("li",{parentName:"ul"},"Commit ",(0,r.kt)("a",{parentName:"li",href:"https://www.conventionalcommits.org/en/v1.0.0/"},"guidelines")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/cncf/foundation/blob/master/code-of-conduct.md"},"CNCF Code of Conduct"))))}m.isMDXComponent=!0}}]);