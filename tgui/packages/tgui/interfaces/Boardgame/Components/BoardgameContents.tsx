import { useStates, useActions } from '../utils/config';

declare const React;

import { Box, Button, Flex } from '../../../components';
import { Pattern } from './board';
import { useBackend } from '../../../backend';
import { BoardgameData } from '../utils/types';
import { Window } from '../../../layouts';
import { Notations, HeldPieceRenderer, Palettes } from '.';
import TitleBar from './TitleBar';

export const BoardgameContents = (props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { pawnCreate } = useActions(act);
  const { isFlipped } = useStates(context);

  const { currentUser } = data;
  const { pattern } = data.boardInfo;
  const { useNotations } = data.styling;

  /* const [zoom, setZoom] = states.zoom;
  const [, setConfigModalOpen] = states.modalOpen;
  const [flip, setFlip] = states.flip;
  const [, setMouseCoords] = states.mouseCoords;*/

  return (
    <Window.Content
      onMouseMove={(e) => {
        /* setMouseCoords({
          x: e.clientX,
          y: e.clientY,
        });*/
      }}
      onMouseUp={(e) => {
        // If mouse is released outside boardgame__board-inner, delete the held piece
        /* const board = document.getElementsByClassName('boardgame__board-inner')[0];
        if (board) {
          let x = e.clientX;
          let y = e.clientY;
          const boardRect = board.getBoundingClientRect();
          if (x < boardRect.left || x > boardRect.right || y < boardRect.top || y > boardRect.bottom) {
            act('heldPiece', { heldPiece: null });
          }
        }*/
      }}
      fitted
      className="boardgame__window">
      <Flex className="boardgame__wrapper">
        <div className={`boardgame__board-inner`}>
          {!!useNotations && <Notations direction={'horizontal'} />}
          <Flex className={`boardgame__board`}>
            {!!useNotations && <Notations direction={'vertical'} />}
            <Pattern pattern={pattern} />
            {!!useNotations && <Notations direction={'vertical'} />}
          </Flex>
          {!!useNotations && <Notations direction={'horizontal'} />}
        </div>
      </Flex>
      <Palettes />
    </Window.Content>
  );
};
