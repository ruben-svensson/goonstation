declare const React;

import { Window } from '../../layouts';
import { useBackend } from '../../backend';
import { BoardgameData } from './utils/types';
import { ConfigModal } from './components';
import { Component } from 'inferno';
import { BoardgameContents } from './components/BoardgameContents';
import { adjustAndSetBoardSizes } from './utils/window';

export class Boardgame extends Component<BoardgameData, any> {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    // Adjust window size
    adjustAndSetBoardSizes(this.context);
  }

  render() {
    const { data } = useBackend<BoardgameData>(this.context);
    const name = data?.boardInfo?.name || 'Boardgame';

    return (
      <Window title={name} width={580} height={512}>
        <ConfigModal />
        <BoardgameContents />
      </Window>
    );
  }
}
