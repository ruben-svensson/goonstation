import { Window } from '../../layouts';
import { Component } from 'inferno';
import { useStates } from './useStates';

export type GameData = {
};


export class Game extends Component<GameData, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  render() {
    const { testCounter, testText, testTextSet } = useStates(this.context);
    return (
      <Window title={name} width={580} height={512} >
        <div>
          <h1>{testText}</h1>
          <h2>{testCounter}</h2>
          <button type="button" onClick={() => testTextSet('World Yes')}>Change Text</button>
        </div>
      </Window>
    );
  }
}

const drawOnCanvas = () => {
  const canvas = canvasRef.current;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(Math.random(), 10, 10);
    ctx.stroke();
  }
};

const setupAnimation = (domNode) => {
  const animate = () => {
    drawOnCanvas();
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
};


// Old code, functional is a bit undone so moving to class
/* export const Game = (_props, context) => {
  const { act, data } = useBackend<GameData>(context);

  const canvasRef = createRef<HTMLCanvasElement>();

  const drawOnCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText(Math.random(), 10, 10);
      ctx.stroke();
    }
  };

  const setupAnimation = (domNode) => {
    const animate = () => {
      drawOnCanvas();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const cleanUpAnimation = () => {
    // Assuming you have a way to cancel the request, typically stored in a ref
    if (window.cancelAnimationFrame) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText("STOP", 10, 10);
        ctx.stroke();
      }
    }
  };

  return (
    <Window title={"Game"}
      width={580}
      height={512}
      onComponentDidMount={setupAnimation}
      onComponentWillUnmount={cleanUpAnimation} >
      <canvas className="game__" ref={canvasRef} width={580} height={382} />
      <button onClick={setupAnimation} />
    </Window>
  );
};
*/
