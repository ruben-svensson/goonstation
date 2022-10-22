import { useBackend } from '../../../backend';
import { BoardgameData } from '../types';
import { CheckerBoard } from './checkerboard';

export type BoardPattern = 'checkerboard' | 'hexagon' | 'go';

type PatternProps = {
  pattern: BoardPattern;
};
export const Pattern = ({ pattern }: PatternProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  switch (pattern) {
    case 'checkerboard':
      return <CheckerBoard />;
    default:
      return <div>Pattern not found</div>;
  }
};
