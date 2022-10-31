declare const React;

import { useBackend } from '../../../backend';
import { Box } from '../../../components';
import { getPiece } from '../Pieces';
import { BoardgameData, User } from '../types';
import { FloatingPiece } from './FloatingPiece';

export const FloatingPiecesContainer = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { users } = data;

  // Loop through every object in users
  if (users) {
    return (
      <Box>
        {Object.keys(users).map((key) => {
          const user: User = users[key];
          const { selected } = user;
          if (selected) {
            const { code, game } = selected;
            const piece = getPiece(code, game);
            return <FloatingPiece key={key} user={user} piece={piece} x={user.mouseX} y={user.mouseY} />;
          }
        })}
      </Box>
    );
  }
};
