import { useCallback, useContext, useLayoutEffect, useMemo, useRef } from 'react';
import { BaseViewportMarginsContext, HiddenSubtreePassiveContext } from '@fb-contexts';
import { RunComet } from '@fb-dump/RunComet';
import { cometVisibilityUserActivityMonitor } from '@fb-event-interaction/cometVisibilityUserActivityMonitor';
import { getIntersectionMarginFromViewportMargin } from '@fb-utils/getIntersectionMarginFromViewportMargin';
import { intersectionObserverEntryIsIntersecting } from '@fb-utils/intersectionObserverEntryIsIntersecting';
import getStyleProperty from 'fbjs/lib/getStyleProperty';

import { useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED } from './useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED';
import { useIntersectionObserver } from './useIntersectionObserver';

// export function useViewportDuration(entry) {
//   let b;
//   let e;
//   let f;
//   // eslint-disable-next-line no-unused-vars
//   let g = arguments;
//   let o;
//   let p;
//   let q = entry.onHidden;
//   let r = entry.onIntersection;
//   let s = entry.onVisibilityDurationUpdated;
//   let t = entry.onVisible;
//   let u = entry.options;
//   let v = u === void 0 ? {} : u;
//   let w = entry.threshold;
//   let x = (b = v.hiddenWhenZeroArea) !== null ? b : !1;
//   let y = (e = v.hiddenWhenCSSStyleHidden) !== null ? e : !1;
//   // let z =
//   //   (f = v.isEntryInViewport) !== null
//   //     ? f
//   //     : intersectionObserverEntryIsIntersecting;

//   let z = v.isEntryInViewport || intersectionObserverEntryIsIntersecting;

//   let A = useRef(null);
//   let B = useRef(!1);
//   let C = useRef(null);
//   let D = useRef(null);
//   let E = useRef(null);
//   let F = useContext(HiddenSubtreePassiveContext);
//   let G =
//     v.activityMonitorOverride !== void 0
//       ? v.activityMonitorOverride
//       : cometVisibilityUserActivityMonitor;

//   let H = useCallback(
//     (a) => {
//       if (G && !G.isUserActive()) return "USER_INACTIVE";
//       let b = F.getCurrentState();
//       if (b.hidden) return "PUSH_VIEW_HIDDEN";
//       if (b.backgrounded) return "BACKGROUNDED";
//       if (B.current === !1) return "NOT_IN_VIEWPORT";
//       if (x === !0 && n(a)) return "TARGET_SIZE_0";
//       if (y === !0) {
//         b = m(a);
//         if (b !== null) return b;
//       }
//       return null;
//     },
//     [G, F, y, x]
//   );

//   const I = useCallback(
//     (a) => {
//       return !H(a);
//     },
//     [H]
//   );

//   const J = useCallback(
//     (a, b, c) => {
//       let d = A.current !== null;
//       if (!d && c) {
//         let e = Date.now();
//         // @ts-ignore
//         A.current = e;
//         t !== null &&
//           b !== null &&
//           typeof t === "function" &&
//           t({
//             entry: b,
//             visibleTime: e,
//           });
//       } else if (d && !c) {
//         d = (e = A.current) !== null ? e : 0;
//         c = Date.now();
//         if (q !== null) {
//           e = a || (b && H(b)) || "UNKNOWN";
//           q({
//             entry: b,
//             hiddenReason: e,
//             hiddenTime: c,
//             visibleDuration: c - d,
//             visibleTime: d,
//           });
//         }
//         A.current = null;
//       }
//     },
//     [H, q, s, t]
//   );

//   const K = useRef(J);
//   useLayoutEffect(() => {
//     K.current = J;
//   }, [J]);

//   useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED(() => {
//     return () => {
//       K.current("COMPONENT_UNMOUNTED", null, false);

//       if (C.current) {
//         C.current();
//         C.current = null;
//       }

//       if (E.current) {
//         E.current();
//         E.current = null;
//       }

//       if (D.current) {
//         D.current();
//         D.current = null;
//       }

//       // C.current && (C.current(), (C.current = null));
//       // E.current && (E.current.remove(), (E.current = null));
//       // D.current && (D.current.remove(), (D.current = null));
//     };
//     // @ts-ignore
//   }, []);

//   let L = useCallback(
//     (a) => {
//       // c('nullIntersectionObserverEntryLogger')(
//       //   a,
//       //   'IntersectionObserverEntry is null. num_arguments=' + g.length,
//       // )
//       let b = (B.current = z(a));
//       r &&
//         r({
//           entry: a,
//           isElementVisible: I(a),
//         });
//       !C.current
//         ? b &&
//           ((C.current =
//             G &&
//             G.subscribe((b) => {
//               return K.current("USER_INACTIVE", a, I(a));
//             })),
//           (E.current = F.subscribeToChanges((b) => {
//             return K.current(
//               b.hidden ? "PUSH_VIEW_HIDDEN" : "BACKGROUNDED",
//               a,
//               I(a)
//             );
//           })),
//           // c('gkx')('5223') && D.current != null && D.current.remove(),
//           (D.current = RunComet.onBeforeUnload((a) => {
//             K.current("PAGE_UNLOAD", null, !1);
//           }, !1)))
//         : b ||
//           (C.current !== null && (C.current(), (C.current = null)),
//           E.current && (E.current.remove(), (E.current = null)),
//           D.current !== null && (D.current.remove(), (D.current = null)));
//       K.current(null, a, I(a));
//     },
//     [I, G, F, z, r]
//   );

//   const M = useContext(BaseViewportMarginsContext);

//   const N = useMemo(() => {
//     return {
//       bottom: M.bottom + 1,
//       left: M.left + 1,
//       right: M.right + 1,
//       top: M.top + 1,
//     };
//   }, [M.bottom, M.left, M.right, M.top]);

//   const O = (o = v.root) !== null ? o : null;
//   const P =
//     (p = v.rootMargin) !== null
//       ? p
//       : getIntersectionMarginFromViewportMargin(N);

//   return useIntersectionObserver(L, {
//     root: O,
//     rootMargin: P,
//     threshold: w,
//   });
// }

// const m = function (a) {
//   if (!a.target) {
//     return null;
//   }
//   if (getStyleProperty(a.target, "opacity") === "0") {
//     return "TARGET_TRANSPARENT";
//   }
//   return getStyleProperty(a.target, "visibility") === "hidden"
//     ? "TARGET_HIDDEN"
//     : null;
// };

// const n = function (a) {
//   return (
//     a.boundingClientRect &&
//     (a.boundingClientRect.height === 0 || a.boundingClientRect.width === 0)
//   );
// };

const _22827 = true;

// Helper functions to determine visibility and size issues
let checkCSSVisibility = function (entry) {
  if (!entry.target) return null;
  if (getStyleProperty(entry.target, 'opacity') === '0') return 'TARGET_TRANSPARENT';
  return getStyleProperty(entry.target, 'visibility') === 'hidden' ? 'TARGET_HIDDEN' : null;
};

let hasZeroArea = function (entry) {
  return entry.boundingClientRect && (entry.boundingClientRect.height === 0 || entry.boundingClientRect.width === 0);
};

export function useViewportDuration(props) {
  let { onHidden, onIntersection, onVisibilityDurationUpdated, onVisible, options = {}, threshold } = props;

  let {
    hiddenWhenZeroArea = false,
    hiddenWhenCSSStyleHidden = false,
    isEntryInViewport = intersectionObserverEntryIsIntersecting,
    root,
    rootMargin,
    scrollMargin,
  } = options;

  let visibilityStartTimeRef = useRef(null);
  let isVisibleRef = useRef(false);
  let userActivitySubscriptionRef = useRef(null);
  let hiddenSubtreeSubscriptionRef = useRef(null);
  let beforeUnloadSubscriptionRef = useRef(null);

  let hiddenSubtreeContext = useContext(HiddenSubtreePassiveContext);
  let activityMonitor =
    options.activityMonitorOverride !== undefined
      ? options.activityMonitorOverride
      : cometVisibilityUserActivityMonitor;

  // Callback to determine hidden reason
  let getHiddenReason = useCallback(
    (entry) => {
      if (activityMonitor && !activityMonitor.isUserActive()) return 'USER_INACTIVE';
      let hiddenSubtreeState = hiddenSubtreeContext.getCurrentState();
      if (hiddenSubtreeState.hidden) return 'PUSH_VIEW_HIDDEN';
      if (hiddenSubtreeState.backgrounded) return 'BACKGROUNDED';
      if (isVisibleRef.current === false) return 'NOT_IN_VIEWPORT';
      if (hiddenWhenZeroArea === true && hasZeroArea(entry)) return 'TARGET_SIZE_0';
      if (hiddenWhenCSSStyleHidden === true) {
        let reason = checkCSSVisibility(entry);
        if (reason !== null) return reason;
      }
      return null;
    },
    [activityMonitor, hiddenSubtreeContext, hiddenWhenCSSStyleHidden, hiddenWhenZeroArea],
  );

  // Callback to determine if the element is visible
  let isElementVisible = useCallback(
    (entry) => {
      return getHiddenReason(entry) === null;
    },
    [getHiddenReason],
  );

  // Callback to handle visibility changes
  let handleVisibilityChange = useCallback(
    (hiddenReason, entry, isVisible) => {
      let wasVisible = !!visibilityStartTimeRef.current;
      if (!wasVisible && isVisible) {
        let visibleTime = Date.now();
        visibilityStartTimeRef.current = visibleTime;
        onVisible &&
          entry &&
          onVisible({
            entry: entry,
            visibleTime: visibleTime,
          });
      } else if (wasVisible && !isVisible) {
        let visibleStartTime = visibilityStartTimeRef.current || 0;
        let hiddenTime = Date.now();
        let duration = hiddenTime - visibleStartTime;
        if (onHidden) {
          let reason = hiddenReason || (entry && getHiddenReason(entry)) || 'UNKNOWN';
          onHidden({
            entry: entry,
            hiddenReason: reason,
            hiddenTime: hiddenTime,
            visibleDuration: duration,
            visibleTime: visibleStartTime,
          });
        }
        visibilityStartTimeRef.current = null;
      }
    },
    [getHiddenReason, onHidden, onVisible, onVisibilityDurationUpdated],
  );

  // Update handleVisibilityChange callback on change
  let handleVisibilityChangeRef = useRef(handleVisibilityChange);
  useLayoutEffect(() => {
    handleVisibilityChangeRef.current = handleVisibilityChange;
  }, [handleVisibilityChange]);

  // Cleanup effect
  useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED(() => {
    return function () {
      handleVisibilityChangeRef.current('COMPONENT_UNMOUNTED', null, false);
      if (userActivitySubscriptionRef.current) {
        userActivitySubscriptionRef.current();
        userActivitySubscriptionRef.current = null;
      }
      if (hiddenSubtreeSubscriptionRef.current) {
        hiddenSubtreeSubscriptionRef.current.remove();
        hiddenSubtreeSubscriptionRef.current = null;
      }
      if (beforeUnloadSubscriptionRef.current) {
        beforeUnloadSubscriptionRef.current.remove();
        beforeUnloadSubscriptionRef.current = null;
      }
    };
  }, []);

  // Intersection observer callback
  let handleIntersection = useCallback(
    (entry) => {
      // nullIntersectionObserverEntryLogger(
      //   entry,
      //   "IntersectionObserverEntry is null."
      // );
      let isIntersecting = isEntryInViewport(entry);
      isVisibleRef.current = isIntersecting;
      onIntersection &&
        onIntersection({
          entry: entry,
          isElementVisible: isElementVisible(entry),
        });
      if (!userActivitySubscriptionRef.current && isIntersecting) {
        userActivitySubscriptionRef.current =
          activityMonitor &&
          activityMonitor.subscribe(() => {
            handleVisibilityChangeRef.current('USER_INACTIVE', entry, isElementVisible(entry));
          });
        hiddenSubtreeSubscriptionRef.current = hiddenSubtreeContext.subscribeToChanges((state) => {
          handleVisibilityChangeRef.current(
            state.hidden ? 'PUSH_VIEW_HIDDEN' : 'BACKGROUNDED',
            entry,
            isElementVisible(entry),
          );
        });
        if (_22827 && beforeUnloadSubscriptionRef.current) {
          beforeUnloadSubscriptionRef.current.remove();
        }
        beforeUnloadSubscriptionRef.current = RunComet.onBeforeUnload(() => {
          handleVisibilityChangeRef.current('PAGE_UNLOAD', null, false);
        }, false);
      } else if (!isIntersecting) {
        if (userActivitySubscriptionRef.current) {
          userActivitySubscriptionRef.current();
          userActivitySubscriptionRef.current = null;
        }
        if (hiddenSubtreeSubscriptionRef.current) {
          hiddenSubtreeSubscriptionRef.current.remove();
          hiddenSubtreeSubscriptionRef.current = null;
        }
        if (beforeUnloadSubscriptionRef.current) {
          beforeUnloadSubscriptionRef.current.remove();
          beforeUnloadSubscriptionRef.current = null;
        }
      }
      handleVisibilityChangeRef.current(null, entry, isElementVisible(entry));
    },
    [isElementVisible, activityMonitor, hiddenSubtreeContext, isEntryInViewport, onIntersection],
  );

  // Get the viewport margins from context and adjust them slightly
  let viewportMargins = useContext(BaseViewportMarginsContext);
  let adjustedMargins = useMemo(() => {
    return {
      bottom: viewportMargins.bottom + 1,
      left: viewportMargins.left + 1,
      right: viewportMargins.right + 1,
      top: viewportMargins.top + 1,
    };
  }, [viewportMargins.bottom, viewportMargins.left, viewportMargins.right, viewportMargins.top]);

  // Use the provided root or null, and calculate the root margin
  let observerRoot = root ? root : null;
  let observerRootMargin = rootMargin ? rootMargin : getIntersectionMarginFromViewportMargin(adjustedMargins);

  // Initialize the intersection observer
  return useIntersectionObserver(handleIntersection, {
    root: observerRoot,
    rootMargin: observerRootMargin,
    scrollMargin: scrollMargin,
    threshold: threshold,
  });
}
