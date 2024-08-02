import { Component } from "inferno";
import { Window } from "../../layouts";
import { SGCanvas } from "../common/webgl/SGCanvas";
import { SpaceGraphics } from "../common/webgl/SpaceGraphics";

export type WebGlMachineData = {
};

export class WebGlMachine extends Component<WebGlMachineData, any> {
  constructor(props) {
    super(props);
    this.state = {
      currentDesiredVertexCount: 10,
    };
  }

  init = () => {
    // Any initialization logic can go here
  };

  draw = (sg: SpaceGraphics, canvas: HTMLCanvasElement, deltaTime: number) => {
    // Clear the canvas
    // sg.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // sg.gl.clear(sg.gl.COLOR_BUFFER_BIT);

    let desiredVertexCount = this.state.currentDesiredVertexCount;
    let n = Math.floor(desiredVertexCount / 6);

    for (let i = 0; i < n; i++) {
      const t = performance.now();
      const x = Math.sin(t / 1000 + i) / 2;
      const y = Math.cos(t / 1000 + i) / 2;

      const r = Math.sin(t / 1000 + i) / 2 + 0.5;
      const g = Math.cos(t / 1000 + i) / 2 + 0.5;
      const b = Math.sin(t / 1000 + i) / 2 + 0.5;

      sg.drawRectangle(x, y, 0.1, 0.1, [r, g, b, 1.0]);
    }

    sg.flush();

    if (desiredVertexCount < 100) {
      this.setState({
        currentDesiredVertexCount: desiredVertexCount + 10,
      });
    }
  };


  render() {
    return (
      <Window title="WebGlMachine" width={400} height={500}>
        <div>
          <p>Desired vertex count: {this.state.currentDesiredVertexCount}</p>
        </div>
        <SGCanvas width={360} height={360} init={this.init} draw={this.draw} />
      </Window>
    );
  }
}
