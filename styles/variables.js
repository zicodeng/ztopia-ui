const colorPalette = {
  'white-light': '#fff',
  white: '#f2f3f5',
  'white-dark': '#cbd0d8',

  'black-light': '#464b53',
  black: '#272b31',
  'black-dark': '#131518',

  'blue-light': '#73b1f4',
  blue: '#5e9cea',
  'blue-dark': '#4b89da',

  'red-light': '#f76d82',
  red: '#ec5564',
  'red-dark': '#d94452',

  'orange-light': '#fc8370',
  orange: '#fb6d51',
  'orange-dark': '#e8563f',

  'yellow-light': '#fcd277',
  yellow: '#fcf800',
  'yellow-dark': '#ffec40',

  'green-light': '#62ddbd',
  green: '#46cead',
  'green-dark': '#35bb9b',
};

const semanticColors = {
  'color-danger': '#d91621',
  'color-warning': '#ffa300',
  'color-success': '#33c677',
};

const spacings = {
  'spacing-xs': '5px',
  'spacing-s': '10px',
  'spacing-m': '15px',
  'spacing-l': '20px',
  'spacing-xl': '25px',
};

const fonts = {
  'font-size-xs': '12px',
  'font-size-s': '14px',
  'font-size-m': '16px',
  'font-size-l': '18px',
  'font-size-xl': ' 20px',
};

const lineHeights = {
  'line-height-xs': '0.8rem',
  'line-height-s': '1rem',
  'line-height-m': '1.2rem',
  'line-height-l': '1.8rem',
  'line-height-xl': '2.0rem',
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

module.exports = {
  ...colorPalette,
  ...semanticColors,
  ...spacings,
  ...fonts,
  ...lineHeights,
  ...shadows,
  ...transitions,
};
