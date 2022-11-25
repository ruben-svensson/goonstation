import { Window } from '../../layouts';
import { useBackend } from '../../backend';
import { BoardgameData } from './utils/types';
import { ConfigModal, HeldPieceRenderer } from './components';
import { Component } from 'inferno';
import { BoardgameContents } from './components/BoardgameContents';
import { adjustSizes, handleEvents } from './utils/window';
import TitleBar from './components/TitleBar';

export class Boardgame extends Component<BoardgameData, any> {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    handleEvents(this.context);

    // Adjust window size
    adjustSizes(this.context);
  }

  render() {
    const { data } = useBackend<BoardgameData>(this.context);
    const name = data?.boardInfo?.name || 'Boardgame';

    return (
      <Window title={name + ` palette: ${data.currentUser?.palette || 'None'}`} width={580} height={512}>
        <ConfigModal />
        <TitleBar />
        <HeldPieceRenderer />
        <BoardgameContents />
      </Window>
    );
  }
}
