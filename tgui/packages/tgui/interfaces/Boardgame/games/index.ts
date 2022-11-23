import { GameName, kits } from './kits';

export type GameKit = {
  pieces: PaletteSetupType[];
  presets: PresetType[];
  // Palette drawer groups
  palettes: PaletteSet[];
};

/**
 * Pieces
 */

export type PaletteSetupType = {
  code: string;
  name: string;
  game: GameName;
  image?: string;
};

const pieces: PaletteSetupType[] = [];

// Push gamekit pieces into pieces array
kits.forEach((kit: GameKit) => {
  pieces.push(...kit.pieces);
});

export const pushPieces = (newPieces: PaletteSetupType[]) => {
  return pieces.push(...newPieces);
};

export const getPiece = (fenCode: string, game: string) => {
  return pieces.find((piece) => piece.code === fenCode && piece.game === game);
};

export const getPiecesByGame = (game: string): PaletteSetupType[] => {
  return pieces.filter((piece) => piece.game === game);
};

export const fenCodeRecordFromPieces = (pieces: PaletteSetupType[]): Record<string, PaletteSetupType> => {
  return pieces.reduce((map, piece) => {
    map[piece.code] = piece;
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

export type PaletteSet = {
  name: string;
  pieces: PaletteSetupType[];
};

export const palettes: PaletteSet[] = [];

// Push gamekit presets into pieces array
kits.forEach((kit: GameKit) => {
  palettes.push(...kit.palettes);
});

export const fetchPalettes = () => palettes;
