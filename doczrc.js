import path from 'path';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import FilterWarningsPlugin from 'webpack-filter-warnings-plugin';

import pkg from './package.json';

export default {
  src: './',
  public: './public',
  title: 'Ztopia UI',
  description: pkg.description,
  theme: 'docz-theme-ztopia',
  notUseSpecifiers: true,
  typescript: true,
  htmlContext: {
    head: {
      raw: [
        '<script src="https://kit.fontawesome.com/fe2f496166.js"></script>',
      ],
    },
  },
  /** Control menu order */
  menu: [
    { name: 'Docs', menu: ['Introduction', 'Getting Started', 'Contributing'] },
    { name: 'Components', menu: ['Button'] },
  ],
  filterComponents: files =>
    files.filter(file => /([^d]\.(t|j)sx?)$/.test(file)),
  modifyBundlerConfig: (config, isDev) => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.css$/,
          include: [
            path.resolve(__dirname, './components'),
            path.resolve(__dirname, './helpers'),
          ],
          use: [
            isDev
              ? {
                  loader: 'style-loader',
                  options: {
                    sourceMap: true,
                  },
                }
              : {
                  loader: MiniCssExtractPlugin.loader,
                },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: isDev,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        },
      ],
    },
    optimization: {
      ...config.optimization,
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          styles: {
            chunks: 'all',
            name: 'styles',
            test: module => /(\.module)?\.css$/.test(module.type),
            enforce: true,
          },
        },
      },
    },
    plugins: [
      ...config.plugins,
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[hash].css',
      }),
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      }),
    ],
  }),
  themeConfig: {
    logo: {
      src: '/public/images/logo.png',
    },
  },
};
