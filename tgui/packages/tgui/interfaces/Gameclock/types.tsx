import { BooleanLike } from 'common/react';

export interface GameClockData {
  timing: BooleanLike;
  swap: boolean;
  turn: boolean;
  whiteTime: number;
  blackTime: number;
  minTime: number;
  maxTime: number;
}
