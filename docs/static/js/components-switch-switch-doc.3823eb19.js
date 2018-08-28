(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"./src/components/switch/switch-doc.mdx":function(e,t,a){"use strict";a.r(t);var n=a("./node_modules/react/index.js"),o=a.n(n),c=a("./node_modules/@mdx-js/tag/dist/index.js"),i=a("./node_modules/docz/dist/index.m.js"),s=a("./node_modules/react-emotion/dist/index.esm.js"),r=Object(s.a)("display:flex;> .ztopia-switch{margin-right:20px;&:last-child{margin-right:0;}}"),l=a("./node_modules/@babel/runtime/helpers/classCallCheck.js"),d=a.n(l),p=a("./node_modules/@babel/runtime/helpers/createClass.js"),h=a.n(p),m=a("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"),u=a.n(m),w=a("./node_modules/@babel/runtime/helpers/getPrototypeOf.js"),b=a.n(w),f=a("./node_modules/@babel/runtime/helpers/inherits.js"),k=a.n(f),g=a("./node_modules/emotion-theming/dist/index.esm.js"),x=a("./src/components/loader/Loader.tsx"),T=a("./src/components/ztopia-themes.ts"),S={Basic:{color:T.a.Basic.Color.DARK_LIGHT,backgroundColor:"transparent",borderColor:T.a.Basic.Color.DARK_LIGHT,transition:T.a.Basic.Animation.TRANSITION,"&.checked":{backgroundColor:T.a.Basic.Color.LIGHT,borderColor:T.a.Basic.Color.DARK,"> .ztopia-switch-checked-text":{color:T.a.Basic.Color.DARK},"> .ztopia-switch-button":{backgroundColor:T.a.Basic.Color.DARK}},"&.loading":{"> .ztopia-loader":{borderTopColor:T.a.Basic.Color.DARK_LIGHT}},"&[disabled]":{borderColor:T.a.Basic.Color.DARK_LIGHT,"> .ztopia-switch-button":{backgroundColor:T.a.Basic.Color.DARK_LIGHT,borderColor:T.a.Basic.Color.DARK_LIGHT}},"> .ztopia-switch-checked-text":{transition:T.a.Basic.Animation.TRANSITION},"> .ztopia-switch-button":{backgroundColor:T.a.Basic.Color.DARK_LIGHT,transition:T.a.Basic.Animation.TRANSITION},"> .ztopia-switch-unchecked-text":{transition:T.a.Basic.Animation.TRANSITION}},Space:{}},C=Object(s.c)("div",{target:"e14xj0rr0"})({width:"55px",height:"30px",border:"2px solid",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative","&.checked":{"> .ztopia-switch-checked-text":{opacity:1},"> .ztopia-switch-button":{left:"100%",transform:"translateX(calc(-100% - 2px))"},"> .ztopia-switch-unchecked-text":{opacity:0}},"&.loading":{cursor:"not-allowed","> .ztopia-switch-checked-text, > .ztopia-switch-button, > .ztopia-switch-unchecked-text":{display:"none"},"> .ztopia-loader":{width:"20px",height:"20px"}},"&[disabled]":{cursor:"not-allowed"},"> .ztopia-switch-checked-text":{position:"absolute",left:"5px",opacity:0},"> .ztopia-switch-button":{width:"22px",height:"22px",left:"2px",position:"absolute"},"> .ztopia-switch-unchecked-text":{position:"absolute",right:"5px",opacity:1}},function(e){var t=e.ztopiaTheme;return t&&Object(T.b)(t)?S[t]:{}}),y=function(e){function t(e){var a;d()(this,t),(a=u()(this,b()(t).call(this,e))).handleClickSwitch=function(){var e=a.props,t=e.loading,n=e.disabled,o=e.onSwitch,c=a.state.checked;if(!n&&!t){var i=!c;a.setState({checked:i}),o&&o(i)}};var n=e.defaultChecked;return a.state={checked:n||!1},a}return k()(t,e),h()(t,[{key:"render",value:function(){var e=this.props,t=e.ztopiaTheme,a=e.checkedText,o=e.uncheckedText,c=e.loading,i=e.disabled,r=e.className,l=this.state.checked,d=Object(s.b)("ztopia-switch",l&&"checked",c&&"loading",r);return n.createElement(g.a,{theme:S},n.createElement(C,{ztopiaTheme:t,className:d,disabled:i,onClick:this.handleClickSwitch},a&&n.createElement("span",{className:"ztopia-switch-checked-text"},a),c&&n.createElement(x.a,null),n.createElement("div",{className:"ztopia-switch-button"}),o&&n.createElement("span",{className:"ztopia-switch-unchecked-text"},o)))}}]),t}(n.Component);y.defaultProps={ztopiaTheme:"Basic",defaultChecked:!1,loading:!1,disabled:!1};var _=y;try{y.displayName="Switch",y.__docgenInfo={description:"",displayName:"Switch",props:{ztopiaTheme:{defaultValue:{value:"Basic"},description:"All Ztopia themes can be found in Design section.",name:"ztopiaTheme",required:!1,type:{name:"string"}},defaultChecked:{defaultValue:{value:"false"},description:"Default checked state.",name:"defaultChecked",required:!1,type:{name:"boolean"}},checkedText:{defaultValue:null,description:"Text to be shown when the state is checked.",name:"checkedText",required:!1,type:{name:"string"}},uncheckedText:{defaultValue:null,description:"Text to be shown when the state is unchecked.",name:"uncheckedText",required:!1,type:{name:"string"}},loading:{defaultValue:{value:"false"},description:"Set switch loading state.",name:"loading",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},onSwitch:{defaultValue:null,description:"A callback function triggered when the checked state is switching.",name:"onSwitch",required:!1,type:{name:"(checked: boolean) => void"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/switch/Switch.tsx#Switch"]={docgenInfo:y.__docgenInfo,name:"Switch",path:"src/components/switch/Switch.tsx#Switch"})}catch(e){}function z(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}t.default=function(e){var t=e.components,a=z(e,["components"]);return o.a.createElement(c.MDXTag,{name:"wrapper",components:t},o.a.createElement(c.MDXTag,{name:"h1",components:t,props:{id:"switch"}},o.a.createElement(c.MDXTag,{name:"a",components:t,parentName:"h1",props:{"aria-hidden":!0,href:"#switch"}},o.a.createElement(c.MDXTag,{name:"span",components:t,parentName:"a",props:{className:"icon-link"}},"#")),"Switch"),o.a.createElement(c.MDXTag,{name:"h2",components:t,props:{id:"api"}},o.a.createElement(c.MDXTag,{name:"a",components:t,parentName:"h2",props:{"aria-hidden":!0,href:"#api"}},o.a.createElement(c.MDXTag,{name:"span",components:t,parentName:"a",props:{className:"icon-link"}},"#")),"API"),o.a.createElement(i.e,{of:_}),o.a.createElement(c.MDXTag,{name:"h2",components:t,props:{id:"basic-switch"}},o.a.createElement(c.MDXTag,{name:"a",components:t,parentName:"h2",props:{"aria-hidden":!0,href:"#basic-switch"}},o.a.createElement(c.MDXTag,{name:"span",components:t,parentName:"a",props:{className:"icon-link"}},"#")),"Basic Switch"),o.a.createElement(i.d,{__position:1,__code:'<Switch defaultChecked />\n<Switch checkedText="On" uncheckedText="Off" />\n<Switch loading />\n<Switch disabled />\n<Switch\n  onSwitch={checked => {\n    console.log(\'Switch to\', checked)\n  }}\n/>',__scope:{props:a,playgroundStyle:r,Switch:_},className:r},o.a.createElement(_,{defaultChecked:!0}),o.a.createElement(_,{checkedText:"On",uncheckedText:"Off"}),o.a.createElement(_,{loading:!0}),o.a.createElement(_,{disabled:!0}),o.a.createElement(_,{onSwitch:function(e){console.log("Switch to",e)}})))}}}]);