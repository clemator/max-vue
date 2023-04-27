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
        },
        module: {},
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
