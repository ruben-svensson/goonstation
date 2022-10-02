import { classes } from 'common/react';
import { useBackend } from '../backend';
import { Box, Button, Stack, Flex, Input, Knob, LabeledList } from '../components';
import { Window } from '../layouts';

type KitchenOvenData = {
  contents: string[];
  working: boolean;
  time: number;
  heat: string;
};

export const KitchenOven = (_props, context) => {
  const { act, data } = useBackend<KitchenOvenData>(context);
  const { contents, working, time, heat } = data;

  return (
    <Window width={490} height={450} title="Cookomatic Multi-Oven">
      <Window.Content fitted className="koven__content">
        <Box className="koven__panel">
          <Button>Cool</Button>
          <span>Nice</span>
        </Box>
        <Box className="koven__oven">
          <ContentList contents={contents} />
          <Box className="koven__lidclosed" />
          <Box className="koven__back">
            <Box className="koven__back-fan" />
          </Box>
        </Box>
      </Window.Content>
    </Window>
  );
};

type ContentListProps = {
  contents: string[];
};

const ContentList = (props: ContentListProps, content) => {
  const { contents } = props;
  return (
    <Stack vertical fill className="koven__ovencontents">
      {contents.map((item, index) => {
        return (
          <Stack.Item key={index}>
            <span>{item}</span>
            <Button disabled>Eject</Button>
          </Stack.Item>
        );
      })}
    </Stack>
  );
};
