const path = require('path');

const config = {
    mode: process.env.NODE_ENV || 'production',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
};

module.exports = config;
