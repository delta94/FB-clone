import emptyFunction from 'fbjs/lib/emptyFunction';

export function createCancelableFunction(a) {
  let b = a;
  a = function () {
    // eslint-disable-next-line no-inner-declarations, no-var
    for (var a = arguments.length, c = new Array(a), d = 0; d < a; d++) c[d] = arguments[d];
    // @ts-ignore
    // eslint-disable-next-line no-invalid-this
    return b.apply(this, c);
  };
  a.cancel = function () {
    b = emptyFunction;
  };
  return a;
}
