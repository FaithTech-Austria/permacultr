import{a as c,L as o}from"./q-e06d6540.js";import{$ as l,h as i,M as n}from"./q-e9d9a766.js";import{s as p}from"./q-a26e743f.js";const h=()=>{const r=c().params.name;let e=!1;return l("div",null,{class:"d-flex justify-content-between bg-light steps ps-5 pe-5 col-12"},Object.values(p).filter(t=>t.inList).map(t=>{const s=t.slug===r,a=i(o,{children:n(t,"title"),class:`${s?"active":""} step ${!e&&!s?"past":""}`,href:"/permacultr/"+t.slug},1,"d3_0");return s&&(e=!0),a}),1,"d3_1")};export{h as s_IDvfrhcDJeA};