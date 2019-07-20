const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "test") {
    require("dotenv").config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "development") {
    require("dotenv").config({ path: ".env.development" });
}

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
            }),
            new webpack.DefinePlugin({
                "process.env.FIREBASE_API_KEY": Json.stringfy(process.env.FIREBASE_API_KEY),
                "process.env.FIREBASE_AUTH_DOMAIN": Json.stringfy(process.env.FIREBASE_AUTH_DOMAIN),
                "process.env.FIREBASE_DATABASE_URL": Json.stringfy(process.env.FIREBASE_DATABASE_URL),
                "process.env.FIREBASE_PROJECT_ID": Json.stringfy(process.env.FIREBASE_PROJECT_ID),
                "process.env.FIREBASE_STORAGE_BUCKET": Json.stringfy(process.env.FIREBASE_STORAGE_BUCKET),
                "process.env.FIREBASE_MESSAGING_SENDER_ID": Json.stringfy(process.env.FIREBASE_MESSAGING_SENDER_ID),
                "process.env.FIREBASE_APP_ID": Json.stringfy(process.env.FIREBASE_APP_ID)
            })
        ],
    };
};

module.exports = webpackConfig;