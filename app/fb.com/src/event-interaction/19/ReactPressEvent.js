/* eslint-disable no-sequences */
/* eslint-disable no-var */
/* eslint-disable no-inner-declarations */

import { useEffect as i, useRef as j } from 'react';
import { ReactEventHelpers } from '@fb-event-interaction/ReactEventHelpers';
import { ReactEventHookPropagation } from '@fb-event-interaction/ReactEventHookPropagation';
import { useReactEvent } from '@fb-event-interaction/ReactUseEvent';

const k = {
  passive: !0,
};

// eslint-disable-next-line max-params
function l(a, b, c, d, e) {
  var f = {
    altKey: d.altKey,
    buttons: b,
    clientX: d.clientX,
    clientY: d.clientY,
    ctrlKey: d.ctrlKey,
    defaultPrevented: d.defaultPrevented,
    metaKey: d.metaKey,
    pageX: d.pageX,
    pageY: d.pageY,
    pointerType: c,
    screenX: d.screenX,
    screenY: d.screenY,
    shiftKey: d.shiftKey,
    target: e,
    timeStamp: d.timeStamp,
    type: a,
    x: d.clientX,
    y: d.clientY,
    preventDefault: function () {
      (f.defaultPrevented = !0), d.preventDefault();
    },
    stopPropagation: function () {
      d.stopPropagation();
    },
  };
  return f;
}

function usePress(a, b) {
  var e = b.disabled;
  var f = b.onPressStart;
  var g = b.onPressMove;
  var h = b.onPressEnd;
  var m = b.onPressChange;
  var n = j({
    isPressed: !1,
    isPressActive: !1,
    pointerId: null,
    bounds: null,
    pointerType: '',
    buttons: 0,
    activationEvent: null,
  });
  var o = useReactEvent('pointerdown');
  var p = useReactEvent('pointermove', k);
  var q = useReactEvent('pointerup', k);
  var r = useReactEvent('pointercancel', k);
  var s = useReactEvent('mousedown');
  var t = useReactEvent('mouseup', k);
  var u = useReactEvent('mousemove', k);
  var v = useReactEvent('dragstart', k);
  var w = useReactEvent('focusout', k);
  i(() => {
    var b = a.current;
    var c = n.current;
    if (b !== null) {
      var i = document;
      var j = function (a) {
        if (e === !0) {
          y(a);
          return;
        }
        if (ReactEventHookPropagation.hasEventHookPropagationStopped(a, 'usePress')) return;
        ReactEventHookPropagation.stopEventHookPropagation(a, 'usePress');
        if (a.buttons === 2 || a.buttons > 4 || (ReactEventHelpers.isMac && a.pointerType === 'mouse' && a.ctrlKey))
          return;
        c.buttons = a.buttons;
        a.button === 1 && (c.buttons = 4);
        k(a);
      };
      var k = function (a) {
        if (!c.isPressed) {
          var e = a;
          var g = e.pointerId;
          e = e.pointerType || 'mouse';
          c.isPressed = !0;
          c.isPressActive = !0;
          c.pointerId = g !== void 0 ? g : null;
          c.pointerType = e;
          c.activationEvent = a;
          e !== 'mouse' && (c.bounds = b.getBoundingClientRect());
          f && f(l('pressstart', c.buttons, e, a, b));
          m && m(!0);
          ReactEventHelpers.hasPointerEvents
            ? (q.setListener(i, y), p.setListener(i, z), r.setListener(i, y))
            : (u.setListener(i, z), t.setListener(i, y), v.setListener(i, y));
        }
      };
      var x = function (a) {
        c.isPressed && ((c.isPressed = !1), h && h(l('pressend', c.buttons, c.pointerType, a, b)), m && m(!1));
      };
      var y = function (a) {
        (c.isPressActive = !1),
          (c.bounds = null),
          (c.activationEvent = null),
          x(a),
          ReactEventHelpers.hasPointerEvents
            ? (q.setListener(i, null), p.setListener(i, null), r.setListener(i, null))
            : (u.setListener(i, null), t.setListener(i, null), v.setListener(i, null));
      };
      var z = function (a) {
        if (e === !0) {
          y(a);
          return;
        }
        if (!c.isPressActive) return;
        var d = c.pointerType;
        var f = c.isPressed;
        var h = !1;
        if (d === 'mouse') {
          var i = a.target;
          h = b.contains(i);
        } else {
          i = a;
          i = i.pointerId;
          var j = c.bounds;
          if (i !== c.pointerId || j === null) return;
          i = a.clientX;
          var m = a.clientY;
          var n = j.top;
          var o = j.left;
          var p = j.right;
          j = j.bottom;
          i >= o && i <= p && m >= n && m <= j && (h = !0);
        }
        h ? (f ? g && g(l('pressmove', c.buttons, d, a, b)) : k(a)) : f && x(a);
      };
      ReactEventHelpers.hasPointerEvents ? o.setListener(b, j) : s.setListener(b, j);
      w.setListener(b, (a) => {
        var d = c.activationEvent;
        a.target === b && d !== null && y(d);
      });
      c.isPressActive &&
        (ReactEventHelpers.hasPointerEvents
          ? (q.setListener(i, y), p.setListener(i, z), r.setListener(i, y))
          : (u.setListener(i, z), t.setListener(i, y), v.setListener(i, y)));
      return function () {
        var b = c.activationEvent;
        a.current === null && b !== null && y(b);
      };
    }
  }, [e, v, w, s, u, t, m, h, g, f, r, o, p, q, a]);
}

export const ReactPressEvent = { usePress };
