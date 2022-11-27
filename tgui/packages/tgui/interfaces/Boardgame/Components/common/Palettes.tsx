import { useBackend } from '../../../backend';
import { BoardgameData } from '../utils/types';
import { Piece } from '..';
import { fetchPalettes, PieceSetupType } from '../games';
import { Box, Button, Flex } from '../../../components';
import { useActions, useStates } from '../utils/config';
import { classes } from 'common/react';

export const Palettes = (props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { isExpanded } = useStates(context);
  return (
    <Box className={'boardgame__palettes'}>
      {fetchPalettes().map((set, i) => (
        <Box key={set.name}>
          <Box className={'boardgame__palettes-header'}>
            <PaletteExpandButton index={i} setId={set.name} />
          </Box>

          <Flex className={`boardgame__palettes-set ${isExpanded(i) ? '' : 'boardgame__palettes-set-minimized'}`}>
            {set.pieces.map((piece) => (
              <Palette key={piece.name} piece={piece} />
            ))}
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

type PaletteProps = {
  piece: PieceSetupType;
};

const Palette = ({ piece }: PaletteProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { currentUser } = data;

  const { paletteSet } = useActions(act);

  return (
    <Flex.Item
      className="boardgame__palettes-set-piece"
      key={piece.name}
      onMouseDown={() => paletteSet(currentUser.ckey, piece.code)}>
      <Piece piece={piece} isPresetPiece />
    </Flex.Item>
  );
};

type PaletteExpandButtonProps = {
  index: number;
  setId: string;
};

const PaletteExpandButton = ({ index, setId }: PaletteExpandButtonProps, context) => {
  const { isExpanded, togglePalette } = useStates(context);
  return (
    <Button.Checkbox
      className={classes(['boardgame__palettes-set-toggle'])}
      checked={isExpanded(index)}
      onClick={() => togglePalette(index)}>
      {setId}
    </Button.Checkbox>
  );
};
