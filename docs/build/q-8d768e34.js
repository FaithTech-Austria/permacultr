import{g as nt}from"./q-725317a4.js";import{p as pt}from"./q-e9d9a766.js";var tt={exports:{}};(function(z,r){(function(){var t=Math.PI,o=Math.sin,n=Math.cos,p=Math.tan,x=Math.asin,l=Math.atan2,g=Math.acos,c=t/180,_=1e3*60*60*24,y=2440588,X=2451545;function D(e){return e.valueOf()/_-.5+y}function C(e){return new Date((e+.5-y)*_)}function w(e){return D(e)-X}var L=c*23.4397;function G(e,a){return l(o(e)*n(L)-p(a)*o(L),n(e))}function B(e,a){return x(o(a)*n(L)+n(a)*o(L)*o(e))}function H(e,a,i){return l(o(e),n(e)*o(a)-p(i)*n(a))}function I(e,a,i){return x(o(a)*o(i)+n(a)*n(i)*n(e))}function W(e,a){return c*(280.16+360.9856235*e)-a}function et(e){return e<0&&(e=0),2967e-7/Math.tan(e+.00312536/(e+.08901179))}function Y(e){return c*(357.5291+.98560028*e)}function j(e){var a=c*(1.9148*o(e)+.02*o(2*e)+3e-4*o(3*e)),i=c*102.9372;return e+a+i+t}function q(e){var a=Y(e),i=j(a);return{dec:B(i,0),ra:G(i,0)}}var b={};b.getPosition=function(e,a,i){var h=c*-i,s=c*a,f=w(e),u=q(f),m=W(f,h)-u.ra;return{azimuth:H(m,s,u.dec),altitude:I(m,s,u.dec)}};var k=b.times=[[-.833,"sunrise","sunset"],[-.3,"sunriseEnd","sunsetStart"],[-6,"dawn","dusk"],[-12,"nauticalDawn","nauticalDusk"],[-18,"nightEnd","night"],[6,"goldenHourEnd","goldenHour"]];b.addTime=function(e,a,i){k.push([e,a,i])};var Z=9e-4;function rt(e,a){return Math.round(e-Z-a/(2*t))}function K(e,a,i){return Z+(e+a)/(2*t)+i}function Q(e,a,i){return X+e+.0053*o(a)-.0069*o(2*i)}function at(e,a,i){return g((o(e)-o(a)*o(i))/(n(a)*n(i)))}function it(e){return-2.076*Math.sqrt(e)/60}function ot(e,a,i,h,s,f,u){var m=at(e,i,h),d=K(m,a,s);return Q(d,f,u)}b.getTimes=function(e,a,i,h){h=h||0;var s=c*-i,f=c*a,u=it(h),m=w(e),d=rt(m,s),E=K(0,s,d),T=Y(E),M=j(T),U=B(M,0),P=Q(E,T,M),S,N,R,A,F,O,v={solarNoon:C(P),nadir:C(P-.5)};for(S=0,N=k.length;S<N;S+=1)R=k[S],A=(R[0]+u)*c,F=ot(A,s,f,U,d,T,M),O=P-(F-P),v[R[1]]=C(O),v[R[2]]=C(F);return v};function $(e){var a=c*(218.316+13.176396*e),i=c*(134.963+13.064993*e),h=c*(93.272+13.22935*e),s=a+c*6.289*o(i),f=c*5.128*o(h),u=385001-20905*n(i);return{ra:G(s,f),dec:B(s,f),dist:u}}b.getMoonPosition=function(e,a,i){var h=c*-i,s=c*a,f=w(e),u=$(f),m=W(f,h)-u.ra,d=I(m,s,u.dec),E=l(o(m),p(s)*n(u.dec)-o(u.dec)*n(m));return d=d+et(d),{azimuth:H(m,s,u.dec),altitude:d,distance:u.dist,parallacticAngle:E}},b.getMoonIllumination=function(e){var a=w(e||new Date),i=q(a),h=$(a),s=149598e3,f=g(o(i.dec)*o(h.dec)+n(i.dec)*n(h.dec)*n(i.ra-h.ra)),u=l(s*o(f),h.dist-s*n(f)),m=l(n(i.dec)*o(i.ra-h.ra),o(i.dec)*n(h.dec)-n(i.dec)*o(h.dec)*n(i.ra-h.ra));return{fraction:(1+n(u))/2,phase:.5+.5*u*(m<0?-1:1)/Math.PI,angle:m}};function V(e,a){return new Date(e.valueOf()+a*_/24)}b.getMoonTimes=function(e,a,i,h){var s=new Date(e);h?s.setUTCHours(0,0,0,0):s.setHours(0,0,0,0);for(var f=.133*c,u=b.getMoonPosition(s,a,i).altitude-f,m,d,E,T,M,U,P,S,N,R,A,F,O,v=1;v<=24&&(m=b.getMoonPosition(V(s,v),a,i).altitude-f,d=b.getMoonPosition(V(s,v+1),a,i).altitude-f,M=(u+d)/2-m,U=(d-u)/2,P=-U/(2*M),S=(M*P+U)*P+m,N=U*U-4*M*m,R=0,N>=0&&(O=Math.sqrt(N)/(Math.abs(M)*2),A=P-O,F=P+O,Math.abs(A)<=1&&R++,Math.abs(F)<=1&&R++,A<-1&&(A=F)),R===1?u<0?E=v+A:T=v+A:R===2&&(E=v+(S<0?F:A),T=v+(S<0?A:F)),!(E&&T));v+=2)u=d;var J={};return E&&(J.rise=V(s,E)),T&&(J.set=V(s,T)),!E&&!T&&(J[S>0?"alwaysUp":"alwaysDown"]=!0),J},z.exports=b})()})(tt);var st=tt.exports;const ut=nt(st);class ct{constructor(){this.id="building-shadows",this.type="custom"}onAdd(r,t){this.map=r;const o=`
uniform mat4 u_matrix;
uniform float u_height_factor;
uniform float u_altitude;
uniform float u_azimuth;
attribute vec4 a_pos_normal_ed;
attribute lowp vec2 a_base;
attribute lowp vec2 a_height;
void main() {
  float base = max(0.0, a_base.x);
  float height = max(0.0, a_height.x);
  vec4 pos_nx = floor(a_pos_normal_ed * 0.5);
  vec4 top_up_ny_start = a_pos_normal_ed - 2.0 * pos_nx;
  vec3 top_up_ny = top_up_ny_start.xyz;
  float t = top_up_ny.x;
  vec4 pos = vec4(pos_nx.xy, t > 0.0 ? height : base, 1);
  float len = pos.z * u_height_factor / tan(u_altitude);
  pos.x += cos(u_azimuth) * len;
  pos.y += sin(u_azimuth) * len;
  pos.z = 0.0;
  gl_Position = u_matrix * pos;
}
`,n=`
void main() {
  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
`,p=t.createShader(t.VERTEX_SHADER);t.shaderSource(p,o),t.compileShader(p);const x=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(x,n),t.compileShader(x),this.program=t.createProgram(),t.attachShader(this.program,p),t.attachShader(this.program,x),t.linkProgram(this.program),t.validateProgram(this.program),this.uMatrix=t.getUniformLocation(this.program,"u_matrix"),this.uHeightFactor=t.getUniformLocation(this.program,"u_height_factor"),this.uAltitude=t.getUniformLocation(this.program,"u_altitude"),this.uAzimuth=t.getUniformLocation(this.program,"u_azimuth"),this.aPosNormalEd=t.getAttribLocation(this.program,"a_pos_normal_ed"),this.aBase=t.getAttribLocation(this.program,"a_base"),this.aHeight=t.getAttribLocation(this.program,"a_height"),this.compileOpacityProgram(r,t)}compileOpacityProgram(r,t){const o=`
attribute vec2 a_pos;
varying vec2 v_pos;
void main() {
  // texture vector position, range 0.0 - 1.0
  v_pos = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0, 1);
}
`,n=`
      precision mediump float;
      uniform sampler2D u_tex;
      uniform float u_alt;
      uniform vec4 u_shadeColor;
      varying vec2 v_pos;
void main() {
  if (u_alt < 0.0) {
      gl_FragColor = u_shadeColor;
  } else {
      vec4 color = texture2D(u_tex, v_pos);
      if (color == vec4(0, 0, 0, 0)) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      } else {
          gl_FragColor = u_shadeColor;
      }
  }
}
`,p=t.createShader(t.VERTEX_SHADER);t.shaderSource(p,o),t.compileShader(p);const x=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(x,n),t.compileShader(x),this.opacityProgram=t.createProgram(),t.attachShader(this.opacityProgram,p),t.attachShader(this.opacityProgram,x),t.linkProgram(this.opacityProgram),t.validateProgram(this.opacityProgram),this.aPos=t.getAttribLocation(this.opacityProgram,"a_pos"),this.uTex=t.getUniformLocation(this.opacityProgram,"u_tex"),this.uAlt=t.getUniformLocation(this.opacityProgram,"u_alt"),this.uMatrix2=t.getUniformLocation(this.opacityProgram,"u_matrix"),this.shadeColor=t.getUniformLocation(this.opacityProgram,"u_shadeColor");const[l,g,c,_]=t.getParameter(t.VIEWPORT);this.buf=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,this.buf);const y=new Float32Array([-1,-1,1,-1,-1,1,1,1]);t.bufferData(t.ARRAY_BUFFER,y,t.STATIC_DRAW),this.tex=t.createTexture(),t.bindTexture(t.TEXTURE_2D,this.tex),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,c,_,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),this.fb=t.createFramebuffer(),this.attachmentPoint=t.COLOR_ATTACHMENT0}render(r,t){const o=new Date;o.setHours(19),r.useProgram(this.program),r.bindFramebuffer(r.FRAMEBUFFER,this.fb),r.activeTexture(r.TEXTURE_0),r.bindTexture(r.TEXTURE_2D,this.tex),r.framebufferTexture2D(r.FRAMEBUFFER,this.attachmentPoint,r.TEXTURE_2D,this.tex,0),r.clear(r.COLOR_BUFFER_BIT);const n=this.map.style.sourceCaches.openmaptiles,p=n.getVisibleCoordinates().reverse(),x=map.getLayer("3d-buildings"),l=this.map.painter.context,{lng:g,lat:c}=this.map.getCenter(),_=ut.getPosition(o,c,g);r.uniform1f(this.uAltitude,_.altitude),r.uniform1f(this.uAzimuth,_.azimuth+3*Math.PI/2),map.setLight({anchor:"map",position:[1.5,180+_.azimuth*180/Math.PI,90-_.altitude*180/Math.PI],"position-transition":{duration:0},color:_.altitude<0?"#999":"#fdb"},{duration:0}),this.opacity=Math.sin(Math.max(_.altitude,0))*.9;for(const y of p){const X=n.getTile(y),D=X.getBucket(x);if(!D)continue;const[C,w]=D.programConfigurations.programConfigurations["3d-buildings"]._buffers;r.uniformMatrix4fv(this.uMatrix,!1,y.posMatrix),r.uniformMatrix4fv(this.uMatrix2,!1,y.posMatrix),r.uniform1f(this.uHeightFactor,Math.pow(2,y.overscaledZ)/X.tileSize/8);for(const L of D.segments.get()){const G=l.currentNumAttributes||0,B=2;for(let I=B;I<G;I++)r.disableVertexAttribArray(I);const H=L.vertexOffset||0;r.enableVertexAttribArray(this.aPosNormalEd),r.enableVertexAttribArray(this.aHeight),r.enableVertexAttribArray(this.aBase),D.layoutVertexBuffer.bind(),r.vertexAttribPointer(this.aPosNormalEd,4,r.SHORT,!1,8,8*H),C.bind(),r.vertexAttribPointer(this.aHeight,1,r.FLOAT,!1,4,4*H),w.bind(),r.vertexAttribPointer(this.aBase,1,r.FLOAT,!1,4,4*H),D.indexBuffer.bind(),l.currentNumAttributes=B,r.drawElements(r.TRIANGLES,L.primitiveLength*3,r.UNSIGNED_SHORT,L.primitiveOffset*6)}}r.bindFramebuffer(r.FRAMEBUFFER,null),r.useProgram(this.opacityProgram),r.uniform1f(this.uAlt,_.altitude),r.uniform4fv(this.shadeColor,new Float32Array([0,0,0,.6])),r.bindBuffer(r.ARRAY_BUFFER,this.buf),r.enableVertexAttribArray(this.aPos),r.vertexAttribPointer(this.aPos,2,r.FLOAT,!1,0,0),r.drawArrays(r.TRIANGLE_STRIP,0,4)}}const ft=z=>{z.addLayer({id:"3d-buildings",source:"openmaptiles","source-layer":"building",type:"fill-extrusion",minzoom:14,paint:{"fill-extrusion-color":"#ddd","fill-extrusion-height":["number",["get","height"],5],"fill-extrusion-base":["number",["get","min_height"],0],"fill-extrusion-opacity":1}},"Road labels"),z.addLayer(new ct,"3d-buildings")};export{pt as _hW,ft as s_rxVfrhmRXzc};
