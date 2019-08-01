const path = require('path');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-simple-vars')({
      variables: require('./styles/variables'),
    }),
    require('postcss-custom-media')({
      importFrom: path.resolve(__dirname, './styles/viewports.css'),
    }),
    require('postcss-nested'),
    require('postcss-extend-rule'),
    require('autoprefixer'),
    require('cssnano'),
  ],
};
