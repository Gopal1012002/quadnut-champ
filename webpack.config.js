const webpack = require('webpack');

module.exports = {
    // Other Webpack configuration
    plugins: [
        // Other plugins
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
    ],
};
