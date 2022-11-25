import { useBackend } from '../../../../../backend';
import { BoardgameData } from '../../../utils/types';
import Pattern from './Pattern';

export default class CheckerBoard extends Pattern {
  constructor(context) {
    super(context);
  }

  render() {
    const { data } = useBackend<BoardgameData>(this.context);
    return (
      <div
        style={{
          width: '100%',
          'background': data.styling.tileColor1,
          color: data.styling.tileColor2,
        }}>
        Hello
      </div>
    );
  }
}
