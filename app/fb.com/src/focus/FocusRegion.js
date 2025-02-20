import { ActiveFocusRegionUtilsContext } from '@fb-contexts';
import { ReactEventHookPropagation } from '@fb-event-interaction/ReactEventHookPropagation';
import { ReactFocusEvent } from '@fb-event-interaction/ReactFocusEvent';
import { useUnsafeRef_DEPRECATED } from '@fb-hooks';

import { RecoverFocusStrategy } from './FocusRegionType';
import { useKeyboard } from './ReactKeyboardEvent';
import { setElementCanTab } from './setElementCanTab';

import React, {
  unstable_Scope as Unstable_Scope,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import {
  focusElement,
  focusFirst,
  focusNextContained,
  focusPreviousContained,
  getAllNodesFromOneOrManyQueries,
  getFirstNodeFromOneOrManyQueries,
} from './FocusManager';

const _map = new Map();

export function _FocusRegion({
  autoRestoreFocus,
  autoFocusQuery,
  children,
  containFocusQuery,
  forwardRef,
  id,
  onEscapeFocusRegion,
  recoverFocusStrategy,
  stopOnFocusWithinPropagation,
  recoverFocusQuery,
}) {
  const w = !recoverFocusStrategy ? RecoverFocusStrategy.Nearest : recoverFocusStrategy;

  let y = !stopOnFocusWithinPropagation ? true : stopOnFocusWithinPropagation;
  const z = useRef(null);
  const A = useRef(null);
  const B = useContext(ActiveFocusRegionUtilsContext);

  const a = !B && (autoRestoreFocus === true || onEscapeFocusRegion) ? document.activeElement : null;
  let C = useUnsafeRef_DEPRECATED(a);
  let D = C.current ?? a;

  const E = useMemo(() => {
    return {
      lastFocused: null,
      restorationFocusRegionItem: null,
      scope: null,
      triggeredFocusRegionItems: new Set(),
    };
  }, []);
  console.log('🚀 ~ E ~ E:', E);

  const F = useCallback(() => {
    if (B) {
      let a = B.getActiveFocusRegion();
      if (a !== E) {
        if (E.restorationFocusRegionItem !== a) {
          let b;
          if ((!a ? undefined : a.lastFocused) && !(!(b = z.current) ? undefined : b.containsNode(a.lastFocused))) {
            a && a.triggeredFocusRegionItems.add(E);
            E.restorationFocusRegionItem = a;
          } else if (!E.restorationFocusRegionItem) {
            b = !a ? undefined : a.restorationFocusRegionItem;
            E.restorationFocusRegionItem = b;
            a && (!b ? undefined : b.triggeredFocusRegionItems['delete'](a));
            !b ? undefined : b.triggeredFocusRegionItems.add(E);
            B.setActiveFocusRegion(E);
            return;
          }
        }
        (!a || (a && E && a.lastFocused !== E.lastFocused)) && B.setActiveFocusRegion(E);
      }
    }
  }, [B, E]);

  const G = useRef(null);

  const focusTarget = useCallback(
    (a) => {
      z.current = a;
      E.scope = a;
      let b = G.current;
      forwardRef && (forwardRef.current = a);
      b && b !== id && !_map.get(b) && _map['delete'](b);
      id && (a ? ((G.current = id), _map.set(id, a)) : !_map.get(id) && _map['delete'](id));
    },
    [forwardRef, id, E],
  );

  const ref = ReactFocusEvent.useFocusWithin(
    focusTarget,
    useMemo(() => {
      return {
        // eslint-disable-next-line complexity
        onAfterBlurWithin: () => {
          let a = z.current;
          let b = A.current;
          A.current = null;
          let c = document.activeElement;
          if (a && recoverFocusQuery && b && (!c || c === document.body || !a.containsNode(c))) {
            c = true;
            let e = true;
            let f = b.recovery;
            let g = b.recoveryIndex;
            let h = getAllNodesFromOneOrManyQueries(recoverFocusQuery, a);
            if (h && f) {
              let i = new Set(h);
              let j = new Set(f);
              // eslint-disable-next-line no-var, no-inner-declarations
              for (var k = g - 1; k >= 0; k--) {
                // eslint-disable-next-line no-var, no-inner-declarations
                var l = f[k];
                if (i.has(l)) {
                  // eslint-disable-next-line no-var, no-inner-declarations
                  var m = h.indexOf(l);
                  m += 1;
                  if (m < h.length) {
                    m = h[m];
                    // eslint-disable-next-line max-depth
                    if (!j.has(m)) {
                      b.detachedCanTab && setElementCanTab.setElementCanTab(m, true);
                      deferredFocusElement(m, c, e);
                      return;
                    }
                  }
                  b.detachedCanTab && setElementCanTab.setElementCanTab(l, true);
                  deferredFocusElement(l, c, e);
                  return;
                }
              }
              if (w === RecoverFocusStrategy.Nearest)
                for (m = g + 1; m < f.length; m++) {
                  l = f[m];
                  if (i.has(l)) {
                    j = h.indexOf(l);
                    k = j - 1;
                    // eslint-disable-next-line max-depth
                    if (k >= 0) {
                      g = h[k];
                      b.detachedCanTab && setElementCanTab.setElementCanTab(g, true);
                      deferredFocusElement(g, c, e);
                      return;
                    }
                  }
                }
              l = getFirstNodeFromOneOrManyQueries(recoverFocusQuery, a);
              l && (b.detachedCanTab && setElementCanTab.setElementCanTab(l, true), deferredFocusElement(l, c, e));
            }
          }
        },
        onBeforeBlurWithin: (a) => {
          let b = z.current;
          if (b && recoverFocusQuery !== undefined) {
            a.stopPropagation();
            if (!recoverFocusQuery) return;
            a = a.target;
            b = getAllNodesFromOneOrManyQueries(recoverFocusQuery, b);
            if (!b) return;
            let c = b.indexOf(a);
            a = a._tabIndexState;
            A.current = {
              detachedCanTab: a && a.canTab,
              recovery: b,
              recoveryIndex: c,
            };
          }
        },
        onFocusWithin: function (a) {
          y && ReactEventHookPropagation.stopEventHookPropagation(a, 'useFocusWithin');
          E.lastFocused = a.target;
          F();
        },
      };
    }, [recoverFocusQuery, w, y, E, F]),
  );

  const cb = useCallback(() => {
    let a = z.current;
    let b = document.activeElement;
    if (autoFocusQuery && a && (!b || !a.containsNode(b))) {
      b = E.lastFocused;
      b && a.containsNode(b) && !isElementHidden(b)
        ? focusElement(b, {
            focusWithAutoFocus: true,
            focusWithoutUserIntent: true,
            preventScroll: true,
          })
        : focusFirst(autoFocusQuery, a, {
            focusWithAutoFocus: true,
            focusWithoutUserIntent: true,
            preventScroll: true,
          });
    }
  }, [autoFocusQuery, E]);

  useLayoutEffect(cb, [cb]);
  useEffect(cb, [cb]);

  let H = useCallback(
    // eslint-disable-next-line complexity
    (a, c) => {
      c === undefined && (c = false);
      let e = z.current;
      let f = document.activeElement;
      let g = C.current;
      C.current = null;
      let h = !a ? undefined : a.triggeredFocusRegionItems;
      let i = !a ? undefined : a.restorationFocusRegionItem;
      (!h ? undefined : h.size) &&
        h.forEach((a) => {
          // eslint-disable-next-line no-return-assign
          return (a.restorationFocusRegionItem = i);
        });
      a &&
        i &&
        (i.triggeredFocusRegionItems.delete(a),
        (!h ? undefined : h.size) &&
          h.forEach((a) => {
            i.triggeredFocusRegionItems.add(a);
          }));
      E.lastFocused = null;
      h = !B ? undefined : B.getActiveFocusRegion();
      let j = h
        ? h.restorationFocusRegionItem
        : {
            lastFocused: g,
          };
      h === a && (!B ? undefined : B.setActiveFocusRegion(i));
      g = (e && f && e.containsNode(f)) || !f || f === document.body;
      if ((autoRestoreFocus === true || onEscapeFocusRegion) && g) {
        let k = (a) => {
          a === undefined && (a = false);
          if (!j ? undefined : j.lastFocused) {
            let b = true;
            let c = true;
            let e = document.activeElement;
            (a || !e || e === document.body) &&
              focusElement(j.lastFocused, {
                focusWithoutUserIntent: c,
                preventScroll: b,
              });
          }
        };
        c
          ? k(c)
          : window.requestAnimationFrame(() => {
              return k();
            });
      }
    },
    [B, autoRestoreFocus, onEscapeFocusRegion, E],
  );

  let I = useCallback(() => {
    H(E, true);
    onEscapeFocusRegion && onEscapeFocusRegion();
  }, [H, onEscapeFocusRegion, E]);

  useKeyboard(
    z,
    useMemo(() => {
      return {
        onKeyDown: (a) => {
          if (!containFocusQuery || a.key !== 'Tab' || a.isDefaultPrevented()) return;
          let b = z.current;
          b &&
            (a.shiftKey
              ? focusPreviousContained(containFocusQuery, b, a, true, onEscapeFocusRegion ? I : undefined)
              : focusNextContained(containFocusQuery, b, a, true, onEscapeFocusRegion ? I : undefined));
        },
      };
    }, [containFocusQuery, I, onEscapeFocusRegion]),
  );

  useLayoutEffect(() => {
    C.current = D;
    let a = E;
    return function () {
      H(a);
    };
  }, [B, autoRestoreFocus, H, E, D]);

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <Unstable_Scope id={id} ref={ref}>
      {children}
    </Unstable_Scope>
  );
}

// function o(a, preventScroll, focusWithoutUserIntent) {
//   let e = document.activeElement
//   window.requestAnimationFrame(function () {
//     document.activeElement === e &&
//       focusElement(a, {
//         focusWithoutUserIntent: focusWithoutUserIntent,
//         preventScroll: preventScroll,
//       })
//   })
// }

function deferredFocusElement(targetElement, preventScroll, focusWithoutUserIntent) {
  let originalActiveElement = document.activeElement;
  window.requestAnimationFrame(() => {
    if (document.activeElement === originalActiveElement) {
      focusElement(targetElement, {
        focusWithoutUserIntent,
        preventScroll,
      });
    }
  });
}

// function p(a) {
//   return a.offsetWidth === 0 && a.offsetHeight === 0
// }

function isElementHidden(element) {
  return element.offsetWidth === 0 && element.offsetHeight === 0;
}

// export function focusRegionById(a, b, c) {
//   a = _map.get(a)
//   if (a) {
//     a = a.DO_NOT_USE_queryFirstNode(b)
//     if (a ) {
//       focusElement(a, {
//         preventScroll: c,
//       })
//       return a
//     }
//   }
//   return null
// }

function focusRegionById(regionId, selector, preventScroll) {
  const region = _map.get(regionId);
  if (region) {
    const focusedNode = region.DO_NOT_USE_queryFirstNode(selector);
    if (focusedNode) {
      focusElement(focusedNode, {
        preventScroll,
      });
      return focusedNode;
    }
  }
  return null;
}

export { _FocusRegion as FocusRegion, focusRegionById };
