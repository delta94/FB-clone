const styleXPlugin = require('@stylexjs/babel-plugin');
const reactStrictPreset = require('react-strict-dom/babel-preset');

const path = require('path');

function getPlatform(caller) {
  return caller && caller.platform;
}

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  const isDevelopment = api.env('development');

  const platform = api.caller(getPlatform);

  const presets = [];

  if (platform === 'web') {
    presets.push([reactStrictPreset, { debug: true, dev: isDevelopment, rootDir: __dirname }]);
  }

  presets.push(
    [
      '@babel/preset-env',
      // {
      //   targets: {
      //     browsers: [">0.25%", "not ie 11", "not op_mini all"],
      //   },
      //   // useBuiltIns: "usage",
      //   corejs: 3,
      //   debug: false,
      // },
    ],
    [
      '@babel/preset-react',
      {
        development: isDevelopment,
      },
    ],
    '@babel/preset-typescript',
  );

  return {
    presets,

    plugins: [
      [
        'babel-plugin-react-compiler',
        {
          target: '18', // '17' | '18' | '19'
        },
      ],
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic',
        },
      ],

      ['relay'],
      [
        styleXPlugin,
        {
          dev: true,
          test: false,
          unstable_moduleResolution: {
            rootDir: __dirname,
            type: 'commonJS',
          },
          useCSSLayers: true,
          // babelConfig: { plugins: ["@babel/plugin-transform-private-methods"] },
        },
      ],
      [
        'babel-plugin-fbt',
        {
          fbtCommonPath: path.join(__dirname, 'i18n/fbt/common_strings.json'),
        },
      ],
      'babel-plugin-fbt-runtime',
      ['macros'],
      isDevelopment && require.resolve('react-refresh/babel'),

      // //

      // "@babel/plugin-syntax-jsx",
      // "@babel/plugin-transform-flow-strip-types",
      // ["@babel/plugin-proposal-class-properties"],
      // "syntax-trailing-function-commas",
      // [
      //   "@babel/plugin-proposal-object-rest-spread",
      //   { loose: true, useBuiltIns: true },
      // ],
      // ["@babel/plugin-transform-template-literals"],
      // "@babel/plugin-transform-literals",
      // "@babel/plugin-transform-arrow-functions",
      // "@babel/plugin-transform-block-scoped-functions",
      // "@babel/plugin-transform-object-super",
      // "@babel/plugin-transform-shorthand-properties",
      // "@babel/plugin-transform-computed-properties",
      // "@babel/plugin-transform-for-of",
      // ["@babel/plugin-transform-spread", { loose: true, useBuiltIns: true }],
      // "@babel/plugin-transform-parameters",
      // [
      //   "@babel/plugin-transform-destructuring",
      //   { loose: true, useBuiltIns: true },
      // ],
      // [
      //   "@babel/plugin-transform-block-scoping",
      //   { throwIfClosureRequired: true },
      // ],
    ].filter(Boolean),

    // Applies the react-refresh Babel plugin on non-production modes only
    // ...(!api.env("production") && { plugins: ["react-refresh/babel"] }),
  };
};
