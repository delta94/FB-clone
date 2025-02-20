export function testID(value, require = true) {
  return require && value
    ? {
        'data-testid': value,
      }
    : undefined;
}
