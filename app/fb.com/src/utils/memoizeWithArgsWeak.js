import MultiKeyMap from './MultiKeyMap';

export const memoizeWithArgsWeak = (fn) => {
  const cache = new MultiKeyMap();

  return function (...args) {
    const cachedResult = cache.get(args);
    if (cachedResult !== undefined) {
      return cachedResult;
    }
    const result = fn(...args);
    cache.set(args, result);
    return result;
  };
};
