import { BooleanLike } from 'common/react';

export interface GameClockData {
  timing: BooleanLike;
  turn: boolean;
  whiteTime: number;
  blackTime: number;
  minTime: number;
  maxTime: number;
}
