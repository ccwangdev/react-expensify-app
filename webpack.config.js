const path = require("path");
const webpackConfig = {
    entry: ["@babel/polyfill", "./src/app.js"],
    output: {
        path: path.join(__dirname, "./public/scripts"),
        filename: "bundle.js"
    },
    module:{
        rules:[{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: ["@babel/plugin-proposal-object-rest-spread"]
                }
            }
        }, {
            test: /\.s?css$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, "./public"),
        publicPath: "/scripts/",
        historyApiFallback: true
    },
    devtool: "cheap-module-eval-source-map"
};

module.exports = webpackConfig;