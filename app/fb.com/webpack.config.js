const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { ESBuildMinifyPlugin } = require("esbuild-loader");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// const rsdPlugin = require('react-strict-dom/babel');
const StylexPlugin = require('@stylexjs/webpack-plugin');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const envv = require('./scripts/env');
const TerserPlugin = require('terser-webpack-plugin');

const { defineReactCompilerLoaderOption, reactCompilerLoader } = require('react-compiler-webpack');

// const reactCompilerLoader = require.resolve("./scripts/react-compiler-loader");
// const defineReactCompilerLoaderOption = (options) => options;
// const {
//   defineReactCompilerLoaderOption,
//   reactCompilerLoader,
// } = require("react-compiler-webpack");

const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

module.exports = (env, { mode }) => {
  const isProduction = mode === 'production';
  const isDevelopment = mode !== 'production';

  return {
    mode,
    entry: path.join(__dirname, 'src', 'index.jsx'),
    target: 'web',
    resolve: {
      // extensions: ['.ts', '.tsx', '.js', '.jsx'],
      extensions: fileExtensions.map((extension) => '.' + extension).concat(['.js', '.jsx', '.ts', '.tsx', '.css']),

      alias: {
        '@fb-utils': path.resolve(__dirname, 'src/utils'),
        '@fb-contexts': path.resolve(__dirname, 'src/contexts'),
        '@fb-error': path.resolve(__dirname, 'src/error'),
        '@fb-placeholder': path.resolve(__dirname, 'src/placeholder'),
        '@fb-hooks': path.resolve(__dirname, 'src/hooks'),
        '@fb-layout': path.resolve(__dirname, 'src/layout'),
        '@fb-text': path.resolve(__dirname, 'src/text'),
        '@fb-theme': path.resolve(__dirname, 'src/theme'),
        '@fb-keyboard': path.resolve(__dirname, 'src/keyboard'),
        '@fb-dump': path.resolve(__dirname, 'src/dump'),
        '@fb-platform': path.resolve(__dirname, 'src/platform'),
        '@fb-image': path.resolve(__dirname, 'src/image'),
        '@fb-toast': path.resolve(__dirname, 'src/toast'),
        '@fb-icons': path.resolve(__dirname, 'src/icons'),
        '@fb-event-interaction': path.resolve(__dirname, 'src/event-interaction'),
        '@fb-focus': path.resolve(__dirname, 'src/focus'),
        '@fb-pressable': path.resolve(__dirname, 'src/pressable'),
        '@fb-link': path.resolve(__dirname, 'src/link'),
        '@fb-button': path.resolve(__dirname, 'src/button'),
        '@fb-network': path.resolve(__dirname, 'src/network'),
        '@fb-dialog': path.resolve(__dirname, 'src/dialog'),
        '@fb-glimmer': path.resolve(__dirname, 'src/glimmer'),
        '@fb-process-ring': path.resolve(__dirname, 'src/process-ring'),
        '@fb-input': path.resolve(__dirname, 'src/input'),
        '@fb-card': path.resolve(__dirname, 'src/card'),
        '@fb-collapse': path.resolve(__dirname, 'src/collapse'),
        '@fb-switch': path.resolve(__dirname, 'src/switch'),
        '@fb-pivot-link': path.resolve(__dirname, 'src/pivot-link'),
        '@fb-badge': path.resolve(__dirname, 'src/badge'),
        '@fb-contextual': path.resolve(__dirname, 'src/contextual'),
        '@fb-constants': path.resolve(__dirname, 'src/constants'),
        '@fb-cell': path.resolve(__dirname, 'src/cell'),
        '@fb-view': path.resolve(__dirname, 'src/view'),
        '@fb-menu': path.resolve(__dirname, 'src/menu'),
        '@fb-tooltip': path.resolve(__dirname, 'src/tooltip'),
        '@FB-COMPONENT': path.resolve(__dirname, 'src/FB-COMPONENT'),
        '@FB-CONTEXTS': path.resolve(__dirname, 'src/FB-CONTEXTS'),
        '@fb-list': path.resolve(__dirname, 'src/list'),
        '@fb-relay': path.resolve(__dirname, 'src/relay'),
        '@fb-lazy-load': path.resolve(__dirname, 'src/lazy-load'),
        '@fb-callout': path.resolve(__dirname, 'src/callout'),
        '@fb-graphql': path.resolve(__dirname, 'src/__GRAPHQL__'),
      },

      fallback: {
        path: require.resolve('path-browserify'),
        fs: false,
        os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        buffer: require.resolve('buffer/'),
        stream: require.resolve('stream-browserify'),
      },
    },

    output: {
      // publicPath: '/',
      // path: path.resolve(__dirname, 'build'),
      // filename: isProduction ? 'js/[name].[chunkhash].js' : 'js/[name].js',
      // chunkFilename: isProduction ? 'js/[name].[chunkhash].js' : 'js/[name].js',

      // chatgpt
      path: path.resolve(__dirname, 'build'),
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[name].[contenthash].js',
      assetModuleFilename: 'assets/[hash][ext][query]', // Manage static assets
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.?(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'source-map-loader',
            },
            {
              loader: 'babel-loader',
              options: {
                // presets: [
                //   // "@babel/preset-env",
                //   //   "@babel/preset-react",
                //   //   "@babel/preset-typescript",
                //   ["@babel/preset-env"],
                //   [
                //     "@babel/preset-react",
                //     {
                //       development: isDevelopment,
                //       runtime: "automatic",
                //     },
                //   ],
                //   "@babel/preset-typescript",
                // ],
                configFile: path.join(__dirname, '/babel.config.js'),
                // plugins: [isDevelopment && "react-refresh/babel"].filter(
                //   Boolean
                // ),
              },
            },
            // {
            //   loader: reactCompilerLoader,
            //   options: defineReactCompilerLoaderOption({
            //     // React Compiler options goes here
            //   }),
            // },
          ],
        },
        {
          test: /\.(ts|tsx)?$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            // { loader: MiniCssExtractPlugin.loader },
            // {
            //   loader: 'css-loader',
            //   options: {
            //     importLoaders: 1,
            //     // modules: true,
            //     sourceMap: true,
            //   },
            // },
            // {
            //   loader: 'postcss-loader',
            //   options: {
            //     postcssOptions: {
            //       plugins: [
            //         [
            //           'postcss-preset-env',
            //           {
            //             autoprefixer: {
            //               grid: true,
            //               flexbox: true,
            //             },
            //           },
            //         ],
            //       ],
            //     },
            //   },
            // },

            // chatgpt
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true, // Automatically enable CSS modules for `.module.css`
                  localIdentName: '[name]__[local]__[hash:base64:5]',
                },
                sourceMap: isDevelopment,
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['postcss-preset-env'],
                },
              },
            },
          ],
          // use: [
          //   {
          //     loader: MiniCssExtractPlugin.loader,
          //   },
          //   {
          //     loader: "css-loader",
          //   },
          //   {
          //     loader: "postcss-loader",
          //     options: {
          //       plugins: [require("autoprefixer")],
          //     },
          //   },
          // ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(png|jp(e*)g|gif|webp|avif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                native: false,
              },
            },
          ],
        },
      ],
    },

    cache: true,

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css',
      }),

      new HtmlWebpackPlugin({
        // template: path.join(__dirname, 'public', 'index.html'),
        // minify: isProduction,
        // hash: isProduction,
        // cache: isProduction,
        // showErrors: !isProduction,

        // chatgpt
        template: path.join(__dirname, 'public', 'index.html'),
        inject: true,
        minify: isProduction,
      }),

      // new Dotenv({
      //   systemvars: true,
      // }),

      new CleanWebpackPlugin({ verbose: false }),

      new webpack.ProgressPlugin(),
      // new webpack.EnvironmentPlugin(["NODE_ENV"]),

      // new webpack.EnvironmentPlugin({
      //   NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      // }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),

      new CopyPlugin({
        patterns: [{ from: './src/assets', to: '' }],
      }),
      // rsdPlugin,
      // Ensure that the stylex plugin is used before Babel
      new StylexPlugin({
        filename: 'styles.[contenthash].css',
        // get webpack mode and set value for dev
        dev: mode === 'development',
        // importSources: ['@stylexjs/stylex', { from: 'react-strict-dom', as: 'css' }],
        // Use statically generated CSS files and not runtime injected CSS.
        // Even in development.
        runtimeInjection: false,
        // optional. default: 'x'
        classNamePrefix: 'x',
        // Required for CSS variable support
        unstable_moduleResolution: {
          // type: 'commonJS' | 'haste'
          // default: 'commonJS'
          type: 'commonJS',
          // The absolute path to the root directory of your project
          rootDir: __dirname,
        },
        useCSSLayers: true,
        babelConfig: { plugins: ['@babel/plugin-transform-private-methods'] },
      }),

      isDevelopment && new ReactRefreshWebpackPlugin(),
    ]
      .concat(
        !env.analyze
          ? []
          : [
              new BundleAnalyzerPlugin({
                analyzerHost: 'localhost',
                analyzerPort: 3006,
                reportTitle: 'Template - Analyze Bundle Sizes',
              }),
            ],
      )
      .filter(Boolean),

    optimization: {
      // minimize: isProduction,
      // mergeDuplicateChunks: true,
      // removeEmptyChunks: true,
      // sideEffects: false,
      // minimizer: [
      //   // new ESBuildMinifyPlugin({
      //   //   target: "es2015",
      //   // }),
      //   new TerserPlugin({
      //     extractComments: false,
      //   }),
      // ],
      // splitChunks: {
      //   chunks: 'all',
      //   cacheGroups: {
      //     vendors: {
      //       test: /[\\/]node_modules[\\/]/,
      //       chunks: 'all',
      //       enforce: true,
      //       name: (module) => {
      //         const [, match] = module.context.match(
      //           /[\\/]node_modules[\\/](.*?)([\\/]([^\\/]*)([\\/]([^\\/]*))?([\\/]([^\\/]*))?|$)/,
      //         );

      //         return `vendors/${match.replace('@', '')}`;
      //       },
      //     },
      //   },
      // },

      // chatgpt
      minimize: isProduction,
      runtimeChunk: 'single', // Separate runtime code
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: { drop_console: isProduction }, // Remove `console.log` in production
          },
        }),
      ],
    },

    performance: {
      maxEntrypointSize: Infinity,
      maxAssetSize: 1024 ** 2,
    },

    devtool: isProduction ? 'source-map' : 'inline-source-map',

    devServer: {
      // allowedHosts: 'all',
      // // client: false,
      // devMiddleware: {
      //   publicPath: `http://localhost:${envv.PORT}/`,
      //   writeToDisk: true,
      // },
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      // },
      // historyApiFallback: true,
      // host: 'localhost',
      // hot: true,
      // https: false,
      // open: true,
      // port: envv.PORT,
      // static: {
      //   directory: path.join(__dirname, 'build'),
      // },

      devMiddleware: {
        publicPath: `http://localhost:${envv.PORT}/`,
        writeToDisk: true,
      },

      port: envv.PORT || 3000,
      hot: true,
      // open: true,
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, 'build'),
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      // proxy: {
      //   '/api': 'http://localhost:5000', // Example: API Proxying
      // },
    },

    stats: {
      errorDetails: true,
    },
  };
};
