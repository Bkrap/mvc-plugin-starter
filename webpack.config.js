const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const sass = require('node-sass');
const TerserPlugin = require("terser-webpack-plugin");

// Hard code this to production but can be adapted to accept args to change env.
const mode = 'production';

module.exports = {
  mode,
  watch: true,
  output: {
    // Webpack will create js files even though they are not used
    // filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    // Where the CSS is saved to
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.css', '.scss'],
    alias: {
      // Provides ability to include node_modules with ~
      '~': path.resolve(process.cwd(), 'src'),
    },
  },

  entry: {
    "style-public": './src/scss/main-public.scss',
    "style-admin": './src/scss/main-admin.scss',
    'public': './src/js/public/main-public.js',
    'admin': './src/js/admin/main-admin.js',
  },

  optimization: {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            terserOptions: {
                output: {
                  comments: false,
                },
              }
        })
    ],
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Extract and save the final CSS.
          MiniCssExtractPlugin.loader,
          // Load the CSS, set url = false to prevent following urls to fonts and images.
          { loader: "css-loader", options: { url: false, importLoaders: 1 } },
          // Add browser prefixes and minify CSS.
          { loader: 'postcss-loader', 
            options: { 
                postcssOptions: {
                    plugins: [
                        autoprefixer(), 
                        cssnano(),
                    ] 
                }
            }
          },
          // Load the SCSS/SASS
          { loader: 'sass-loader' },
        ],
      },
    ],
  },

  plugins: [
    // Define the filename pattern for CSS.
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // new CopyWebpackPlugin({
    //     patterns: [
    //         {
    //             from: 'node_modules/bootstrap/dist',
    //             to: 'vendor/bootstrap'
    //         },
    //     ]
    // })
  ]
}