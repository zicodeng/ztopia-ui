(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"./src/components/input/input-doc.mdx":function(e,t,n){"use strict";n.r(t);var a=n("./node_modules/react/index.js"),i=n.n(a),r=n("./node_modules/@mdx-js/tag/dist/index.js"),o=n("./node_modules/docz/dist/index.m.js"),s=n("./node_modules/react-emotion/dist/index.esm.js"),p=Object(s.a)("display:flex;flex-direction:column;> .ztopia-input-outer-container{margin-bottom:20px;&:last-child{margin-bottom:0;}}"),l=n("./node_modules/@babel/runtime/helpers/extends.js"),c=n.n(l),d=n("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"),u=n.n(d),m=n("./node_modules/emotion-theming/dist/index.esm.js"),f=n("./src/components/ztopia-themes.ts"),x={Basic:{color:f.a.Basic.Color.DARK,"&.error > .ztopia-input-inner-container":{borderColor:f.a.Basic.Color.ACCENT},"> .ztopia-input-inner-container":{borderColor:f.a.Basic.Color.DARK,"> .ztopia-prefix-icon, > .ztopia-prefix-label, > .ztopia-suffix-icon, > .ztopia-suffix-label":{color:f.a.Basic.Color.LIGHT,backgroundColor:f.a.Basic.Color.DARK},"> .ztopia-input":{}},"> .ztopia-input-error-message":{margin:"5px 0",color:f.a.Basic.Color.ACCENT}},Space:{}},b=Object(s.c)("div",{target:"emg4fao0"})({position:"relative","> .ztopia-input-inner-container":{width:"100%",height:"40px",border:"2px solid",backgroundColor:"transparent",display:"flex",alignItems:"center","> .ztopia-prefix-icon, > .ztopia-prefix-label, > .ztopia-suffix-icon, > .ztopia-suffix-label":{height:"100%",padding:"0 10px",display:"flex",alignItems:"center"},"> .ztopia-prefix-icon + .ztopia-prefix-label, > .ztopia-suffix-icon + .ztopia-suffix-label":{paddingLeft:"0"},"> .ztopia-prefix-icon > svg, > .ztopia-suffix-icon > svg":{width:"15px"},"> .ztopia-input":{width:"100%",height:"100%",padding:"0 10px",border:"none",boxShadow:"none",appearance:"none",outline:"none","&[disabled]":{cursor:"not-allowed"}}}},function(e){var t=e.ztopiaTheme;return t&&Object(f.b)(t)?x[t]:{}}),h=function(e){var t=e.ztopiaTheme,n=e.prefixIcon,i=e.prefixLabel,r=e.suffixIcon,o=e.suffixLabel,p=e.disabled,l=e.errorMessage,d=e.onPressEnter,f=e.className,h=u()(e,["ztopiaTheme","prefixIcon","prefixLabel","suffixIcon","suffixLabel","disabled","errorMessage","onPressEnter","className"]),g=Object(s.b)("ztopia-input-outer-container",l&&"error",f);return a.createElement(m.a,{theme:x},a.createElement(b,{ztopiaTheme:t,className:g},a.createElement("div",{className:"ztopia-input-inner-container"},n&&a.createElement("span",{className:"ztopia-prefix-icon"},n),i&&a.createElement("span",{className:"ztopia-prefix-label"},i),a.createElement("input",c()({className:"ztopia-input"},h,{disabled:p,onKeyPress:d&&function(e){d&&"Enter"===e.key&&d()}})),r&&a.createElement("span",{className:"ztopia-suffix-icon"},r),o&&a.createElement("span",{className:"ztopia-suffix-label"},o)),l&&a.createElement("p",{className:"ztopia-input-error-message"},l)))};h.defaultProps={ztopiaTheme:"Basic",disabled:!1};var g=h;try{h.displayName="Input",h.__docgenInfo={description:"",displayName:"Input",props:{ztopiaTheme:{defaultValue:{value:"Basic"},description:"All Ztopia themes can be found in Design section.",name:"ztopiaTheme",required:!1,type:{name:"string"}},prefixIcon:{defaultValue:null,description:"The icon displayed before (on the left side of) the input field.",name:"prefixIcon",required:!1,type:{name:"ReactElement<any>"}},prefixLabel:{defaultValue:null,description:"The label text displayed before (on the left side of) the input field.",name:"prefixLabel",required:!1,type:{name:"string"}},suffixIcon:{defaultValue:null,description:"The icon displayed after (on the right side of) the input field.",name:"suffixIcon",required:!1,type:{name:"ReactElement<any>"}},suffixLabel:{defaultValue:null,description:"The label text displayed after (on the right side of) the input field.",name:"suffixLabel",required:!1,type:{name:"string"}},disabled:{defaultValue:{value:"false"},description:"Set input disabled state.",name:"disabled",required:!1,type:{name:"boolean"}},errorMessage:{defaultValue:null,description:"Display a given error message.",name:"errorMessage",required:!1,type:{name:"string"}},onPressEnter:{defaultValue:null,description:"The callback function that is triggered when Enter key is pressed.",name:"onPressEnter",required:!1,type:{name:"Function"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/input/Input.tsx#Input"]={docgenInfo:h.__docgenInfo,name:"Input",path:"src/components/input/Input.tsx#Input"})}catch(e){}var y=n("./src/icons/IconUser.tsx");function E(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}t.default=function(e){var t=e.components,n=E(e,["components"]);return i.a.createElement(r.MDXTag,{name:"wrapper",components:t},i.a.createElement(r.MDXTag,{name:"h1",components:t,props:{id:"input"}},i.a.createElement(r.MDXTag,{name:"a",components:t,parentName:"h1",props:{"aria-hidden":!0,href:"#input"}},i.a.createElement(r.MDXTag,{name:"span",components:t,parentName:"a",props:{className:"icon-link"}},"#")),"Input"),i.a.createElement(r.MDXTag,{name:"h2",components:t,props:{id:"api"}},i.a.createElement(r.MDXTag,{name:"a",components:t,parentName:"h2",props:{"aria-hidden":!0,href:"#api"}},i.a.createElement(r.MDXTag,{name:"span",components:t,parentName:"a",props:{className:"icon-link"}},"#")),"API"),i.a.createElement(o.e,{of:g}),i.a.createElement(r.MDXTag,{name:"h2",components:t,props:{id:"basic-input"}},i.a.createElement(r.MDXTag,{name:"a",components:t,parentName:"h2",props:{"aria-hidden":!0,href:"#basic-input"}},i.a.createElement(r.MDXTag,{name:"span",components:t,parentName:"a",props:{className:"icon-link"}},"#")),"Basic Input"),i.a.createElement(o.d,{__position:1,__code:'<Input\n  type="text"\n  placeholder="Username"\n  onPressEnter={() => window.alert(\'Enter key pressed!\')}\n/>\n<Input type="text" prefixLabel="Username" />\n<Input type="text" prefixIcon={<IconUser />} />\n<Input type="text" prefixLabel="Username" prefixIcon={<IconUser />} />\n<Input type="text" suffixLabel="Username" />\n<Input type="text" suffixIcon={<IconUser />} />\n<Input type="text" suffixLabel="Username" suffixIcon={<IconUser />} />\n<Input type="text" placeholder="This input field is disabled" disabled />\n<Input\n  type="text"\n  defaultValue="zicodeng"\n  errorMessage="Error: this username does not exist in database."\n/>',__scope:{props:n,playgroundStyle:p,Input:g,IconUser:y.a},className:p},i.a.createElement(g,{type:"text",placeholder:"Username",onPressEnter:function(){return window.alert("Enter key pressed!")}}),i.a.createElement(g,{type:"text",prefixLabel:"Username"}),i.a.createElement(g,{type:"text",prefixIcon:i.a.createElement(y.a,null)}),i.a.createElement(g,{type:"text",prefixLabel:"Username",prefixIcon:i.a.createElement(y.a,null)}),i.a.createElement(g,{type:"text",suffixLabel:"Username"}),i.a.createElement(g,{type:"text",suffixIcon:i.a.createElement(y.a,null)}),i.a.createElement(g,{type:"text",suffixLabel:"Username",suffixIcon:i.a.createElement(y.a,null)}),i.a.createElement(g,{type:"text",placeholder:"This input field is disabled",disabled:!0}),i.a.createElement(g,{type:"text",defaultValue:"zicodeng",errorMessage:"Error: this username does not exist in database."})))}}}]);