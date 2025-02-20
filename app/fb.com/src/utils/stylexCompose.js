/* eslint-disable no-inner-declarations */
/* eslint-disable no-var */
/* eslint-disable no-cond-assign */

function k(a) {
  a = a.reverse();
  let b = {};
  while (a.length) {
    let c = a.pop();
    if (Array.isArray(c)) {
      for (var d = c.length - 1; d >= 0; d--) a.push(c[d]);
      continue;
    }
    d = c;
    if (d && typeof d === 'object')
      // eslint-disable-next-line guard-for-in
      for (c in d) {
        let e = d[c];
        if (typeof e === 'string') b[c] = e;
        else if (typeof e === 'object') {
          var f;
          b[c] = (f = b[c]) ? f : {};
          Object.assign(b[c], e);
        }
      }
  }
  return b;
}

function compose() {
  for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) {
    b[c] = arguments[c];
  }
  return k(b);
}

export const stylexCompose = {
  compose,
};
