(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"./src/components/button/button-doc.mdx":function(e,o,a){"use strict";a.r(o);var t=a("./node_modules/react/index.js"),n=a.n(t),r=a("./node_modules/@mdx-js/tag/dist/index.js"),c=a("./node_modules/docz/dist/index.m.js"),s=a("./node_modules/react-emotion/dist/index.esm.js"),i=Object(s.a)("display:flex;> .ztopia-button{margin-right:20px;&:last-child{margin-right:0;}}"),l=a("./node_modules/@babel/runtime/helpers/extends.js"),p=a.n(l),d=a("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"),m=a.n(d),u=a("./node_modules/emotion-theming/dist/index.esm.js"),g=a("./src/components/ztopia-themes.ts"),h={Basic:{color:g.a.Basic.Color.LIGHT,backgroundColor:g.a.Basic.Color.DARK,borderColor:g.a.Basic.Color.DARK,"&:not([disabled]):hover":{color:g.a.Basic.Color.DARK,backgroundColor:"transparent"},"> .ztopia-loader":{borderTopColor:g.a.Basic.Color.LIGHT},"&.ghost":{color:g.a.Basic.Color.DARK,"&:not([disabled]):hover":{color:g.a.Basic.Color.LIGHT,backgroundColor:g.a.Basic.Color.DARK},"> .ztopia-loader":{borderTopColor:g.a.Basic.Color.DARK}}},Space:{color:g.a.Space.Color.LIGHT,backgroundColor:g.a.Space.Color.PRIMARY,borderColor:g.a.Space.Color.PRIMARY,transition:g.a.Space.Animation.TRANSITION,"&:not([disabled]):hover":{textShadow:"0 0 4px ".concat(g.a.Space.Color.LIGHT),boxShadow:"\n            0 0 8px ".concat(g.a.Space.Color.PRIMARY,",\n            inset 0 0 8px ").concat(g.a.Space.Color.PRIMARY,"\n        ")},"> .ztopia-loader > div":{backgroundColor:g.a.Space.Color.LIGHT},"&.ghost":{color:g.a.Space.Color.PRIMARY,borderColor:g.a.Space.Color.PRIMARY,"&:not([disabled]):hover":{color:g.a.Space.Color.PRIMARY,textShadow:"0 0 2px ".concat(g.a.Space.Color.PRIMARY),boxShadow:"\n                0 0 4px ".concat(g.a.Space.Color.PRIMARY,",\n                inset 0 0 4px ").concat(g.a.Space.Color.PRIMARY,"\n            ")},"> .ztopia-loader > div":{backgroundColor:g.a.Space.Color.PRIMARY}}}},b=a("./src/components/loader/Loader.tsx"),B=Object(s.c)("button",{target:"etck56z0"})({padding:"15px 20px",border:"2px solid",position:"relative",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",boxShadow:"none",appearance:"none",outline:"none","&.ghost":{backgroundColor:"transparent"},"&.loading, &.ghost.loading":{color:"transparent","> *":{display:"none"},"> .ztopia-loader":{display:"block"}},"> .ztopia-loader":{display:"none",position:"absolute"}},function(e){var o=e.ztopiaTheme;return o&&Object(g.b)(o)?h[o]:{}}),S=function(e){var o=e.ztopiaTheme,a=e.ghost,n=e.loading,r=e.disabled,c=e.children,i=m()(e,["ztopiaTheme","ghost","loading","disabled","children"]),l=Object(s.b)("ztopia-button",a&&"ghost",n&&"loading");return t.createElement(u.a,{theme:h},t.createElement(B,p()({ztopiaTheme:o,className:l,disabled:r||n},i),c,t.createElement(b.a,{ztopiaTheme:o||"Basic"})))};S.defaultProps={ztopiaTheme:"Basic",ghost:!1,loading:!1,disabled:!1};var T=S;try{S.displayName="Button",S.__docgenInfo={description:"",displayName:"Button",props:{ztopiaTheme:{defaultValue:{value:"Basic"},description:"All Ztopia themes can be found in Introduction section.",name:"ztopiaTheme",required:!1,type:{name:"string"}},ghost:{defaultValue:{value:"false"},description:"Make background transparent and invert text and border colors.",name:"ghost",required:!1,type:{name:"boolean"}},loading:{defaultValue:{value:"false"},description:"Set button loading state.",name:"loading",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"Set button disabled state.",name:"disabled",required:!1,type:{name:"boolean"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/button/Button.tsx#Button"]={docgenInfo:S.__docgenInfo,name:"Button",path:"src/components/button/Button.tsx#Button"})}catch(e){}function C(e,o){if(null==e)return{};var a,t,n=function(e,o){if(null==e)return{};var a,t,n={},r=Object.keys(e);for(t=0;t<r.length;t++)a=r[t],o.indexOf(a)>=0||(n[a]=e[a]);return n}(e,o);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)a=r[t],o.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}o.default=function(e){var o=e.components,a=C(e,["components"]);return n.a.createElement(r.MDXTag,{name:"wrapper",components:o},n.a.createElement(r.MDXTag,{name:"h1",components:o,props:{id:"button"}},n.a.createElement(r.MDXTag,{name:"a",components:o,parentName:"h1",props:{"aria-hidden":!0,href:"#button"}},n.a.createElement(r.MDXTag,{name:"span",components:o,parentName:"a",props:{className:"icon-link"}},"#")),"Button"),n.a.createElement(r.MDXTag,{name:"h3",components:o,props:{id:"api"}},n.a.createElement(r.MDXTag,{name:"a",components:o,parentName:"h3",props:{"aria-hidden":!0,href:"#api"}},n.a.createElement(r.MDXTag,{name:"span",components:o,parentName:"a",props:{className:"icon-link"}},"#")),"API"),n.a.createElement(c.e,{of:T}),n.a.createElement(r.MDXTag,{name:"h3",components:o,props:{id:"basic-button"}},n.a.createElement(r.MDXTag,{name:"a",components:o,parentName:"h3",props:{"aria-hidden":!0,href:"#basic-button"}},n.a.createElement(r.MDXTag,{name:"span",components:o,parentName:"a",props:{className:"icon-link"}},"#")),"Basic Button"),n.a.createElement(c.d,{__position:1,__code:"<Button>Basic Button</Button>\n<Button loading>Loading</Button>\n<Button ghost>Basic Ghost Button</Button>\n<Button ghost loading>\n  Loading\n</Button>",__scope:{props:a,playgroundStyle:i,Button:T},className:i},n.a.createElement(T,null,"Basic Button"),n.a.createElement(T,{loading:!0},"Loading"),n.a.createElement(T,{ghost:!0},"Basic Ghost Button"),n.a.createElement(T,{ghost:!0,loading:!0},"Loading")),n.a.createElement(r.MDXTag,{name:"h3",components:o,props:{id:"space-button"}},n.a.createElement(r.MDXTag,{name:"a",components:o,parentName:"h3",props:{"aria-hidden":!0,href:"#space-button"}},n.a.createElement(r.MDXTag,{name:"span",components:o,parentName:"a",props:{className:"icon-link"}},"#")),"Space Button"),n.a.createElement(c.d,{__position:2,__code:'<Button ztopiaTheme="Space">Space Button</Button>\n<Button ztopiaTheme="Space" loading>\n  Loading\n</Button>\n<Button ztopiaTheme="Space" ghost>\n  Space Ghost Button\n</Button>\n<Button ztopiaTheme="Space" ghost loading>\n  Loading\n</Button>',__scope:{props:a,playgroundStyle:i,Button:T},className:i},n.a.createElement(T,{ztopiaTheme:"Space"},"Space Button"),n.a.createElement(T,{ztopiaTheme:"Space",loading:!0},"Loading"),n.a.createElement(T,{ztopiaTheme:"Space",ghost:!0},"Space Ghost Button"),n.a.createElement(T,{ztopiaTheme:"Space",ghost:!0,loading:!0},"Loading")))}}}]);