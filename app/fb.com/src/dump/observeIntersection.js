import { ErrorGuard } from '@fb-error/ErrorGuard';

let i = typeof WeakMap === 'function';
let j = {
  __noRoot: !0,
};
let k = i ? new WeakMap() : new Map();

function l(option) {
  let { threshold } = option;
  if (Array.isArray(threshold)) {
    const thresholdObj = {};

    threshold.forEach((a) => {
      thresholdObj[String(a)] = !0;
    });
    threshold = Object.keys(thresholdObj).sort();
  }

  const _options = { ...option, threshold: threshold };
  const e = {};
  Object.keys(_options)
    .sort()
    .forEach((a) => {
      e[a] = _options[a];
    });
  return JSON.stringify(e);
}

export function observeIntersection(a, b, options) {
  if (!options) {
    options = {};
  }

  let e = l({
    rootMargin: options.rootMargin,
    threshold: options.threshold,
  });
  let f = options.root || j;
  let g = k.get(f);
  !g && ((g = {}), k.set(f, g));
  let m = g[e];
  if (!m) {
    options = new IntersectionObserver((a) => {
      a.forEach((a) => {
        // m != null || h(0, 2439)
        let b = m.targetToCallbacksMap.get(a.target);
        b &&
          b.length > 0 &&
          b.forEach((b) => {
            ErrorGuard.applyWithGuard(b, null, [a], {
              name: 'observeIntersection',
            });
          });
      });
    }, options);
    m = {
      intersectionObserver: options,
      referenceCount: 0,
      targetToCallbacksMap: i ? new WeakMap() : new Map(),
    };
    g[e] = m;
  }
  options = m.targetToCallbacksMap.get(a);
  !options &&
    (m.intersectionObserver.observe(a),
    (m.referenceCount += 1),
    (options = []),
    m.targetToCallbacksMap.set(a, options));
  options.push(b);
  let n = !1;
  let o = function () {
    if (n) return;
    let c = m.targetToCallbacksMap.get(a);
    // c != null || h(0, 2440)
    if (c.length === 1)
      // eslint-disable-next-line no-sequences
      m.intersectionObserver.unobserve(a), m.targetToCallbacksMap['delete'](a), (m.referenceCount -= 1), (a = null);
    else {
      let d = c.indexOf(b);
      // d !== -1 || h(0, 2441)
      c.splice(d, 1);
    }
    m.referenceCount === 0 /* g  != null || h(0, 2442) , */ &&
      (delete g[e], f && Object.keys(g).length === 0 && k['delete'](f));
    b = null;
    a = null;
    f = null;
    n = !0;
  };
  return {
    remove: function () {
      o && (o(), (o = null));
    },
  };
}
