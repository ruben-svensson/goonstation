import { BooleanLike } from 'common/react';

export interface GameClockData {
  timing: BooleanLike;
  whiteTime: number;
  blackTime: number;
}
