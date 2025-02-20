export function memoizeWithArgs(computation, keyExtractor, context) {
  let cache;

  // TODO replace with spread operator

  /**
   * @function
   * @name memoizedFunction
   * @description Memoized version of the computation function.
   * @param {...any} args - The arguments passed to the computation function.
   * @returns {any} - The result of the computation function.
   */
  const memoizedFunction = (...args) => {
    cache || (cache = {});
    const key = keyExtractor(...args);

    if (!Object.prototype.hasOwnProperty.call(cache, key)) {
      cache[key] = computation(...args);
    }

    return cache[key];
  };

  return memoizedFunction;
}
