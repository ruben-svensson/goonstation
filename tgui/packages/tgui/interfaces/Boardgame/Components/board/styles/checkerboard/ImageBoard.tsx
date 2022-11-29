import { useBackend } from '../../../../../../backend';
import { BoardgameData } from '../../../../utils/types';

const ImageBoard = (props, context) => {
  const { data, act } = useBackend<BoardgameData>(context);
  const { tileColor1, tileColor2 } = data.styling;

  const width = 100 / data.boardInfo.width;
  const height = 100 / data.boardInfo.height;

  return (
    <div
      style={{
        'position': 'absolute',
        'opacity': 0.1,
        'height': '100%',
        'width': '100%',
        'background-size': 'contain',
        'background-image': `url(https://static.wikia.nocookie.net/jerma-lore/images/e/e3/JermaSus.jpg)`,
      }}
    />
  );
};

export default ImageBoard;
