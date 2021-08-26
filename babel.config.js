module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        '@states': './src/states',
                        '@pages': './src/pages',
                        '@components': './src/components',
                        '@utils': './src/utils',
                        '@assets': './src/assets'
                    }
                }
            ],
            'inline-dotenv'
        ],
        env: {
            production: {
                plugins: ['react-native-paper/babel']
            }
        }
    };
};
