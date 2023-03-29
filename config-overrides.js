// This function allows polyfill for create-react-app without having to use eject.
module.exports = function override(config, env) {
    console.log('Polyfill override for create-react-app');
    const loaders = config.resolve;
    loaders.fallback = {
        'path': require.resolve('path-browserify'),
    };
    // This enables testing for service worker scripts. Should be disabled.
    config.devServer = {
        host: '0.0.0.0',
        port: 3000,
        hot: false,
    };
    return config;
};
