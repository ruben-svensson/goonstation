declare const React;

import { Window } from '../../layouts';
import { useBackend } from '../../backend';
import { BoardgameData } from './utils/types';
import { ConfigModal, HeldPieceRenderer } from './components';
import { Component } from 'inferno';
import { BoardgameContents } from './components/BoardgameContents';
import { adjustSizes } from './utils/window';
import TitleBar from './components/TitleBar';
import { useStates } from './utils/config';

export class Boardgame extends Component<BoardgameData, any> {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    // Adjust window size
    adjustSizes(this.context);
  }

  render() {
    const { data } = useBackend<BoardgameData>(this.context);
    const { tileSize } = useStates(this.context);
    const name = data?.boardInfo?.name || 'Boardgame';

    return (
      <Window title={name + ` width: ${tileSize.width}, height: ${tileSize.height}`} width={580} height={512}>
        <ConfigModal />
        <TitleBar />
        <BoardgameContents />
      </Window>
    );
  }
}
