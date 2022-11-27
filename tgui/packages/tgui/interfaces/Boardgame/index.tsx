import { Window } from '../../layouts';
import { useBackend } from '../../backend';
import { BoardgameData } from './utils/types';
import { ConfigModal, HeldPieceRenderer } from './components';
import { Component } from 'inferno';
import { BoardgameContents } from './components/common/BoardgameContents';
import { adjustSizes, handleEvents } from './utils/window';
import TitleBar from './components/common/TitleBar';
import { Icon, Box, Modal } from '../../components';
import { useStates } from './utils/config';

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
      <Window title={name} width={580} height={512}>
        <ConfigModal />
        <HelpModal />
        <TitleBar />
        <HeldPieceRenderer />
        <BoardgameContents />
      </Window>
    );
  }
}

const HelpModal = (props, context) => {
  const { mouseCoords, helpModalClose, isHelpModalOpen } = useStates(context);

  // If mouse > window height/2, render above mouse
  const winHeight = window.innerHeight;
  const topValue = mouseCoords.y > winHeight / 2 ? 20 : winHeight - 100;

  if (!isHelpModalOpen) return null;

  return (
    <Modal onClick={helpModalClose}>
      <Box>
        <p>
          <Icon name="mouse" /> Click on a piece to select, click on a tile to move it there.
        </p>
        <p>
          <i>or</i>
        </p>
        <p>Hold the piece, and drop it at the tile to move it.</p>
        <p>Right click a piece to delete it.</p>
        <i>Click anywhere to hide this panel.</i>
      </Box>
    </Modal>
  );
};

HelpModal.defaultHooks = {
  shouldComponentUpdate: () => false,
};
