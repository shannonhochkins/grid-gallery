const webpack = require("webpack"),
    devServer = require("webpack-dev-server"),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    $ = {
      development : process.argv.indexOf('dev') > -1
    };



const compiler = webpack({
    entry: path.resolve(__dirname, './grid-gallery.module.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "grid-gallery.module.js"
    },
    module: {
        rules: [
            { 
                test: /\.html$/, 
                loader: 'html-loader'
            },
            { 
                test: /\.scss$/, 
                enforce : 'pre',
                use: [
                    // we may want to use the singleton option in the style-loader, 
                    // this will only use ONE style tag when injecting into the dom.
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // modules : true,
                            // localIdentName : ($.production ? '[hash:base64:10]' : '[path][name]__[local]')
                        }
                    }, {
                        loader: 'postcss-loader'
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceComments: false,
                            outputStyle: 'expanded'
                        }
                    }
                ]
            },
            { 
                test: /\.js$/, 
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'ng-annotate-loader',
                }, {
                    loader: 'babel-loader',                    
                    options: {
                        ignore: '/node_modules/',
                        babelrc: false,
                        presets: [
                            [require.resolve('babel-preset-es2015'), {modules : false, loose: true}]
                        ],
                        cacheDirectory: true
                    }
                }],
                
            },
            { 
                test: /\.(otf|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, 
                loader : 'file-loader'
            },
            { 
                test: /\.(png|jpg)$/, 
                use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit : 8192
                    } 
                }]
            }
        ]
    },
    watch: true,
    stats: {
        colors: true,
        reasons: true
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: !$.development,
            DEVELOPMENT: $.development,
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
              postcss : {  
                  plugins: [
                        require('autoprefixer')({
                            browsers: ['ie > 10', 'last 2 versions', 'Safari > 7'],
                            remove: false
                        }),
                        require('postcss-flexibility')
                    ]
                }
            }
          }),
        // new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './example/index.html')
        })
    ]
});


const server = new devServer(compiler, {
    inline : true,
    contentBase: path.resolve(__dirname, "../dist"),
    historyApiFallback: true,
    stats : {
        colors: true
    }
});

server.listen(8080, "127.0.0.1", function() {
    console.log("Starting server on http://localhost:8080");
});
