import{G as n,$ as a,w as c,c as l,_ as i,h as p,j as u,l as m}from"./q-e9d9a766.js";import{DocumentContext as _}from"./q-371e3d1b.js";import{u as d}from"./q-1ec01a89.js";import{n as f}from"./q-fe88588a.js";import{s as j}from"./q-f9997d97.js";const v=o=>{const e=n(_),s=d();return a("button",null,{class:c(t=>t.class,[o]),onClick$:l(()=>i(()=>Promise.resolve().then(()=>E),void 0),"s_ftE9DjbTELA",[e,s])},p(u,null,3,"g0_0"),1,"g0_1")},g=async()=>{const[o,e]=m(),t=await f({extensions:[".pcp"],description:"Perma Culture Project",multiple:!1}),r=await t.text();o.value=JSON.parse(r),localStorage["permacultr:project"]=r,window.handle=t.handle,e(j.project.slug)},E=Object.freeze(Object.defineProperty({__proto__:null,s_ftE9DjbTELA:g,s_nqOvKcEg224:v},Symbol.toStringTag,{value:"Module"}));export{g as s_ftE9DjbTELA,v as s_nqOvKcEg224};