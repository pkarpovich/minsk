const { useBabelRc, override, addWebpackModuleRule } = require("customize-cra");

module.exports = override(
  useBabelRc(),
  addWebpackModuleRule({
    test: /\.(js|tsx)$/,
    use: [
      { loader: "babel-loader" },
      {
        loader: "@linaria/webpack-loader",
        options: {
          cacheDirectory: "src/.linaria_cache",
          sourceMap: process.env.NODE_ENV !== "production",
        },
      },
    ],
  }),
  addWebpackModuleRule({
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  }),
  addWebpackModuleRule({
    test: /\.jpe?g$/,
    loaders: [
      {
        loader: "lqip-loader",
        options: {
          path: "/media", // your image going to be in media folder in the output dir
          name: "[name].[ext]", // you can use [hash].[ext] too if you wish,
          base64: true, // default: true, gives the base64 encoded image
          palette: true, // default: false, gives the dominant colours palette
        },
      },
    ],
  })
);
