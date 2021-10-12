import FriendlyErrorsPlugin from '@nuxtjs/friendly-errors-webpack-plugin';
import { resolve } from 'path';
import { Configuration } from 'webpack';
import WebpackBar from 'webpackbar';

const projectRoot = resolve(__dirname, '../../');
const commonWebpackConfig: Configuration = {
    target: 'node',
    entry: resolve(projectRoot, 'src/extension.ts'),
    output: {
        clean: true,
        library: {
            type: 'commonjs2',
        },
        path: resolve(projectRoot, 'out'),
        filename: 'extension.js',
        devtoolModuleFilenameTemplate: '../[resource-path]',
    },
    resolve: { extensions: ['.ts', '.js'] },
    externals: {
        vscode: 'commonjs vscode',
        typescript: 'commonjs typescript',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    configFile: resolve(projectRoot, 'tsconfig.json'),
                },
            },
        ],
    },
    plugins: [
        new WebpackBar({
            name: 'VSCode extension',
            color: '#0066B8',
        }),
        new FriendlyErrorsPlugin(),
    ],
};

export default commonWebpackConfig;
