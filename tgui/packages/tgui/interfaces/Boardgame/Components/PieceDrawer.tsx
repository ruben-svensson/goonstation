declare const React;

import { useBackend, useLocalState } from '../../../backend';
import { BoardgameData } from '../types';

import { PieceSet, sets } from '../PieceSet';
import { Box, Button, Dropdown, Flex } from '../../../components';
import { Piece } from './Piece';

export const PieceDrawer = (orps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const [expandedSets, setExpandedSets] = useLocalState<boolean[]>(context, `expandedSets`, []);

  return (
    <Box className={'boardgame__piece-set-wrapper'}>
      {sets.map((set, i) => (
        <Box key={set.name}>
          <Box
            className={'boardgame__piece-set-header'}
            style={{
              'text-align': 'center',
            }}>
            {set.name}
          </Box>
          <Flex direction={'row'} className={`boardgame__piece-set`}>
            {set.pieces.map((piece) => (
              <Flex.Item className="boardgame__piece-set__piece" key={piece.name}>
                <Piece piece={piece} isSetPiece />
              </Flex.Item>
            ))}
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

type ExpandedSetsButtonProps = {
  index: number;
  setId: string;
};

const ExpandedSetsButton = ({ index, setId }: ExpandedSetsButtonProps, context) => {
  const [expandedSets, setExpandedSets] = useLocalState<boolean[]>(context, `expandedSets${setId}`, []);

  return (
    <Button.Checkbox
      className="boardgame__piece-set-toggle"
      checked={expandedSets[index]}
      onClick={() => {
        const newExpandedSets = [...expandedSets];
        newExpandedSets[index] = !newExpandedSets[index];
        setExpandedSets(newExpandedSets);
      }}
    />
  );
};
