import { Window } from '../layouts';
import { Divider, Marquee } from '../components';

export const Freezer = (props, context) => {
  return (
    <Window title="Freezer" width={320} height={215}>
      <Window.Content>
        <Marquee duplicate speed={3} direction="west">
          This is not an ad, we don't even have them in Sweden.
        </Marquee>
        <Divider />
        <Marquee duplicate speed={9} direction="east">
          For real though, this is a marquee component.
        </Marquee>
        <Divider />
        <Marquee duplicate speed={3} direction="west">
          When you need to scroll text, this is the component for you.
        </Marquee>
        <Divider />
        <Marquee duplicate speed={3} direction="west">
          <Marquee duplicate speed={6} direction="east">
            After all, it's a marquee.
          </Marquee>
        </Marquee>
      </Window.Content>
    </Window>
  );
};
