export const testID = (value, require = true) => {
  return require && value
    ? {
        'data-testid': value,
      }
    : undefined;
};
