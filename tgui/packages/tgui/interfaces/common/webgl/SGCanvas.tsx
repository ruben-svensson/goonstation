import { Component } from "inferno";
import { WebGLUtility } from "./WebGLUtility";
import { SpaceGraphics } from "./SpaceGraphics";

interface SGCanvasProps {
  width: number;
  height: number;
  init: () => void;
  draw: (sg: SpaceGraphics, canvas: HTMLCanvasElement, deltaTime: number) => void;
  onMouseDown?: (event: MouseEvent) => void;
}

export class SGCanvas extends Component<SGCanvasProps, any> {
  private webglUtility: WebGLUtility;
  private spaceGraphics: SpaceGraphics;
  private animationFrameId: number;
  private lastTime: number;
  private thenTime: number;
  private now: number;
  private elapsed: number;

  constructor(props) {
    super(props);
    this.webglUtility = new WebGLUtility(this.props.width, this.props.height);
    this.spaceGraphics = new SpaceGraphics(this.webglUtility.getContext());
    this.lastTime = performance.now();
    this.thenTime = 0;
    this.elapsed = 0;
  }

  componentDidMount() {
    const canvasContainer = document.getElementById("sg-canvas-container");
    if (canvasContainer) {
      canvasContainer.appendChild(this.webglUtility.getCanvas());
      this.props.init();
      this.startRenderLoop();
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrameId);
  }

  startRenderLoop() {
    const fps = 30;
    const fpsInterval = 1000 / fps;
    let then = performance.now();

    const render = (currentTime: number) => {
      this.animationFrameId = requestAnimationFrame(render);

      const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
      this.lastTime = currentTime;

      const elapsed = currentTime - then;

      if (elapsed > fpsInterval) {
        then = currentTime - (elapsed % fpsInterval);
        this.props.draw(this.spaceGraphics, this.webglUtility.getCanvas(), deltaTime);
      }
    };

    render(performance.now());
  }

  handleMouseDown = (event: MouseEvent) => {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  };

  render() {
    return (
      <div
        id="sg-canvas-container"
        style={{ width: this.props.width, height: this.props.height }}
        onMouseDown={this.handleMouseDown}
      />
    );
  }
}
