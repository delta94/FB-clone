import { getKeyCommand } from './getKeyCommand';

// eslint-disable-next-line max-params
export function applyKeyCommand(a, b, d, e) {
  let f = getKeyCommand(a);
  if (!f) return !1;
  // eslint-disable-next-line no-self-assign
  b = b;
  while (b) {
    if (b && b.applyCommand(f, a)) return !0;
    b = b && b.getParent();
  }
  if (d && d.applyCommand(f, a)) return !0;
  return e && e.applyCommand(f, a) ? !0 : !1;
}
