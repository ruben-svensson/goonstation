import CheckerBoard from './styles/checkerboard';
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
            <DesignSelector />
          </Flex.Item>
          <Notations direction={'vertical'} />
        </Flex>
        <Notations direction={'horizontal'} />
      </div>
    </Flex>
  );
};

const DesignSelector = (props, context) => {
  const { data } = useBackend<BoardgameData>(context);
  const { design } = data.boardInfo;
  switch (design) {
    // Apply new designs here
    case 'checkerboard':
      return <CheckerBoard />;
    default:
      return <div>Unknown design: {design}</div>;
  }
};
