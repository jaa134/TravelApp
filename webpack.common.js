const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlTagsPlugin = require("html-webpack-tags-plugin");
const path = require('path');

/*
  - Copy whole Cesium files at build time with copy-webpack-plugin
  - Add tags to index.html to load JS and CSS with html-webpack-tags-plugin
  - Notify Cesium to its path with webpack define plugin
*/
const definePlugin = new webpack.DefinePlugin({
  CESIUM_BASE_URL: JSON.stringify("/cesium"),
})
const copyPlugin = new CopyPlugin({
  patterns: [
    {
      from: "node_modules/cesium/Build/Cesium",
      to: "cesium",
    },
  ],
})
const htmlTagsPlugin= new HtmlTagsPlugin({
  append: false,
  tags: ["cesium/Widgets/widgets.css", "cesium/Cesium.js"],
})
const htmlPlugin = new HtmlPlugin({
 template: "./src/index.html",
 filename: "./index.html",
 favicon: "./src/assets/images/favicon.ico"
});

module.exports = {
  externals: {
    cesium: "Cesium",
  },
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/chunks/[name].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx"]
        },
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.geojson$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [definePlugin, copyPlugin, htmlTagsPlugin, htmlPlugin]
};