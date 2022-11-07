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

  const [configModalOpen, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);
  const [flip, setFlip] = useLocalState(context, 'flip', false);

  const [testNumber, setTestNumber] = useLocalState(context, 'testNumber', 0);

  const [mouseCoords, setMouseCoords] = useLocalState<{
    x: number;
    y: number;
  }>(context, 'mouseCoords', { x: 0, y: 0 });
  const [tileSize, setTileSize] = useLocalState(context, 'tileSize', {
    width: 0,
    height: 0,
  });
  const [boardSize, setBoardSize] = useLocalState(context, 'boardSize', {
    width: 250,
    height: 250,
  });

  // Run a function once without using React

  return (
    <Window title={name} width={400} height={550}>
      <FenCodeSettings />

      <Window.Content
        onFocusIn={() => {
          // adjustWindowSize(width, height, tileSize);
          const board = document.getElementsByClassName('boardgame__board-inner')[0];
          if (board) {
            const boardRect = board.getBoundingClientRect();
            setBoardSize({
              width: boardRect.width - 48,
              height: boardRect.height - 48,
            });
          }
        }}
        onFocusOut={() => {
          // adjustWindowSize(width, height, tileSize);
          const board = document.getElementsByClassName('boardgame__board-inner')[0];
          if (board) {
            const boardRect = board.getBoundingClientRect();
            setBoardSize({
              width: boardRect.width - 48,
              height: boardRect.height - 48,
            });
          }
        }}
        onMouseMove={(e) => {
          // adjustWindowSize(width,  height);
          const board = document.getElementsByClassName('boardgame__board-inner')[0];
          if (board) {
            const boardRect = board.getBoundingClientRect();
            setBoardSize({
              width: boardRect.width - 48,
              height: boardRect.height - 48,
            });
          }
          setMouseCoords({
            x: e.clientX,
            y: e.clientY,
          });
        }}
        onMouseUp={() => {
          /* act('pawnDeselect', {
            ckey: currentUser.ckey,
          });*/
        }}
        fitted
        className="boardgame__window">
        <GhostPiecesContainer />
        {currentUser?.selected && <HeldPieceRenderer piece={currentUser.selected} />}
        <Box className="boardgame__debug">
          {mouseCoords.x} {mouseCoords.y}
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

type HeldPieceRendererProps = {
  piece: Piece;
};

const HeldPieceRenderer = ({ piece }: HeldPieceRendererProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { currentUser } = data;

  const [mouseCoords, setMouseCoords] = useLocalState<{
    x: number;
    y: number;
  }>(context, 'mouseCoords', { x: 0, y: 0 });

  const [selectedPawnSize, setSelectedPawnSize] = useLocalState(context, 'selectedPawnSize', {
    width: 50,
    height: 50,
  });
  const [tileSize, setTileSize] = useLocalState(context, 'tileSize', {
    width: 0,
    height: 0,
  });
  const [paletteSelected, setPaletteSelected] = useLocalState(context, 'paletteSelected', '');

  if (paletteSelected.length > 0) {
    const { code } = currentUser.selected;

    const pieces = fetchPieces();
    const piece: PieceType = fenCodeRecordFromPieces(pieces)[paletteSelected];

    // Draw the piece with svg fixed to the mouse

    return (
      <Box
        className="boardgame__heldpiece"
        style={{
          top: mouseCoords.y + 'px',
          left: mouseCoords.x + 'px',
          width: tileSize.width + 'px',
          height: tileSize.height + 'px',
        }}>
        <img src={piece?.image} />
        <span>{piece?.name}</span>
      </Box>
    );
  }
};
