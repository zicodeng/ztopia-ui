import fs from 'fs-extra';

import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';
import typescript from 'typescript';
import typescript2 from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import chalk from 'chalk';

import buildCache from './build-cache.json';
import pkg from './package.json';

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';

console.log(chalk.green(`Building ${pkg.name} for ${NODE_ENV}...`));

fs.removeSync('./dist');

const components = buildCache.diff;

export default components.map((compName, i) => ({
  treeshake: false,
  input: `./components/${compName}/index.ts`,
  output: { file: `./dist/${compName}/index.js`, format: 'esm' },
  external: id =>
    id.startsWith('../') ||
    (!id.startsWith('.') && !id.startsWith('/') && !id.endsWith('css')),
  onwarn: warning => {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    console.warn(`(!) ${warning.message}`);
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    url({
      emitFiles: false,
      limit: 5000 * 1024, // 5Mb
    }),
    commonjs({}),
    typescript2({
      typescript,
      clean: true,
      useTsconfigDeclarationDir: true,
    }),
    postcss({}),
    isDev ? null : terser(),
    i === components.length - 1 && !isDev
      ? copy({
          verbose: true,
          targets: [
            {
              src: ['./package.json', './README.md', './styles'],
              dest: './dist',
            },
          ],
        })
      : null,
  ],
}));
