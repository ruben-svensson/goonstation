import { Window } from '../../layouts';
import { Box, Button, Flex } from '../../components';
import { useBackend, useLocalState } from '../../backend';
import { Pattern } from './Patterns';
import { BoardgameData, User } from './types';

import { PieceDrawer } from './Components/PieceDrawer';

import { FenCodeSettings, Notations } from './Components';
import { fenCodeRecordFromPieces, fetchPieces, PieceType } from './Pieces';

export const Boardgame = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  const { name, game, pattern, width, height } = data.boardInfo;
  const { currentUser, pieces } = data;
  const { useNotations } = data.styling;

  const [configModalOpen, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);
  const [flip, setFlip] = useLocalState(context, 'flip', false);

  const [mouseCoords, setMouseCoords] = useLocalState<{
    x: number;
    y: number;
  }>(context, 'mouseCoords', { x: 0, y: 0 });

  const [translateCoords, setTranslateCoords] = useLocalState<{
    x: number;
    y: number;
  }>(context, 'translateCoords', { x: 0, y: 0 });

  const [tileSize, setTileSize] = useLocalState(context, 'tileSize', {
    width: 50,
    height: 50,
  });

  return (
    <Window title={name} width={800} height={650}>
      <FenCodeSettings />
      <Window.Content
        onMouseMove={(e) => {
          setMouseCoords({
            x: e.clientX,
            y: e.clientY,
          });
        }}
        fitted
        className="boardgame__window">
        {(currentUser?.palette || currentUser?.selected) && <HeldPieceRenderer />}
        <Box className="boardgame__debug">
          <span>Flip board</span>
          <Button.Checkbox checked={flip} onClick={() => setFlip(!flip)} />
          <Button title={'Setup'} icon={'cog'} onClick={() => setConfigModalOpen(true)} />
        </Box>
        <Flex className="boardgame__wrapper">
          <Flex.Item grow={1} className={`boardgame__board-inner`}>
            {!!useNotations && <Notations direction={'horizontal'} />}
            <Flex className={`boardgame__board`}>
              {!!useNotations && <Notations direction={'vertical'} />}
              <Pattern pattern={pattern} />
              {!!useNotations && <Notations direction={'vertical'} />}
            </Flex>
            {!!useNotations && <Notations direction={'horizontal'} />}
          </Flex.Item>
          <PieceDrawer />
        </Flex>
      </Window.Content>
    </Window>
  );
};

Boardgame.defaultHooks = {
  onComponentDidUpdate: (lastProps, nextProps) => {
    // Adjust window size
    const pieceSetPadding = 100; // Add 100 pixels to the width
    const titlebarHeightPadding = 32;
    let width = 600;
    let height = 500;
    // Fetch boardgame__wrapper element and get its width and height
    const wrapper = document.getElementsByClassName('boardgame__wrapper')[0];
    if (wrapper) {
      const wrapperRect = wrapper.getBoundingClientRect();
      let wrapperWidth = wrapperRect.width;
      let wrapperHeight = wrapperRect.height;

      // Return if the width and height are the same
      if (wrapperWidth === width && wrapperHeight === height) {
        return;
      }

      let shortestSide = wrapperWidth < wrapperHeight ? wrapperWidth : wrapperHeight;

      // Set the width and height to the shortest side
      width = shortestSide + pieceSetPadding;
      height = shortestSide + titlebarHeightPadding;
    }

    Byond.winset(window.__windowId__, {
      size: `${width}x${height}`,
    });
  },
};

const HeldPieceRenderer = (_, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { currentUser } = data;

  const [mouseCoords, setMouseCoords] = useLocalState<{
    x: number;
    y: number;
  }>(context, 'mouseCoords', { x: 0, y: 0 });

  const code = currentUser?.palette || currentUser.selected?.code;

  if (code) {
    const pieces = fetchPieces();
    const piece: PieceType = fenCodeRecordFromPieces(pieces)[code];

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
  }
};
