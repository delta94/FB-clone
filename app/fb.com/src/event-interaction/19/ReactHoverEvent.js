/* eslint-disable no-sequences */
/* eslint-disable no-var */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-self-assign */

import { useEffect, useRef } from 'react';
import { ReactEventHelpers } from '@fb-event-interaction/ReactEventHelpers';
import { ReactEventHookPropagation } from '@fb-event-interaction/ReactEventHookPropagation';
import { useReactEvent } from '@fb-event-interaction/ReactUseEvent';

function k(a, b, c) {
  return {
    clientX: b.clientX,
    clientY: b.clientY,
    pageX: b.pageX,
    pageY: b.pageY,
    screenX: b.screenX,
    screenY: b.screenY,
    target: c,
    timeStamp: b.timeStamp,
    type: a,
    x: b.clientX,
    y: b.clientY,
  };
}
let l = {
  passive: !0,
};
function m(a, b) {
  b = b;
  while (b) {
    if (b === a) return !0;
    if (b._hoverEventTarget) return !1;
    b = b.parentNode;
  }
  return !1;
}
function useHover(a, b) {
  let e = b.disabled;
  let f = b.onHoverStart;
  let g = b.onHoverMove;
  let h = b.onHoverEnd;
  let n = b.onHoverChange;
  let o = useReactEvent('touchstart', l);
  let p = useReactEvent('mouseover', l);
  let q = useReactEvent('mouseout', l);
  console.log('🚀 ~ useHover ~ q:', q);
  let r = useReactEvent('mousemove', l);
  let s = useReactEvent('pointerover', l);
  let t = useReactEvent('pointerout', l);
  console.log('🚀 ~ useHover ~ t:', t);
  let u = useReactEvent('pointermove', l);
  let v = useReactEvent('pointercancel', l);
  let w = useRef({
    isHovered: !1,
    isTouched: !1,
  });
  useEffect(() => {
    let b = a.current;
    let c = w.current;
    if (b !== null && c !== null) {
      b._hoverEventTarget = !0;
      let i = document;
      let j = function (a) {
        if (e === !0) {
          y(a);
          return;
        }
        if (ReactEventHookPropagation.hasEventHookPropagationStopped(a, 'useHover')) return;
        ReactEventHookPropagation.stopEventHookPropagation(a, 'useHover');
        !c.isHovered &&
          !m(b, a.relatedTarget) &&
          ((c.isHovered = !0),
          f && f(k('hoverstart', a, b)),
          n && n(!0),
          ReactEventHelpers.hasPointerEvents
            ? (u.setListener(i, x), v.setListener(i, y), t.setListener(i, l))
            : q.setListener(i, l));
      };
      var l = function (a) {
        c.isHovered && !m(b, a.relatedTarget) && ((c.isHovered = !1), h && h(k('hoverend', a, b)), n && n(!1), y(a));
      };
      var x = function (a) {
        c.isTouched = !1;
        if (e === !0) {
          y(a);
          return;
        }
        c.isHovered && g && g(k('hovermove', a, b));
      };
      var y = function (a) {
        (c.isTouched = !1),
          ReactEventHelpers.hasPointerEvents
            ? (u.setListener(i, null), v.setListener(i, null), t.setListener(i, null))
            : q.setListener(i, null),
          l(a);
      };
      ReactEventHelpers.hasPointerEvents
        ? s.setListener(b, (a) => {
            a.pointerType !== 'touch' && j(a);
          })
        : (p.setListener(b, (a) => {
            c.isTouched || j(a);
          }),
          o.setListener(b, () => {
            c.isTouched = !0;
          }),
          r.setListener(i, x));
      c.isHovered &&
        (ReactEventHelpers.hasPointerEvents
          ? (u.setListener(i, x), v.setListener(i, y), t.setListener(i, l))
          : q.setListener(i, l));
    }
  }, [e, n, h, g, f, v, u, t, s, r, q, p, a, o]);
}

export const ReactHoverEvent = {
  useHover,
};
