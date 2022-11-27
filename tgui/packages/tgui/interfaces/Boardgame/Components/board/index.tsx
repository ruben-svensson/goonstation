import CheckerBoard from './patterns/CheckerBoard';
import { Notations } from '../';
import { Flex } from '../../../../components';
import { BoardgameData } from '../../utils/types';
import { useBackend } from '../../../../backend';

export const Board = (props, context) => {
  const { act, data } = useBackend<BoardgameData>(context);
  return (
    <Flex className="boardgame__wrapper">
      <div className={`boardgame__board-inner`}>
        <Notations direction={'horizontal'} />
        <Flex className={`boardgame__board`}>
          <Notations direction={'vertical'} />
          <Flex.Item grow>
            <CheckerBoard />
          </Flex.Item>
          <Notations direction={'vertical'} />
        </Flex>
        <Notations direction={'horizontal'} />
      </div>
    </Flex>
  );
};
