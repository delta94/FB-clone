/**
 * Changelog:
 * - 09/12/2024
 */

let g = {
  PREVIOUS_FILE: 1,
  PREVIOUS_FRAME: 2,
  PREVIOUS_DIR: 3,
  FORCED_KEY: 4,
};
function a(a) {
  let b = new Error(a);
  if (b.stack === void 0)
    try {
      throw b;
    } catch (a) {}
  b.messageFormat = a;
  for (
    // eslint-disable-next-line no-inner-declarations, no-var
    var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1;
    e < c;
    e++
  )
    d[e - 1] = arguments[e];
  b.messageParams = d.map((a) => {
    return String(a);
  });
  b.taalOpcodes = [g.PREVIOUS_FRAME];
  return b;
}

export const fbErrorLite = {
  err: a,
  TAALOpcode: g,
};
