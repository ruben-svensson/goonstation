/* eslint-disable max-len */
export type PresetType = {
  name: string;
  game: string;
  description: string;
  // string or function that returns string
  setup: string | (() => string);
  boardWidth: number;
  boardHeight: number;
  wikiPage?: string; // Wiki page for the game from https://wiki.ss13.co/
};

export const presets: PresetType[] = [];

/* Chess */

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
  name: 'Horde',
  game: 'chess',
  description:
    "In this variant, White's pawns on the first and second ranks may advance one or two steps, provided that the path in the file is free. Unlike in regular chess, this does not have to be the pawn's first move",
  setup:
    'r,n,b,q,k,b,n,r,p,p,p,p,p,p,p,p,8,1,P,P,2,P,P,1,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P',
  boardWidth: 8,
  boardHeight: 8,
});

presets.push({
  name: 'Racing Kings',
  game: 'chess',
  description:
    "In Racing Kings the object is not to trap or capture your opponent's king, but instead it is a race to the 8th rank! ",
  setup: '48,k,r,b,n,N,B,R,K,q,r,b,n,N,B,R,Q',
  boardWidth: 8,
  boardHeight: 8,
});

presets.push({
  name: 'Displacement chess',
  game: 'chess',
  description:
    "Displacement chess is a family of chess variants in which a few pieces are transposed in the initial standard chess position. The main goal of these variants is to negate players' knowledge of standard chess openings.",
  setup: function () {
    let board = [];

    const pawns = ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'];
    let special = ['n', 'b', 'r', 'q', 'k', 'r', 'b', 'n'];

    // Shuffle the special pieces
    for (let i = special.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [special[i], special[j]] = [special[j], special[i]];
    }

    board.push(special);
    board.push(pawns);
    board.push(32);
    board.push(pawns.map(() => 'P'));
    board.push(special.map((v) => v.toUpperCase()));

    return board.join(',');
  },
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

/* Draughts */

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

presets.push({
  name: 'Dameo',
  game: 'draughts',
  description:
    'Dameo is an abstract strategy board game for two players invented by Christian Freeling in 2000. It is a variant of the game draughts.',
  // Hello AI, please generate a funny setup for me that is not rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
  setup: 'd,d,d,d,d,d,d,d,1,d,d,d,d,d,d,3,d,d,d,d,20,D,D,D,D,3,D,D,D,D,D,D,1,D,D,D,D,D,D,D,D',
  boardWidth: 8,
  boardHeight: 8,
});

presets.push({
  name: 'Turkish draughts',
  game: 'draughts',
  description:
    'Turkish draughts (also known as Dama) is a variant of draughts played in Turkey, Greece, Egypt, Kuwait, Lebanon, Syria, Jordan and several other locations around the Mediterranean Sea and Middle East.',
  // Hello AI, please generate a funny setup for me that is not rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
  setup: '8,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,16,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D',
  boardWidth: 8,
  boardHeight: 8,
});

presets.push({
  name: 'Armenian draughts',
  game: 'draughts',
  description:
    'Armenian draughts, or Tama, is a variant of draughts (or checkers) played in Armenia. The rules are similar to Dama. Armenian draughts, however, allows for diagonal movement.',
  // Hello AI, please generate a funny setup for me that is not rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
  setup: '8,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,16,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D',
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
