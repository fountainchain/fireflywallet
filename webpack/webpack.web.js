const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry:{
        index: path.join(__dirname, '../src/main.web.ts')
    },
    output:{
        path:  path.join(__dirname, '../dist/web'),
        filename: '[name].js',
        publicPath: '/',
    },
    resolve: {
        alias:{
            '@': path.join(__dirname, '../src'),
            vue$: 'vue/dist/vue.runtime.esm.js'
        },
        extensions: ['.mjs','.js','.jsx','.vue','.json','.wasm','.ts','.tsx']
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loaders:['vue-loader']
            },
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]'
                            }
                            }
                        }
                    }
                ]
            },
            
            {
                test: /\.(svg)(\?.*)?$/,
                use: [
                  /* config.module.rule('svg').use('file-loader') */
                  {
                    loader: 'file-loader',
                    options: {
                      name: 'img/[name].[hash:8].[ext]'
                    }
                  }
                ]
              },

              {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 4096,
                      fallback: {
                        loader: 'file-loader',
                        options: {
                          name: 'media/[name].[hash:8].[ext]'
                        }
                      }
                    }
                  }
                ]
              },

            {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
            use: [
                /* config.module.rule('fonts').use('url-loader') */
                {
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    fallback: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[hash:8].[ext]'
                    }
                    }
                }
                }
            ]
            },

            {
                test: /\.css$/,
                loaders:[ { loader: 'css-loader', options: { minimize: true } }]
            },
            {
                test: /\.styl$/,
                loaders: ['style-loader', 'stylus-loader', { loader: 'css-loader', options: { minimize: true } }]
            },
            {
                test: /\.jsx?$/,
                loaders:['babel-loader']
            },
            {
                test: /\.ts$/,
                use:[{loader: 'babel-loader'},{
                    loader: 'ts-loader',
                    options: {
                      transpileOnly: true,
                      appendTsSuffixTo: [
                        '\\.vue$'
                      ],
                      happyPackMode: false
                    }
                  }]
            },
            {
                test: /\.tsx$/,
                use: [{loader: 'babel-loader' },
                  {loader: 'ts-loader',
                    options: {
                      transpileOnly: true,// disable type checker - we will use it in fork plugin
                      happyPackMode: false,
                      appendTsxSuffixTo: [
                        '\\.vue$'
                      ]
                    }
                }]
            }

        ]
    },//end of module
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin(
          {
            template: path.resolve(__dirname, '../public/index.html')
          }
        ),
        new CopyWebpackPlugin(
          [
            {
              from: path.resolve(__dirname, '../public'),
              to: path.resolve(__dirname, '../dist/web'),
              toType: 'dir',
              ignore: ['.DS_Store']
            }
          ]
        ),
        new ForkTsCheckerWebpackPlugin(
          {
            vue: true,
            tslint: true,
            formatter: 'codeframe',
            checkSyntacticErrors: false
          }
        )
      ],
}