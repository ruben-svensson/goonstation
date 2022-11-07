import { useBackend, useLocalState } from '../../../backend';
import {
  Box,
  Button,
  Dimmer,
  Divider,
  Dropdown,
  Flex,
  Modal,
  Stack,
  Tabs,
  TextArea,
  Tooltip,
} from '../../../components';
import { fenCodeRecordFromPieces, fetchPieces, getPiece, getPiecesByGame, PieceType } from '../Pieces';
import { BoardgameData, Piece } from '../types';
import { presets, presetsByGame } from '../Presets';
import { getTwemojiSrc } from './Piece';

declare const React;

export const FenCodeSettings = (_props, context) => {
  const [tabIndex, setTabIndex] = useLocalState(context, 'tabIndex', 0);
  const [configModalOpen, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);

  return (
    configModalOpen && (
      <Dimmer className="boardgame__configmodal">
        <Box className="boardgame__settings">
          <Tabs>
            <Tabs.Tab selected={tabIndex === 1} onClick={() => setTabIndex(1)}>
              Config
            </Tabs.Tab>
            <Tabs.Tab selected={tabIndex === 2} onClick={() => setTabIndex(2)}>
              Presets
            </Tabs.Tab>
            <Button onClick={() => setConfigModalOpen(false)}>Close</Button>
          </Tabs>
          <Box className="boardgame__settingspart">
            {tabIndex === 1 && <ConfigTab />}
            {tabIndex === 2 && <PresetsTab />}
          </Box>
        </Box>
      </Dimmer>
    )
  );
};

const convertFenCodeToBoardArray = (fenCode: string) => {
  // For example, fenCode = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
  // Should be split into ["r", "n", "b", "q", "k", "b", "n", "r", "..." and so on]
  // The numbers add x empty spaces to the array
  // The "/" should be ignored

  const fenCodeArray = fenCode.split('/');
  const boardArray = [];

  for (const fenCodeRow of fenCodeArray) {
    const fenCodeRowArray = fenCodeRow.split('');
    for (const fenCodePiece of fenCodeRowArray) {
      if (isNaN(Number(fenCodePiece))) {
        boardArray.push(fenCodePiece);
      } else {
        for (let i = 0; i < Number(fenCodePiece); i++) {
          boardArray.push('');
        }
      }
    }
  }

  return boardArray;
};

type ConfigTooltipProps = {
  text: string;
  tooltip: string;
  link?: string;
};

const ConfigTooltip = ({ text, tooltip, link }: ConfigTooltipProps) => {
  return (
    <Tooltip position="bottom" content={tooltip}>
      <Box
        style={{
          'padding': '0 0.5em',
        }}
        position="relative">
        {text}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            style={{
              'padding': '0 0.5em',
            }}>
            (Wiki)
          </a>
        )}
      </Box>
    </Tooltip>
  );
};

const convertBoardToGNot = (width: number, height: number, pieces: Piece[]) => {
  // Convert the pieces on a board into a GNot string, comma separated
  // For example, if the board is 8x8 a string could formatted like this:
  // r,n,b,q,k,b,n,r,p,p,p,p,p,p,p,p,32,P,P,P,P,P,P,P,P,R,N,B,Q,K,B,N,R
  // The numbers are the number of empty spaces

  // The pieces have x and y coordinates, but we need to convert them to a 1D array
  // and place them in the correct order, filled with empty spaces in between

  let boardArray = Array(width * height).fill('');

  Object.keys(pieces).forEach((pieceKey) => {
    const piece = pieces[pieceKey];
    const index = piece.y * width + piece.x;
    boardArray[index] = piece.code;
  });

  let gNotString = '';
  let emptySpaces = 0;

  for (const piece of boardArray) {
    if (piece === '') {
      emptySpaces++;
    } else {
      if (emptySpaces > 0) {
        gNotString += `${emptySpaces},`;
        emptySpaces = 0;
      }
      gNotString += `${piece},`;
    }
  }

  // Remove the last comma
  gNotString = gNotString.slice(0, -1);

  return gNotString;
};

const ConfigTab = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const [configModalOpen, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);
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
        <ConfigTooltip text="GNot" tooltip="Goon Notation" link={'https://wiki.ss13.co/Main_Page'} />
        <ConfigTooltip text="FEN" tooltip="Forsyth–Edwards Notation" />
        <ConfigTooltip text="PGN" tooltip="Portable Game Notation (coming later)" />
        <ConfigTooltip text="PDN" tooltip="Portable Draughts Notation (coming later)" />
      </Box>
      <TextArea value={gnot} style={{ 'height': '250px', 'margin': '6px' }} />
      <Button
        onClick={() => {
          act('applyGNot', {
            gnot: gnot,
          });
          setConfigModalOpen(false);
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

/*
const ConfigTab = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { startingPositions } = data.boardInfo; // Key value pairs of board name and starting position
  const { width, height, game } = data.boardInfo;
  const { board } = data;

  const [disabled, setDisabled] = useLocalState(context, 'disabled', true);
  const startingPositionNames = Object.keys(startingPositions);

  // Set fencode to the first starting position as default
  const [fenCode, setFenCode] = useLocalState(context, 'fenCode', '');

  const convertBoardToFenCode = () => {
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
      <Flex direction={'column'}>
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
          content={'Swap colors'}
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

        <Button
          disabled={!allValid}
          grow={1}
          content={'Swap places'}
          onClick={() => {
            // Reverse the y axis fen code
            const swappedFenCode = fenCode.split('/').reverse().join('/');

            setFenCode(swappedFenCode);
          }}
        />
      </Flex>
    </Flex>
  );
};*/

type PieceSVGImageProps = {
  width: number;
  height: number;
  pieceData: PieceType;
};

const PieceSVGImage = ({ width, height, pieceData }: PieceSVGImageProps) => {
  // if pieceData.image exists
  // return the image
  // else return the svg

  if (pieceData?.image) {
    return <image width={width} height={height} xlinkHref={pieceData.image} />;
  }

  if (pieceData?.fenCode) {
    return <text>{pieceData.fenCode} </text>;
  }

  return;
  /** else {
    if (pieceData?.fenCode) {
      let src = getTwemojiSrc(pieceData.fenCode);
      if (src) {
        return <image width={width} height={height} xlinkHref={src} />;
      } else {
        return <text>{pieceData.fenCode}</text>;
      } */
  /*
    return (
          <text x={width / 2} y={height / 2} textAnchor="middle">
            {pieceData.fenCode}
          </text>
        );

    if (src) {
      return <image width={width} height={height} xlinkHref={src} />;
    */
};

type GenerateSvgBoardProps = {
  preset: string;
};

// Create an svg element with the boardgame specified in the boardInfo
// The board size is 128x128
const GenerateSvgBoard = ({ preset }: GenerateSvgBoardProps, context) => {
  const { data } = useBackend<BoardgameData>(context);
  const { pieces } = data;
  const { width, height, game } = data.boardInfo;
  const boardSize = width * height;
  const { tileColour1, tileColour2 } = data.styling;

  const allPieces = fetchPieces();
  const codeRecords = fenCodeRecordFromPieces(allPieces);

  const fenArray = convertFenCodeToBoardArray(preset);
  const presetArray = preset.split(',');
  let currentIndex = 0;
  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      <pattern id="pattern-checkerboard-preset" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill={tileColour1} />
        <rect x="10" y="10" width="10" height="10" fill={tileColour1} />
        <rect x="10" width="10" height="10" fill={tileColour2} />
        <rect y="10" width="10" height="10" fill={tileColour2} />
      </pattern>
      <rect width="80" height="80" fill="url(#pattern-checkerboard-preset)" />

      {
        // Draw the pieces on the board
        presetArray.map((piece, index) => {
          const pieceData = codeRecords[piece];

          // Convert index to x and y, use current index to get the piece
          const x = currentIndex % width;
          const y = Math.floor(currentIndex / width);

          // if the piece is a number, apply the number to the current index
          if (!isNaN(parseInt(piece, 10))) {
            currentIndex += parseInt(piece, 10);
          } else {
            currentIndex++;
          }

          return (
            <g key={index} transform={`translate(${x * 10}, ${y * 10})`}>
              <PieceSVGImage width={10} height={10} pieceData={pieceData} />
            </g>
          );
        })
      }
    </svg>
  );
};

/*
<svg width={128} height={128}>
      {board.map((code, index) => {
        const x = index % 8;
        const y = Math.floor(index / 8);

        const presetCode = presetArray[index];

        const piece = fenCodeRecords[presetCode];
        // Draw a tile, white if x + y is even, black if x + y is odd
        return (
          <g key={index}>
            <rect x={x * 16} y={y * 16} width={16} height={16} fill={(x + y) % 2 === 0 ? tileColour1 : tileColour2} />
            {piece && <image x={x * 16} y={y * 16} width={16} height={16} href={`${piece.image}`} />}
          </g>
        );
      })}
    </svg> */

/*
const PresetsTab = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const [configModalOpen, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);
  return (
    <Stack vertical>
      {presets.map((preset, i) => {
        return (
          <Stack.Item key={i} className="boardgame__preset">
            <Flex>
              <Flex.Item>
                <GenerateSvgBoard preset={preset.setup} />
              </Flex.Item>
              <Flex.Item className="boardgame__presetdetails">
                <h4>{preset.name}</h4>
                <p>{preset.description}</p>
                <Button
                  onClick={() => {
                    act('applyGNot', {
                      gnot: preset.setup,
                    });
                    setConfigModalOpen(false);
                  }}>
                  Apply
                </Button>
              </Flex.Item>
            </Flex>
          </Stack.Item>
        );
      })}
    </Stack>
  );
};
*/

/** <Flex>
              <Flex.Item>
                <GenerateSvgBoard preset={preset.setup} />
              </Flex.Item>
              <Flex.Item className="boardgame__presetdetails">
                <h4>{preset.name}</h4>
                <p>{preset.description}</p>
                <Button
                  onClick={() => {
                    act('applyGNot', {
                      gnot: preset.setup,
                    });
                    setConfigModalOpen(false);
                  }}>
                  Apply
                </Button>
              </Flex.Item>
            </Flex> */

const PresetsTab = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const [configModalOpen, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);
  const [selectedGame, setSelectedGame] = useLocalState(context, 'selectedGame', null);
  const presets = presetsByGame();
  // Orgainize the presets by game, key is the game name, value is the presets for that game

  // Style it in a grid

  return (
    <Flex className="boardgame__presets">
      <Dropdown />
      {Object.keys(presets).map((game, i) => {
        return (
          <Flex.Item key={i}>
            <h3>{game}</h3>
            <Flex direction="column">
              {presets[game].map((preset, i) => {
                return (
                  <Flex.Item key={i} className="boardgame__preset">
                    <Flex>
                      <Flex.Item>
                        <GenerateSvgBoard preset={preset.setup} />
                      </Flex.Item>
                      <Flex.Item grow={1} className="boardgame__presetdetails">
                        <h4>{preset.name}</h4>
                        <p>{preset.description}</p>
                      </Flex.Item>
                      <Flex.Item>
                        <Button
                          onClick={() => {
                            act('applyGNot', {
                              gnot: preset.setup,
                            });
                            setConfigModalOpen(false);
                          }}>
                          Play
                        </Button>
                        <Button
                          onClick={() => {
                            act('applyGNot', {
                              gnot: preset.setup,
                            });
                            setConfigModalOpen(false);
                          }}>
                          Info
                        </Button>
                      </Flex.Item>
                    </Flex>
                  </Flex.Item>
                );
              })}
            </Flex>
          </Flex.Item>
        );
      })}
    </Flex>
  );
};

/** const PresetsTab = (_props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const [configModalOpen, setConfigModalOpen] = useLocalState(context, 'configModalOpen', false);

  // Orgainize the presets by game, key is the game name, value is the presets for that game

  return (
    <Flex className="boardgame__presets">
      {presets.map((preset, i) => {
        return (
          <Flex.Item
            key={i}
            className="boardgame__preset"
            onClick={() => {
              act('applyGNot', {
                gnot: preset.setup,
              });
              setConfigModalOpen(false);
            }}>
            <Tooltip position="top" content={preset.name}>
              <Flex position="relative">
                <Flex.Item>
                  <GenerateSvgBoard preset={preset.setup} />
                </Flex.Item>
              </Flex>
            </Tooltip>
          </Flex.Item>
        );
      })}
    </Flex>
  );
}; */
