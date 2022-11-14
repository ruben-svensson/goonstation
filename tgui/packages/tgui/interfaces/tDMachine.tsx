declare const React;

import { Component, createRef } from 'inferno';
import { Window } from '../layouts';
export const tDMachine = (props, context) => {
  return (
    <Window width={650} height={490 + 35}>
      <Window.Content>
        <WebGLView />
      </Window.Content>
    </Window>
  );
};

interface WebGLViewProps {
  canvasRef: (ref: HTMLCanvasElement) => void;
}
class WebGLView extends Component {
  ref = createRef<HTMLCanvasElement>();

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const canvas = this.ref.current;

    if (!canvas) return;
    const ctx = canvas.getContext('canvas2d') as CanvasRenderingContext2D;

    if (!ctx) {
      alert('Failed to get the rendering context for canvas');
      return;
    }

    // Draw something interesting
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 55, 50);
  }

  render() {
    return <canvas ref={this.ref} width="640" height="480" />;
  }
}
