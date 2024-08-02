export class SpaceGraphics {
  public gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private vertexBuffer: WebGLBuffer;
  private colorBuffer: WebGLBuffer;
  private positionLocation: number;
  private colorLocation: number;
  private vertices: Float32Array;
  private colors: Float32Array;
  private vertexCount: number;
  private maxVertices: number;

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl;
    this.program = this.initShaders();
    this.vertexBuffer = this.gl.createBuffer();
    this.colorBuffer = this.gl.createBuffer();
    this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.colorLocation = this.gl.getAttribLocation(this.program, 'a_color');
    this.maxVertices = 120000; // Increased buffer size for more vertices
    this.vertices = new Float32Array(this.maxVertices);
    this.colors = new Float32Array(this.maxVertices);
    this.vertexCount = 0;

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.gl.enableVertexAttribArray(this.colorLocation);
    this.gl.vertexAttribPointer(this.colorLocation, 4, this.gl.FLOAT, false, 0, 0);
  }

  private initShaders(): WebGLProgram {
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec4 a_color;
      varying vec4 v_color;
      void main() {
        gl_Position = vec4(a_position, 0, 1);
        v_color = a_color;
      }
    `;
    const fragmentShaderSource = `
      precision mediump float;
      varying vec4 v_color;
      void main() {
        gl_FragColor = v_color;
      }
    `;
    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    this.gl.useProgram(program);

    return program;
  }

  private createShader(type: number, source: string): WebGLShader {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      throw new Error(this.gl.getShaderInfoLog(shader) || 'Shader compilation failed');
    }
    return shader;
  }

  public clear(color: [number, number, number, number]) {
    this.gl.clearColor(...color);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.vertexCount = 0;
  }

  // Draw a rectangle at the specified position with the specified width and height
  public drawRectangle(x: number, y: number, width: number, height: number, color: [number, number, number, number]) {
    if (this.vertexCount * 2 + 12 > this.maxVertices) {
      this.flush();
    }
    const offset = this.vertexCount * 2;
    this.vertices.set([
      x, y,
      x + width, y,
      x, y + height,
      x, y + height,
      x + width, y,
      x + width, y + height,
    ], offset);

    const colorOffset = this.vertexCount * 4;
    this.colors.set([...color, ...color, ...color, ...color, ...color, ...color], colorOffset);

    this.vertexCount += 6;
  }

  // Flush the buffer and draw all the shapes
  public flush() {
    if (this.vertexCount > 0) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices.subarray(0, this.vertexCount * 2), this.gl.DYNAMIC_DRAW);

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, this.colors.subarray(0, this.vertexCount * 4), this.gl.DYNAMIC_DRAW);

      this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexCount);
      this.vertexCount = 0;
    }
  }
}
