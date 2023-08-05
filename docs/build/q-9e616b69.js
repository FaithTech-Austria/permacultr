import{g as nt}from"./q-725317a4.js";import{p as lt}from"./q-7b203fc8.js";var tt={exports:{}};(function(I,n){(function(){var i=Math.PI,a=Math.sin,o=Math.cos,l=Math.tan,p=Math.asin,_=Math.atan2,F=Math.acos,s=i/180,H=1e3*60*60*24,J=2440588,w=2451545;function k(t){return t.valueOf()/H-.5+J}function E(t){return new Date((t+.5-J)*H)}function T(t){return k(t)-w}var D=s*23.4397;function B(t,e){return _(a(t)*o(D)-l(e)*a(D),o(t))}function z(t,e){return p(a(e)*o(D)+o(e)*a(D)*a(t))}function O(t,e,r){return _(a(t),o(t)*a(e)-l(r)*o(e))}function q(t,e,r){return p(a(e)*a(r)+o(e)*o(r)*o(t))}function G(t,e){return s*(280.16+360.9856235*t)-e}function et(t){return t<0&&(t=0),2967e-7/Math.tan(t+.00312536/(t+.08901179))}function $(t){return s*(357.5291+.98560028*t)}function W(t){var e=s*(1.9148*a(t)+.02*a(2*t)+3e-4*a(3*t)),r=s*102.9372;return t+e+r+i}function X(t){var e=$(t),r=W(e);return{dec:z(r,0),ra:B(r,0)}}var x={};x.getPosition=function(t,e,r){var h=s*-r,u=s*e,d=T(t),c=X(d),f=G(d,h)-c.ra;return{azimuth:O(f,u,c.dec),altitude:q(f,u,c.dec)}};var j=x.times=[[-.833,"sunrise","sunset"],[-.3,"sunriseEnd","sunsetStart"],[-6,"dawn","dusk"],[-12,"nauticalDawn","nauticalDusk"],[-18,"nightEnd","night"],[6,"goldenHourEnd","goldenHour"]];x.addTime=function(t,e,r){j.push([t,e,r])};var Z=9e-4;function rt(t,e){return Math.round(t-Z-e/(2*i))}function K(t,e,r){return Z+(t+e)/(2*i)+r}function Q(t,e,r){return w+t+.0053*a(e)-.0069*a(2*r)}function at(t,e,r){return F((a(t)-a(e)*a(r))/(o(e)*o(r)))}function it(t){return-2.076*Math.sqrt(t)/60}function ot(t,e,r,h,u,d,c){var f=at(t,r,h),m=K(f,e,u);return Q(m,d,c)}x.getTimes=function(t,e,r,h){h=h||0;var u=s*-r,d=s*e,c=it(h),f=T(t),m=rt(f,u),g=K(0,u,m),A=$(g),L=W(A),C=z(L,0),M=Q(g,A,L),P,N,y,v,S,R,b={solarNoon:E(M),nadir:E(M-.5)};for(P=0,N=j.length;P<N;P+=1)y=j[P],v=(y[0]+c)*s,S=ot(v,u,d,C,m,A,L),R=M-(S-M),b[y[1]]=E(R),b[y[2]]=E(S);return b};function Y(t){var e=s*(218.316+13.176396*t),r=s*(134.963+13.064993*t),h=s*(93.272+13.22935*t),u=e+s*6.289*a(r),d=s*5.128*a(h),c=385001-20905*o(r);return{ra:B(u,d),dec:z(u,d),dist:c}}x.getMoonPosition=function(t,e,r){var h=s*-r,u=s*e,d=T(t),c=Y(d),f=G(d,h)-c.ra,m=q(f,u,c.dec),g=_(a(f),l(u)*o(c.dec)-a(c.dec)*o(f));return m=m+et(m),{azimuth:O(f,u,c.dec),altitude:m,distance:c.dist,parallacticAngle:g}},x.getMoonIllumination=function(t){var e=T(t||new Date),r=X(e),h=Y(e),u=149598e3,d=F(a(r.dec)*a(h.dec)+o(r.dec)*o(h.dec)*o(r.ra-h.ra)),c=_(u*a(d),h.dist-u*o(d)),f=_(o(r.dec)*a(r.ra-h.ra),a(r.dec)*o(h.dec)-o(r.dec)*a(h.dec)*o(r.ra-h.ra));return{fraction:(1+o(c))/2,phase:.5+.5*c*(f<0?-1:1)/Math.PI,angle:f}};function V(t,e){return new Date(t.valueOf()+e*H/24)}x.getMoonTimes=function(t,e,r,h){var u=new Date(t);h?u.setUTCHours(0,0,0,0):u.setHours(0,0,0,0);for(var d=.133*s,c=x.getMoonPosition(u,e,r).altitude-d,f,m,g,A,L,C,M,P,N,y,v,S,R,b=1;b<=24&&(f=x.getMoonPosition(V(u,b),e,r).altitude-d,m=x.getMoonPosition(V(u,b+1),e,r).altitude-d,L=(c+m)/2-f,C=(m-c)/2,M=-C/(2*L),P=(L*M+C)*M+f,N=C*C-4*L*f,y=0,N>=0&&(R=Math.sqrt(N)/(Math.abs(L)*2),v=M-R,S=M+R,Math.abs(v)<=1&&y++,Math.abs(S)<=1&&y++,v<-1&&(v=S)),y===1?c<0?g=b+v:A=b+v:y===2&&(g=b+(P<0?S:v),A=b+(P<0?v:S)),!(g&&A));b+=2)c=m;var U={};return g&&(U.rise=V(u,g)),A&&(U.set=V(u,A)),!g&&!A&&(U[P>0?"alwaysUp":"alwaysDown"]=!0),U},I.exports=x})()})(tt);var st=tt.exports;const ut=nt(st);class ct{constructor(n,i,a){this.baseLayer=n,this.sourceLayer=i,this.date=a,this.id=i+"shadows",this.type="custom",this.renderingMode="3d",this.opacity=.5}onAdd(n,i){this.map=n;const a=`
      uniform mat4 u_matrix;
      uniform float u_height_factor;

      uniform float u_altitude;
      uniform float u_azimuth;

      attribute vec2 a_pos;
      attribute vec4 a_normal_ed;

      attribute lowp vec2 a_base;
      attribute lowp vec2 a_height;

      void main() {
          float base = max(0.0, a_base.x);
          float height = max(0.0, a_height.x);
          float t = mod(a_normal_ed.x, 2.0);

          vec4 pos = vec4(a_pos, t > 0.0 ? height : base, 1);

          float len = pos.z * u_height_factor / tan(u_altitude);
          pos.x += cos(u_azimuth) * len;
          pos.y += sin(u_azimuth) * len;
          pos.z = 0.0;

          gl_Position = u_matrix * pos;
      }
      `,o=`
      void main() {
          gl_FragColor = vec4(0.3, 0.3, 0.3, 1.0);
      }
      `,l=i.createShader(i.VERTEX_SHADER);i.shaderSource(l,a),i.compileShader(l);const p=i.createShader(i.FRAGMENT_SHADER);i.shaderSource(p,o),i.compileShader(p),this.program=i.createProgram(),i.attachShader(this.program,l),i.attachShader(this.program,p),i.linkProgram(this.program),i.validateProgram(this.program),this.uMatrix=i.getUniformLocation(this.program,"u_matrix"),this.uHeightFactor=i.getUniformLocation(this.program,"u_height_factor"),this.uAltitude=i.getUniformLocation(this.program,"u_altitude"),this.uAzimuth=i.getUniformLocation(this.program,"u_azimuth"),this.aPos=i.getAttribLocation(this.program,"a_pos"),this.aNormal=i.getAttribLocation(this.program,"a_normal_ed"),this.aBase=i.getAttribLocation(this.program,"a_base"),this.aHeight=i.getAttribLocation(this.program,"a_height")}render(n,i){n.useProgram(this.program);const a=this.map.style.sourceCaches[this.baseLayer],o=a.getVisibleCoordinates().reverse(),l=map.getLayer(this.sourceLayer),p=this.map.painter.context,{lng:_,lat:F}=this.map.getCenter(),s=ut.getPosition(this.date,F,_);n.uniform1f(this.uAltitude,s.altitude),n.uniform1f(this.uAzimuth,s.azimuth+3*Math.PI/2),map.setLight({anchor:"map",position:[1.5,180+s.azimuth*180/Math.PI,90-s.altitude*180/Math.PI],"position-transition":{duration:0},color:`hsl(20, ${50*Math.cos(s.altitude)}%, ${200*Math.sin(s.altitude)}%)`},{duration:0}),this.opacity=Math.sin(Math.max(s.altitude,0))*.9;for(const H of o){const J=a.getTile(H),w=J.getBucket(l);if(!w)continue;const[k,E]=w.programConfigurations.programConfigurations[this.sourceLayer]._buffers;n.uniformMatrix4fv(this.uMatrix,!1,H.posMatrix),n.uniform1f(this.uHeightFactor,Math.pow(2,H.overscaledZ)/J.tileSize/8);for(const T of w.segments.get()){const D=p.currentNumAttributes||0,B=2;for(let O=B;O<D;O++)n.disableVertexAttribArray(O);const z=T.vertexOffset||0;n.enableVertexAttribArray(this.aPos),n.enableVertexAttribArray(this.aNormal),n.enableVertexAttribArray(this.aHeight),n.enableVertexAttribArray(this.aBase),w.layoutVertexBuffer.bind(),n.vertexAttribPointer(this.aPos,2,n.SHORT,!1,12,12*z),n.vertexAttribPointer(this.aNormal,4,n.SHORT,!1,12,4+12*z),k.bind(),n.vertexAttribPointer(this.aHeight,1,n.FLOAT,!1,4,4*z),E.bind(),n.vertexAttribPointer(this.aBase,1,n.FLOAT,!1,4,4*z),w.indexBuffer.bind(),p.currentNumAttributes=B,n.drawElements(n.TRIANGLES,T.primitiveLength*3,n.UNSIGNED_SHORT,T.primitiveOffset*6)}}}}const dt=(I,n)=>{const i={openmaptiles:["building"]};for(const[a,o]of Object.entries(i))for(const l of o){const p="3d-"+l,_={id:p,source:a,type:"fill-extrusion",minzoom:14,paint:{"fill-extrusion-color":"#ddd","fill-extrusion-height":["number",["get","height"],5],"fill-extrusion-base":["number",["get","min_height"],0],"fill-extrusion-opacity":1}};l!=="_"&&(_["source-layer"]=l),I.addLayer(_,"River labels"),I.addLayer(new ct(a,p,n),p)}};export{lt as _hW,dt as s_u56qR7T0gdM};