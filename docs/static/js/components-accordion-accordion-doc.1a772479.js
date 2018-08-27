(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"./src/components/accordion/accordion-doc.mdx":function(e,n,t){"use strict";t.r(n);var a=t("./node_modules/react/index.js"),o=t.n(a),i=t("./node_modules/@mdx-js/tag/dist/index.js"),r=t("./node_modules/docz/dist/index.m.js"),l=t("./node_modules/@babel/runtime/helpers/objectSpread.js"),s=t.n(l),p=t("./node_modules/@babel/runtime/helpers/classCallCheck.js"),c=t.n(p),m=t("./node_modules/@babel/runtime/helpers/createClass.js"),u=t.n(m),d=t("./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"),h=t.n(d),g=t("./node_modules/@babel/runtime/helpers/getPrototypeOf.js"),f=t.n(g),b=t("./node_modules/@babel/runtime/helpers/inherits.js"),v=t.n(b),y=t("./node_modules/emotion-theming/dist/index.esm.js"),E=t("./node_modules/react-emotion/dist/index.esm.js"),C=t("./src/components/ztopia-themes.ts"),x={Basic:{"> .ztopia-panel":{"> .ztopia-panel-header":{color:C.a.Basic.Color.LIGHT,backgroundColor:C.a.Basic.Color.DARK,borderColor:C.a.Basic.Color.DARK},"> .ztopia-panel-content":{}}},Space:{}},T=t("./node_modules/@babel/runtime/helpers/extends.js"),P=t.n(T),O=t("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"),S=t.n(O),_=function(e){return a.createElement("svg",{"aria-hidden":"true",className:"chevron-left",role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 320 512"},a.createElement("path",{fill:"currentColor",d:"M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"}))},w=_;try{_.displayName="ChevronLeft",_.__docgenInfo={description:"",displayName:"ChevronLeft",props:{}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/icons/ChevronLeft.tsx#ChevronLeft"]={docgenInfo:_.__docgenInfo,name:"ChevronLeft",path:"src/icons/ChevronLeft.tsx#ChevronLeft"})}catch(e){}var A=function(e){function n(e){var t;return c()(this,n),(t=h()(this,f()(n).call(this,e))).panelContentRefs={},t.expandContent=function(e){var n=e?t.calcPanelContentHeight():0;t.setState({maxPanelContentHeight:n})},t.calcPanelContentHeight=function(){return Object.keys(t.panelContentRefs).reduce(function(e,n){var a=t.panelContentRefs[n].current;e+=a.clientHeight;var o=window.getComputedStyle(a).getPropertyValue("margin-top");e+=parseInt(o,10);var i=window.getComputedStyle(a).getPropertyValue("margin-bottom");return e+=parseInt(i,10)},0)},t.validateChild=function(e){if(!a.isValidElement(e))throw new Error("".concat(e," is not a valid React element. Try wrapping it inside a tag."))},t.state={maxPanelContentHeight:0},t}return v()(n,e),u()(n,[{key:"render",value:function(){var e=this,n=this.props,t=n.header,o=n.open,i=n.panelKey,r=n.togglePanel,l=n.className,s=n.children,p=S()(n,["header","open","panelKey","togglePanel","className","children"]),c=this.state.maxPanelContentHeight,m=Object(E.b)("ztopia-panel",o&&"active",l);return a.createElement("li",P()({className:m},p,{key:i}),a.createElement("header",{className:"ztopia-panel-header",onClick:r&&function(e){return r(e,i)}},t,a.createElement(w,null)),a.createElement("div",{className:"ztopia-panel-content",style:{maxHeight:c}},a.Children.map(s,function(n,t){return e.validateChild(n),a.cloneElement(n,{ref:e.panelContentRefs[t]})})))}},{key:"componentWillMount",value:function(){var e=this,n=this.props.children;a.Children.forEach(n,function(n,t){e.panelContentRefs[t]=a.createRef()})}},{key:"componentDidMount",value:function(){var e=this.props.open;this.expandContent(e)}},{key:"componentDidUpdate",value:function(e){e.open!==this.props.open&&this.expandContent(this.props.open)}}]),n}(a.Component);A.defaultProps={open:!1};var N=A;try{A.displayName="Panel",A.__docgenInfo={description:"",displayName:"Panel",props:{header:{defaultValue:null,description:"Title of the panel.",name:"header",required:!0,type:{name:"string"}},panelKey:{defaultValue:null,description:"Unique key identifying the panel from among its siblings.",name:"panelKey",required:!0,type:{name:"string"}},togglePanel:{defaultValue:null,description:"A function that toggles panel active state and is triggered when accordion panel header is clicked.",name:"togglePanel",required:!1,type:{name:"(e: MouseEvent<HTMLElement>, panelKey: string) => void"}},open:{defaultValue:{value:"false"},description:"Setting to true will open this panel.",name:"open",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/accordion/Panel.tsx#Panel"]={docgenInfo:A.__docgenInfo,name:"Panel",path:"src/components/accordion/Panel.tsx#Panel"})}catch(e){}var L=Object(E.c)("ul",{target:"e148fvxy0"})({width:"100%",padding:"0",margin:"0",listStyle:"none",border:"2px solid","> .ztopia-panel":{"&:last-child":{"> .ztopia-panel-content":{"> p, > div":{marginBottom:"10px"}}},"&:not(:last-child)":{marginBottom:"2px"},"&.active > .ztopia-panel-header > .chevron-left":{transform:"rotate(-90deg)"},"> .ztopia-panel-header":{padding:"10px",cursor:"pointer",position:"relative",display:"flex",alignItems:"center","> .chevron-left":{width:"10px",position:"absolute",right:"10px",transition:"all 0.5s ease"}},"> .ztopia-panel-content":{overflow:"hidden",transition:"all 0.5s ease","> p, > div":{margin:"10px","&:last-child":{marginBottom:"8px"}}}}},function(e){var n=e.ztopiaTheme;return n&&Object(C.b)(n)?x[n]:{}}),I=function(e){function n(e){var t;return c()(this,n),(t=h()(this,f()(n).call(this,e))).initPanelToggleStates=function(){var e=t.props,n=e.children,o=e.defaultOpenAll;return t.validateChildrenQuantity(n),a.Children.toArray(n).reduce(function(e,n){t.validateChildType(n),t.validateChildProps(n);var a=n.props,i=a.panelKey,r=a.open;return e[i]=r||o||!1,e},{})},t.validateChildrenQuantity=function(e){if(!e)throw new Error("No children found. Please create at lease one Panel element under Accordion.")},t.validateChildType=function(e){if(!a.isValidElement(e))throw new Error("".concat(e," is not a valid React element. Try wrapping it inside a Panel element."));if("string"===typeof e.type||e.type&&e.type instanceof N)throw new Error("Element type ".concat(e.type," is not supported. Please wrap it inside a Panel element."))},t.validateChildProps=function(e){if(!e.props.panelKey)throw new Error("panelKey is a required props for Panel.")},t.togglePanel=function(e,n){e.preventDefault();var a=t.props.multiOpen,o=t.state.panelToggleStates,i=s()({},o);a||Object.keys(i).forEach(function(e){i[e]=!1}),i[n]=!o[n],t.setState({panelToggleStates:i})},t.state={panelToggleStates:{}},t}return v()(n,e),u()(n,[{key:"render",value:function(){var e=this,n=this.props,t=n.ztopiaTheme,o=n.className,i=n.children,r=this.state.panelToggleStates,l=Object(E.b)("ztopia-accordion",o);return a.createElement(y.a,{theme:x},a.createElement(L,{ztopiaTheme:t,className:l},a.Children.map(i,function(n){var t=n.props,o=t.panelKey,i=t.togglePanel;return a.cloneElement(n,{open:r[o],togglePanel:i||e.togglePanel})})))}},{key:"componentWillMount",value:function(){var e=this.initPanelToggleStates();this.setState({panelToggleStates:e})}}]),n}(a.Component);I.defaultProps={ztopiaTheme:"Basic",multiOpen:!1,defaultOpenAll:!1};var j=I;try{I.displayName="Accordion",I.__docgenInfo={description:"",displayName:"Accordion",props:{ztopiaTheme:{defaultValue:{value:"Basic"},description:"All Ztopia themes can be found in Introduction section.",name:"ztopiaTheme",required:!1,type:{name:"string"}},multiOpen:{defaultValue:{value:"false"},description:"Allow multiple panels to be opened simultaneously.",name:"multiOpen",required:!1,type:{name:"boolean"}},defaultOpenAll:{defaultValue:{value:"false"},description:"Start with all panels open or closed.",name:"defaultOpenAll",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/accordion/Accordion.tsx#Accordion"]={docgenInfo:I.__docgenInfo,name:"Accordion",path:"src/components/accordion/Accordion.tsx#Accordion"})}catch(e){}function q(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}n.default=function(e){var n=e.components,t=q(e,["components"]);return o.a.createElement(i.MDXTag,{name:"wrapper",components:n},o.a.createElement(i.MDXTag,{name:"h1",components:n,props:{id:"accordion"}},o.a.createElement(i.MDXTag,{name:"a",components:n,parentName:"h1",props:{"aria-hidden":!0,href:"#accordion"}},o.a.createElement(i.MDXTag,{name:"span",components:n,parentName:"a",props:{className:"icon-link"}},"#")),"Accordion"),o.a.createElement(i.MDXTag,{name:"h2",components:n,props:{id:"api"}},o.a.createElement(i.MDXTag,{name:"a",components:n,parentName:"h2",props:{"aria-hidden":!0,href:"#api"}},o.a.createElement(i.MDXTag,{name:"span",components:n,parentName:"a",props:{className:"icon-link"}},"#")),"API"),o.a.createElement(i.MDXTag,{name:"h3",components:n,props:{id:"accordion-1"}},o.a.createElement(i.MDXTag,{name:"a",components:n,parentName:"h3",props:{"aria-hidden":!0,href:"#accordion-1"}},o.a.createElement(i.MDXTag,{name:"span",components:n,parentName:"a",props:{className:"icon-link"}},"#")),"Accordion"),o.a.createElement(r.e,{of:j}),o.a.createElement(i.MDXTag,{name:"h3",components:n,props:{id:"panel"}},o.a.createElement(i.MDXTag,{name:"a",components:n,parentName:"h3",props:{"aria-hidden":!0,href:"#panel"}},o.a.createElement(i.MDXTag,{name:"span",components:n,parentName:"a",props:{className:"icon-link"}},"#")),"Panel"),o.a.createElement(r.e,{of:N}),o.a.createElement(i.MDXTag,{name:"h2",components:n,props:{id:"basic-accordion"}},o.a.createElement(i.MDXTag,{name:"a",components:n,parentName:"h2",props:{"aria-hidden":!0,href:"#basic-accordion"}},o.a.createElement(i.MDXTag,{name:"span",components:n,parentName:"a",props:{className:"icon-link"}},"#")),"Basic Accordion"),o.a.createElement(r.d,{__position:2,__code:'<Accordion multiOpen>\n  <Panel header="Header 1" panelKey="header-1" open>\n    <p>\n      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum\n      magni eius aliquam est aut, hic id, labore odit odio nostrum\n      voluptatibus unde eos, ea libero corporis minima explicabo voluptatum.\n    </p>\n    <p>\n      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum\n      magni eius aliquam est aut, hic id, labore odit odio nostrum\n      voluptatibus unde eos, ea libero corporis minima explicabo voluptatum.\n    </p>\n  </Panel>\n  <Panel header="Header 2" panelKey="header-2">\n    <p>\n      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum\n      magni eius aliquam est aut, hic id, labore odit odio nostrum\n      voluptatibus unde eos, ea libero corporis minima explicabo voluptatum.\n    </p>\n    <p>\n      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum\n      magni eius aliquam est aut, hic id, labore odit odio nostrum\n      voluptatibus unde eos, ea libero corporis minima explicabo voluptatum.\n    </p>\n    <p>\n      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum\n      magni eius aliquam est aut, hic id, labore odit odio nostrum\n      voluptatibus unde eos, ea libero corporis minima explicabo voluptatum.\n    </p>\n    <p>\n      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum\n      magni eius aliquam est aut, hic id, labore odit odio nostrum\n      voluptatibus unde eos, ea libero corporis minima explicabo voluptatum.\n    </p>\n    <p>\n      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum\n      magni eius aliquam est aut, hic id, labore odit odio nostrum\n      voluptatibus unde eos, ea libero corporis minima explicabo voluptatum.\n    </p>\n  </Panel>\n</Accordion>',__scope:{props:t,Accordion:j,Panel:N}},o.a.createElement(j,{multiOpen:!0},o.a.createElement(N,{header:"Header 1",panelKey:"header-1",open:!0},o.a.createElement("p",null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum magni eius aliquam est aut, hic id, labore odit odio nostrum voluptatibus unde eos, ea libero corporis minima explicabo voluptatum."),o.a.createElement("p",null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum magni eius aliquam est aut, hic id, labore odit odio nostrum voluptatibus unde eos, ea libero corporis minima explicabo voluptatum.")),o.a.createElement(N,{header:"Header 2",panelKey:"header-2"},o.a.createElement("p",null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum magni eius aliquam est aut, hic id, labore odit odio nostrum voluptatibus unde eos, ea libero corporis minima explicabo voluptatum."),o.a.createElement("p",null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum magni eius aliquam est aut, hic id, labore odit odio nostrum voluptatibus unde eos, ea libero corporis minima explicabo voluptatum."),o.a.createElement("p",null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum magni eius aliquam est aut, hic id, labore odit odio nostrum voluptatibus unde eos, ea libero corporis minima explicabo voluptatum."),o.a.createElement("p",null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum magni eius aliquam est aut, hic id, labore odit odio nostrum voluptatibus unde eos, ea libero corporis minima explicabo voluptatum."),o.a.createElement("p",null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rerum magni eius aliquam est aut, hic id, labore odit odio nostrum voluptatibus unde eos, ea libero corporis minima explicabo voluptatum.")))))}}}]);