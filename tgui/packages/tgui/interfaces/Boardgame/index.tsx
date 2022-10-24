declare const React;

import { Window } from '../../layouts';
import { Box, Button, Dimmer, Divider, Dropdown, Flex, Icon, Input, Modal, TextArea } from '../../components';
import { classes } from 'common/react';
import { useBackend, useLocalState } from '../../backend';
import { getPiece, getPiecesByTeam, getPiecesByGame, TeamType } from './Pieces';
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

  const { boardInfo } = data;
  const { name, game } = boardInfo;
  const { currentUser } = data;

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
        <Dimmer full className="boardgame__configmodal">
          <Box className="boardgame__settings">
            <Button onClick={() => setConfigModalOpen(false)}>Close</Button>
            <FenCodeSettings />
          </Box>
        </Dimmer>
      )}
      <Window.Content
        onFocusIn={() => {
          adjustWindowSize();
        }}
        onMouseMove={(e) => {
          adjustWindowSize();
          if (currentUser) {
            act('mouseMove', {
              ckey: currentUser,
              x: e.clientX,
              y: e.clientY,
            });
          }
        }}
        onMouseUp={() => {
          act('pawnDeselect', {
            ckey: currentUser,
          });
        }}
        fitted
        className="boardgame__window">
        <FloatingPieces />
        <Box className="boardgame__debug">
          <h3>{currentUser}</h3>
        </Box>
        <Notations direction={'horizontal'} />
        <Flex className="boardgame__board">
          <Notations direction={'vertical'} />
          <Pattern pattern={boardInfo.pattern} />
          <Notations direction={'vertical'} />
        </Flex>
        <Notations direction={'horizontal'} />

        <Flex className="boardgame__piece-set-wrapper">
          <Box>
            <Button icon={'cog'} className="boardgame__menubutton" onClick={() => setConfigModalOpen(true)} />
          </Box>
          <Flex.Item className="boardgame__piece-set-container" grow={1}>
            <PieceSet game={game} team={'Black'} />
            <PieceSet game={game} team={'White'} />
          </Flex.Item>
        </Flex>
      </Window.Content>
    </Window>
  );
};

const FenCodeSettings = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { startingPositions } = data.boardInfo; // Key value pairs of board name and starting position
  const { width, height, game } = data.boardInfo;
  const { board } = data;

  const [disabled, setDisabled] = useLocalState(context, 'disabled', true);
  const startingPositionNames = Object.keys(startingPositions);

  // Set fencode to the first starting position as default
  const [fenCode, setFenCode] = useLocalState(context, 'fenCode', '');

  const convertBoardToFenCode = () => {
    // Convert board to fen code
    // Example code: rnbqkbnr/ppp3pp/8/8/8/8/PPP3PP/RNBQKBNR
    // the board is single array of 64 elements, each element is a piece or "" if empty
    // a new row is represented by a slash
    // add the char at the current index to the fenCode string

    let fenCode = '';
    let emptyCount = 0;

    for (let i = 0; i < board.length; i++) {
      const piece = board[i];
      if (piece) {
        if (emptyCount > 0) {
          fenCode += emptyCount;
          emptyCount = 0;
        }
        fenCode += piece;
      } else {
        emptyCount++;
      }

      if (i % width === width - 1) {
        if (emptyCount > 0) {
          fenCode += emptyCount;
          emptyCount = 0;
        }
        if (i !== board.length - 1) {
          fenCode += '/';
        }
      }
    }

    setFenCode(fenCode);
  };

  const getFenCodeLength = () => {
    // Check if the fen code is valid
    // loop though fenCode, if the fenLength ends with width * height then it is valid
    // ignore slashes, the number at index adds to the length its self

    let fenLength = 0;

    for (let i = 0; i < fenCode.length; i++) {
      const char: string = fenCode[i];

      if (char === '/') continue;

      if (isNaN(parseInt(char, 10))) {
        fenLength++;
      }

      if (!isNaN(parseInt(char, 10))) {
        fenLength += parseInt(char, 10);
      }
    }

    return fenLength;
  };

  const lengthValid = () => {
    const length = getFenCodeLength();
    if (length !== width * height) {
      return false;
    }
    return true;
  };

  const slashesValid = () => {
    // Count the number of slashes in the fen code
    // if the number of slashes is not equal to the height - 1 then it is invalid

    let slashCount = 0;

    for (let i = 0; i < fenCode.length; i++) {
      const char: string = fenCode[i];

      if (char === '/') {
        slashCount++;
      }
    }

    if (slashCount !== height - 1) {
      return false;
    }

    return true;
  };

  const charactersValid = () => {
    // Check if all the letters are inlcuded in the piece array
    // if not then it is invalid
    const pieces = getPiecesByGame(game).map((piece) => piece.fenCode);

    for (let i = 0; i < fenCode.length; i++) {
      const char: string = fenCode[i];
      // If char is a is not a number or a slash then it is a piece
      // Check if the piece is in the pieces array

      if (isNaN(parseInt(char, 10)) && char !== '/') {
        if (!pieces.includes(char)) {
          return false;
        }
      }
    }
    return true;
  };

  const allValid = lengthValid() && slashesValid() && charactersValid();

  return (
    <Flex direction={'column'}>
      <h2>Apply FEN</h2>
      <Divider />
      <span>Presets</span>
      <Dropdown
        style={{ 'width': '100%' }}
        selected={'Empty'}
        options={startingPositionNames}
        onSelected={(value) => {
          setFenCode(startingPositions[value]);
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
        <Button
          grow={1}
          content={'Get from board'}
          onClick={() => {
            convertBoardToFenCode();
          }}
        />
        <Button
          disabled={!allValid}
          grow={1}
          content={'Apply'}
          onClick={() => {
            act('applyFen', {
              fen: fenCode,
            });
          }}
        />
        <Button
          disabled={!allValid}
          grow={1}
          content={'Swap teams'}
          onClick={() => {
            // Swap between big and small letters in the fen code
            // Example: Test becomes tEST
            const swappedFenCode = fenCode
              .split('')
              .map((char) => {
                if (char === char.toUpperCase()) {
                  return char.toLowerCase();
                } else {
                  return char.toUpperCase();
                }
              })
              .join('');

            setFenCode(swappedFenCode);
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
