var oe=Object.defineProperty;var re=(t,n,e)=>n in t?oe(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var F=(t,n,e)=>(re(t,typeof n!="symbol"?n+"":n,e),e);import{c as _,_ as x,l as ct,I as ht,E as ie,h as pt,$ as p,w as gt,x as mt,p as se}from"./q-c9128614.js";import{m as ce}from"./q-bd9ac0b6.js";import{e as le}from"./q-3e7c6840.js";import{e as ue}from"./q-fdb49e41.js";import{s as ae}from"./q-0b9843bc.js";import"./q-da3270a7.js";/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 1.0.8
*/const Lt=Object.freeze({left:0,top:0,width:16,height:16}),Q=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),M=Object.freeze({...Lt,...Q}),Y=Object.freeze({...M,body:"",hidden:!1}),fe=Object.freeze({width:null,height:null}),Nt=Object.freeze({...fe,...Q});function de(t,n=0){const e=t.replace(/^-?[0-9.]*/,"");function r(o){for(;o<0;)o+=4;return o%4}if(e===""){const o=parseInt(t);return isNaN(o)?0:r(o)}else if(e!==t){let o=0;switch(e){case"%":o=25;break;case"deg":o=90}if(o){let i=parseFloat(t.slice(0,t.length-e.length));return isNaN(i)?0:(i=i/o,i%1===0?r(i):0)}}return n}const he=/[\s,]+/;function pe(t,n){n.split(he).forEach(e=>{switch(e.trim()){case"horizontal":t.hFlip=!0;break;case"vertical":t.vFlip=!0;break}})}const Rt={...Nt,preserveAspectRatio:""};function yt(t){const n={...Rt},e=(r,o)=>t.getAttribute(r)||o;return n.width=e("width",null),n.height=e("height",null),n.rotate=de(e("rotate","")),pe(n,e("flip","")),n.preserveAspectRatio=e("preserveAspectRatio",e("preserveaspectratio","")),n}function ge(t,n){for(const e in Rt)if(t[e]!==n[e])return!0;return!1}const E=/^[a-z0-9]+(-[a-z0-9]+)*$/,L=(t,n,e,r="")=>{const o=t.split(":");if(t.slice(0,1)==="@"){if(o.length<2||o.length>3)return null;r=o.shift().slice(1)}if(o.length>3||!o.length)return null;if(o.length>1){const l=o.pop(),c=o.pop(),u={provider:o.length>0?o[0]:r,prefix:c,name:l};return n&&!$(u)?null:u}const i=o[0],s=i.split("-");if(s.length>1){const l={provider:r,prefix:s.shift(),name:s.join("-")};return n&&!$(l)?null:l}if(e&&r===""){const l={provider:r,prefix:"",name:i};return n&&!$(l,e)?null:l}return null},$=(t,n)=>t?!!((t.provider===""||t.provider.match(E))&&(n&&t.prefix===""||t.prefix.match(E))&&t.name.match(E)):!1;function me(t,n){const e={};!t.hFlip!=!n.hFlip&&(e.hFlip=!0),!t.vFlip!=!n.vFlip&&(e.vFlip=!0);const r=((t.rotate||0)+(n.rotate||0))%4;return r&&(e.rotate=r),e}function bt(t,n){const e=me(t,n);for(const r in Y)r in Q?r in t&&!(r in e)&&(e[r]=Q[r]):r in n?e[r]=n[r]:r in t&&(e[r]=t[r]);return e}function ye(t,n){const e=t.icons,r=t.aliases||Object.create(null),o=Object.create(null);function i(s){if(e[s])return o[s]=[];if(!(s in o)){o[s]=null;const l=r[s]&&r[s].parent,c=l&&i(l);c&&(o[s]=[l].concat(c))}return o[s]}return(n||Object.keys(e).concat(Object.keys(r))).forEach(i),o}function be(t,n,e){const r=t.icons,o=t.aliases||Object.create(null);let i={};function s(l){i=bt(r[l]||o[l],i)}return s(n),e.forEach(s),bt(t,i)}function Ft(t,n){const e=[];if(typeof t!="object"||typeof t.icons!="object")return e;t.not_found instanceof Array&&t.not_found.forEach(o=>{n(o,null),e.push(o)});const r=ye(t);for(const o in r){const i=r[o];i&&(n(o,be(t,o,i)),e.push(o))}return e}const we={provider:"",aliases:{},not_found:{},...Lt};function K(t,n){for(const e in n)if(e in t&&typeof t[e]!=typeof n[e])return!1;return!0}function Dt(t){if(typeof t!="object"||t===null)return null;const n=t;if(typeof n.prefix!="string"||!t.icons||typeof t.icons!="object"||!K(t,we))return null;const e=n.icons;for(const o in e){const i=e[o];if(!o.match(E)||typeof i.body!="string"||!K(i,Y))return null}const r=n.aliases||Object.create(null);for(const o in r){const i=r[o],s=i.parent;if(!o.match(E)||typeof s!="string"||!e[s]&&!r[s]||!K(i,Y))return null}return n}const B=Object.create(null);function Ie(t,n){return{provider:t,prefix:n,icons:Object.create(null),missing:new Set}}function v(t,n){const e=B[t]||(B[t]=Object.create(null));return e[n]||(e[n]=Ie(t,n))}function lt(t,n){return Dt(n)?Ft(n,(e,r)=>{r?t.icons[e]=r:t.missing.add(e)}):[]}function _e(t,n,e){try{if(typeof e.body=="string")return t.icons[n]={...e},!0}catch{}return!1}function xe(t,n){let e=[];return(typeof t=="string"?[t]:Object.keys(B)).forEach(o=>{(typeof o=="string"&&typeof n=="string"?[n]:Object.keys(B[o]||{})).forEach(s=>{const l=v(o,s);e=e.concat(Object.keys(l.icons).map(c=>(o!==""?"@"+o+":":"")+s+":"+c))})}),e}let O=!1;function $t(t){return typeof t=="boolean"&&(O=t),O}function T(t){const n=typeof t=="string"?L(t,!0,O):t;if(n){const e=v(n.provider,n.prefix),r=n.name;return e.icons[r]||(e.missing.has(r)?null:void 0)}}function Vt(t,n){const e=L(t,!0,O);if(!e)return!1;const r=v(e.provider,e.prefix);return _e(r,e.name,n)}function wt(t,n){if(typeof t!="object")return!1;if(typeof n!="string"&&(n=t.provider||""),O&&!n&&!t.prefix){let o=!1;return Dt(t)&&(t.prefix="",Ft(t,(i,s)=>{s&&Vt(i,s)&&(o=!0)})),o}const e=t.prefix;if(!$({provider:n,prefix:e,name:"a"}))return!1;const r=v(n,e);return!!lt(r,t)}function ve(t){return!!T(t)}function Se(t){const n=T(t);return n?{...M,...n}:null}function Ce(t){const n={loaded:[],missing:[],pending:[]},e=Object.create(null);t.sort((o,i)=>o.provider!==i.provider?o.provider.localeCompare(i.provider):o.prefix!==i.prefix?o.prefix.localeCompare(i.prefix):o.name.localeCompare(i.name));let r={provider:"",prefix:"",name:""};return t.forEach(o=>{if(r.name===o.name&&r.prefix===o.prefix&&r.provider===o.provider)return;r=o;const i=o.provider,s=o.prefix,l=o.name,c=e[i]||(e[i]=Object.create(null)),u=c[s]||(c[s]=v(i,s));let a;l in u.icons?a=n.loaded:s===""||u.missing.has(l)?a=n.missing:a=n.pending;const f={provider:i,prefix:s,name:l};a.push(f)}),n}function Qt(t,n){t.forEach(e=>{const r=e.loaderCallbacks;r&&(e.loaderCallbacks=r.filter(o=>o.id!==n))})}function Ae(t){t.pendingCallbacksFlag||(t.pendingCallbacksFlag=!0,setTimeout(()=>{t.pendingCallbacksFlag=!1;const n=t.loaderCallbacks?t.loaderCallbacks.slice(0):[];if(!n.length)return;let e=!1;const r=t.provider,o=t.prefix;n.forEach(i=>{const s=i.icons,l=s.pending.length;s.pending=s.pending.filter(c=>{if(c.prefix!==o)return!0;const u=c.name;if(t.icons[u])s.loaded.push({provider:r,prefix:o,name:u});else if(t.missing.has(u))s.missing.push({provider:r,prefix:o,name:u});else return e=!0,!0;return!1}),s.pending.length!==l&&(e||Qt([t],i.id),i.callback(s.loaded.slice(0),s.missing.slice(0),s.pending.slice(0),i.abort))})}))}let ke=0;function Ee(t,n,e){const r=ke++,o=Qt.bind(null,e,r);if(!n.pending.length)return o;const i={id:r,icons:n,callback:t,abort:o};return e.forEach(s=>{(s.loaderCallbacks||(s.loaderCallbacks=[])).push(i)}),o}const tt=Object.create(null);function It(t,n){tt[t]=n}function et(t){return tt[t]||tt[""]}function Pe(t,n=!0,e=!1){const r=[];return t.forEach(o=>{const i=typeof o=="string"?L(o,n,e):o;i&&r.push(i)}),r}var Oe={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function Te(t,n,e,r){const o=t.resources.length,i=t.random?Math.floor(Math.random()*o):t.index;let s;if(t.random){let d=t.resources.slice(0);for(s=[];d.length>1;){const I=Math.floor(Math.random()*d.length);s.push(d[I]),d=d.slice(0,I).concat(d.slice(I+1))}s=s.concat(d)}else s=t.resources.slice(i).concat(t.resources.slice(0,i));const l=Date.now();let c="pending",u=0,a,f=null,h=[],g=[];typeof r=="function"&&g.push(r);function m(){f&&(clearTimeout(f),f=null)}function y(){c==="pending"&&(c="aborted"),m(),h.forEach(d=>{d.status==="pending"&&(d.status="aborted")}),h=[]}function z(d,I){I&&(g=[]),typeof d=="function"&&g.push(d)}function N(){return{startTime:l,payload:n,status:c,queriesSent:u,queriesPending:h.length,subscribe:z,abort:y}}function b(){c="failed",g.forEach(d=>{d(void 0,a)})}function w(){h.forEach(d=>{d.status==="pending"&&(d.status="aborted")}),h=[]}function ne(d,I,A){const R=I!=="success";switch(h=h.filter(S=>S!==d),c){case"pending":break;case"failed":if(R||!t.dataAfterTimeout)return;break;default:return}if(I==="abort"){a=A,b();return}if(R){a=A,h.length||(s.length?G():b());return}if(m(),w(),!t.random){const S=t.resources.indexOf(d.resource);S!==-1&&S!==t.index&&(t.index=S)}c="completed",g.forEach(S=>{S(A)})}function G(){if(c!=="pending")return;m();const d=s.shift();if(d===void 0){if(h.length){f=setTimeout(()=>{m(),c==="pending"&&(w(),b())},t.timeout);return}b();return}const I={status:"pending",resource:d,callback:(A,R)=>{ne(I,A,R)}};h.push(I),u++,f=setTimeout(G,t.rotate),e(d,n,I.callback)}return setTimeout(G),N}function Bt(t){const n={...Oe,...t};let e=[];function r(){e=e.filter(l=>l().status==="pending")}function o(l,c,u){const a=Te(n,l,c,(f,h)=>{r(),u&&u(f,h)});return e.push(a),a}function i(l){return e.find(c=>l(c))||null}return{query:o,find:i,setIndex:l=>{n.index=l},getIndex:()=>n.index,cleanup:r}}function ut(t){let n;if(typeof t.resources=="string")n=[t.resources];else if(n=t.resources,!(n instanceof Array)||!n.length)return null;return{resources:n,path:t.path||"/",maxURL:t.maxURL||500,rotate:t.rotate||750,timeout:t.timeout||5e3,random:t.random===!0,index:t.index||0,dataAfterTimeout:t.dataAfterTimeout!==!1}}const q=Object.create(null),k=["https://api.simplesvg.com","https://api.unisvg.com"],V=[];for(;k.length>0;)k.length===1||Math.random()>.5?V.push(k.shift()):V.push(k.pop());q[""]=ut({resources:["https://api.iconify.design"].concat(V)});function _t(t,n){const e=ut(n);return e===null?!1:(q[t]=e,!0)}function U(t){return q[t]}function je(){return Object.keys(q)}function xt(){}const J=Object.create(null);function Me(t){if(!J[t]){const n=U(t);if(!n)return;const e=Bt(n),r={config:n,redundancy:e};J[t]=r}return J[t]}function Ht(t,n,e){let r,o;if(typeof t=="string"){const i=et(t);if(!i)return e(void 0,424),xt;o=i.send;const s=Me(t);s&&(r=s.redundancy)}else{const i=ut(t);if(i){r=Bt(i);const s=t.resources?t.resources[0]:"",l=et(s);l&&(o=l.send)}}return!r||!o?(e(void 0,424),xt):r.query(n,o,e)().abort}const vt="iconify2",j="iconify",qt=j+"-count",St=j+"-version",Ut=36e5,Le=168;function nt(t,n){try{return t.getItem(n)}catch{}}function at(t,n,e){try{return t.setItem(n,e),!0}catch{}}function Ct(t,n){try{t.removeItem(n)}catch{}}function ot(t,n){return at(t,qt,n.toString())}function rt(t){return parseInt(nt(t,qt))||0}const C={local:!0,session:!0},zt={local:new Set,session:new Set};let ft=!1;function Ne(t){ft=t}let D=typeof window>"u"?{}:window;function Gt(t){const n=t+"Storage";try{if(D&&D[n]&&typeof D[n].length=="number")return D[n]}catch{}C[t]=!1}function Kt(t,n){const e=Gt(t);if(!e)return;const r=nt(e,St);if(r!==vt){if(r){const l=rt(e);for(let c=0;c<l;c++)Ct(e,j+c.toString())}at(e,St,vt),ot(e,0);return}const o=Math.floor(Date.now()/Ut)-Le,i=l=>{const c=j+l.toString(),u=nt(e,c);if(typeof u=="string"){try{const a=JSON.parse(u);if(typeof a=="object"&&typeof a.cached=="number"&&a.cached>o&&typeof a.provider=="string"&&typeof a.data=="object"&&typeof a.data.prefix=="string"&&n(a,l))return!0}catch{}Ct(e,c)}};let s=rt(e);for(let l=s-1;l>=0;l--)i(l)||(l===s-1?(s--,ot(e,s)):zt[t].add(l))}function Jt(){if(!ft){Ne(!0);for(const t in C)Kt(t,n=>{const e=n.data,r=n.provider,o=e.prefix,i=v(r,o);if(!lt(i,e).length)return!1;const s=e.lastModified||-1;return i.lastModifiedCached=i.lastModifiedCached?Math.min(i.lastModifiedCached,s):s,!0})}}function Re(t,n){const e=t.lastModifiedCached;if(e&&e>=n)return e===n;if(t.lastModifiedCached=n,e)for(const r in C)Kt(r,o=>{const i=o.data;return o.provider!==t.provider||i.prefix!==t.prefix||i.lastModified===n});return!0}function Fe(t,n){ft||Jt();function e(r){let o;if(!C[r]||!(o=Gt(r)))return;const i=zt[r];let s;if(i.size)i.delete(s=Array.from(i).shift());else if(s=rt(o),!ot(o,s+1))return;const l={cached:Math.floor(Date.now()/Ut),provider:t.provider,data:n};return at(o,j+s.toString(),JSON.stringify(l))}n.lastModified&&!Re(t,n.lastModified)||Object.keys(n.icons).length&&(n.not_found&&(n=Object.assign({},n),delete n.not_found),e("local")||e("session"))}function At(){}function De(t){t.iconsLoaderFlag||(t.iconsLoaderFlag=!0,setTimeout(()=>{t.iconsLoaderFlag=!1,Ae(t)}))}function $e(t,n){t.iconsToLoad?t.iconsToLoad=t.iconsToLoad.concat(n).sort():t.iconsToLoad=n,t.iconsQueueFlag||(t.iconsQueueFlag=!0,setTimeout(()=>{t.iconsQueueFlag=!1;const{provider:e,prefix:r}=t,o=t.iconsToLoad;delete t.iconsToLoad;let i;if(!o||!(i=et(e)))return;i.prepare(e,r,o).forEach(l=>{Ht(e,l,c=>{if(typeof c!="object")l.icons.forEach(u=>{t.missing.add(u)});else try{const u=lt(t,c);if(!u.length)return;const a=t.pendingIcons;a&&u.forEach(f=>{a.delete(f)}),Fe(t,c)}catch(u){console.error(u)}De(t)})})}))}const dt=(t,n)=>{const e=Pe(t,!0,$t()),r=Ce(e);if(!r.pending.length){let c=!0;return n&&setTimeout(()=>{c&&n(r.loaded,r.missing,r.pending,At)}),()=>{c=!1}}const o=Object.create(null),i=[];let s,l;return r.pending.forEach(c=>{const{provider:u,prefix:a}=c;if(a===l&&u===s)return;s=u,l=a,i.push(v(u,a));const f=o[u]||(o[u]=Object.create(null));f[a]||(f[a]=[])}),r.pending.forEach(c=>{const{provider:u,prefix:a,name:f}=c,h=v(u,a),g=h.pendingIcons||(h.pendingIcons=new Set);g.has(f)||(g.add(f),o[u][a].push(f))}),i.forEach(c=>{const{provider:u,prefix:a}=c;o[u][a].length&&$e(c,o[u][a])}),n?Ee(n,r,i):At},Ve=t=>new Promise((n,e)=>{const r=typeof t=="string"?L(t,!0):t;if(!r){e(t);return}dt([r||t],o=>{if(o.length&&r){const i=T(r);if(i){n({...M,...i});return}}e(t)})});function Qe(t){try{const n=typeof t=="string"?JSON.parse(t):t;if(typeof n.body=="string")return{...n}}catch{}}function Be(t,n){const e=typeof t=="string"?L(t,!0,!0):null;if(!e){const i=Qe(t);return{value:t,data:i}}const r=T(e);if(r!==void 0||!e.prefix)return{value:t,name:e,data:r};const o=dt([e],()=>n(t,e,T(e)));return{value:t,name:e,loading:o}}function W(t){return t.hasAttribute("inline")}let Wt=!1;try{Wt=navigator.vendor.indexOf("Apple")===0}catch{}function He(t,n){switch(n){case"svg":case"bg":case"mask":return n}return n!=="style"&&(Wt||t.indexOf("<a")===-1)?"svg":t.indexOf("currentColor")===-1?"bg":"mask"}const qe=/(-?[0-9.]*[0-9]+[0-9.]*)/g,Ue=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function it(t,n,e){if(n===1)return t;if(e=e||100,typeof t=="number")return Math.ceil(t*n*e)/e;if(typeof t!="string")return t;const r=t.split(qe);if(r===null||!r.length)return t;const o=[];let i=r.shift(),s=Ue.test(i);for(;;){if(s){const l=parseFloat(i);isNaN(l)?o.push(i):o.push(Math.ceil(l*n*e)/e)}else o.push(i);if(i=r.shift(),i===void 0)return o.join("");s=!s}}const ze=t=>t==="unset"||t==="undefined"||t==="none";function Zt(t,n){const e={...M,...t},r={...Nt,...n},o={left:e.left,top:e.top,width:e.width,height:e.height};let i=e.body;[e,r].forEach(m=>{const y=[],z=m.hFlip,N=m.vFlip;let b=m.rotate;z?N?b+=2:(y.push("translate("+(o.width+o.left).toString()+" "+(0-o.top).toString()+")"),y.push("scale(-1 1)"),o.top=o.left=0):N&&(y.push("translate("+(0-o.left).toString()+" "+(o.height+o.top).toString()+")"),y.push("scale(1 -1)"),o.top=o.left=0);let w;switch(b<0&&(b-=Math.floor(b/4)*4),b=b%4,b){case 1:w=o.height/2+o.top,y.unshift("rotate(90 "+w.toString()+" "+w.toString()+")");break;case 2:y.unshift("rotate(180 "+(o.width/2+o.left).toString()+" "+(o.height/2+o.top).toString()+")");break;case 3:w=o.width/2+o.left,y.unshift("rotate(-90 "+w.toString()+" "+w.toString()+")");break}b%2===1&&(o.left!==o.top&&(w=o.left,o.left=o.top,o.top=w),o.width!==o.height&&(w=o.width,o.width=o.height,o.height=w)),y.length&&(i='<g transform="'+y.join(" ")+'">'+i+"</g>")});const s=r.width,l=r.height,c=o.width,u=o.height;let a,f;s===null?(f=l===null?"1em":l==="auto"?u:l,a=it(f,c/u)):(a=s==="auto"?c:s,f=l===null?it(a,u/c):l==="auto"?u:l);const h={},g=(m,y)=>{ze(y)||(h[m]=y.toString())};return g("width",a),g("height",f),h.viewBox=o.left.toString()+" "+o.top.toString()+" "+c.toString()+" "+u.toString(),{attributes:h,body:i}}const Ge=()=>{let t;try{if(t=fetch,typeof t=="function")return t}catch{}};let H=Ge();function Ke(t){H=t}function Je(){return H}function We(t,n){const e=U(t);if(!e)return 0;let r;if(!e.maxURL)r=0;else{let o=0;e.resources.forEach(s=>{o=Math.max(o,s.length)});const i=n+".json?icons=";r=e.maxURL-o-e.path.length-i.length}return r}function Ze(t){return t===404}const Xe=(t,n,e)=>{const r=[],o=We(t,n),i="icons";let s={type:i,provider:t,prefix:n,icons:[]},l=0;return e.forEach((c,u)=>{l+=c.length+1,l>=o&&u>0&&(r.push(s),s={type:i,provider:t,prefix:n,icons:[]},l=c.length),s.icons.push(c)}),r.push(s),r};function Ye(t){if(typeof t=="string"){const n=U(t);if(n)return n.path}return"/"}const tn=(t,n,e)=>{if(!H){e("abort",424);return}let r=Ye(n.provider);switch(n.type){case"icons":{const i=n.prefix,l=n.icons.join(","),c=new URLSearchParams({icons:l});r+=i+".json?"+c.toString();break}case"custom":{const i=n.uri;r+=i.slice(0,1)==="/"?i.slice(1):i;break}default:e("abort",400);return}let o=503;H(t+r).then(i=>{const s=i.status;if(s!==200){setTimeout(()=>{e(Ze(s)?"abort":"next",s)});return}return o=501,i.json()}).then(i=>{if(typeof i!="object"||i===null){setTimeout(()=>{i===404?e("abort",i):e("next",o)});return}setTimeout(()=>{e("success",i)})}).catch(()=>{e("next",o)})},en={prepare:Xe,send:tn};function kt(t,n){switch(t){case"local":case"session":C[t]=n;break;case"all":for(const e in C)C[e]=n;break}}const Z="data-style";let Xt="";function nn(t){Xt=t}function Et(t,n){let e=Array.from(t.childNodes).find(r=>r.hasAttribute&&r.hasAttribute(Z));e||(e=document.createElement("style"),e.setAttribute(Z,Z),t.appendChild(e)),e.textContent=":host{display:inline-block;vertical-align:"+(n?"-0.125em":"0")+"}span,svg{display:block}"+Xt}function Yt(){It("",en),$t(!0);let t;try{t=window}catch{}if(t){if(Jt(),t.IconifyPreload!==void 0){const e=t.IconifyPreload,r="Invalid IconifyPreload syntax.";typeof e=="object"&&e!==null&&(e instanceof Array?e:[e]).forEach(o=>{try{(typeof o!="object"||o===null||o instanceof Array||typeof o.icons!="object"||typeof o.prefix!="string"||!wt(o))&&console.error(r)}catch{console.error(r)}})}if(t.IconifyProviders!==void 0){const e=t.IconifyProviders;if(typeof e=="object"&&e!==null)for(const r in e){const o="IconifyProviders["+r+"] is invalid.";try{const i=e[r];if(typeof i!="object"||!i||i.resources===void 0)continue;_t(r,i)||console.error(o)}catch{console.error(o)}}}}return{enableCache:e=>kt(e,!0),disableCache:e=>kt(e,!1),iconExists:ve,getIcon:Se,listIcons:xe,addIcon:Vt,addCollection:wt,calculateSize:it,buildIcon:Zt,loadIcons:dt,loadIcon:Ve,addAPIProvider:_t,appendCustomStyle:nn,_api:{getAPIConfig:U,setAPIModule:It,sendAPIQuery:Ht,setFetch:Ke,getFetch:Je,listAPIProviders:je}}}function te(t,n){let e=t.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const r in n)e+=" "+r+'="'+n[r]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+e+">"+t+"</svg>"}function on(t){return t.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function rn(t){return"data:image/svg+xml,"+on(t)}function sn(t){return'url("'+rn(t)+'")'}const st={"background-color":"currentColor"},ee={"background-color":"transparent"},Pt={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},Ot={"-webkit-mask":st,mask:st,background:ee};for(const t in Ot){const n=Ot[t];for(const e in Pt)n[t+"-"+e]=Pt[e]}function Tt(t){return t?t+(t.match(/^[-0-9.]+$/)?"px":""):"inherit"}function cn(t,n,e){const r=document.createElement("span");let o=t.body;o.indexOf("<a")!==-1&&(o+="<!-- "+Date.now()+" -->");const i=t.attributes,s=te(o,{...i,width:n.width+"",height:n.height+""}),l=sn(s),c=r.style,u={"--svg":l,width:Tt(i.width),height:Tt(i.height),...e?st:ee};for(const a in u)c.setProperty(a,u[a]);return r}let P;function ln(){try{P=window.trustedTypes.createPolicy("iconify",{createHTML:t=>t})}catch{P=null}}function un(t){return P===void 0&&ln(),P?P.createHTML(t):t}function an(t){const n=document.createElement("span"),e=t.attributes;let r="";e.width||(r="width: inherit;"),e.height||(r+="height: inherit;"),r&&(e.style=r);const o=te(t.body,e);return n.innerHTML=un(o),n.firstChild}function jt(t,n){const e=n.icon.data,r=n.customisations,o=Zt(e,r);r.preserveAspectRatio&&(o.attributes.preserveAspectRatio=r.preserveAspectRatio);const i=n.renderedMode;let s;switch(i){case"svg":s=an(o);break;default:s=cn(o,{...M,...e},i==="mask")}const l=Array.from(t.childNodes).find(c=>{const u=c.tagName&&c.tagName.toUpperCase();return u==="SPAN"||u==="SVG"});l?s.tagName==="SPAN"&&l.tagName===s.tagName?l.setAttribute("style",s.getAttribute("style")):t.replaceChild(s,l):t.appendChild(s)}function Mt(t,n,e){const r=e&&(e.rendered?e:e.lastRender);return{rendered:!1,inline:n,icon:t,lastRender:r}}function fn(t="iconify-icon"){let n,e;try{n=window.customElements,e=window.HTMLElement}catch{return}if(!n||!e)return;const r=n.get(t);if(r)return r;const o=["icon","mode","inline","width","height","rotate","flip"],i=class extends e{constructor(){super();F(this,"_shadowRoot");F(this,"_state");F(this,"_checkQueued",!1);const c=this._shadowRoot=this.attachShadow({mode:"open"}),u=W(this);Et(c,u),this._state=Mt({value:""},u),this._queueCheck()}static get observedAttributes(){return o.slice(0)}attributeChangedCallback(c){if(c==="inline"){const u=W(this),a=this._state;u!==a.inline&&(a.inline=u,Et(this._shadowRoot,u))}else this._queueCheck()}get icon(){const c=this.getAttribute("icon");if(c&&c.slice(0,1)==="{")try{return JSON.parse(c)}catch{}return c}set icon(c){typeof c=="object"&&(c=JSON.stringify(c)),this.setAttribute("icon",c)}get inline(){return W(this)}set inline(c){c?this.setAttribute("inline","true"):this.removeAttribute("inline")}restartAnimation(){const c=this._state;if(c.rendered){const u=this._shadowRoot;if(c.renderedMode==="svg")try{u.lastChild.setCurrentTime(0);return}catch{}jt(u,c)}}get status(){const c=this._state;return c.rendered?"rendered":c.icon.data===null?"failed":"loading"}_queueCheck(){this._checkQueued||(this._checkQueued=!0,setTimeout(()=>{this._check()}))}_check(){if(!this._checkQueued)return;this._checkQueued=!1;const c=this._state,u=this.getAttribute("icon");if(u!==c.icon.value){this._iconChanged(u);return}if(!c.rendered)return;const a=this.getAttribute("mode"),f=yt(this);(c.attrMode!==a||ge(c.customisations,f))&&this._renderIcon(c.icon,f,a)}_iconChanged(c){const u=Be(c,(a,f,h)=>{const g=this._state;if(g.rendered||this.getAttribute("icon")!==a)return;const m={value:a,name:f,data:h};m.data?this._gotIconData(m):g.icon=m});u.data?this._gotIconData(u):this._state=Mt(u,this._state.inline,this._state)}_gotIconData(c){this._checkQueued=!1,this._renderIcon(c,yt(this),this.getAttribute("mode"))}_renderIcon(c,u,a){const f=He(c.data.body,a),h=this._state.inline;jt(this._shadowRoot,this._state={rendered:!0,icon:c,inline:h,customisations:u,attrMode:a,renderedMode:f})}};o.forEach(l=>{l in i.prototype||Object.defineProperty(i.prototype,l,{get:function(){return this.getAttribute(l)},set:function(c){c!==null?this.setAttribute(l,c):this.removeAttribute(l)}})});const s=Yt();for(const l in s)i[l]=i.prototype[l]=s[l];return n.define(t,i),i}fn()||Yt();const dn=_(()=>x(()=>import("./q-547d8851.js"),["build/q-547d8851.js","build/q-bd9ac0b6.js","build/q-c9128614.js"]),"s_0oopQutgGbs"),hn=_(()=>x(()=>import("./q-62372658.js"),["build/q-62372658.js","build/q-bd9ac0b6.js","build/q-0b9843bc.js","build/q-c9128614.js"]),"s_Oode7zDFbHo"),pn=async()=>{const[t]=ct(),n=await fetch(ae).then(e=>e.json());window.map=new ce.Map({container:"map",style:n}),window.map.on("load",()=>{t.features.includes("contour")&&ue(window.map),t.features.includes("3d")&&le(window.map),t.features.includes("drawAreaOfInterest")&&dn(window.map,t.areaOfInterest),t.features.includes("geocode")&&hn(window.map),t.callback$&&t.callback$(window.map)})},gn=t=>{const n=ht(!0);ie(_(()=>x(()=>Promise.resolve().then(()=>X),void 0),"s_hcN71o0Q6i4",[t]));const e=ht(!1);return pt(mt,{children:[p("div",null,{class:"dropstart map-menu",onClick$:_(()=>x(()=>Promise.resolve().then(()=>X),void 0),"s_gbeKi59Bm6o",[e])},[p("button",null,{"aria-expanded":"false",class:gt(r=>`btn btn-secondary ${r.value?"show":""}`,[e]),"data-bs-toggle":"dropdown",type:"button"},p("iconify-icon",null,{icon:"line-md:menu"},null,3,null),3,null),p("ul",null,{class:gt(r=>`dropdown-menu ${r.value?"show":""}`,[e])},[p("li",null,null,p("button",null,{class:"dropdown-item",onClick$:_(()=>x(()=>import("./q-73081f12.js"),[]),"s_00ZV8mXyM4I")},[p("iconify-icon",null,{icon:"la:hand-pointer-solid"},null,3,null)," ",p("span",null,null,"Select",3,null)],3,null),3,null),p("li",null,null,p("button",null,{class:"dropdown-item",onClick$:_(()=>x(()=>import("./q-51043c2b.js"),[]),"s_ApZjkPj0b10")},[p("iconify-icon",null,{icon:"gis:polygon-pt"},null,3,null)," ",p("span",null,null,"Polygon",3,null)],3,null),3,null),p("li",null,null,p("button",null,{class:"dropdown-item",onClick$:_(()=>x(()=>import("./q-c2c6a2e3.js"),[]),"s_51jqxmaQuhU")},[p("iconify-icon",null,{icon:"bi:trash"},null,3,null)," ",p("span",null,null,"Clear",3,null)],3,null),3,null),p("li",null,null,p("hr",null,{class:"dropdown-divider"},null,3,null),3,null),t.features.includes("contour")?p("li",null,null,p("button",null,{class:"dropdown-item",id:"clear",onClick$:_(()=>x(()=>Promise.resolve().then(()=>X),void 0),"s_ZNE7SAp3KrI",[n])},[n.value?pt(mt,{children:[p("iconify-icon",null,{icon:"akar-icons:check"},null,3,null)," "]},3,"l4_0"):null,p("span",null,null,"Show contours",3,null)],1,null),1,"l4_1"):null],1,null)],1,null),p("div",null,{id:"map"},null,3,null)]},1,"l4_2")},mn=()=>{const[t]=ct();t.value=!t.value},yn=()=>{const[t]=ct(),n=!t.value;t.value=n,window.map.setLayoutProperty("contours","visibility",n?"visible":"none"),window.map.setLayoutProperty("contour-text","visibility",n?"visible":"none")},X=Object.freeze(Object.defineProperty({__proto__:null,_hW:se,s_ZNE7SAp3KrI:yn,s_gbeKi59Bm6o:mn,s_hcN71o0Q6i4:pn,s_y0twiN0H9DI:gn},Symbol.toStringTag,{value:"Module"}));export{se as _hW,yn as s_ZNE7SAp3KrI,mn as s_gbeKi59Bm6o,pn as s_hcN71o0Q6i4,gn as s_y0twiN0H9DI};
