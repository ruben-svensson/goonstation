import { useBackend, useLocalState } from '../../../backend';
import { Button, Divider, Dropdown, Flex, TextArea } from '../../../components';
import { getPiecesByGame } from '../Pieces';
import { BoardgameData } from '../types';

declare const React;

export const FenCodeSettings = (_props, context) => {
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
};
