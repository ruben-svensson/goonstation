import { Box } from '../../../components';
import { BoardgameData } from '../utils/types';
import { useBackend } from '../../../backend';
import { useStates } from '../utils/config';
import { Piece } from './Piece';
import { fenCodeRecordFromPieces, fetchPieces } from '../games';

export const HeldPieceRenderer = (_, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  if (!data.currentUser) return null;

  const { mouseCoords, paletteLastElement } = useStates(context);
  const { x, y } = mouseCoords;

  let code;
  if (data.currentUser.palette) {
    code = data.currentUser.palette;
  } else if (data.currentUser.selected) {
    code = data.currentUser.selected.code;
  }

  if (!code) return null;

  const pieces = fetchPieces();
  const piece = fenCodeRecordFromPieces(pieces)[code];

  return (
    <Box
      className={`boardgame__heldpiece`}
      style={{
        'top': y + 'px',
        'left': x + 'px',
        width: '120px',
        height: '120px',
      }}>
      <Box className="boardgame__heldpiece-inner">
        <Piece piece={piece} isPresetPiece />
      </Box>
      <Box
        style={{
          'font-size': '12px',
          'font-weight': 'bold',
          'text-shadow': '0 0 2px black',
        }}>
        Right click to cancel
      </Box>
    </Box>
  );
};
