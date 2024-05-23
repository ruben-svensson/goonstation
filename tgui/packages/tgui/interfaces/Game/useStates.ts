// State handler for the game

import { useLocalState } from "../../backend";

export const DEFAULT_STATES = {
  testText: 'Hello World',
  testCounter: 0,
  canvasContext: null,
};

export const STATES = (context) => {
  return {
    testText: useLocalState<string>(context, 'testText', DEFAULT_STATES.testText),
    testCounter: useLocalState<number>(context, 'testCounter', DEFAULT_STATES.testCounter),
    canvasContext: useLocalState<CanvasRenderingContext2D>(context, 'canvasContext', DEFAULT_STATES.canvasContext),
  };
};

export const useStates = (context) => {
  const states = STATES(context);
  return {
    testText: states.testText[0],
    testTextSet: (text: string) => {
      const [, setTestText] = states.testText;
      setTestText(text);
    },
    testCounter: states.testCounter[0],
    testCounterSet: (count: number) => {
      const [, setTestCounter] = states.testCounter;
      setTestCounter(count);
    },
    canvasContext: states.canvasContext[0],
    canvasContextSet: (context: CanvasRenderingContext2D) => {
      const [, setCanvasContext] = states.canvasContext;
      setCanvasContext(context);
    },
  };
};
