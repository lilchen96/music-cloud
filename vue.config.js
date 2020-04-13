const dev = "";

module.exports = {
  lintOnSave: false,
  outputDir: "dist",
  assetsDir: "assets",
  productionSourceMap: false,
  transpileDependencies: ["@antv"],
  devServer: {
    host: "0.0.0.0",
    port: 8000,
    proxy: {
      // "/music": {
      //   target: dev,
      //   changeOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     "^/music": "/"
      //   }
      // },
      "/example": {
        target: " http://192.168.1.53:7300/mock/5cc14d54d441812414780993",
        changeOrigin: true,
        ws: true
      }
    },
    sockHost: "http://127.0.0.1:8080"
  },
  parallel: require("os").cpus().length > 1,
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {},
    requireModuleExtension: true
  }
};
