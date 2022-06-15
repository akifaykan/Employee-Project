var path = require('path')
var webpack = require('webpack')

module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
        path:path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/
            }
        ]
    }
}