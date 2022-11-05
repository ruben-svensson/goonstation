/* eslint-disable max-len */
import { PieceType } from '.';

const facesPieces: PieceType[] = [];

facesPieces.push({
  fenCode: '😀',
  name: 'Grinning',
  game: 'faces',
});

facesPieces.push({
  fenCode: '😋',
  name: 'Savouring',
  game: 'faces',
});

facesPieces.push({
  fenCode: '🤔',
  name: 'Thinking',
  game: 'faces',
});

facesPieces.push({
  fenCode: '😐',
  name: 'Neutral',
  game: 'faces',
});

// export default facesPieces;

const otherPieces: PieceType[] = [];

otherPieces.push({
  fenCode: 'rabbit',
  name: 'Rabbit',
  game: 'animals',
  image: '...',
});

export default otherPieces;
