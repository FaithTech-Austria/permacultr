import{D as t,a as r}from"./q-6c9b5407.js";import{D as l}from"./q-646fb5d2.js";import{p}from"./q-7b203fc8.js";import"./q-725317a4.js";import"./q-da3270a7.js";const u=e=>{const o=new l({url:t,encoding:"mapbox",maxzoom:13,worker:!0});o.setupMaplibre(r),e.addSource("contourSourceFeet",{type:"vector",tiles:[o.contourProtocolUrl({multiplier:3.28084,overzoom:1,thresholds:{11:[200,1e3],12:[100,500],13:[100,500],14:[50,200],15:[20,100],16:[10,20],17:[1,10]},elevationKey:"ele",levelKey:"level",contourLayer:"contours"})],maxzoom:30}),e.addLayer({id:"contours",type:"line",source:"contourSourceFeet","source-layer":"contours",paint:{"line-opacity":.2,"line-width":["match",["get","level"],1,1,.5]}}),e.addLayer({id:"contour-text",type:"symbol",source:"contourSourceFeet","source-layer":"contours",filter:[">",["get","level"],0],paint:{"text-halo-color":"white","text-halo-width":1},layout:{"symbol-placement":"line","text-size":10,"text-field":["concat",["number-format",["get","ele"],{}],"'"],"text-font":["Noto Sans Bold"]}})};export{p as _hW,u as s_KaBzrJTNzi8};