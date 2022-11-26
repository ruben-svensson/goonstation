import { Component } from 'inferno';

export default abstract class Pattern extends Component {
  constructor(context: any) {
    super(context);
  }
  /**
   * Triggered whenever the user places a piece on the board.
   * Returns void
   */
  abstract onPlace(x: number, y: number);
}
