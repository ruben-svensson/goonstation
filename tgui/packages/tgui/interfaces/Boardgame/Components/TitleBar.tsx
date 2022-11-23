declare const React;
import { Box, Button, Flex } from '../../../components';
import { useBackend } from '../../../backend';
import { BoardgameData } from '../utils/types';
import { useStates } from '../utils/config';

export const TitleBar = (props, context) => {
  const { isFlipped, toggleFlip, openModal } = useStates(context);

  return (
    <Box className="boardgame__debug">
      <Button.Checkbox checked={isFlipped} onClick={toggleFlip}>
        Flip board
      </Button.Checkbox>
      <Button icon={'cog'} onClick={openModal}>
        Setup
      </Button>
    </Box>
  );
};

export default TitleBar;
