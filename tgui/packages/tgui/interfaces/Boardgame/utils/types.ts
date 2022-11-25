export type BoardInfo = {
  name: string;
  game: string;
  pattern: string;
  width: number;
  height: number;
  lock: boolean;
};

export type Styling = {
  tileColor1: string;
  tileColor2: string;
  border: string;
  aspectRatio: number;
  useNotations: boolean;
};

export type BoardgameData = {
  boardInfo: BoardInfo;
  styling: Styling;
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
  selected?: PieceData;
  palette?: string;
};

export type TileSizeData = {
  width: number;
  height: number;
};
