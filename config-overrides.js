// This function allows polyfill for create-react-app without having to use eject.
module.exports = function override(config, env) {
    console.log('Polyfill override for create-react-app');
    let loaders = config.resolve;
    loaders.fallback = {
        "path": require.resolve("path-browserify"),
    };
    return config;
};