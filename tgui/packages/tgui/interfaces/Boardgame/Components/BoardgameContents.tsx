import { STATES } from '../utils/config';

declare const React;

import { Box, Button, Flex } from '../../../components';
import { Pattern } from './board';
import { useBackend } from '../../../backend';
import { BoardgameData } from '../utils/types';
import { Window } from '../../../layouts';
import { Notations, HeldPieceRenderer, PieceDrawer } from '.';

export const BoardgameContents = (props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  const { currentUser } = data;
  const { pattern } = data.boardInfo;
  const { useNotations } = data.styling;
  const [zoom, setZoom] = STATES(context).zoom;
  const [, setConfigModalOpen] = STATES(context).cfgModalOpen;
  const [flip, setFlip] = STATES(context).flip;
  const [, setMouseCoords] = STATES(context).mouseCoords;

  return (
    <Window.Content
      onMouseMove={(e) => {
        setMouseCoords({
          x: e.clientX,
          y: e.clientY,
        });
      }}
      onMouseUp={(e) => {
        // If mouse is released outside boardgame__board-inner, delete the held piece
        const board = document.getElementsByClassName('boardgame__board-inner')[0];
        if (board) {
          let x = e.clientX;
          let y = e.clientY;
          const boardRect = board.getBoundingClientRect();
          if (x < boardRect.left || x > boardRect.right || y < boardRect.top || y > boardRect.bottom) {
            act('heldPiece', { heldPiece: null });
          }
        }
      }}
      fitted
      className="boardgame__window">
      {(currentUser?.palette || currentUser?.selected) && <HeldPieceRenderer />}
      <Box className="boardgame__debug">
        Zoom: {zoom}
        <Button.Checkbox checked={flip} onClick={() => setFlip(!flip)}>
          Flip board
        </Button.Checkbox>
        <Button title={'Setup'} icon={'cog'} onClick={() => setConfigModalOpen(true)} />
      </Box>
      <Flex className="boardgame__wrapper">
        <div
          className={`boardgame__board-inner`}
          style={{
            width: '1000px',
          }}>
          {!!useNotations && <Notations direction={'horizontal'} />}
          <Flex className={`boardgame__board`}>
            {!!useNotations && <Notations direction={'vertical'} />}
            <Pattern pattern={pattern} />
            {!!useNotations && <Notations direction={'vertical'} />}
          </Flex>
          {!!useNotations && <Notations direction={'horizontal'} />}
        </div>
      </Flex>
      <PieceDrawer />
    </Window.Content>
  );
};
