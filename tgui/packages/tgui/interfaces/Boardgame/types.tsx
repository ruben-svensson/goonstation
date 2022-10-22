import { BoardPattern } from './Patterns';

export type BoardgameData = {
  boardInfo: {
    name: string;
    game: string;
    pattern: BoardPattern;
    width: number;
    height: number;
  };
  styling: {
    tileColour1: string;
    tileColour2: string;
  };
  board: string[];
};

export type TileSize = {
  width: number;
  height: number;
};
