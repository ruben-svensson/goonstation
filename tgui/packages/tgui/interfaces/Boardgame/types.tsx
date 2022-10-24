import { BoardPattern } from './Patterns';

export type BoardgameData = {
  boardInfo: {
    name: string;
    game: string;
    pattern: BoardPattern;
    startingPositions: { [key: string]: string };
    width: number;
    height: number;
  };
  styling: {
    tileColour1: string;
    tileColour2: string;
  };
  board: string[];

  users: User[];
  currentUser: User;
};

export type StartingPosition = {
  name: string;
  fen: string;
};

export type User = {
  ckey: string;
  name: string;
  mouseX: number;
  mouseY: number;
  selected?: {
    code: string;
    team: string;
    game: string;
  };
};

export type TileSize = {
  width: number;
  height: number;
};
