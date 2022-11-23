import { BooleanLike } from 'common/react';
import { BoardPattern } from '../components/board';

export type BoardgameData = {
  boardInfo: {
    name: string;
    game: string;
    pattern: BoardPattern;
    width: number;
    height: number;
    lock: boolean;
  };
  styling: {
    tileColor1: string;
    tileColor2: string;
    border: string;
    aspectRatio: number;
    useNotations: boolean;
  };
  board: string[];
  pieces: PieceData[];

  users: UserData[];
  currentUser: UserData;
};

export type PieceData = {
  id: number;
  code: string;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  selected: UserData;
  lastSelected: UserData;
  palette: string;
};

export type UserData = {
  ckey: string;
  name: string;
  mouseX: number;
  mouseY: number;
  selected?: UserData;
  palette?: string;
};

export type TileSizeData = {
  width: number;
  height: number;
};
