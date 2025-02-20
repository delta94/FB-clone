const restrictedGlobals = require('confusing-browser-globals');

const OFF = 0;
const ERROR = 2;

module.exports = {
  // Prettier must be last so it can override other configs (https://github.com/prettier/eslint-config-prettier#installation)
  extends: ['alloy', 'alloy/react'],

  globals: {
    JSX: true,
    __DEV__: true,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  overrides: [
    {
      env: {
        browser: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
      },
      plugins: ['react', '@typescript-eslint'],
      rules: {
        '@typescript-eslint/ban-ts-comment': OFF,
        '@typescript-eslint/no-this-alias': OFF,
        '@typescript-eslint/no-unused-vars': [ERROR, { args: 'none' }],
      },
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],

  parser: '@babel/eslint-parser',

  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 11,
    requireConfigFile: false,
    sourceType: 'module',
  },

  plugins: [
    'react',
    'simple-import-sort',
    'sort-keys-fix',
    'import',
    'no-function-declare-after-return',
    'no-only-tests',
    '@stylexjs',
  ],

  // Stop ESLint from looking for a configuration file in parent folders
  root: true,
  // We're stricter than the default config, mostly. We'll override a few rules
  // and then enable some React specific ones.
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',

    // increase the severity of rules so they are auto-fixable
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // *
    '@stylexjs/valid-styles': ['error'],

    eqeqeq: [ERROR, 'allow-null'],

    // *
    // (This helps configure simple-import-sort) Make sure all imports are at the top of the file
    'import/first': ERROR,

    // *
    // (This helps configure simple-import-sort) Make sure there's a newline after the imports
    'import/newline-after-import': ERROR,

    // *
    // (This helps configure simple-import-sort) Merge imports of the same file
    'import/no-duplicates': ERROR,

    indent: OFF,

    'jsx-quotes': [ERROR, 'prefer-double'],

    // Enforced by Prettier
    // TODO: Prettier doesn't handle long strings or long comments. Not a big
    // deal. But I turned it off because loading the plugin causes some obscure
    // syntax error and it didn't seem worth investigating.
    'max-len': OFF,

    // 'max-len': ["error", { "code": 80 }],

    // 'no-multi-spaces': ERROR,

    'no-unused-expressions': OFF, // ERROR

    'no-unused-vars': [ERROR, { args: 'none' }],

    // We apply these settings to files that should run on Node.
    // They can't use JSX or ES6 modules, and must be in strict mode.
    // They can, however, use other ES6 features.
    // (Note these rules are overridden later for source files.)
    'no-var': ERROR,

    'no-restricted-globals': [ERROR].concat(restrictedGlobals),

    'no-param-reassign': OFF,
    'no-void': OFF,

    'react/no-children-prop': OFF,

    // 'object-curly-newline': [
    //   'error',
    //   {
    //     ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
    //     ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
    //   },
    // ],

    // 'object-curly-newline': [
    //   'error',
    //   {
    //     ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
    //     ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
    //   },
    // ],
  },
};
