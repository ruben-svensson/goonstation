import { classes } from 'common/react';
import { useBackend, useLocalState } from '../../backend';
import { Flex, Box, TextArea, Button } from '../../components';
import { Window } from '../../layouts';

// Valid chars:  ><+-[]{}()'^,$@#.~

type NewChemiCompilerData = {
  sx: number;
  tx: number;
  ax: number;
};

export const NewChemiCompiler = (props, context) => {
  const { act, data } = useBackend<NewChemiCompilerData>(context);

  const { sx, tx, ax } = data;

  const [lineNumbersText, setLineNumbersText] = useLocalState(context, 'lineNumbersText', '1');
  const [codeText, setCodeText] = useLocalState(context, 'codeText', '');

  const runCode = () => {
    const trimmedCode = codeText.replace('\n', '').trim();
    act('runCode', { code: trimmedCode });
  };

  const handleCodeChange = (ev) => {
    const value = ev.target.value;
    if (ev.key === 'Enter' || value) {
      const lines = value.split('\n');
      const lineText = lines
        .map((line, index) => {
          return index + 1;
        })
        .join('\n');
      setLineNumbersText(lineText);
    }
  };

  return (
    <Window width={678} height={452}>
      <Window.Content className="newcc__content" fitted>
        <Box className="panel newcc__operations">
          <h1>ChemiCompiler CCS1001</h1>
          <Box className="newcc__ide">
            <TextArea disabled className="newcc__linenumbers" value={lineNumbersText} />
            <TextArea
              className="newcc__code"
              value={codeText}
              onChange={(ev, value) => setCodeText(value)}
              onKeyUp={(ev) => handleCodeChange(ev)}
            />
          </Box>
          <Button onClick={() => runCode()}>Run</Button>
        </Box>

        <Box className="panel newcc__options">
          <Box className="newcc_slots-wrapper newcc_resslots-wrapper">
            <h3>Reservoirs</h3>
            <Box className="newcc_slotcontainer">
              <Box className="newcc_slot">0/100</Box>
              <Box className="newcc_slot">None</Box>
              <Box className="newcc_slot">None</Box>
              <Box className="newcc_slot">None</Box>
              <Box className="newcc_slot">None</Box>
              <Box className="newcc_slot">None</Box>
              <Box className="newcc_slot">None</Box>
              <Box className="newcc_slot">None</Box>
              <Box className="newcc_slot">None</Box>
              <Box className="newcc_slot">None</Box>
            </Box>
          </Box>
          <Box className="newcc_slots-wrapper">
            <Box>SX: {sx}</Box>
            <Box>TX: {tx}</Box>
            <Box>AX: {ax}</Box>
          </Box>
          <Box className="newcc_slots-wrapper">
            <h3>Memory</h3>
            <Box className="newcc_slotcontainer">
              <Box className="newcc_slot">M1</Box>
              <Box className="newcc_slot">M2</Box>
              <Box className="newcc_slot">M3</Box>
              <Box className="newcc_slot">M4</Box>
              <Box className="newcc_slot">M5</Box>
              <Box className="newcc_slot">M6</Box>
            </Box>
          </Box>
        </Box>
      </Window.Content>
    </Window>
  );
};
