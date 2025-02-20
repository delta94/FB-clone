/* eslint-disable new-cap */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-func-assign */
/* eslint-disable no-eq-null */
/* eslint-disable complexity */
/* eslint-disable no-return-assign */
/* eslint-disable no-var */
/* eslint-disable guard-for-in */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-implicit-coercion */
/* eslint-disable max-params */
/* eslint-disable no-sequences */
/* eslint-disable no-invalid-this */
import { ReactFeatureFlags } from './ReactFeatureFlags';

let b = ReactFeatureFlags;

let g = b.disableDefaultPropsExceptForClasses;
let h = b.enableRenderableContext;
let i = b.enableTransitionTracing;
let j = b.enableUseResourceEffectHook;
b = b.renameElementSymbol;
let k = Symbol['for']('react.element');
let l = b ? Symbol['for']('react.transitional.element') : k;
let m = Symbol['for']('react.portal');
b = Symbol['for']('react.fragment');
k = Symbol['for']('react.strict_mode');
let n = Symbol['for']('react.profiler');
let o = Symbol['for']('react.provider');
let p = Symbol['for']('react.consumer');
let q = Symbol['for']('react.context');
let r = Symbol['for']('react.forward_ref');
let s = Symbol['for']('react.suspense');
let t = Symbol['for']('react.suspense_list');
let u = Symbol['for']('react.memo');
let v = Symbol['for']('react.lazy');
let w = Symbol['for']('react.scope');
let x = Symbol['for']('react.offscreen');
let y = Symbol['for']('react.legacy_hidden');
let z = Symbol['for']('react.tracing_marker');
let A = typeof Symbol === 'function' ? Symbol.iterator : '@@iterator';
function B(a) {
  if (a === null || 'object' !== typeof a) return null;
  a = (A && a[A]) || a['@@iterator'];
  return typeof a === 'function' ? a : null;
}
let C = {
  isMounted: function () {
    return !1;
  },
  enqueueForceUpdate: function () {},
  enqueueReplaceState: function () {},
  enqueueSetState: function () {},
};
let D = Object.assign;
let E = {};
function a(a, b, c) {
  (this.props = a), (this.context = b), (this.refs = E), (this.updater = c || C);
}
a.prototype.isReactComponent = {};
a.prototype.setState = function (a, b) {
  if ('object' !== typeof a && 'function' !== typeof a && null !== a)
    throw Error(
      'takes an object of state variables to update or a function which returns an object of state variables.',
    );
  this.updater.enqueueSetState(this, a, b, 'setState');
};
a.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, 'forceUpdate');
};
function c() {}
c.prototype = a.prototype;
function d(a, b, c) {
  (this.props = a), (this.context = b), (this.refs = E), (this.updater = c || C);
}
c = d.prototype = new c();
c.constructor = d;
D(c, a.prototype);
c.isPureReactComponent = !0;
let F = Array.isArray;
let G = {
  H: null,
  A: null,
  T: null,
  S: null,
};
let H = Object.prototype.hasOwnProperty;
function I(a, b, c, d, e, f) {
  c = f.ref;
  return {
    $$typeof: l,
    type: a,
    key: b,
    ref: void 0 !== c ? c : null,
    props: f,
  };
}
function e(a, b, c) {
  let d = null;
  void 0 !== c && (d = '' + c);
  void 0 !== b.key && (d = '' + b.key);
  if ('key' in b) {
    c = {};
    for (var e in b) 'key' !== e && (c[e] = b[e]);
  } else c = b;
  if (!g && a && a.defaultProps) {
    b = a.defaultProps;
    for (e in b) void 0 === c[e] && (c[e] = b[e]);
  }
  return I(a, d, void 0, void 0, null, c);
}
function J(a, b) {
  return I(a.type, b, void 0, void 0, void 0, a.props);
}
function K(a) {
  return typeof a === 'object' && null !== a && a.$$typeof === l;
}
function L(a) {
  let b = {
    '=': '=0',
    ':': '=2',
  };
  return (
    '$' +
    a.replace(/[=:]/g, (a) => {
      return b[a];
    })
  );
}
let M = /\/+/g;
function N(a, b) {
  return typeof a === 'object' && null !== a && null !== a.key ? L('' + a.key) : b.toString(36);
}
function O() {}
function P(a) {
  switch (a.status) {
    case 'fulfilled':
      return a.value;
    case 'rejected':
      throw a.reason;
    default:
      switch (
        (typeof a.status === 'string'
          ? a.then(O, O)
          : ((a.status = 'pending'),
            a.then(
              (b) => {
                a.status === 'pending' && ((a.status = 'fulfilled'), (a.value = b));
              },
              (b) => {
                a.status === 'pending' && ((a.status = 'rejected'), (a.reason = b));
              },
            )),
        a.status)
      ) {
        case 'fulfilled':
          return a.value;
        case 'rejected':
          throw a.reason;
      }
  }
  throw a;
}
function Q(a, b, c, d, e) {
  let f = typeof a;
  (f === 'undefined' || f === 'boolean') && (a = null);
  let g = !1;
  if (a === null) g = !0;
  else
    switch (f) {
      case 'bigint':
      case 'string':
      case 'number':
        g = !0;
        break;
      case 'object':
        switch (a.$$typeof) {
          case l:
          case m:
            g = !0;
            break;
          case v:
            return (g = a._init), Q(g(a._payload), b, c, d, e);
        }
    }
  if (g)
    return (
      (e = e(a)),
      (g = d === '' ? '.' + N(a, 0) : d),
      F(e)
        ? ((c = ''),
          null != g && (c = g.replace(M, '$&/') + '/'),
          Q(e, b, c, '', (a) => {
            return a;
          }))
        : null != e &&
          (K(e) &&
            (e = J(e, c + (e.key == null || (a && a.key === e.key) ? '' : ('' + e.key).replace(M, '$&/') + '/') + g)),
          b.push(e)),
      1
    );
  g = 0;
  let h = d === '' ? '.' : d + ':';
  if (F(a)) for (var i = 0; i < a.length; i++) (d = a[i]), (f = h + N(d, i)), (g += Q(d, b, c, f, e));
  else if (((i = B(a)), typeof i === 'function'))
    for (a = i.call(a), i = 0; !(d = a.next()).done; ) (d = d.value), (f = h + N(d, i++)), (g += Q(d, b, c, f, e));
  else if (f === 'object') {
    if (typeof a.then === 'function') return Q(P(a), b, c, d, e);
    b = String(a);
    throw Error(
      'Objects are not valid as a React child (found: ' +
        (b === '[object Object]' ? 'object with keys {' + Object.keys(a).join(', ') + '}' : b) +
        '). If you meant to render a collection of children, use an array instead.',
    );
  }
  return g;
}
function R(a, b, c) {
  if (a == null) return a;
  let d = [];
  let e = 0;
  Q(a, d, '', '', (a) => {
    return b.call(c, a, e++);
  });
  return d;
}
function S(a) {
  if (a._status === -1) {
    let b = a._result;
    b = b();
    b.then(
      (b) => {
        (a._status === 0 || a._status === -1) && ((a._status = 1), (a._result = b));
      },
      (b) => {
        (a._status === 0 || a._status === -1) && ((a._status = 2), (a._result = b));
      },
    );
    a._status === -1 && ((a._status = 0), (a._result = b));
  }
  if (a._status === 1) return a._result['default'];
  throw a._result;
}
function T(a) {
  return G.H.useMemoCache(a);
}
function U(a, b, c, d, e) {
  if (!j) throw Error('Not implemented.');
  return G.H.useResourceEffect(a, b, c, d, e);
}
let V =
  typeof reportError === 'function'
    ? reportError
    : function (a) {
        if (typeof window === 'object' && typeof window.ErrorEvent === 'function') {
          let b = new window.ErrorEvent('error', {
            bubbles: !0,
            cancelable: !0,
            message:
              typeof a === 'object' && null !== a && typeof a.message === 'string' ? String(a.message) : String(a),
            error: a,
          });
          if (!window.dispatchEvent(b)) return;
        } else if (typeof process === 'object' && typeof process.emit === 'function') {
          process.emit('uncaughtException', a);
          return;
        }
      };
function W() {}
c = {
  c: T,
};
U = j ? U : void 0;
f.Children = {
  map: R,
  forEach: function (a, b, c) {
    R(
      a,
      function () {
        b.apply(this, arguments);
      },
      c,
    );
  },
  count: function (a) {
    let b = 0;
    R(a, () => {
      b++;
    });
    return b;
  },
  toArray: function (a) {
    return (
      R(a, (a) => {
        return a;
      }) || []
    );
  },
  only: function (a) {
    if (!K(a)) throw Error('React.Children.only expected to receive a single React element child.');
    return a;
  },
};
f.Component = a;
f.Fragment = b;
f.Profiler = n;
f.PureComponent = d;
f.StrictMode = k;
f.Suspense = s;
f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = G;
f.__COMPILER_RUNTIME = c;
f.act = function () {
  throw Error('act(...) is not supported in production builds of React.');
};
f.c = T;
f.cache = function (a) {
  return function () {
    return a.apply(null, arguments);
  };
};
f.captureOwnerStack = void 0;
f.cloneElement = function (a, b, c) {
  if (a === null || void 0 === a) throw Error('The argument must be a React element, but you passed ' + a + '.');
  let d = { ...a.props };
  let e = a.key;
  let f = void 0;
  if (null != b) {
    void 0 !== b.ref && (f = void 0);
    void 0 !== b.key && (e = '' + b.key);
    if (!g && a.type && a.type.defaultProps) var h = a.type.defaultProps;
    for (i in b)
      !H.call(b, i) ||
        i === 'key' ||
        i === '__self' ||
        i === '__source' ||
        (i === 'ref' && void 0 === b.ref) ||
        (d[i] = g || void 0 !== b[i] || void 0 === h ? b[i] : h[i]);
  }
  var i = arguments.length - 2;
  if (i === 1) d.children = c;
  else if (1 < i) {
    h = Array(i);
    for (let j = 0; j < i; j++) h[j] = arguments[j + 2];
    d.children = h;
  }
  return I(a.type, e, void 0, void 0, f, d);
};
f.createContext = function (a) {
  a = {
    $$typeof: q,
    _currentValue: a,
    _currentValue2: a,
    _threadCount: 0,
    Provider: null,
    Consumer: null,
  };
  h
    ? ((a.Provider = a),
      (a.Consumer = {
        $$typeof: p,
        _context: a,
      }))
    : ((a.Provider = {
        $$typeof: o,
        _context: a,
      }),
      (a.Consumer = a));
  return a;
};
f.createElement = function (a, b, c) {
  let d;
  let e = {};
  let f = null;
  if (null != b)
    for (d in (void 0 !== b.key && (f = '' + b.key), b))
      H.call(b, d) && 'key' !== d && '__self' !== d && '__source' !== d && (e[d] = b[d]);
  let g = arguments.length - 2;
  if (g === 1) e.children = c;
  else if (1 < g) {
    for (var h = Array(g), i = 0; i < g; i++) h[i] = arguments[i + 2];
    e.children = h;
  }
  if (a && a.defaultProps) for (d in ((g = a.defaultProps), g)) void 0 === e[d] && (e[d] = g[d]);
  return I(a, f, void 0, void 0, null, e);
};
f.createRef = function () {
  return {
    current: null,
  };
};
f.experimental_useEffectEvent = function (a) {
  return G.H.useEffectEvent(a);
};
f.experimental_useResourceEffect = U;
f.forwardRef = function (a) {
  return {
    $$typeof: r,
    render: a,
  };
};
f.isValidElement = K;
f.jsx = e;
f.jsxDEV = void 0;
f.jsxs = e;
f.lazy = function (a) {
  return {
    $$typeof: v,
    _payload: {
      _status: -1,
      _result: a,
    },
    _init: S,
  };
};
f.memo = function (a, b) {
  return {
    $$typeof: u,
    type: a,
    compare: void 0 === b ? null : b,
  };
};
f.startTransition = function (a, b) {
  let c = G.T;
  let d = {};
  G.T = d;
  i && void 0 !== b && void 0 !== b.name && ((d.name = b.name), (d.startTime = -1));
  try {
    b = a();
    a = G.S;
    null !== a && a(d, b);
    typeof b === 'object' && null !== b && typeof b.then === 'function' && b.then(W, V);
  } catch (a) {
    V(a);
  } finally {
    G.T = c;
  }
};
f.unstable_Activity = x;
f.unstable_LegacyHidden = y;
f.unstable_Scope = w;
f.unstable_SuspenseList = t;
f.unstable_TracingMarker = z;
f.unstable_getCacheForType = function (a) {
  let b = G.A;
  return b ? b.getCacheForType(a) : a();
};
f.unstable_useCacheRefresh = function () {
  return G.H.useCacheRefresh();
};
f.unstable_useMemoCache = T;
f.use = function (a) {
  return G.H.use(a);
};
f.useActionState = function (a, b, c) {
  return G.H.useActionState(a, b, c);
};
f.useCallback = function (a, b) {
  return G.H.useCallback(a, b);
};
f.useContext = function (a) {
  return G.H.useContext(a);
};
f.useDebugValue = function () {};
f.useDeferredValue = function (a, b) {
  return G.H.useDeferredValue(a, b);
};
f.useEffect = function (a, b) {
  return G.H.useEffect(a, b);
};
f.useId = function () {
  return G.H.useId();
};
f.useImperativeHandle = function (a, b, c) {
  return G.H.useImperativeHandle(a, b, c);
};
f.useInsertionEffect = function (a, b) {
  return G.H.useInsertionEffect(a, b);
};
f.useLayoutEffect = function (a, b) {
  return G.H.useLayoutEffect(a, b);
};
f.useMemo = function (a, b) {
  return G.H.useMemo(a, b);
};
f.useOptimistic = function (a, b) {
  return G.H.useOptimistic(a, b);
};
f.useReducer = function (a, b, c) {
  return G.H.useReducer(a, b, c);
};
f.useRef = function (a) {
  return G.H.useRef(a);
};
f.useState = function (a) {
  return G.H.useState(a);
};
f.useSyncExternalStore = function (a, b, c) {
  return G.H.useSyncExternalStore(a, b, c);
};
f.useTransition = function () {
  return G.H.useTransition();
};
f.version = '19.1.0-www-classic-de82912e-20241220';
