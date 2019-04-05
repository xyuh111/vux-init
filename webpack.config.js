const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const vuxLoader = require("vux-loader")

const originalConfig = () => {
    var plugins = [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename:
                process.env.npm_lifecycle_event !== "build"
                    ? "index.html"
                    : path.resolve(__dirname, "./dist/index.html"),
            template: "index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: "dependency",
        }),
    ]
    let output
    // process 是 npm 携带的信息
    if (process.env.npm_lifecycle_event == "build") {
        plugins.push(
            new ExtractTextPlugin({
                filename: path.posix.join(
                    "static",
                    "css/[name].[contenthash].css"
                ),
                allChunks: false,
            }),
            new webpack.HashedModuleIdsPlugin(),
            // enable scope hoisting
            new webpack.optimize.ModuleConcatenationPlugin(),
            // split vendor js into its own file
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                minChunks: function(module) {
                    // any required modules inside node_modules are extracted to vendor
                    return (
                        module.resource &&
                        /\.js$/.test(module.resource) &&
                        module.resource.indexOf(
                            path.join(__dirname, "../node_modules")
                        ) === 0
                    )
                },
            }),
            // extract webpack runtime and module manifest to its own file in order to
            // prevent vendor hash from being updated whenever app bundle is updated
            new webpack.optimize.CommonsChunkPlugin({
                name: "manifest",
                minChunks: Infinity,
            }),
            // This instance extracts shared chunks from code splitted chunks and bundles them
            // in a separate chunk, similar to the vendor chunk
            // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
            new webpack.optimize.CommonsChunkPlugin({
                name: "app",
                async: "vendor-async",
                children: true,
                minChunks: 3,
            })
        )
        output = {
            path: path.resolve(__dirname, "./dist"),
            filename: path.posix.join("static", "js/[name].[chunkhash].js"),
            chunkFilename: path.posix.join("static", "js/[id].[chunkhash].js"),
        }
    } else {
        output = {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            publicPath: "/",
        }
    }
    return {
        context: path.resolve(__dirname, "./"),
        entry: ["./src/viewport.js", "./src/main.js"],
        module: {
            rules: [
                {
                    test: /\.html$/, // 识别文件的正则表达式
                    use: {
                        loader: "html-loader",
                    },
                },
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                    options: {
                        loaders:
                            process.env.npm_lifecycle_event !== "build"
                                ? {
                                      css:
                                          "vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8",
                                      less:
                                          "vue-style-loader!css-loader!px2rem-loader?remUnit=25.8&remPrecision=8!less-loader",
                                      sass:
                                          "vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8!sass-loader",
                                      scss:
                                          "vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8!sass-loader",
                                      stylus:
                                          "vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8",
                                  }
                                : {
                                      css: ExtractTextPlugin.extract({
                                          use:
                                              "css-loader!px2rem-loader?remUnit=40&remPrecision=8",
                                          fallback: "vue-style-loader",
                                      }),
                                      less: ExtractTextPlugin.extract({
                                          use:
                                              "css-loader!px2rem-loader?remUnit=25.8&remPrecision=8!less-loader",
                                          fallback: "vue-style-loader",
                                      }),
                                      sass: ExtractTextPlugin.extract({
                                          use:
                                              "css-loader!px2rem-loader?remUnit=40&remPrecision=8!sass-loader",
                                          fallback: "vue-style-loader",
                                      }),
                                      scss: ExtractTextPlugin.extract({
                                          use:
                                              "css-loader!px2rem-loader?remUnit=40&remPrecision=8!sass-loader",
                                          fallback: "vue-style-loader",
                                      }),
                                      stylus: ExtractTextPlugin.extract({
                                          use:
                                              "css-loader!px2rem-loader?remUnit=40&remPrecision=8",
                                          fallback: "vue-style-loader",
                                      }),
                                  },
                    },
                },
                {
                    test: /\.css$/,
                    loader:
                        "css-loader!px2rem-loader?remUnit=40&remPrecision=8",
                },
                {
                    test: /\.less/,
                    loader:
                        "vue-style-loader!css-loader!px2rem-loader?remUnit=20&remPrecision=8!less-loader",
                },
                {
                    test: /\.sass$/,
                    loader:
                        "vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8!sass-loader",
                },
                {
                    test: /\.scss$/,
                    loader:
                        "vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8!sass-loader",
                },
                {
                    test: /\.stylus$/,
                    loader:
                        "vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8",
                },
                {
                    test: /\.(jpg|png|gif|bmp|jpeg)$/, // 正则表达式匹配图片规则
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8192, // 限制打包图片的大小：
                                // 如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
                                name: "images/[name]-[hash:8].[ext]", // images:图片打包的文件夹；
                                // [name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
                                // [hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
                            },
                        },
                    ],
                },
            ],
        },
        plugins,
        output,
        resolve: {
            extensions: [".js", ".vue", ".json"],
            alias: {
                vue$: "vue/dist/vue.esm.js",
            },
        },
        devServer: {
            contentBase: "./dist",
            compress: true, // 开启gzip(压缩)
            port: 9000,
        },
    }
}
const webpackConfig = originalConfig()
module.exports = vuxLoader.merge(webpackConfig, {
    plugins: [
        "vux-ui",
        "progress-bar",
        {
            name: "duplicate-style",
            options: {
                cssProcessorOptions: {
                    safe: true,
                    zindex: false,
                    autoprefixer: {
                        add: true,
                        browsers: ["iOS >= 7", "Android >= 4.1"],
                    },
                },
            },
        },
    ],
})
