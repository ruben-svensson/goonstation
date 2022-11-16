declare const React;

import { initShaderProgram } from './shaderProgram';
import { initBuffers } from './initBuffers';
import { drawScene } from './drawScene';

import { Component, createRef } from 'inferno';
import { Window } from '../../layouts';
export const tDMachine = (props, context) => {
  return (
    <Window width={650} height={490 + 35}>
      <Window.Content>
        <WebGLView />
      </Window.Content>
    </Window>
  );
};

class WebGLView extends Component {
  ref = createRef<HTMLCanvasElement>();
  animRef = createRef<FrameRequestCallback>();
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const canvas = this.ref.current;

    if (!canvas) return;
    const gl = canvas.getContext('experimental-webgl') as WebGLRenderingContext;

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

    /* setInterval(() => {
      drawScene(gl, shaderProgram);
    }, 10); */

    // Create an animation loop for drawScene

    const render = () => {
      drawScene(gl, shaderProgram);
      this.animRef.current = requestAnimationFrame(render);
    };

    this.animRef.current = requestAnimationFrame(render);
  }

  render() {
    return <canvas ref={this.ref} width="640" height="480" />;
  }
}
