import{p as _}from"./q-e9d9a766.js";function w(r,t,f){if(r!==null)for(var i,s,P,y,u,n,c,g=0,o=0,v,G=r.type,k=G==="FeatureCollection",C=G==="Feature",S=k?r.features.length:1,e=0;e<S;e++){c=k?r.features[e].geometry:C?r.geometry:r,v=c?c.type==="GeometryCollection":!1,u=v?c.geometries.length:1;for(var M=0;M<u;M++){var l=0,h=0;if(y=v?c.geometries[M]:c,y!==null){n=y.coordinates;var a=y.type;switch(g=f&&(a==="Polygon"||a==="MultiPolygon")?1:0,a){case null:break;case"Point":if(t(n,o,e,l,h)===!1)return!1;o++,l++;break;case"LineString":case"MultiPoint":for(i=0;i<n.length;i++){if(t(n[i],o,e,l,h)===!1)return!1;o++,a==="MultiPoint"&&l++}a==="LineString"&&l++;break;case"Polygon":case"MultiLineString":for(i=0;i<n.length;i++){for(s=0;s<n[i].length-g;s++){if(t(n[i][s],o,e,l,h)===!1)return!1;o++}a==="MultiLineString"&&l++,a==="Polygon"&&h++}a==="Polygon"&&l++;break;case"MultiPolygon":for(i=0;i<n.length;i++){for(h=0,s=0;s<n[i].length;s++){for(P=0;P<n[i][s].length-g;P++){if(t(n[i][s][P],o,e,l,h)===!1)return!1;o++}h++}l++}break;case"GeometryCollection":for(i=0;i<y.geometries.length;i++)if(w(y.geometries[i],t,f)===!1)return!1;break;default:throw new Error("Unknown Geometry Type")}}}}}function b(r){var t=[1/0,1/0,-1/0,-1/0];return w(r,function(f){t[0]>f[0]&&(t[0]=f[0]),t[1]>f[1]&&(t[1]=f[1]),t[2]<f[0]&&(t[2]=f[0]),t[3]<f[1]&&(t[3]=f[1])}),t}b.default=b;const L=(r,t)=>{const f=b(t);r.fitBounds(f,{animate:!1})};export{_ as _hW,L as s_i0AFyFi7Gc4};