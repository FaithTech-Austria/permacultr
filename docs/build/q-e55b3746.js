import{_ as g,l as F,s as G,b as at,U as st,N as T,f as it,I as V,Y as v,C as lt,h as ct,c as j,j as ut,Q as dt,g as _t,u as mt,p as pt}from"./q-5a7c5c7a.js";import{t as vt,j as K,k as N,r as Z,l as tt,m as et,n as Q,o as ft,c as yt,C as ht,d as St,D as Ct,R as Et,e as bt,f as wt,h as gt,i as qt,p as Rt,q as Lt,s as It,v as I,w,x as Pt,y as Dt}from"./q-acef2791.js";const At=":root{view-transition-name:none}";const $=()=>g(()=>import("./q-8fd2bdcc.js"),["build/q-8fd2bdcc.js","build/q-5a7c5c7a.js"]),W=[[/^\/permacultur\/$/,[$,()=>g(()=>import("./q-b6d62e72.js"),["build/q-b6d62e72.js","build/q-5a7c5c7a.js"])]],[/^\/permacultur\/([^/]+?)\/?$/,[$,()=>g(()=>import("./q-33e8637b.js"),["build/q-33e8637b.js","build/q-b6d62e72.js","build/q-5a7c5c7a.js"])],["name"]]],z=[];const J=!0;const kt=async(f,n)=>{const[y,S,s,C]=F(),{type:i="link",forceReload:_=f===void 0,replaceState:m=!1,scroll:E=!0}=typeof n=="object"?n:{forceReload:n},l=s.value.dest,o=f===void 0?l:vt(f,C.url);if(!K(o,l)){location.href=o.href;return}if(!_&&N(o,l)){i==="link"&&o.href!==location.href&&history.pushState(null,"",o),Z(i,o,new URL(location.href),tt()),i==="popstate"&&(window._qCityScrollEnabled=!0);return}return s.value={type:i,dest:o,forceReload:_,replaceState:m,scroll:E},et(o,G()),Q(W,z,J,o.pathname),y.value=void 0,C.isNavigating=!0,new Promise(b=>{S.r=b})},Tt=f=>{at(j(()=>g(()=>Promise.resolve().then(()=>M),void 0),"s_RPDJAz33WLA"));const n=ft();if(!(n!=null&&n.params))throw new Error("Missing Qwik City Env Data");const y=st("url");if(!y)throw new Error("Missing Qwik URL Env Data");const S=new URL(y),s=T({url:S,params:n.params,isNavigating:!1,prevUrl:void 0},{deep:!1}),C={},i=it(T(n.response.loaders,{deep:!1})),_=V({type:"initial",dest:S,forceReload:!1,replaceState:!1,scroll:!0}),m=T(yt),E=T({headings:void 0,menu:void 0}),l=V(),o=n.response.action,b=o?n.response.loaders[o]:void 0,u=V(b?{id:o,data:n.response.formData,output:{result:b,status:n.response.status}}:void 0),q=j(()=>g(()=>Promise.resolve().then(()=>M),void 0),"s_fX0bDjeJa0E",[u,C,_,s]);return v(ht,E),v(St,l),v(Ct,m),v(Et,s),v(bt,q),v(wt,i),v(gt,u),v(qt,_),lt(j(()=>g(()=>Promise.resolve().then(()=>M),void 0),"s_02wMImzEAbk",[u,E,l,m,n,q,i,C,f,_,s])),ct(ut,null,3,"qY_0")},Ut=({track:f})=>{const[n,y,S,s,C,i,_,m,E,l,o]=F();async function b(){var Y;const[u,q]=f(()=>[l.value,n.value]),ot=dt(""),P=o.url,p=q?"form":u.type,nt=u.replaceState;let r,R,U=null,O;{r=new URL(u.dest,location),r.pathname.endsWith("/")||(r.pathname+="/");let D=Q(W,z,J,r.pathname);O=G();const A=R=await et(r,O,!0,q);if(!A){l.untrackedValue={type:p,dest:r};return}const x=A.href,h=new URL(x,r);Rt(h,r)||(r=h,D=Q(W,z,J,r.pathname)),U=await D}if(U){const[D,A,x]=U,h=A,rt=h[h.length-1];o.prevUrl=P,o.url=r,o.params={...D},l.untrackedValue={type:p,dest:r};const L=Lt(R,o,h,ot);y.headings=rt.headings,y.menu=x,S.value=_t(h),s.links=L.links,s.meta=L.meta,s.styles=L.styles,s.title=L.title,s.frontmatter=L.frontmatter;{E.viewTransition!==!1&&(document.__q_view_transition__=!0);let B;p==="popstate"&&(B=tt()),u.scroll&&(!u.forceReload||!N(r,P))&&(p==="link"||p==="popstate")&&(document.__q_scroll_restore__=()=>Z(p,r,P,B));const X=R==null?void 0:R.loaders,t=window;if(X&&Object.assign(_,X),It.clear(),!t._qCitySPA){if(t._qCitySPA=!0,history.scrollRestoration="manual",t.addEventListener("popstate",()=>{t._qCityScrollEnabled=!1,clearTimeout(t._qCityScrollDebounce),i(location.href,{type:"popstate"})}),t.removeEventListener("popstate",t._qCityInitPopstate),t._qCityInitPopstate=void 0,!t._qCityHistoryPatch){t._qCityHistoryPatch=!0;const a=history.pushState,d=history.replaceState,k=e=>(e===null?e={}:(e==null?void 0:e.constructor)!==Object&&(e={_data:e}),e._qCityScroll=e._qCityScroll||w(document.documentElement),e);history.pushState=(e,c,H)=>(e=k(e),a.call(history,e,c,H)),history.replaceState=(e,c,H)=>(e=k(e),d.call(history,e,c,H))}document.body.addEventListener("click",a=>{if(a.defaultPrevented)return;const d=a.target.closest("a[href]");if(d&&!d.hasAttribute("preventdefault:click")){const k=d.getAttribute("href"),e=new URL(location.href),c=new URL(k,e);if(K(c,e)&&N(c,e)){if(a.preventDefault(),!c.hash&&!c.href.endsWith("#")){c.href!==e.href&&history.pushState(null,"",c),t._qCityScrollEnabled=!1,clearTimeout(t._qCityScrollDebounce),I({...w(document.documentElement),x:0,y:0}),location.reload();return}i(d.getAttribute("href"))}}}),document.body.removeEventListener("click",t._qCityInitAnchors),t._qCityInitAnchors=void 0,window.navigation||(document.addEventListener("visibilitychange",()=>{if(t._qCityScrollEnabled&&document.visibilityState==="hidden"){const a=w(document.documentElement);I(a)}},{passive:!0}),document.removeEventListener("visibilitychange",t._qCityInitVisibility),t._qCityInitVisibility=void 0),t.addEventListener("scroll",()=>{t._qCityScrollEnabled&&(clearTimeout(t._qCityScrollDebounce),t._qCityScrollDebounce=setTimeout(()=>{const a=w(document.documentElement);I(a),t._qCityScrollDebounce=void 0},200))},{passive:!0}),removeEventListener("scroll",t._qCityInitScroll),t._qCityInitScroll=void 0,(Y=t._qCityBootstrap)==null||Y.remove(),t._qCityBootstrap=void 0,Pt.resolve()}if(p!=="popstate"){t._qCityScrollEnabled=!1,clearTimeout(t._qCityScrollDebounce);const a=w(document.documentElement);I(a)}Dt(window,p,P,r,nt),mt(O).then(()=>{var d;const a=w(document.documentElement);I(a),t._qCityScrollEnabled=!0,o.isNavigating=!1,(d=m.r)==null||d.call(m)})}}}b()},M=Object.freeze(Object.defineProperty({__proto__:null,_hW:pt,s_02wMImzEAbk:Ut,s_RPDJAz33WLA:At,s_TxCFOy819ag:Tt,s_fX0bDjeJa0E:kt},Symbol.toStringTag,{value:"Module"}));export{pt as _hW,Ut as s_02wMImzEAbk,At as s_RPDJAz33WLA,Tt as s_TxCFOy819ag,kt as s_fX0bDjeJa0E};
