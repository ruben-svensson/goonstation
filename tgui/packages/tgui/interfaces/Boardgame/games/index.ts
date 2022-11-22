import { GameName, kits } from './kits';

export type GameKit = {
  pieces: PieceType[];
  presets: PresetType[];
  sets: PieceSet[];
};

/**
 * Pieces
 */

export type PieceType = {
  fenCode: string;
  name: string;
  game: GameName;
  image?: string;
};

const pieces: PieceType[] = [];

// Push gamekit pieces into pieces array
kits.forEach((kit: GameKit) => {
  pieces.push(...kit.pieces);
});

export const pushPieces = (newPieces: PieceType[]) => {
  return pieces.push(...newPieces);
};

export const getPiece = (fenCode: string, game: string) => {
  return pieces.find((piece) => piece.fenCode === fenCode && piece.game === game);
};

export const getPiecesByGame = (game: string): PieceType[] => {
  return pieces.filter((piece) => piece.game === game);
};

export const fenCodeRecordFromPieces = (pieces: PieceType[]): Record<string, PieceType> => {
  return pieces.reduce((map, piece) => {
    map[piece.fenCode] = piece;
    return map;
  }, {});
};

export const fetchPieces = () => pieces;

/*
 * Presets
 */

export type PresetType = {
  name: string;
  game: GameName;
  description: string;
  rules?: JSX.Element;
  // string or function that returns string
  setup: string | (() => string);
  boardWidth: number;
  boardHeight: number;
  wikiPage?: string; // Wiki page for the game from https://wiki.ss13.co/
};

export const presets: PresetType[] = [];

// Push gamekit presets into pieces array
kits.forEach((kit: GameKit) => {
  presets.push(...kit.presets);
});

export const pushPresets = (newPresets: PresetType[]) => {
  return presets.push(...newPresets);
};

export const getPresetsBySize = (width: number, height: number): PresetType[] => {
  return presets.filter((preset) => preset.boardWidth === width && preset.boardHeight === height);
};

// Create record of all the presets, indexed by game
export const presetsByGame = () => {
  const record: Record<string, PresetType[]> = {};
  presets.forEach((preset) => {
    if (!record[preset.game]) {
      record[preset.game] = [];
    }
    record[preset.game].push(preset);
  });
  return record;
};

export const fetchPresets = () => presets;

/**
 * Sets
 */

export type PieceSet = {
  name: string;
  pieces: PieceType[];
};

export const sets: PieceSet[] = [];

// Push gamekit presets into pieces array
kits.forEach((kit: GameKit) => {
  sets.push(...kit.sets);
});

export const fetchSets = () => sets;
