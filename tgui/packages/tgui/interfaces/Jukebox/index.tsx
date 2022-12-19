import { useBackend, useLocalState } from '../../backend';
import { Window } from '../../layouts';
import { Box, Button, Flex } from '../../components';
import { classes } from 'common/react';
import { Component, createRef } from 'inferno';

type JukeboxData = {};

export const Jukebox = (props, context) => {
  const { act, data } = useBackend<JukeboxData>(context);
  const [playing, setPlaying] = useLocalState(context, 'playing', false);

  return (
    <Window title={'Jukebox'} width={325} height={480}>
      <Window.Content className="Jukebox__">
        <Box className="Jukebox__content">
          <Box className="Jukebox__content-display">
            <div className="Jukebox__content-display-window">
              <div
                className={classes([
                  'Jukebox__content-display-window-vinyl',
                  playing ? 'Jukebox__content-display-window-vinyl-isplaying' : '',
                ])}
              />
            </div>
          </Box>
          <Box className="Jukebox__content-selection" />
          <SongList />
          <NewButton>
            This is a very long button, shouldn't be this long, please be a bit shorter before I go mad, yeah, that's
            right, SHORT!
          </NewButton>
        </Box>
      </Window.Content>
    </Window>
  );
};

type NewButtonProps = {
  children: any;
  text?: string;
};

type NewButtonState = {
  processedText: string; // Truncate text if it's too long, ... at the end
  transformX: number; // Transform X
};

class NewButton extends Component<NewButtonProps, NewButtonState> {
  buttonRef = createRef<HTMLDivElement>();
  textRef = createRef<HTMLDivElement>();

  state = {
    processedText: this.props.text || this.props.children,
    transformX: 0,
  };

  constructor(props) {
    super(props);
  }

  processText() {
    const button = this.buttonRef.current;
    const text = this.textRef.current;

    if (!button || !text) {
      alert(button + ' ' + text);
      return;
    }

    const buttonWidth = button.getBoundingClientRect().width;
    const textWidth = text.getBoundingClientRect().width;

    if (buttonWidth < textWidth) {
      // Truncate text
      const text = this.props.text;
      const length = text.length;
      const truncatedText = text.substr(0, length - 3) + '...';

      this.setState({
        processedText: truncatedText,
      });
    }
  }

  setTransformX(e) {
    const x = e.clientX;

    this.setState({
      transformX: x * 1.2,
    });
  }

  resetTransformX() {
    this.setState({
      transformX: 0,
    });
  }

  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    return (
      <Button ref={this.buttonRef} className="NewButton__button" onClick={() => this.processText()}>
        <div
          className="NewButton__text"
          ref={this.textRef}
          onmousemove={(e) => this.setTransformX(e)}
          onmouseleave={() => this.resetTransformX()}
          style={{
            transform: `translateX(-${this.state.transformX}px)`,
          }}>
          <span>{this.state.processedText}</span>
        </div>
      </Button>
    );
  }
}

const SongList = (props, context) => {
  return (
    <Box className="Jukebox__content-list">
      <SongListItem id={1} name="Neosoul" />
      <SongListItem id={2} name="Vintage" />
      <SongListItem id={3} name="Ultralounge" />
      <SongListItem id={4} name="Jazz Piano" />
      <SongListItem id={5} name="Midnight in Moscow" />
      <SongListItem id={6} name="The Final Countdown" />
      <SongListItem id={7} name="Empty" />
      <SongListItem id={8} name="Empty" />
      <SongListItem id={9} name="Empty" />
      <SongListItem id={10} name="Empty" />
    </Box>
  );
};

type SongListItemProps = {
  id: number;
  name: string;
};

const SongListItem = ({ id, name }: SongListItemProps, context) => {
  const { act, data } = useBackend<JukeboxData>(context);
  const [playing, setPlaying] = useLocalState(context, 'playing', false);

  const idWithZero = id < 10 ? `0${id}` : id;

  const playSong = (name: string) => {
    act('playSong', { id: name });
    setPlaying(true);
  };

  return (
    <Flex direction={id % 2 === 0 ? 'row' : 'row-reverse'} className="Jukebox__content-list-item">
      <Flex.Item
        className="Jukebox__content-list-item-id"
        onClick={() => {
          playSong(name);
        }}>
        {id
          .toString()
          .split('')
          .map((digit, index) => (
            <span key={index} className="Jukebox__content-list-item-id-digit">
              {digit}
            </span>
          ))}
      </Flex.Item>
      <Flex.Item className="Jukebox__content-list-item-name">{name}</Flex.Item>
    </Flex>
  );
};
