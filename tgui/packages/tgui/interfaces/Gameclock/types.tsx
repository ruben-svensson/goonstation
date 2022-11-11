import { BooleanLike } from 'common/react';

export type GameClockData = {
  clockStatic: {
    name: string;
    minTime: number;
    maxTime: number;
  };
  timing: BooleanLike;
  swap: boolean;
  turn: boolean;
  whiteTime: number;
  blackTime: number;
};
