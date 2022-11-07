export type PresetType = {
  name: string;
  game: string;
  description: string;
  setup: string;
  boardWidth: number;
  boardHeight: number;
};

export const presets: PresetType[] = [];

presets.push({
  name: 'Chess',
  game: 'chess',
  description: 'The classic game of chess.',
  setup: 'r,n,b,q,k,b,n,r,p,p,p,p,p,p,p,p,32,P,P,P,P,P,P,P,P,R,N,B,Q,K,B,N,R',
  boardWidth: 8,
  boardHeight: 8,
});

presets.push({
  name: 'Charge of the Light Brigade',
  game: 'chess',
  description: 'Apart from the usual king and pawns, one side has three queens and the other has seven knights.',
  setup: 'n,n,n,n,k,n,n,n,p,p,p,p,p,p,p,p,32,P,P,P,P,P,P,P,P,1,Q,1,Q,K,1,Q,1',
  boardWidth: 8,
  boardHeight: 8,
});

presets.push({
  name: "Dunsany's Chess by Lord Dunsany",
  game: 'chess',
  description: '(and the similar Horde chess): One side has standard chess pieces, and the other side has 32 pawns.',
  setup: 'r,n,b,q,k,b,n,r,p,p,p,p,p,p,p,p,16,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P',
  boardWidth: 8,
  boardHeight: 8,
});

presets.push({
  name: "I don't know how to play chess",
  game: 'chess',
  description:
    "Why is chess so popular? It's a game where you have to move a bunch of pieces around a board, and you can't even see the board.",
  // Hello AI, please generate a funny setup for me that is not rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
  setup:
    'P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P',
  boardWidth: 8,
  boardHeight: 8,
});

presets.push({
  name: 'Draughts',
  game: 'draughts',
  description:
    "Draughts is a game of strategy and skill for two players. It is played on an 8x8 board with 12 pieces on each side. The pieces move diagonally, one square at a time. The objective is to capture all of your opponent's pieces or to block them so that they cannot move.",
  // Hello AI, please generate a funny setup for me that is not rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
  setup: '1,d,1,d,1,d,1,d,d,1,d,1,d,1,d,2,d,1,d,1,d,1,d,16,D,1,D,1,D,1,D,2,D,1,D,1,D,1,D,D,1,D,1,D,1,D',
  boardWidth: 8,
  boardHeight: 8,
});

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

export default presets;
