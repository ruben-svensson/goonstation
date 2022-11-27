import { Box, Button } from '../../../../components';
import { useStates } from '../../utils/config';

export const TitleBar = (props, context) => {
  const { isFlipped, toggleFlip, openModal, closeModal, isModalOpen, helpModalOpen } = useStates(context);

  return (
    <Box className="boardgame__titlebar">
      <Button icon="question" onClick={() => helpModalOpen()} />
      <Button onClick={toggleFlip}>Flip board</Button>
      <Button>Clear board</Button>
      <SetupButton />
    </Box>
  );
};

type SetupButtonProps = {};
const SetupButton = (props, context) => {
  const { isFlipped, toggleFlip, openModal, closeModal, isModalOpen } = useStates(context);

  const bgColor = isModalOpen ? '#f2711c' : 'default';
  const textColor = isModalOpen ? 'white' : 'white';

  return (
    <Button
      icon={'cog'}
      onClick={() => {
        if (isModalOpen) {
          closeModal();
        } else {
          openModal();
        }
      }}
      style={{
        'background-color': bgColor,
        'color': textColor,
      }}>
      {isModalOpen ? 'Close' : 'Setup'}
    </Button>
  );
};

/* SetupButton.defaultHooks = {
  shouldComponentUpdate: () => false,
};*/

export default TitleBar;
