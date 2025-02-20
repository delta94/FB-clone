/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
export function processBaseInputValidators(a, b) {
  if (typeof b === 'function') return [b(a)];
  let c = [];
  for (
    // eslint-disable-next-line no-var, no-inner-declarations
    var b = b,
      d = Array.isArray(b),
      e = 0,
      b = d ? b : b[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
    ;

  ) {
    let f;
    if (d) {
      if (e >= b.length) break;
      f = b[e++];
    } else {
      e = b.next();
      if (e.done) break;
      f = e.value;
    }
    // eslint-disable-next-line no-self-assign
    f = f;
    Array.isArray(f) ? c.push.apply(c, processBaseInputValidators(a, f)) : typeof f === 'function' && c.push(f(a));
  }
  return c.filter((a) => {
    return a.type !== 'CORRECT';
  });
}
