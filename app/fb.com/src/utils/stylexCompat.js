function makeNamespace(styles) {
  styles.$$css = true;
  return styles;
}

export const stylexCompat = {
  makeNamespace,
};
