const colorPalette = {
  'white-light': '#fff',
  white: '#f2f3f5',
  'white-dark': '#cbd0d8',

  'black-light': '#464b53',
  black: '#272b31',
  'black-dark': '#101010',

  'blue-light': '#73b1f4',
  blue: '#5e9cea',
  'blue-dark': '#4b89da',

  'red-light': '#f76d82',
  red: '#eb5757',
  'red-dark': '#d94452',

  green: '#27ae60',
};

const semanticColors = {
  'color-danger': colorPalette['red'],
  'color-warning': '#ffa300',
  'color-success': colorPalette['green'],
};

const spacings = {
  'spacing-xxs': '2px',
  'spacing-xs': '4px',
  'spacing-s': '8px',
  'spacing-m': '12px',
  'spacing-l': '16px',
  'spacing-xl': '20px',
  'spacing-xxl': '24px',
};

const fonts = {
  'font-size-xs': '12px',
  'font-size-s': '14px',
  'font-size-m': '16px',
  'font-size-l': '18px',
  'font-size-xl': ' 20px',

  'font-family': 'Roboto, Arial, Helvetica, sans-serif',
};

const shadows = {
  'box-shadow-1':
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  'box-shadow-2':
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  'box-shadow-3':
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  'box-shadow-4':
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

const transitions = {
  'transition-slow': 'all 0.6s ease',
  'transition-fast': 'all 0.3s ease',
};

const zIndexLevels = {
  'z-index-level-1': '9000',
  'z-index-level-2': '8000',
  'z-index-level-3': '7000',
  'z-index-level-4': '6000',
  'z-index-level-5': '5000',
  'z-index-level-6': '4000',
  'z-index-level-7': '3000',
  'z-index-level-8': '2000',
  'z-index-level-9': '1000',
};

const semanticZIndexes = {
  'z-index-modal': zIndexLevels['z-index-level-1'],
  'z-index-drawer': zIndexLevels['z-index-level-2'],
};

module.exports = {
  ...colorPalette,
  ...semanticColors,
  ...spacings,
  ...fonts,
  ...shadows,
  ...transitions,
  ...zIndexLevels,
  ...semanticZIndexes,
};
