import { Component } from 'inferno';

export default abstract class Pattern extends Component {
  constructor(context) {
    super(context);
  }

  /**
   * Triggered whenever the user places a piece on the board.
   */
  onPlace: (
    x: number,
    y: number
  ) => {
    // ToDo: Implement board to tile conversion
  };
}
