import{r as I,G as D,b,U as T,O as S,c as _,_ as w,B as u,W as E,$ as A,M as W}from"./q-e9d9a766.js";const O='((s,a,i,r)=>{i=(e,t)=>{t=document.querySelector("[q\\\\:base]"),t&&a.active&&a.active.postMessage({type:"qprefetch",base:t.getAttribute("q:base"),...e})},document.addEventListener("qprefetch",e=>{const t=e.detail;a?i(t):t.bundles&&s.push(...t.bundles)}),navigator.serviceWorker.register("/permacultr/service-worker.js").then(e=>{r=()=>{a=e,i({bundles:s})},e.installing?e.installing.addEventListener("statechange",t=>{t.target.state=="activated"&&r()}):e.active&&r()}).catch(e=>console.error(e))})([])',tt=u("qc-s"),et=u("qc-c"),st=u("qc-ic"),j=u("qc-h"),U=u("qc-l"),B=u("qc-n"),nt=u("qc-a"),rt=u("qc-ir"),ot=_(()=>w(()=>import("./q-61e731e2.js"),[]),"s_DyVc0YBIqQU"),at=()=>{},it=S(_(()=>w(()=>import("./q-e6d12ec7.js"),["build/q-e6d12ec7.js","build/q-e9d9a766.js"]),"s_e0ssiDXoeAM")),P=new WeakMap,g=new Map,M="qaction",ct=(t,e,n,s)=>{const r=Q(),a={head:r,withLocale:o=>E(s,o),resolveValue:o=>{const i=o.__id;if(o.__brand==="server_loader"&&!(i in t.loaders))throw new Error("You can not get the returned data of a loader that has not been executed for this request.");const f=t.loaders[i];if(f instanceof Promise)throw new Error("Loaders returning a function can not be referred to in the head function.");return f},...e};for(let o=n.length-1;o>=0;o--){const i=n[o]&&n[o].head;i&&(typeof i=="function"?k(r,E(s,()=>i(a))):typeof i=="object"&&k(r,i))}return a.head},k=(t,e)=>{typeof e.title=="string"&&(t.title=e.title),m(t.meta,e.meta),m(t.links,e.links),m(t.styles,e.styles),Object.assign(t.frontmatter,e.frontmatter)},m=(t,e)=>{if(Array.isArray(e))for(const n of e){if(typeof n.key=="string"){const s=t.findIndex(r=>r.key===n.key);if(s>-1){t[s]=n;continue}}t.push(n)}},Q=()=>({title:"",meta:[],links:[],styles:[],frontmatter:{}}),lt=async(t,e,n,s)=>{if(Array.isArray(t))for(const r of t){const c=r[0].exec(s);if(c){const a=r[1],o=F(r[2],c),i=r[4],f=new Array(a.length),h=[],v=V(e,s);let y;return a.forEach((l,C)=>{x(l,h,R=>f[C]=R,n)}),x(v,h,l=>y=l==null?void 0:l.default,n),h.length>0&&await Promise.all(h),[o,f,y,i]}}return null},x=(t,e,n,s)=>{if(typeof t=="function"){const r=P.get(t);if(r)n(r);else{const c=t();typeof c.then=="function"?e.push(c.then(a=>{s!==!1&&P.set(t,a),n(a)})):c&&n(c)}}},V=(t,e)=>{if(t){e=e.endsWith("/")?e:e+"/";const n=t.find(s=>s[0]===e||e.startsWith(s[0]+(e.endsWith("/")?"":"/")));if(n)return n[1]}},F=(t,e)=>{const n={};if(t)for(let s=0;s<t.length;s++){const r=(e==null?void 0:e[s+1])??"",c=r.endsWith("/")?r.slice(0,-1):r;n[t[s]]=decodeURIComponent(c)}return n},p=t=>t.pathname+t.search+t.hash,d=(t,e)=>new URL(t,e.href),H=(t,e)=>t.origin===e.origin,L=(t,e)=>t.pathname+t.search===e.pathname+e.search,N=(t,e)=>t.pathname===e.pathname,z=(t,e)=>t.search===e.search,Y=(t,e,n)=>{let s=e??"";return n&&(s+=(s?"&":"?")+M+"="+encodeURIComponent(n.id)),t+(t.endsWith("/")?"":"/")+"q-data.json"+s},ft=(t,e)=>{const n=t.href;if(typeof n=="string"&&typeof t.target!="string")try{const s=d(n.trim(),e.url),r=d("",e.url);if(H(s,r))return p(s)}catch(s){console.error(s)}else if(t.reload)return p(d("",e.url));return null},ht=(t,e,n)=>{if(t.prefetch===!0&&e){const s=d(e,n.url),r=d("",n.url);if(!N(s,r)||!z(s,r))return""}return null},ut=(t,e,n,s,r=!1)=>{if(e!=="popstate"){const c=L(n,s),a=n.hash===s.hash;if(!c||!a){const o={_qCityScroll:G()};r?t.history.replaceState(o,"",p(s)):t.history.pushState(o,"",p(s))}}},G=()=>({x:0,y:0,w:0,h:0}),$=t=>{document.dispatchEvent(new CustomEvent("qprefetch",{detail:t}))},J=async(t,e,n,s)=>{const r=t.pathname,c=t.search,a=Y(r,c,s);let o;if(s||(o=g.get(a)),$({links:[r]}),!o){const i=K(s);s&&(s.data=void 0),o=fetch(a,i).then(f=>{const h=new URL(f.url),v=h.pathname.endsWith("/q-data.json");if(h.origin!==location.origin||!v){location.href=h.href;return}if((f.headers.get("content-type")||"").includes("json"))return f.text().then(y=>{const l=I(y,e);if(!l){location.href=t.href;return}if(n&&g.delete(a),l.redirect)location.href=l.redirect;else if(s){const C=l.loaders[s.id];s.resolve({status:f.status,result:C})}return l});location.href=t.href}),s||g.set(a,o)}return o.then(i=>(i||g.delete(a),i))},K=t=>{const e=t==null?void 0:t.data;if(e)return e instanceof FormData?{method:"POST",body:e}:{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json, charset=UTF-8"}}},dt=()=>D(j),yt=()=>D(U),gt=()=>D(B),pt=()=>b(T("qwikcity")),_t=(t,e,n,s)=>{t==="popstate"&&s?window.scrollTo(s.x,s.y):t==="link"&&(X(e,n)||window.scrollTo(0,0))},X=(t,e)=>{const n=t.hash.slice(1),s=n&&document.getElementById(n);return s?(s.scrollIntoView(),!0):!!(!s&&t.hash&&L(t,e))},wt=t=>({x:t.scrollLeft,y:t.scrollTop,w:Math.max(t.scrollWidth,t.clientWidth),h:Math.max(t.scrollHeight,t.clientHeight)}),vt=()=>{const t=history.state;return t==null?void 0:t._qCityScroll},Ct=t=>{const e=history.state||{};e._qCityScroll=t,history.replaceState(e,"")},mt=S(_(()=>w(()=>import("./q-e6777297.js"),["build/q-e6777297.js","build/q-e9d9a766.js"]),"s_TxCFOy819ag")),qt=S(_(()=>w(()=>import("./q-43fe5c4b.js"),["build/q-43fe5c4b.js","build/q-e9d9a766.js"]),"s_8gdLBszqbaM")),Dt=(t,e)=>{t&&t.href&&t.hasAttribute("data-prefetch")&&(q||(q=innerWidth),(!e||e&&q<520)&&J(new URL(t.href),t))};let q=0;const St=t=>A("script",{nonce:W(t,"nonce")},{dangerouslySetInnerHTML:O},null,3,"1Z_0"),Et=async function*(t,e,n){const s=t.getReader();try{let r="";const c=new TextDecoder;for(;!(n!=null&&n.aborted);){const a=await s.read();if(a.done)break;r+=c.decode(a.value,{stream:!0});const o=r.split(/\n/);r=o.pop();for(const i of o)yield await I(i,e)}}finally{s.releaseLock()}};export{at as A,it as B,et as C,j as D,Et as E,Dt as F,qt as L,mt as Q,U as R,St as S,yt as a,ht as b,Q as c,st as d,B as e,tt as f,ft as g,nt as h,rt as i,H as j,L as k,vt as l,J as m,lt as n,N as o,ct as p,g as q,_t as r,Ct as s,d as t,gt as u,wt as v,ot as w,ut as x,pt as y,dt as z};