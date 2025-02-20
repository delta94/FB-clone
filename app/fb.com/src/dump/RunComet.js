/* eslint-disable no-sequences */

import { FBLogger } from '@fb-error/FBLogger';
import { recoverableViolation } from '@fb-error/recoverableViolation';
import { unexpectedUseInComet } from '@fb-error/unexpectedUseInComet';
import { createCancelableFunction } from '@fb-utils/createCancelableFunction';
import emptyFunction from 'fbjs/lib/emptyFunction';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

let i = {};
let j = !1;
let k = !1;
let l = {
  remove: emptyFunction,
};
function m(a, b) {
  !i.unload &&
    ((i.unload = []),
    (i.afterunload = []),
    ExecutionEnvironment.canUseEventListeners &&
      window.addEventListener('unload', () => {
        p('unload'), p('afterunload');
      })),
    !i[a]
      ? (recoverableViolation('EVENT_LISTENERS.' + a + " wasn't initialized but should have been!", 'comet_infra'),
        (i[a] = [b]))
      : i[a].push(b);
}
function n(a) {
  a || recoverableViolation('Undefined event listener handler is not allowed', 'comet_infra');

  return createCancelableFunction(a ?? emptyFunction);
}
function o(a) {
  return {
    remove: function () {
      a.cancel();
    },
  };
}
function p(a) {
  let b = i[a] || [];
  for (let d = 0; d < b.length; d++) {
    let e = b[d];
    try {
      e();
    } catch (b) {
      FBLogger('comet_infra')
        .catching(b)
        .mustfix("Hit an error while executing '" + a + "' event listeners.");
    }
  }
  i[a] = [];
}
function q(a) {
  if (j) {
    a();
    return o(n(emptyFunction));
  }
  a = n(a);
  !i.domcontentloaded
    ? ((i.domcontentloaded = [a]),
      ExecutionEnvironment.canUseEventListeners &&
        window.addEventListener(
          'DOMContentLoaded',
          () => {
            p('domcontentloaded');
          },
          !0,
        ))
    : i.domcontentloaded.push(a);
  return o(a);
}
function a(a) {
  a = n(a);
  m('afterunload', a);
  return o(a);
}
function b(a) {
  a = n(a);
  !i.load
    ? ((i.load = [a]),
      ExecutionEnvironment.canUseEventListeners &&
        window.addEventListener('load', () => {
          p('domcontentloaded'), p('load');
        }))
    : i.load.push(a);
  k &&
    setTimeout(() => {
      p('domcontentloaded'), p('load');
    }, 0);
  return o(a);
}
function d(a) {
  a = n(a);
  m('unload', a);
  return o(a);
}
function e(a, b) {
  if (b !== !1) {
    b =
      'Run.onBeforeUnload was called with include_quickling_events as true or undefined, but this is not valid in Comet.';
    FBLogger('comet_infra').blameToPreviousFrame().mustfix(b);
  }
  b = n(a);
  !i.beforeunload &&
    ((i.beforeunload = []),
    ExecutionEnvironment.canUseEventListeners &&
      window.addEventListener('beforeunload', (a) => {
        // eslint-disable-next-line no-var
        var b = i.beforeunload || [];
        for (
          // eslint-disable-next-line no-var, no-inner-declarations
          var b = b,
            d = Array.isArray(b),
            e = 0,
            b = d ? b : b[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
          ;

        ) {
          // eslint-disable-next-line no-inner-declarations, no-var
          var f;
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
          let g = void 0;
          try {
            g = f();
          } catch (a) {
            FBLogger('comet_infra').catching(a).mustfix('Hit an error while executing onBeforeUnload event listeners.');
          }
          if (g !== void 0) {
            g && g.body && (g = g.body);
            a.preventDefault();
            a.returnValue = g;
            return g;
          }
        }
      }));
  i.beforeunload.push(b);
  return o(b);
}
let r = e;

function f(a) {
  unexpectedUseInComet('Run.onLeave');
  return l;
}

function s(a, b) {
  unexpectedUseInComet('Run.onCleanupOrLeave');
  return l;
}

function t(a) {
  unexpectedUseInComet('Run.removeHook');
}

function u() {
  document.readyState === 'loading'
    ? q(() => {
        j = !0;
      })
    : (j = !0);
  if (document.readyState === 'complete') k = !0;
  else {
    let a = window.onload;
    window.onload = function () {
      a && a(), (k = !0);
    };
  }
}

ExecutionEnvironment.canUseDOM && u();

// eslint-disable-next-line no-func-assign
u = null;
let v = null;

export const RunComet = {
  onLoad: q,
  onAfterUnload: a,
  onAfterLoad: b,
  onUnload: d,
  onBeforeUnload: e,
  maybeOnBeforeUnload: r,
  onLeave: f,
  onCleanupOrLeave: s,
  __removeHook: t,
  __domContentCallback: u,
  __onloadCallback: v,
};
