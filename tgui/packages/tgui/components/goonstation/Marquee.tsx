import { Component, createRef } from 'inferno';

type MarqueeProps = {
  behavior?: 'scroll' | 'slide' | 'alternate'; // How the marquee behaves
  direction?: 'left' | 'right' | 'up' | 'down'; // Direction of the marquee
  loop?: number; // Number of times to loop the marquee. -1 for infinite
  scrollamount?: number; // In pixels
  scrolldelay?: number; // In milliseconds
  truespeed?: boolean; // If true, the marquee will scroll at a constant speed
  characterScroll?: boolean; // If true, the marquee will scroll by character instead of by pixel
  onBounce: () => void; // Called when the marquee bounces
  onFinish: () => void; // Called when the marquee finishes
  onStart: () => void; // Called when the marquee starts
};

type MarqueeState = {
  scrolling: boolean; // If true, the marquee is scrolling
};

export class Marquee extends Component<MarqueeProps, MarqueeState> {
  spanRef = createRef<HTMLSpanElement>();

  constructor(props: MarqueeProps) {
    super(props);
  }

  /**
   * Starts scrolling of the marquee.
   */
  start = () => {
    // this.setState({ scrolling: true });
  };

  /**
   * Stops scrolling of the marquee.
   */

  stop = () => {
    // this.setState({ scrolling: false });
  };

  componentDidMount() {
    this.props.onStart();
  }

  render() {
    return <div >;
  }
}
