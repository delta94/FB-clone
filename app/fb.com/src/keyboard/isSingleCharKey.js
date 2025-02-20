const singleCharRegex = /^[a-z0-9/]$/;

export function isSingleCharKey(key) {
  return key ? singleCharRegex.test(key) : false;
}
