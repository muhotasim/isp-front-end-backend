"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[646],{7646:function(e,t,n){n.r(t);var r=n(4165),a=n(5861),o=n(9439),i=n(8374),u=n(1095),s=n(6106),c=n(914),p=n(940),l=n(3734),d=n(881),f=n(7309),h=n(2791),Z=n(7689),m=n(8113),v=n(9136),x=n(9085),y=n(3365),g=n(577),j=n(5282),w=n.n(j),b=n(184);t.default=function(){var e=(0,Z.UO)().id,t=(0,h.useRef)(),n=(0,h.useRef)(null),j=(0,h.useState)(!1),P=(0,o.Z)(j,2),_=P[0],k=P[1],C=(0,h.useState)([]),A=(0,o.Z)(C,2),L=A[0],R=A[1],T=(0,Z.s0)(),z=function(){var t=(0,a.Z)((0,r.Z)().mark((function t(n){var a,o,i,u,s;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.status=n.status?1:0,n.no_follow=n.no_follow?1:0,n.no_index=n.no_index?1:0,n.type=n.type?n.type:"user_created",k(!0),t.prev=5,t.next=8,(0,v.ku)({page_id:e});case 8:if(!e){t.next=14;break}return t.next=11,(0,m.Vx)(e,n);case 11:o=t.sent,t.next=17;break;case 14:return t.next=16,(0,m.Ue)(n);case 16:o=t.sent;case 17:if(i=o.data,u=null!==(a=i.data.id)&&void 0!==a?a:e,s=n.sections?n.sections.map((function(e,t){return{section_id:e,page_id:u,serial:t}})):[],x.Am.success(null===i||void 0===i?void 0:i.message,{position:"top-right",theme:"dark"}),!s.length){t.next=24;break}return t.next=24,(0,v.$T)(JSON.stringify(s));case 24:k(!1),T("/pages"),t.next=31;break;case 28:t.prev=28,t.t0=t.catch(5),(0,g.Z)(t.t0,(function(){k(!1)}));case 31:case"end":return t.stop()}}),t,null,[[5,28]])})));return function(e){return t.apply(this,arguments)}}(),B=function(){var n=(0,a.Z)((0,r.Z)().mark((function n(){var a,o,i,u;return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return k(!0),n.prev=1,n.next=4,(0,m.U2)(e);case 4:a=n.sent,(o=a.data).data.sections=o.data.sections.filter((function(e){return null!=e.value})).sort((function(e,t){return e.serial-t.serial})),t.current.setFieldsValue(o.data),x.Am.success(null===o||void 0===o?void 0:o.message,{position:"top-right",theme:"dark"}),k(!1),n.next=17;break;case 12:n.prev=12,n.t0=n.catch(1),(u=null===n.t0||void 0===n.t0||null===(i=n.t0.response)||void 0===i?void 0:i.data)&&x.Am.error(u.message,{position:"top-right",theme:"dark"}),k(!1);case 17:case"end":return n.stop()}}),n,null,[[1,12]])})));return function(){return n.apply(this,arguments)}}(),I=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var t,n,a,o=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=o.length>0&&void 0!==o[0]?o[0]:null,e.prev=1,e.next=4,(0,v.$6)();case 4:n=e.sent,a=n.data,R(a.data.data.map((function(e){return{label:e.title,value:e.id}}))),t&&t(),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),(0,g.Z)(e.t0,(function(){return k(!1)}));case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}();return(0,h.useEffect)((function(){I((function(){e&&B()}))}),[]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(i.Z,{className:"site-page-header",title:"".concat(e?"Update":"Create"," Page")}),(0,b.jsxs)(u.Z,{className:"animated fadeIn",ref:t,disabled:_,name:"basic",layout:"vertical",onFinish:z,onFinishFailed:function(e){x.Am.warn("Please provide all the information currectly",{position:"top-right",theme:"dark"})},autoComplete:"off",children:[(0,b.jsxs)(s.Z,{gutter:15,children:[(0,b.jsxs)(c.Z,{lg:12,md:24,sm:24,xs:24,children:[(0,b.jsx)(u.Z.Item,{label:"Title",name:"title",rules:[{required:!0,message:"Please input your title"}],children:(0,b.jsx)(p.Z,{})}),(0,b.jsx)(u.Z.Item,{hidden:!0,label:"Type",name:"type",children:(0,b.jsx)(p.Z,{})}),(0,b.jsx)(u.Z.Item,{label:"Content Body",name:"content_body",rules:[{required:!0,message:"Please input your content body"}],children:(0,b.jsx)(w(),{ref:n,config:{toolbarAdaptive:!1,statusbar:!1,readonly:!1,placeholder:"Start typings..."},tabIndex:1})}),(0,b.jsx)(u.Z.Item,{label:"Sections",name:"sections",children:(0,b.jsx)(l.Z,{mode:"multiple",allowClear:!0,showSearch:!0,options:L,style:{width:"100%"},filterOption:function(e,t){var n;return(null!==(n=null===t||void 0===t?void 0:t.label.toLowerCase())&&void 0!==n?n:"").includes(e.toLowerCase())},filterSort:function(e,t){var n,r;return(null!==(n=null===e||void 0===e?void 0:e.label)&&void 0!==n?n:"").toLowerCase().localeCompare((null!==(r=null===t||void 0===t?void 0:t.label)&&void 0!==r?r:"").toLowerCase())},placeholder:"Please select sections for the list"})}),(0,b.jsx)(u.Z.Item,{label:"Status",name:"status",children:(0,b.jsxs)(d.ZP.Group,{children:[(0,b.jsx)(d.ZP,{value:1,children:"Active"}),(0,b.jsx)(d.ZP,{value:0,children:"Inactive"})]})})]}),(0,b.jsxs)(c.Z,{lg:12,md:24,sm:24,xs:24,children:[(0,b.jsx)(u.Z.Item,{label:"Meta Title",name:"meta_title",rules:[{required:!0,message:"Please input your Meta Title"}],children:(0,b.jsx)(p.Z,{})}),(0,b.jsx)(u.Z.Item,{label:"Meta Key",name:"meta_key",children:(0,b.jsx)(p.Z,{})}),(0,b.jsx)(u.Z.Item,{label:"Meta Description",name:"meta_description",children:(0,b.jsx)(p.Z.TextArea,{})}),(0,b.jsx)(u.Z.Item,{label:"No Follow",name:"no_follow",children:(0,b.jsxs)(d.ZP.Group,{children:[(0,b.jsx)(d.ZP,{value:1,children:"On"}),(0,b.jsx)(d.ZP,{value:0,children:"Off"})]})}),(0,b.jsx)(u.Z.Item,{label:"No Index",name:"no_index",children:(0,b.jsxs)(d.ZP.Group,{children:[(0,b.jsx)(d.ZP,{value:1,children:"On"}),(0,b.jsx)(d.ZP,{value:0,children:"Off"})]})})]})]}),(0,b.jsx)(u.Z.Item,{style:{float:"right"},children:(0,b.jsxs)(f.Z,{type:"primary",htmlType:"submit",children:[(0,b.jsx)(y.Z,{size:14})," ",(0,b.jsxs)("span",{style:{paddingLeft:"5px"},children:[" ",e?"Update":"Create"]})]})})]})]})}},577:function(e,t,n){var r=n(9085);t.Z=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if("ERR_NETWORK"==e.code)r.Am.error(e.message,{position:"top-right",theme:"dark"});else{var n,a=null===e||void 0===e||null===(n=e.response)||void 0===n?void 0:n.data;a&&r.Am.error(a.message,{position:"top-right",theme:"dark"})}t&&t()}},5570:function(e,t){t.Z={apiRoute:"http://localhost:4000/api/v1/",host:"http://localhost:4000"}},8113:function(e,t,n){n.d(t,{Kz:function(){return c},Od:function(){return f},U2:function(){return l},Ue:function(){return p},Vx:function(){return d}});var r=n(4165),a=n(5861),o=n(1044),i=n(5570),u=n(1070),s="page",c=function(e){var t=e.query,n=void 0===t?{}:t,r=e.perPage,a=void 0===r?20:r,c=e.page,p=void 0===c?1:c,l=e.getCount,d=void 0===l?1:l,f=new URLSearchParams;return Object.keys(n).forEach((function(e){f.append(e,n[e])})),f.append("perPage",a),f.append("page",p),f.append("getCount",d),new Promise((function(e,t){o.ZP.get(i.Z.apiRoute+s+"?"+f.toString(),{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}}).then((function(t){e(t)})).catch((function(e){t(e)}))}))},p=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){var n,a,c,p,l,d,f,h,Z;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.title,a=t.type,c=t.content_body,p=t.meta_title,l=t.meta_key,d=t.meta_description,f=t.no_follow,h=t.no_index,Z=t.status,e.next=3,o.ZP.put(i.Z.apiRoute+s,{title:n,type:a,content_body:c,meta_title:p,meta_key:l,meta_description:d,no_follow:f,no_index:h,status:Z},{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.ZP.get(i.Z.apiRoute+s+"/"+t,{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t,n){var a,c,p,l,d,f,h,Z,m;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.title,c=n.type,p=n.content_body,l=n.meta_title,d=n.meta_key,f=n.meta_description,h=n.no_follow,Z=n.no_index,m=n.status,e.next=3,o.ZP.patch(i.Z.apiRoute+s+"/"+t,{title:a,type:c,content_body:p,meta_title:l,meta_key:d,meta_description:f,no_follow:h,no_index:Z,status:m},{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),f=function(e){return new Promise((function(t,n){o.ZP.delete(i.Z.apiRoute+s+"/"+e,{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}}).then((function(e){t(e)})).catch((function(e){n(e)}))}))}},9136:function(e,t,n){n.d(t,{$6:function(){return p},$T:function(){return Z},Fo:function(){return d},Kz:function(){return c},Od:function(){return y},U2:function(){return v},Ue:function(){return h},Vx:function(){return x},id:function(){return l},ii:function(){return f},ku:function(){return m}});var r=n(4165),a=n(5861),o=n(1044),i=n(5570),u=n(1070),s="section",c=function(e){var t=e.query,n=void 0===t?{}:t,r=e.perPage,a=void 0===r?20:r,c=e.page,p=void 0===c?1:c,l=e.getCount,d=void 0===l?1:l,f=new URLSearchParams;return Object.keys(n).forEach((function(e){f.append(e,n[e])})),f.append("perPage",a),f.append("page",p),f.append("getCount",d),new Promise((function(e,t){o.ZP.get(i.Z.apiRoute+s+"?"+f.toString(),{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}}).then((function(t){e(t)})).catch((function(e){t(e)}))}))},p=function(){return new Promise((function(e,t){o.ZP.get(i.Z.apiRoute+s+"/all",{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}}).then((function(t){e(t)})).catch((function(e){t(e)}))}))},l=function(e){return new Promise((function(t,n){o.ZP.get(i.Z.apiRoute+"section-content?section_id="+e,{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}}).then((function(e){t(e)})).catch((function(e){n(e)}))}))},d=function(e){return new Promise((function(t,n){o.ZP.put(i.Z.apiRoute+"section-content/bulk",{contents:JSON.stringify(e)},{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}}).then((function(e){t(e)})).catch((function(e){n(e)}))}))},f=function(e){return new Promise((function(t,n){o.ZP.delete(i.Z.apiRoute+"section-content?section_id="+e,{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}}).then((function(e){t(e)})).catch((function(e){n(e)}))}))},h=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){var n,a,c,p;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.title,a=t.status,c=t.type,p=t.name,e.next=3,o.ZP.put(i.Z.apiRoute+s,{title:n,status:a,type:c,name:p},{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Z=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.ZP.put(i.Z.apiRoute+"page-section/bulk",{contents:t},{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){var n,a,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.page_id,a=t.section_id,s=new URLSearchParams,n&&s.append("page_id",n),a&&s.append("section_id",a),e.next=6,o.ZP.delete(i.Z.apiRoute+"page-section?"+s.toString(),{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}});case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.ZP.get(i.Z.apiRoute+s+"/"+t,{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t,n){var a,c,p,l;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.title,c=n.status,p=n.type,l=n.name,e.next=3,o.ZP.patch(i.Z.apiRoute+s+"/"+t,{title:a,status:c,type:p,name:l},{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),y=function(e){return new Promise((function(t,n){o.ZP.delete(i.Z.apiRoute+s+"/"+e,{headers:{Authorization:"Bearer "+(0,u.L)(),"Content-Type":"application/json"}}).then((function(e){t(e)})).catch((function(e){n(e)}))}))}},1070:function(e,t,n){n.d(t,{L:function(){return r}});var r=function(){return localStorage.getItem("token")}}}]);
//# sourceMappingURL=646.3ae6fa1d.chunk.js.map