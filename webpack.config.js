const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfig = (env) => {
    const isProduction = env === "production";

    return {
        entry: ["@babel/polyfill", "./src/app.js"],
        output: {
            path: path.join(__dirname, "./public", "dist"),
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
                use: [ {
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            }]
        },
        devServer: {
            contentBase: path.join(__dirname, "./public"),
            publicPath: "/dist/",
            historyApiFallback: true
        },
        devtool: isProduction ? "source-map" : "inline-source-map",
        plugins:[
            new MiniCssExtractPlugin({
                filename: "styles.css"
            })
        ],
    };
};

module.exports = webpackConfig;