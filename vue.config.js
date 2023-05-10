const path = require('path');

module.exports = {
    publicPath: '/',
    parallel: false,
    configureWebpack: {
        output: {
            filename: '[name].[hash].js',
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/'),
                'styles': path.resolve(__dirname, 'src/assets/scss/'),
            },
            extensions: [".ts"]
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: [],
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                }
            ],
        },
        plugins: []
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/assets/scss/main.scss";`
            }
        }
    }
}
