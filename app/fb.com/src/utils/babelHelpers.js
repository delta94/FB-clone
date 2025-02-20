const babelHelpers = {};

babelHelpers._extends = Object.assign;
babelHelpers.extends = babelHelpers._extends;

export { babelHelpers };
