const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const pkg = require('./package.json');
const outDir = './dist';
const context = __dirname;

module.exports = {
    entry: {
        [pkg.name]: './src/index.ts',
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, outDir),
        library: 'ZtopiaUI',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    context,
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.ts',
            '.tsx',
            '.css',
            '.scss',
            '.svg',
            '.jpg',
        ],
        modules: ['node_modules', 'src'],
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            // There should be 1 cpu for the fork-ts-checker-webpack-plugin.
                            workers: require('os').cpus().length - 1,
                        },
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                            ],
                            plugins: ['@babel/plugin-transform-runtime'],
                            cacheDirectory: true,
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            // IMPORTANT! Use happyPackMode mode to speed-up
                            // compilation and reduce errors reported to webpack.
                            happyPackMode: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            tslint: true,
            // watch is optional but improves performance (fewer stat calls).
            watch: ['./src', './test'],
        }),
    ],
};
