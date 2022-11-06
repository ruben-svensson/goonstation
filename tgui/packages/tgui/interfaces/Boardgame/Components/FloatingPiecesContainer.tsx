declare const React;

import { useBackend, useLocalState } from '../../../backend';
import { Box } from '../../../components';
import { getPiece } from '../Pieces';
import { BoardgameData, User } from '../types';
import { FloatingPiece } from './FloatingPiece';

export const FloatingPiecesContainer = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { users } = data;
  // Loop through every object in users
  return <Box />;

  /* if (users) {
    return (
      <Box>
        {Object.keys(users).map((key) => {
          const user: User = users[key];
          const { selected } = user;
          if (selected) {
            const { code } = selected;
            const piece = getPiece(code);
            return <FloatingPiece key={key} user={user} piece={piece} x={200} y={200} />;
          }
        })}
      </Box>
    );
  }*/
};
