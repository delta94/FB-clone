import path from 'node:path';
import { fileURLToPath } from 'node:url';

import babelParser from '@babel/eslint-parser';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import stylexjs from '@stylexjs/eslint-plugin';
// import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import noFunctionDeclareAfterReturn from 'eslint-plugin-no-function-declare-after-return';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import reactPlugin from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  importPlugin.flatConfigs.recommended,
  {
    ignores: ['**/node_modules', 'coverage', 'dist', '**/queryMap.json', 'relay-server', 'server'],
  },
  ...compat.extends('alloy', 'alloy/react'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'sort-keys-fix': sortKeysFix,
      // import: fixupPluginRules(_import),
      'no-function-declare-after-return': noFunctionDeclareAfterReturn,
      'no-only-tests': noOnlyTests,
      '@stylexjs': stylexjs,
      'react-compiler': reactCompiler,
    },

    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        JSX: true,
        __DEV__: true,
      },

      parser: babelParser,
      ecmaVersion: 11,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          experimentalObjectRestSpread: true,
        },

        requireConfigFile: false,
      },
    },

    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@fb-utils', './src/utils'], // Replace './src/utils' with the actual path
            ['@fb-contexts', './src/contexts'],
            ['@fb-error', './src/error'],
            ['@fb-placeholder', './src/placeholder'],
            ['@fb-hooks', './src/hooks'],
            ['@fb-layout', './src/layout'],
            ['@fb-text', './src/text'],
            ['@fb-theme', './src/theme'],
            ['@fb-keyboard', './src/keyboard'],
            ['@fb-dump', './src/dump'],
            ['@fb-platform', './src/platform'],
            ['@fb-image', './src/image'],
            ['@fb-toast', './src/toast'],
            ['@fb-icons', './src/icons'],
            ['@fb-event-interaction', './src/event-interaction'],
            ['@fb-focus', './src/focus'],
            ['@fb-pressable', './src/pressable'],
            ['@fb-link', './src/link'],
            ['@fb-button', './src/button'],
            ['@fb-network', './src/network'],
            ['@fb-dialog', './src/dialog'],
            ['@fb-glimmer', './src/glimmer'],
            ['@fb-process-ring', './src/process-ring'],
            ['@fb-input', './src/input'],
            ['@fb-card', './src/card'],
            ['@fb-collapse', './src/collapse'],
            ['@fb-switch', './src/switch'],
            ['@fb-pivot-link', './src/pivot-link'],
            ['@fb-badge', './src/badge'],
            ['@fb-contextual', './src/contextual'],
            ['@fb-constants', './src/constants'],
            ['@fb-cell', './src/cell'],
            ['@fb-view', './src/view'],
            ['@fb-menu', './src/menu'],
            ['@fb-tooltip', './src/tooltip'],
            ['@FB-COMPONENT', './src/FB-COMPONENT'],
            ['@FB-CONTEXTS', './src/FB-CONTEXTS'],
            ['@fb-list', './src/list'],
            ['@fb-relay', './src/relay'],
            ['@fb-lazy-load', './src/lazy-load'],
            ['@fb-callout', './src/callout'],
            ['@fb-graphql', './src/__GRAPHQL__'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure extensions are covered
        },

        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add all relevant extensions
        },
      },
      react: {
        version: 'detect',
      },
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@stylexjs/valid-styles': ['error'],
      eqeqeq: [2, 'allow-null'],
      'import/first': 2,
      'import/newline-after-import': 2,
      'import/no-duplicates': 2,
      indent: 0,
      'jsx-quotes': [2, 'prefer-double'],
      'max-len': 0,
      'no-unused-expressions': 0,

      'no-unused-vars': [
        2,
        {
          args: 'none',
        },
      ],

      'no-var': 2,

      'no-restricted-globals': [
        2,
        'addEventListener',
        'blur',
        'close',
        'closed',
        'confirm',
        'defaultStatus',
        'defaultstatus',
        'event',
        'external',
        'find',
        'focus',
        'frameElement',
        'frames',
        'history',
        'innerHeight',
        'innerWidth',
        'length',
        'location',
        'locationbar',
        'menubar',
        'moveBy',
        'moveTo',
        'name',
        'onblur',
        'onerror',
        'onfocus',
        'onload',
        'onresize',
        'onunload',
        'open',
        'opener',
        'opera',
        'outerHeight',
        'outerWidth',
        'pageXOffset',
        'pageYOffset',
        'parent',
        'print',
        'removeEventListener',
        'resizeBy',
        'resizeTo',
        'screen',
        'screenLeft',
        'screenTop',
        'screenX',
        'screenY',
        'scroll',
        'scrollbars',
        'scrollBy',
        'scrollTo',
        'scrollX',
        'scrollY',
        'self',
        'status',
        'statusbar',
        'stop',
        'toolbar',
        'top',
      ],

      'no-param-reassign': 0,
      'no-void': 0,
      'react/no-children-prop': 0,
      'react-compiler/react-compiler': 'error',
      'react/jsx-no-constructed-context-values': 0,
    },
  },
  ...compat
    .extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/typescript',
    )
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
      ...reactPlugin.configs.flat.recommended,
      languageOptions: {
        ...reactPlugin.configs.flat.recommended.languageOptions,
        globals: {
          ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: 'module',
      },

      rules: {
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-this-alias': 0,

        '@typescript-eslint/no-unused-vars': [
          2,
          {
            args: 'none',
          },
        ],
      },

      settings: {
        'import/resolver': {
          // You will also need to install and configure the TypeScript resolver
          // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
          typescript: true,
          node: true,
        },
      },
    })),
  // {
  //   files: ['**/*.ts', '**/*.tsx'],
  //   ...reactPlugin.configs.flat.recommended,

  //   plugins: {
  //     // react,
  //     '@typescript-eslint': typescriptEslint,
  //   },

  //   languageOptions: {
  //     ...reactPlugin.configs.flat.recommended.languageOptions,
  //     globals: {
  //       ...globals.browser,
  //     },

  //     parser: tsParser,
  //     ecmaVersion: 5,
  //     sourceType: 'module',
  //   },

  //   rules: {
  //     '@typescript-eslint/ban-ts-comment': 0,
  //     '@typescript-eslint/no-this-alias': 0,

  //     '@typescript-eslint/no-unused-vars': [
  //       2,
  //       {
  //         args: 'none',
  //       },
  //     ],
  //   },
  // },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    // ...reactPlugin.configs.flat.recommended,
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^(@|components)(/.*|$)'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.?(css)$'],
          ],
        },
      ],
    },
  },
];