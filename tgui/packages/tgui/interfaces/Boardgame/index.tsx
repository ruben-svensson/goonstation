declare const React;

import { Window } from '../../layouts';
import { Box, Button, Divider, Dropdown, Flex, Input, Modal, TextArea } from '../../components';
import { classes } from 'common/react';
import { useBackend, useLocalState } from '../../backend';
import { getPiece, getPiecesByTeam, TeamType } from './Pieces';
import { PieceType } from './Pieces';
import { Pattern } from './Patterns';

import { TileSize, BoardgameData, User, StartingPosition } from './types';

const getFirstTileDimensions = () => {
  const firstTileRef = document.getElementsByClassName('boardgame__checkertile')[0];
  return {
    width: firstTileRef.clientWidth,
    height: firstTileRef.clientHeight,
  };
};

/**
 * Returns the smallest size, if equal, returns 0
 */
const getSmallestTileSize = (tile: TileSize) => {
  let dimensions: TileSize = {
    width: 0,
    height: 0,
  };

  if (tile.width > tile.height) {
    dimensions.height = tile.height;
    dimensions.width = tile.height;
  } else if (tile.width < tile.height) {
    dimensions.width = tile.width;
    dimensions.height = tile.width;
  }
  return dimensions;
};

type FloatingPieceType = {
  piece: PieceType;
  x: number;
  y: number;
};

export const Boardgame = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  const { boardInfo, styling } = data;
  const { name } = boardInfo;
  const { currentUser } = data;
  const { users } = data;

  let loc = window.location.pathname;
  let dir = loc.substring(0, loc.lastIndexOf('/'));

  const [configModalOpen, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);

  const getProperDimensions = () => {
    const firstTile = getFirstTileDimensions();
    const size = getSmallestTileSize(firstTile);

    if (size.width === 0 && size.height === 0) return;

    const additionalWidth = 48; // 48 is the width of the (notations + padding) * 2
    const additionalHeight = 200; // 190 is the height of the titlebar + (notations + padding) * 2 + piece set

    const desiredWidth = size.width * boardInfo.width + additionalWidth;
    const desiredHeight = size.height * boardInfo.height + additionalHeight;

    return {
      width: desiredWidth,
      height: desiredHeight,
    };
  };

  const adjustWindowSize = () => {
    const dimensions = getProperDimensions();

    if (!dimensions) return; // Dimensions already good if 0

    const { width, height } = dimensions;

    Byond.winset(window.__windowId__, {
      size: `${width}x${height}`,
    });
  };

  return (
    <Window title={name} width={400} height={550}>
      {configModalOpen && (
        <Modal className="boardgame__configmodal">
          <Button onClick={() => setConfigModalOpen(false)}>Close</Button>
          <FenCodeSettings />
        </Modal>
      )}
      <Window.Content
        onFocusIn={() => {
          adjustWindowSize();
        }}
        onMouseMove={(e) => {
          adjustWindowSize();
          if (currentUser) {
            act('mouseMove', {
              ckey: 'guest3464356586',
              x: e.clientX,
              y: e.clientY,
            });
          }
        }}
        fitted
        className="boardgame__window">
        <FloatingPieces />
        <Box className="boardgame__debug">
          <h3>{currentUser}</h3>
          <span>users: {JSON.stringify(data.users)}</span>
        </Box>
        <Notations direction={'horizontal'} />
        <Flex className="boardgame__board">
          <Notations direction={'vertical'} />
          <Pattern pattern={boardInfo.pattern} />
          <Notations direction={'vertical'} />
        </Flex>
        <Notations direction={'horizontal'} />

        <Box className="boardgame__piece-set-container">
          <Button className="boardgame__menubutton" icon={'cog'} onClick={() => setConfigModalOpen(true)} />
          <PieceSet game={'Chess'} team={'Black'} />
          <PieceSet game={'Chess'} team={'White'} />
        </Box>
      </Window.Content>
    </Window>
  );
};

const FenCodeSettings = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { startingPositions } = data.boardInfo;
  const { width, height } = data.boardInfo;
  const [fenCode, setFenCode] = useLocalState(context, 'fenCode', '');

  const isFenCodeValid = (fenCode: string) => {
    const cleanFenCode = fenCode.replace(/\s/g, '');

    return cleanFenCode.length > 0 && fenCode.length === width * height;
  };

  return (
    <Flex direction={'column'} className="boardgame__settings">
      <h2>Apply FEN</h2>
      <Divider />
      <span>Presets</span>
      <Dropdown
        style={{ 'width': '100%' }}
        selected={'Empty'}
        options={['Empty', 'Starting Position']}
        onSelected={(value) => {
          const selectedOption = startingPositions.find((option) => option.name === value);
          if (!selectedOption) return;
          setFenCode(selectedOption.fen);
        }}
      />
      <Divider />
      <TextArea
        className="boardgame__settings-input"
        value={fenCode}
        onChange={(e, value) => {
          setFenCode(value);
        }}
        onInput={(e, value) => {
          setFenCode(value);
        }}
      />
      <Flex>
        <Flex.Item grow={1}>Custom</Flex.Item>
        <Button
          disabled={!fenCode || fenCode.length === 0}
          grow={1}
          content={'Apply'}
          onClick={() => {
            act('applyFen', {
              fen: fenCode,
            });
          }}
        />
      </Flex>
    </Flex>
  );
};

const FloatingPieces = (_props, context) => {
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

type FloatingPieceProps = {
  user: User;
  piece: PieceType;
  x: number;
  y: number;
};

const FloatingPiece = ({ user, piece, x, y }: FloatingPieceProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);

  return (
    <Flex
      className="boardgame_floatingpiece"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}>
      <Flex.Item grow={1}>
        <img src={piece.image} />
      </Flex.Item>
      <span>{user.name}</span>
    </Flex>
  );
};

// <PieceSet game={'Chess'} />
type PieceSetProps = {
  game: string;
  team: TeamType;
};

const PieceSet = ({ game, team }: PieceSetProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { styling } = data;

  const pieces = getPiecesByTeam(team, game);

  return (
    <Flex className="boardgame__piece-set">
      {pieces.map((piece) => (
        <Flex.Item className="boardgame__piece-set__piece" key={piece.name}>
          <Piece piece={piece} isSetPiece />
        </Flex.Item>
      ))}
    </Flex>
  );
};

type PieceProps = {
  piece: PieceType;
  isSetPiece: boolean;
  position?: {
    x: number;
    y: number;
  };
};

export const Piece = ({ piece, isSetPiece, position }: PieceProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { currentUser } = data;
  const { fenCode, name, game, image, team } = piece;
  const { x, y } = position || { x: 0, y: 0 }; // Default to 0,0 if no position is provided

  return (
    <Box className="boardgame__piece">
      <img
        onMouseDown={() => {
          if (isSetPiece) {
            act('pawnSelect', {
              ckey: currentUser,
              pCode: fenCode,
              pTeam: team,
              pGame: game,
            });
          } else {
            act('pawnSelect', {
              ckey: currentUser,
              pCode: fenCode,
              pTeam: team,
              pGame: game,
            });

            act('pawnRemove', {
              ckey: currentUser,
              x,
              y,
            });
          }
        }}
        src={image}
      />
    </Box>
  );
};

type NotationsProps = {
  direction: 'vertical' | 'horizontal';
};

const Notations = ({ direction }: NotationsProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { boardInfo } = data;
  const { height, width } = boardInfo;
  const { tileColour1, tileColour2 } = data.styling;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const heightPercentage = 100 / height;
  const widthPercentage = 100 / width;
  // loop through the board width and create a box for each

  let notationDirectionClass = '';
  if (direction === 'vertical') {
    notationDirectionClass = 'boardgame__verticalnotations';
  } else {
    notationDirectionClass = 'boardgame__horizontalnotations';
  }

  return (
    <Flex.Item
      style={{
        'background-color': tileColour1,
        'color': tileColour2,
      }}
      className={classes(['boardgame__notations', notationDirectionClass])}>
      {Array.from(Array(direction === 'vertical' ? height : width).keys()).map((i) => (
        <Box
          key={i}
          style={{
            'height': direction === 'vertical' ? `${heightPercentage}%` : 'auto',
            'font-size': `${widthPercentage * 0.12}rem`,
          }}>
          {direction === 'vertical' ? i + 1 : chars[i]}
        </Box>
      ))}
    </Flex.Item>
  );
};

// <Piece piece={pieces[(x + y) % (pieces.length - 1)]} />
type PaletteProps = {
  team: string;
};
