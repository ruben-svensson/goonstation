declare const React;

import { classes } from 'common/react';
import { useBackend, useLocalState } from '../../../backend';
import { Box, Flex } from '../../../components';
import { BoardgameData } from '../types';

export type NotationsProps = {
  direction: 'vertical' | 'horizontal';
};

export const Notations = ({ direction }: NotationsProps, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  const { boardInfo } = data;
  const { height, width } = boardInfo;
  const { tileColour1, tileColour2 } = data.styling;
  const chars = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const heightPercentage = 100 / height;
  const widthPercentage = 100 / width;
  // loop through the board width and create a box for each
  const [flip, setFlip] = useLocalState(context, 'flip', false);
  let notationDirectionClass = '';
  if (direction === 'vertical') {
    notationDirectionClass = 'boardgame__verticalnotations';
  } else {
    notationDirectionClass = `boardgame__horizontalnotations`;
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
          {direction === 'vertical' ? height - i : flip ? chars[width - i - 1] : chars[i]}
        </Box>
      ))}
    </Flex.Item>
  );
};
