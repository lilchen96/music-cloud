// const dev = "http://localhost:3000";
const dev = "http://192.168.2.214:3000";

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
            "/music": {
                target: dev,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/music": "/"
                }
            },
            "/example": {
                target: " http://192.168.1.53:7300/mock/5cc14d54d441812414780993",
                changeOrigin: true,
                ws: true
            }
        },
        sockHost: "http://127.0.0.1:8080"
    }
};
