import { Component } from "inferno";
import { WebGLUtility } from "./WebGLUtility";

interface WebGLCanvasProps {
  width: number;
  height: number;
}

export class WebGLCanvas extends Component<WebGLCanvasProps, any> {
  private webglUtility: WebGLUtility;

  constructor(props) {
    super(props);
    this.webglUtility = new WebGLUtility(this.props.width, this.props.height);
  }

  componentDidMount() {
    const canvasContainer = document.getElementById("webgl-canvas-container");
    if (canvasContainer) {
      canvasContainer.appendChild(this.webglUtility.getCanvas());
      this.initWebGL();
    }
  }

  initWebGL() {
    const gl = this.webglUtility.getContext();
    // Clear to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear everything
    gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw a red point
    const vertices = new Float32Array([
      0.0,  0.5,  0.0,
      -0.5, -0.5, 0.0,
      0.5, -0.5, 0.0
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const vertexShaderSource = `
      attribute vec3 coordinates;
      void main(void) {
        gl_Position = vec4(coordinates, 1.0);
      }`;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShaderSource = `
      void main(void) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }`;

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    const coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
  }

  render() {
    return <div id="webgl-canvas-container" style={{ width: this.props.width, height: this.props.height }}></div>;
  }
}
