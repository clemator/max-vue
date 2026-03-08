import path from 'path';
import { defineConfig } from 'vite';
import createVuePlugin from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
    const baseConfig = {
        base: '/',
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
        plugins: [
            createVuePlugin({
                template: {
                    compilerOptions: {
                        comments: false,
                        whitespace: 'preserve',
                    },
                },
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@root': path.resolve(__dirname, './'),
                'styles': path.resolve(__dirname, './src/assets/scss'),
            },
        },
    };
    
    return baseConfig;
});