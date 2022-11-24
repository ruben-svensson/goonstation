declare const React;
import { fenCodeRecordFromPieces, fetchPieces, PieceSetupType } from '../games';
import { Box } from '../../../components';
import { BoardgameData } from '../utils/types';
import { useBackend, useLocalState } from '../../../backend';
import { STATES } from '../utils/config';

export const HeldPieceRenderer = (_, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { currentUser } = data;

  const [mouseCoords] = STATES(context).mouseCoords;

  const code = '';

  if (!currentUser?.selected || currentUser.palette === '') {
    return null;
  }

  if (code) {
    const pieces = fetchPieces();
    const piece: PieceSetupType = fenCodeRecordFromPieces(pieces)[code];

    // Draw the piece with svg fixed to the mouse

    return (
      <Box
        className="boardgame__heldpiece"
        style={{
          top: mouseCoords.y + 'px',
          left: mouseCoords.x + 'px',
          width: '30px',
          height: '30px',
        }}>
        <img src={piece?.image} />
        <span>{piece?.name}</span>
      </Box>
    );
  } else {
    return null;
  }
};
