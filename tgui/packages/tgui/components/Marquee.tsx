/**
 * @file
 * @copyright 2022 Ruben Svensson (Grokberg)
 * @license MIT
 */

import { pureComponentHooks } from 'common/react';

const computeMarqueeAnimationProp = (direction: MarqueeDirection, speed: number) => {
  return `Marquee__anim-${direction} ${speed}s linear infinite;`;
};

type MarqueeDirection = 'west' | 'east' | 'north' | 'south';

type MarqueeProps = {
  children?: any;
  behavior?: 'scroll' | 'slide' | 'alternate';
  direction?: MarqueeDirection;
  speed?: number;
  duplicate?: boolean; // Place a copy of children at the end of the marquee, to create a seamless loop
  // Rest...
};

export const Marquee = ({ children, behavior, direction, duplicate, speed }: MarqueeProps) => {
  const width = direction === 'west' || direction === 'east' ? '200%' : 'auto';
  const height = direction === 'north' || direction === 'south' ? '200%' : 'auto';

  const animation = computeMarqueeAnimationProp(direction, speed);
  return (
    <div className="Marquee">
      <div className="Marquee__grid">
        <div className="Marquee__row">
          <MarqueeChild animation={animation}>{children}</MarqueeChild>
          <MarqueeChild animation={animation}>{children}</MarqueeChild>
        </div>
        <div className="Marquee__row">
          <MarqueeChild animation={animation}>{children}</MarqueeChild>
          <MarqueeChild animation={animation}>{children}</MarqueeChild>
        </div>
      </div>
    </div>
  );
};

type MarqueeChildProps = {
  children?: any;
  animation?: string;
};

const MarqueeChild = ({ children, animation }: MarqueeChildProps) => {
  return (
    <div
      className="Marquee__child"
      style={{
        animation: animation,
      }}>
      {children}
    </div>
  );
};

Marquee.defaultHooks = pureComponentHooks;
