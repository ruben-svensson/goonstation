declare const React;

import { useBackend, useLocalState } from '../../../../backend';

import { Box, Button, Flex, Stack, Tabs, TextArea, Tooltip } from '../../../../components';

import { fenCodeRecordFromPieces, fetchPieces, getPiece, getPiecesByGame, PaletteSetupType } from '../../games';
import { BoardgameData, Piece } from '../../utils/types';
import { PresetType, presetsByGame } from '../../games';
import { useStates, useActions } from '../../utils/config';
import ModalTooltip from './ModalTooltip';
import { convertBoardToGNot } from '../../utils/notations';

const ConfigTab = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { openModal } = useStates(context);

  const { width, height } = data.boardInfo;
  const { pieces } = data;

  const [gnot, setGnot] = useLocalState(context, 'gnot', '');

  return (
    <Stack vertical>
      <h4>Apply notation</h4>
      <Box
        style={{
          'display': 'flex',
          'flex-direction': 'row',
        }}>
        <span>You can import: </span>
        <ModalTooltip text="GNot" tooltip="Goon Notation" link={'https://wiki.ss13.co/Main_Page'} />
        <ModalTooltip text="FEN" tooltip="Forsyth–Edwards Notation" />
        <ModalTooltip text="PDN" tooltip="Portable Draughts Notation" />
      </Box>
      <TextArea value={gnot} style={{ 'height': '200px' }} />
      <Button
        onClick={() => {
          act('applyGNot', {
            gnot: gnot,
          });
          openModal();
        }}>
        Apply and close
      </Button>
      <Button
        onClick={() => {
          const gnotString = convertBoardToGNot(width, height, pieces);
          setGnot(gnotString);
        }}>
        Fetch GNot from board
      </Button>
    </Stack>
  );
};

export default ConfigTab;
