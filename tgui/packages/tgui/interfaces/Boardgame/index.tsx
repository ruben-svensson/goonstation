declare const React;
declare const twemoji;

import { Window } from '../../layouts';
import { Box, Button, Dimmer, Flex } from '../../components';
import { useBackend, useLocalState } from '../../backend';
import { Pattern } from './Patterns';
import { BoardgameData, Piece, User } from './types';

import { adjustWindowSize, getFirstTileDimensions } from './helpers';
import { PieceDrawer } from './Components/PieceDrawer';

import { FenCodeSettings, FloatingPiece, Notations } from './Components';
import { fenCodeRecordFromPieces, fetchPieces, getPiece, PieceType } from './Pieces';

export type GhostPieceProps = {
  user: User;
  piece: PieceType;
  x: number;
  y: number;
  width: number;
  height: number;
};

export const GhostPiece = ({ user, piece, x, y, width, height }: GhostPieceProps) => {
  return (
    <Box
      className="boardgame__ghostpiece"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        width: `${width}px`,
        height: `${height}px`,
        'max-width': `${width}px`,
        'max-height': `${height}px`,
      }}>
      <img src={piece.image} />
      <span>{user.name}</span>
    </Box>
  );
};

export const GhostPiecesContainer = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { users } = data;
  const { width, height } = data.boardInfo;
  const [flip, setFlip] = useLocalState(context, 'flip', false);
  // Loop through every object in users

  const widthPercentage = 100 / width;
  const heightPercentage = 100 / height;

  const additionalWidth = 24;
  const additionalHeight = 32 + 24;
  return <Box />;
  /*
  if (users) {
    return (
      <Box>
        {Object.keys(users).map((key) => {
          const user: User = users[key];
          const { selected } = user;
          if (selected) {
            const firstTile = getFirstTileDimensions();
            const { code, game, x, y } = selected;
            const xPos = additionalWidth + firstTile.width * x - firstTile.width;
            let yPos = additionalHeight + firstTile.height * y - firstTile.height;

            if (flip) {
              yPos = additionalHeight + firstTile.height * (height - y);
            }

            const piece = getPiece(code, game);

            if (x === 0 && y === 0) {
              return;
            }

            return (
              <GhostPiece
                user={user}
                key={key}
                piece={piece}
                x={xPos}
                y={yPos}
                width={firstTile.width}
                height={firstTile.height}
              />
            );
          }
        })}
      </Box>
    );
  }*/
};

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
        <GhostPiecesContainer />
        <Box
          style={{
            'position': 'fixed',
            'top': translateCoords.y + 20 + 32 + 'px',
            'left': translateCoords.x + 20 + 'px',
            'width': `${tileSize.width || 0}px`,
            'height': `${tileSize.height || 0}px`,
            'z-index': 100,
            'background-color': 'rgba(255, 255, 255, 0.5)',
          }}
        />
        {(currentUser?.palette || currentUser?.selected) && <HeldPieceRenderer />}
        <Box className="boardgame__debug">
          no: {useNotations ? 'Enabled' : 'Disabled'}
          tc: {translateCoords.x}, {translateCoords.y}
          mc: {mouseCoords.x}, {mouseCoords.y}
          ts: {tileSize.width}, {tileSize.height}
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
