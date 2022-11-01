declare const React;

import { Window } from '../../layouts';
import { Box, Button, Dimmer, Flex } from '../../components';
import { useBackend, useLocalState } from '../../backend';
import { Pattern } from './Patterns';
import { BoardgameData } from './types';

import { adjustWindowSize } from './helpers';
import { PieceDrawer } from './Components/PieceDrawer';

import { FenCodeSettings, FloatingPiece, FloatingPiecesContainer, Notations, PieceSet } from './Components';
import { getPiece } from './Pieces';
import { GhostPiecesContainer } from './Patterns/checkerboard';

export const Boardgame = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  const { name, game, pattern, width, height } = data.boardInfo;
  const { currentUser } = data;

  const [configModalOpen, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);
  const [flip, setFlip] = useLocalState(context, 'flip', false);

  const [mouseCoords, setMouseCoords] = useLocalState<{
    x: number;
    y: number;
  }>(context, 'mouseCoords', { x: 0, y: 0 });

  return (
    <Window title={name} width={400} height={550}>
      {configModalOpen && (
        <Dimmer full className="boardgame__configmodal">
          <Box className="boardgame__settings">
            <Button onClick={() => setConfigModalOpen(false)}>Close</Button>
            <FenCodeSettings />
          </Box>
        </Dimmer>
      )}
      <Window.Content
        onFocusIn={() => {
          // adjustWindowSize(width, height);
        }}
        onMouseMove={(e) => {
          // adjustWindowSize(width, height);
          setMouseCoords({
            x: e.clientX,
            y: e.clientY,
          });

          if (currentUser) {
            /*
            act('mouseMove', {
              ckey: currentUser,
              x: e.clientX,
              y: e.clientY,
            });
            */
          }
        }}
        onMouseUp={() => {
          act('pawnDeselect', {
            ckey: currentUser.ckey,
          });
        }}
        fitted
        className="boardgame__window">
        <HeldPieceRenderer />
        <Box className="boardgame__debug">
          <span>Flip board</span>
          <Button.Checkbox checked={flip} onClick={() => setFlip(!flip)} />
          <Button title={'Setup'} icon={'cog'} onClick={() => setConfigModalOpen(true)} />
        </Box>
        <Flex className="boardgame__wrapper">
          <Flex.Item grow={1} className={`boardgame__board-inner ${flip ? 'boardgame__boardflip' : ''}`}>
            <Notations direction={'horizontal'} />
            <Flex className={`boardgame__board`}>
              <Notations direction={'vertical'} />
              <Pattern pattern={pattern} />
              <Notations direction={'vertical'} />
            </Flex>
            <Notations direction={'horizontal'} />
          </Flex.Item>
          <PieceDrawer />
        </Flex>
      </Window.Content>
    </Window>
  );
};

const HeldPieceRenderer = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { currentUser } = data;

  const [mouseCoords, setMouseCoords] = useLocalState<{
    x: number;
    y: number;
  }>(context, 'mouseCoords', { x: 0, y: 0 });

  if (currentUser && currentUser.selected) {
    const { code, game } = currentUser.selected;

    const piece = getPiece(code, game);

    return <FloatingPiece user={currentUser} piece={piece} x={mouseCoords.x} y={mouseCoords.y} />;
  }
};
