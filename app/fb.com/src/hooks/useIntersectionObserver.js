/* eslint-disable no-sequences */

import { useCallback, useLayoutEffect, useRef } from 'react';
import { JSScheduler } from '@fb-dump/JSScheduler';
import { observeIntersection } from '@fb-dump/observeIntersection';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import { useDynamicCallbackDANGEROUS } from './useDynamicCallbackDANGEROUS';

const k = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
};
const l = DOMRectReadOnly.fromRect();
const m = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
};

function n(a) {
  let b;
  if (!a) {
    b = k;
  } else if (typeof a === 'string') {
    return a;
  } else
    typeof a === 'number'
      ? (b = {
          bottom: a,
          left: a,
          right: a,
          top: a,
        })
      : (b = { ...k, ...a });
  a = b;
  b = a.bottom;
  let c = a.left;
  let d = a.right;
  a = a.top;

  return a + 'px ' + d + 'px ' + b + 'px ' + c + 'px';
}

// eslint-disable-next-line max-params
function o(a, b, element, onIntersect) {
  let f = b.root;
  let g = b.rootMargin;
  let h = b.threshold;
  f = !f ? null : f();
  const i =
    !a ||
    a.element !== element ||
    a.onIntersect !== onIntersect ||
    a.observedRoot !== f ||
    a.rootMargin !== g ||
    a.threshold !== h;
  if (i) {
    a && a.subscription.remove();
    const subscription = observeIntersection(element, onIntersect, {
      root: f,
      rootMargin: n(g),
      threshold: h,
    });
    return {
      ...b,
      element: element,
      observedRoot: f,
      onIntersect: onIntersect,
      subscription,
    };
  }
  return a;
}

function a(a, b) {
  let e = b.root;
  let f = b.rootMargin;
  let g = b.threshold;
  let k = useRef(null);
  let n = useRef(null);
  let p = useRef(null);
  let q = useRef(null);
  let r = useRef(!1);
  let s = useDynamicCallbackDANGEROUS(a);
  b = useCallback(
    (a) => {
      if (k.current === a) {
        return;
      }
      if (k.current !== null && !a) {
        q.current !== null && JSScheduler.cancelCallback(q.current);
        let b = k.current;
        q.current = JSScheduler.scheduleImmediatePriCallback(() => {
          !k.current &&
            r.current === !1 &&
            s({
              boundingClientRect: m,
              intersectionRatio: 0,
              intersectionRect: m,
              isIntersecting: !1,
              isVisible: !1,
              rootBounds: l,
              target: b,
              time: Date.now(),
            }),
            (q.current = null);
        });
      }
      k.current = a;
      n.current && (n.current.subscription.remove(), (n.current = null));
      p.current && JSScheduler.cancelCallback(p.current);
      p.current = JSScheduler.scheduleImmediatePriCallback(() => {
        k.current &&
          (n.current = o(
            n.current,
            {
              root: e,
              rootMargin: f,
              threshold: g,
            },
            k.current,
            s,
          )),
          (p.current = null);
      });
    },
    [s, e, f, g],
  );
  useLayoutEffect(() => {
    p.current !== null && JSScheduler.cancelCallback(p.current);
    p.current = JSScheduler.scheduleImmediatePriCallback(() => {
      k.current !== null &&
        (n.current = o(
          n.current,
          {
            root: e,
            rootMargin: f,
            threshold: g,
          },
          k.current,
          s,
        )),
        (p.current = null);
    });
    return function () {
      n.current !== null && (n.current.subscription.remove(), (n.current = null)),
        p.current !== null && (JSScheduler.cancelCallback(p.current), (p.current = null));
    };
  }, [s, e, f, g]);
  useLayoutEffect(() => {
    r.current = !1;
    return function () {
      r.current = !0;
    };
  }, []);
  return b;
}

function b(a, b, c) {
  return function (a) {};
}

export default ExecutionEnvironment.canUseDOM ? a : b;

export const useIntersectionObserver = ExecutionEnvironment.canUseDOM ? a : b;
