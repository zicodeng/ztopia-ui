import fs from 'fs-extra';

import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';
import tslint from 'rollup-plugin-tslint';
import progress from 'rollup-plugin-progress';
import typescript from 'typescript';
import typescript2 from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import chalk from 'chalk';

import pkg from './package.json';

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';

console.log(chalk.green(`Building ${pkg.name} for ${NODE_ENV}...`));

fs.removeSync('./dist');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const onwarn = warning => {
  if (warning.code === 'CIRCULAR_DEPENDENCY') {
    return;
  }
  console.warn(`(!) ${warning.message}`);
};

const components = ['Toast'] || fs.readdirSync('./components');

export default components
  .filter(c => !c.startsWith('.'))
  .map(c => ({
    input: `./components/${c}/index.ts`,
    output: { file: `./dist/${c}/index.js`, format: 'esm' },
    external: id =>
      id.startsWith('../') ||
      (!id.startsWith('.') && !id.startsWith('/') && !id.endsWith('css')),
    onwarn,
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      }),
      resolve({
        extensions,
      }),
      url({
        emitFiles: false,
        limit: 5000 * 1024, // 5Mb
      }),
      commonjs({}),
      typescript2({
        typescript,
        useTsconfigDeclarationDir: true,
      }),
      postcss({}),
      progress({}),
      tslint({
        configuration: './tslint.json',
        include: [/\*.tsx?/],
      }),
      isDev ? null : terser(),
    ],
  }));
