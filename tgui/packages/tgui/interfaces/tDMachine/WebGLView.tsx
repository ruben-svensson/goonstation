declare const React;

import { initShaderProgram } from './shaderProgram';
import { initBuffers } from './initBuffers';
import { drawScene } from './drawScene';
import { Component, createRef } from 'inferno';

export abstract class WebGLView extends Component<WebGLViewProps> {
  ref = createRef<HTMLCanvasElement>();
  deltaTime = 0;
  width: number = 640;
  height: number = 480;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const canvas = this.ref.current;

    if (!canvas) return;
    const gl = canvas.getContext('experimental-webgl', { premultipliedAlpha: false }) as WebGLRenderingContext;

    if (!gl) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.');
      return;
    }

    // Init shader program
    const shaderProgram = initShaderProgram(gl);

    if (!shaderProgram) {
      alert('Unable to initialize the shader program.');
      return;
    }

    initBuffers(gl);

    // Create an animation loop for drawScene

    const render = () => {
      this.deltaTime = this.deltaTime + 0.01;
      this.width = this.ref.current.parentElement.clientWidth;
      this.height = this.ref.current.parentElement.clientHeight;
      drawScene(gl, shaderProgram, this.deltaTime);
      if (this.render) {
        this.render();
      }
      requestAnimationFrame(() => {
        render();
      });
    };

    requestAnimationFrame(render);
  }

  render() {
    return <canvas ref={this.ref} width={this.width} height={this.height} />;
  }
}
