declare const React;

import { WebGLView } from './WebGLView';

import { Component, createRef } from 'inferno';
import { Window } from '../../layouts';

export class tDMachine extends Component {
  game: ExampleGame;

  constructor(props) {
    super(props);
    this.game = new ExampleGame();
  }

  onComponentDidMount() {}

  render() {
    return (
      <Window width={640} height={480}>
        {this.game.GameComponent()}
      </Window>
    );
  }
}

interface Game {
  abstract e(): void;

  GameComponent() {
    return <WebGLView />;
  }
}

class ExampleGame extends Game {
  draw(delta?: number) {}
}
