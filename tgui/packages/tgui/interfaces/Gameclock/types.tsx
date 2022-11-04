import { BooleanLike } from 'common/react';

export interface GameClockData {
  timing: BooleanLike;
  turn: BooleanLike;
  whiteTime: number;
  blackTime: number;
}
