module.exports = {
  // ...
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: 'src',
  language: 'javascript', // "javascript" | "typescript" | "flow"
  schema: '../server/src/graphql/schema.graphql',
  excludes: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
  artifactDirectory: 'src/__generated__',
  persistConfig: {
    file: 'queryMap.json',
  },
};
