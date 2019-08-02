const colorPalette = {
  'white-light': '#f8f9fb',
  white: '#e5e8ec',
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
  'box-shadow-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  'box-shadow-2': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  'box-shadow-3': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  'box-shadow-4': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
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
