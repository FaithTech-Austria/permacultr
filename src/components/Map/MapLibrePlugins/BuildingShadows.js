import SunCalc from 'suncalc'

export class BuildingShadows {
  constructor(baseLayer, sourceLayer, date) {
    this.baseLayer = baseLayer
    this.sourceLayer = sourceLayer
    this.date = date
    this.id = sourceLayer + 'shadows'
    this.type = 'custom';
    this.renderingMode = '3d';
    this.opacity = 0.5;
  }

  onAdd(map, gl) {
      this.map = map;

      const vertexSource = `
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
      `;

      const fragmentSource = `
      void main() {
          gl_FragColor = vec4(0.3, 0.3, 0.3, 1.0);
      }
      `;

      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vertexSource);
      gl.compileShader(vertexShader);
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fragmentSource);
      gl.compileShader(fragmentShader);

      this.program = gl.createProgram();
      gl.attachShader(this.program, vertexShader);
      gl.attachShader(this.program, fragmentShader);
      gl.linkProgram(this.program);
      gl.validateProgram(this.program);

      this.uMatrix = gl.getUniformLocation(this.program, "u_matrix");
      this.uHeightFactor = gl.getUniformLocation(this.program, "u_height_factor");
      this.uAltitude = gl.getUniformLocation(this.program, "u_altitude");
      this.uAzimuth = gl.getUniformLocation(this.program, "u_azimuth");

      this.aPos = gl.getAttribLocation(this.program, "a_pos");
      this.aNormal = gl.getAttribLocation(this.program, "a_normal_ed");
      this.aBase = gl.getAttribLocation(this.program, "a_base");
      this.aHeight = gl.getAttribLocation(this.program, "a_height");
  }

  render(gl, matrix) {
      gl.useProgram(this.program);

      const source = this.map.style.sourceCaches[this.baseLayer];
      const coords = source.getVisibleCoordinates().reverse();
      const buildingsLayer = map.getLayer(this.sourceLayer);
      const context = this.map.painter.context;

      const {lng, lat} = this.map.getCenter();
      const pos = SunCalc.getPosition(this.date, lat, lng);

      gl.uniform1f(this.uAltitude, pos.altitude);
      gl.uniform1f(this.uAzimuth, pos.azimuth + 3 * Math.PI / 2);

      map.setLight({
          anchor: 'map',
          position: [1.5, 180 + pos.azimuth * 180 / Math.PI, 90 - pos.altitude * 180 / Math.PI],
          'position-transition': {duration: 0},
          color: `hsl(20, ${50 * Math.cos(pos.altitude)}%, ${ 200 * Math.sin(pos.altitude) }%)`
      }, {duration: 0});

      this.opacity = Math.sin(Math.max(pos.altitude, 0)) * 0.9;

      for (const coord of coords) {
          const tile = source.getTile(coord);
          const bucket = tile.getBucket(buildingsLayer);
          if (!bucket) continue;

          const [heightBuffer, baseBuffer] = bucket.programConfigurations.programConfigurations[this.sourceLayer]._buffers;

          gl.uniformMatrix4fv(this.uMatrix, false, coord.posMatrix);
          gl.uniform1f(this.uHeightFactor, Math.pow(2, coord.overscaledZ) / tile.tileSize / 8);

          for (const segment of bucket.segments.get()) {
              const numPrevAttrib = context.currentNumAttributes || 0;
              const numNextAttrib = 2;

              for (let i = numNextAttrib; i < numPrevAttrib; i++) gl.disableVertexAttribArray(i);

              const vertexOffset = segment.vertexOffset || 0;

              gl.enableVertexAttribArray(this.aPos);
              gl.enableVertexAttribArray(this.aNormal);

              gl.enableVertexAttribArray(this.aHeight);
              gl.enableVertexAttribArray(this.aBase);

              bucket.layoutVertexBuffer.bind();
              gl.vertexAttribPointer(this.aPos, 2, gl.SHORT, false, 12, 12 * vertexOffset);
              gl.vertexAttribPointer(this.aNormal, 4, gl.SHORT, false, 12, 4 + 12 * vertexOffset);

              heightBuffer.bind();
              gl.vertexAttribPointer(this.aHeight, 1, gl.FLOAT, false, 4, 4 * vertexOffset);

              baseBuffer.bind();
              gl.vertexAttribPointer(this.aBase, 1, gl.FLOAT, false, 4, 4 * vertexOffset);

              bucket.indexBuffer.bind();

              context.currentNumAttributes = numNextAttrib;

              gl.drawElements(gl.TRIANGLES, segment.primitiveLength * 3, gl.UNSIGNED_SHORT, segment.primitiveOffset * 3 * 2);
          }
      }
  }
}