export type PresetType = {
  name: string;
  game: string;
  description: string;
  setup: string;
  boardWidth: number;
  boardHeight: number;
  setupTrigger?: () => void;
};

const presets: PresetType[] = [];

presets.push({
  name: 'Chess',
  game: 'chess',
  description: 'The classic game of chess.',
  setup: '',
  boardWidth: 8,
  boardHeight: 8,
  setupTrigger: function () {
    // Randomize setup
    const randomize = Math.random() > 0.5;
    if (randomize) {
      this.setup = 'blabla';
    } else {
      this.setup = 'blablala';
    }
  },
});

export const getPresetsBySize = (width: number, height: number): PresetType[] => {
  return presets.filter((preset) => preset.boardWidth === width && preset.boardHeight === height);
};

export default presets;
