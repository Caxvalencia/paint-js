import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
    mode: process.env.NODE_ENV,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};

export default config;
