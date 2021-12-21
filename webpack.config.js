// TODO: make this ready for production build so files are packaged 
// and bundled into output dir. Split the shared parts of this config 
// into a shared file and move environment specific pieces into separate 
// dev and production configs. Merge shared config with environment config.
// See more: https://webpack.js.org/guides/production/

const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlTagsPlugin = require("html-webpack-tags-plugin");

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
  mode: 'development',
  entry: './src/index.jsx',
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
      },  
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ]
  },
  plugins: [definePlugin, copyPlugin, htmlTagsPlugin, htmlPlugin],
  devServer: {
    host: '0.0.0.0'
  }
};