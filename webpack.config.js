const path = require("path");

module.exports = {
   mode: "development",
   devtool: "source-map",
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
               presets: ["@babel/preset-react"]
            }
         },
         {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
         }
      ]
   },
   resolve: {
      extensions: [".js"],
      alias: {
         "@": path.resolve(__dirname, "src")
      }
   },
   performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
   }
};