const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
// 提取 css
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const originalConfig = env => {
    if (!env) {
        env = {}
    }
    const plugins = [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "index.html",
        }),
    ]
    if (env.production) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css",
            })
        )
    }
    return {
        mode: "development",
        entry: {
            app: "./src/main.js",
        },
        // mode: 'production',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                        },
                    },
                },
                {
                    test: /\.html$/, // 识别文件的正则表达式
                    use: {
                        loader: "html-loader",
                    },
                },
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                },
                {
                    test: /\.css$/,
                    use: [
                        // 不抽离css  vue-style-loader
                        !env.production
                            ? {
                                  loader: "vue-style-loader",
                              }
                            : {
                                  loader: MiniCssExtractPlugin.loader,
                                  options: {
                                      publicPath: "../",
                                  },
                              },
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: "[hash:base64]",
                            },
                        },
                        {
                            loader: "px2rem-loader",
                            options: {
                                remUni: 75,
                                remPrecision: 8,
                            },
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        // 不抽离css  vue-style-loader
                        !env.production
                            ? {
                                  loader: "vue-style-loader",
                              }
                            : {
                                  loader: MiniCssExtractPlugin.loader,
                                  options: {
                                      publicPath: "../",
                                  },
                              },
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: "[hash:base64]",
                            },
                        },
                        {
                            loader: "px2rem-loader",
                            options: {
                                remUni: 75,
                                remPrecision: 8,
                            },
                        },
                        {
                            loader: "sass-loader",
                        },
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        // 不抽离css  vue-style-loader
                        !env.production
                            ? {
                                  loader: "vue-style-loader",
                              }
                            : {
                                  loader: MiniCssExtractPlugin.loader,
                                  options: {
                                      publicPath: "../",
                                  },
                              },
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: "[hash:base64]",
                            },
                        },
                        {
                            loader: "px2rem-loader",
                            options: {
                                remUni: 75,
                                remPrecision: 8,
                            },
                        },
                        {
                            loader: "less-loader",
                        },
                    ],
                },
            ],
        },
        plugins,
        resolve: {
            extensions: [".js", ".vue", ".json"],
            alias: {
                vue$: "vue/dist/vue.esm.js", // 用 webpack 1 时需用 'vue/dist/vue.common.js'
            },
        },
        output: {
            filename: "[name].min.js", // 这里的 name 不能乱写，只能是 name
            path: path.resolve(__dirname, "dist"), // resolve 相对路径
        },
        devServer: {
            contentBase: "./dist",
            compress: true, // 开启gzip(压缩)
            port: env.port || 9000,
        },
    }
}

module.exports = originalConfig() // 原来的 module.exports 代码赋值给变量 webpackConfig
