import { useBackend } from '../../../backend';
import { Window } from '../../../layouts';
import { Box, Flex, Button } from '../../../components';
import { WindowTitleBar } from '../WindowComponents';

type GpcTestProgramData = {};

export const GpcTestProgram = (props, context) => {
  const { act, data } = useBackend<GpcTestProgramData>(context);

  return (
    <Box position="fixed" ml={`${50}px`} mt={`${50 + 32}px`} width={30} height={20} className="goonpc__window">
      <WindowTitleBar />
    </Box>
  );
};
