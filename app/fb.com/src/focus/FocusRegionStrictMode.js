import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  unstable_Scope as Scope,
} from 'react';
import { ActiveFocusRegionUtilsContext } from '@fb-contexts';
import {
  focusElement,
  getAllNodesFromOneOrManyQueries,
  getFirstNodeFromOneOrManyQueries,
  focusFirst,
  focusPreviousContained,
  focusNextContained,
} from '@fb-focus/FocusManager';
import { RecoverFocusStrategy } from '@fb-focus/FocusRegionType';
import { ReactEventHookPropagation } from '@fb-event-interaction/ReactEventHookPropagation';
import { ReactFocusEvent } from '@fb-event-interaction/ReactFocusEvent';
import { useKeyboard } from '@fb-focus/ReactKeyboardEvent';
import { setElementCanTab } from '@fb-focus/setElementCanTab';
import { useUnsafeRef_DEPRECATED } from '@fb-hooks';

function focusElementWithAnimation(element, preventScroll, focusWithoutUserIntent) {
  const activeElement = document.activeElement;
  window.requestAnimationFrame(() => {
    if (document.activeElement === activeElement) {
      focusElement(element, {
        preventScroll,
        focusWithoutUserIntent,
      });
    }
  });
}

function isElementHidden(el) {
  return el.offsetWidth === 0 && el.offsetHeight === 0;
}

const focusRegionRegistry = new Map();

function FocusRegionStrictMode(props) {
  const {
    autoRestoreFocus,
    autoFocusQuery,
    children,
    containFocusQuery,
    forwardRef,
    id,
    onEscapeFocusRegion,
    recoverFocusStrategy = RecoverFocusStrategy.Nearest,
    recoverFocusQuery,
    stopOnFocusWithinPropagation = true,
  } = props;
  const scopeRef = useRef(null);
  const recoveryStateRef = useRef(null);
  const focusRegionContext = useContext(ActiveFocusRegionUtilsContext);

  const initialActiveElement =
    !focusRegionContext && (autoRestoreFocus || onEscapeFocusRegion) ? document.activeElement : null;

  const lastActiveElementRef = useUnsafeRef_DEPRECATED(initialActiveElement);
  const previousActiveElement = lastActiveElementRef.current ?? initialActiveElement;

  const focusRegionState = useMemo(
    () => ({
      lastFocused: null,
      scope: null,
      restorationFocusRegionItem: null,
      triggeredFocusRegionItems: new Set(),
    }),
    [],
  );

  const updateActiveFocusRegion = useCallback(() => {
    if (!focusRegionContext) return;

    const activeFocusRegion = focusRegionContext.getActiveFocusRegion();
    if (activeFocusRegion === focusRegionState) return;

    if (focusRegionState.restorationFocusRegionItem !== activeFocusRegion) {
      if (activeFocusRegion?.lastFocused && !scopeRef.current?.containsNode(activeFocusRegion.lastFocused)) {
        activeFocusRegion?.triggeredFocusRegionItems.add(focusRegionState);
        focusRegionState.restorationFocusRegionItem = activeFocusRegion;
      } else if (!focusRegionState.restorationFocusRegionItem) {
        const restorationItem = activeFocusRegion?.restorationFocusRegionItem;
        focusRegionState.restorationFocusRegionItem = restorationItem;

        activeFocusRegion?.restorationFocusRegionItem?.triggeredFocusRegionItems.delete(activeFocusRegion);
        restorationItem?.triggeredFocusRegionItems.add(focusRegionState);

        focusRegionContext.setActiveFocusRegion(focusRegionState);
        return;
      }
    }

    if (!activeFocusRegion || activeFocusRegion?.lastFocused !== focusRegionState.lastFocused) {
      focusRegionContext.setActiveFocusRegion(focusRegionState);
    }
  }, [focusRegionContext, focusRegionState]);

  const registryIdRef = useRef(null);

  const initializeScope = useCallback(
    (scope) => {
      scopeRef.current = scope;
      focusRegionState.scope = scope;

      const currentId = registryIdRef.current;
      if (forwardRef) {
        forwardRef.current = scope;
      }

      if (currentId != null && currentId !== id && focusRegionRegistry.get(currentId) === null) {
        focusRegionRegistry.delete(currentId);
      }

      if (id !== null) {
        if (scope != null) {
          idRef.current = id;
          focusRegionRegistry.set(id, scope);
        } else if (focusRegionRegistry.get(id) === null) {
          focusRegionRegistry.delete(id);
        }
      }
    },
    [forwardRef, id, focusRegionState],
  );

  const focusWithinConfig = useMemo(
    () => ({
      initializer: initializeScope,
      onBeforeBlurWithin: (event) => {
        const scope = scopeRef.current;

        if (!scope || recoverFocusQuery === undefined) return;
        event.stopPropagation();
        if (recoverFocusQuery === null) return;

        const target = event.target;
        const recoveryNodes = getAllNodesFromOneOrManyQueries(recoverFocusQuery, scope);
        if (!recoveryNodes) return;
        const nodeIndex = recoveryNodes.indexOf(target);
        const tabState = target._tabIndexState;

        recoveryStateRef.current = {
          detachedCanTab: tabState?.canTab,
          recoveryIndex: nodeIndex,
          recovery: recoveryNodes,
        };
      },
      onAfterBlurWithin: () => {
        const scope = scopeRef.current;
        const recoveryState = recoveryStateRef.current;
        recoveryStateRef.current = null;

        const activeElement = document.activeElement;
        if (
          !scope ||
          !recoverFocusQuery ||
          !recoveryState ||
          (activeElement && activeElement !== document.body && scope.containsNode(activeElement))
        ) {
          return;
        }

        const preventScroll = true;
        const focusWithoutUserIntent = true;
        const { recovery: oldNodes, recoveryIndex, detachedCanTab } = recoveryState;

        const newNodes = getAllNodesFromOneOrManyQueries(recoverFocusQuery, scope);
        if (!newNodes || !oldNodes) return;
        const newNodesSet = new Set(newNodes);
        const oldNodesSet = new Set(oldNodes);

        for (let i = recoveryIndex - 1; i >= 0; i--) {
          const node = oldNodes[i];
          if (newNodesSet.has(node)) {
            const nextIndex = newNodes.indexOf(node) + 1;
            if (nextIndex < newNodes.length) {
              const nextNode = newNodes[nextIndex];
              if (!oldNodesSet.has(nextNode)) {
                if (detachedCanTab) {
                  setElementCanTab(nextNode, true);
                }
                focusElementWithAnimation(nextNode, preventScroll, focusWithoutUserIntent);
                return;
              }
              if (detachedCanTab) {
                setElementCanTab(node, true);
              }
              focusElementWithAnimation(node, preventScroll, focusWithoutUserIntent);
              return;
            }
            if (recoveryInfo.detachedCanTab) {
              setElementCanTab(candidate, true);
            }
            focusAfterFrame(candidate, shouldPreventScroll, true);
            return;
          }
        }
        if (recoverFocusStrategy === RecoverFocusStrategy.Nearest) {
          for (let i = recoveryIndex + 1; i < oldNodes.length; i++) {
            const node = oldNodes[i];
            if (newNodesSet.has(node)) {
              const prevIndex = newNodes.indexOf(node) - 1;
              if (prevIndex >= 0) {
                const prevNode = newNodes[prevIndex];
                if (detachedCanTab) {
                  setElementCanTab(prevNode, true);
                }
                focusElementWithAnimation(prevNode, preventScroll, focusWithoutUserIntent);
                return;
              }
            }
          }
        }

        const firstNode = getFirstNodeFromOneOrManyQueries(recoverFocusQuery, scope);
        if (firstNode) {
          if (detachedCanTab) {
            setElementCanTab(firstNode, true);
          }
          focusElementWithAnimation(firstNode, preventScroll, focusWithoutUserIntent);
        }
      },
      onFocusWithin: (event) => {
        if (stopOnFocusWithinPropagation) {
          ReactEventHookPropagation.stopEventHookPropagation(event, 'useFocusWithin');
        }
        focusRegionState.lastFocused = event.target;
        updateActiveFocusRegion();
      },
    }),
    [recoverFocusQuery, recoverFocusStrategy, stopOnFocusWithinPropagation, focusRegionState, updateActiveFocusRegion],
  );

  const focusProps = ReactFocusEvent.useFocusWithinStrictMode(focusWithinConfig);

  const handleAutoFocus = useCallback(() => {
    const scope = scopeRef.current;
    const activeElement = document.activeElement;

    if (!autoFocusQuery || !scope || (activeElement && scope.containsNode(activeElement))) {
      return;
    }

    const lastFocused = focusRegionState.lastFocused;
    if (lastFocused && scope.containsNode(lastFocused) && !isElementHidden(lastFocused)) {
      focusElement(lastFocused, {
        focusWithAutoFocus: true,
        focusWithoutUserIntent: true,
        preventScroll: true,
      });
    } else {
      focusFirst(autoFocusQuery, scope, {
        focusWithAutoFocus: true,
        focusWithoutUserIntent: true,
        preventScroll: true,
      });
    }
  }, [autoFocusQuery, focusRegionState]);

  useLayoutEffect(handleAutoFocus, [handleAutoFocus]);
  useEffect(handleAutoFocus, [handleAutoFocus]);

  const restoreFocus = useCallback(
    (focusRegion, immediate = false) => {
      const scope = scopeRef.current;
      const activeElement = document.activeElement;
      const previousElement = lastActiveElementRef.current;
      lastActiveElementRef.current = null;

      const triggeredItems = focusRegion?.triggeredFocusRegionItems;
      const restorationItem = focusRegion?.restorationFocusRegionItem;

      if (triggeredItems?.size) {
        triggeredItems.forEach((item) => (item.restorationFocusRegionItem = restorationItem));
      }

      if (focusRegion && restorationItem) {
        restorationItem.triggeredFocusRegionItems.delete(focusRegion);
        if (triggeredItems?.size) {
          triggeredItems.forEach((item) => {
            restorationItem.triggeredFocusRegionItems.add(item);
          });
        }
      }

      focusRegionState.lastFocused = null;
      const activeFocusRegion = focusRegionContext?.getActiveFocusRegion();
      const restoreTo = activeFocusRegion
        ? activeFocusRegion.restorationFocusRegionItem
        : { lastFocused: previousElement };

      if (activeFocusRegion === focusRegion) {
        focusRegionContext?.setActiveFocusRegion(restorationItem);
      }

      const shouldRestoreFocus =
        scope === null || !activeElement || !scope.containsNode(activeElement) || activeElement === document.body;

      if ((autoRestoreFocus || onEscapeFocusRegion) && shouldRestoreFocus) {
        const performFocusRestore = (forceRestore = false) => {
          if (restoreTo?.lastFocused) {
            const preventScroll = true;
            const focusWithoutUserIntent = true;
            const currentElement = document.activeElement;

            if (forceRestore || !currentElement || currentElement === document.body) {
              focusElement(restoreTo.lastFocused, {
                preventScroll,
                focusWithoutUserIntent,
              });
            }
          }
        };

        if (immediate) {
          performFocusRestore(true);
        } else {
          window.requestAnimationFrame(() => performFocusRestore());
        }
      }
    },
    [focusRegionContext, autoRestoreFocus, onEscapeFocusRegion, focusRegionState],
  );

  const handleEscape = useCallback(() => {
    restoreFocus(focusRegionState, true);
    onEscapeFocusRegion?.();
  }, [restoreFocus, onEscapeFocusRegion, focusRegionState]);

  useKeyboard(
    scopeRef,
    useMemo(
      () => ({
        onKeyDown: (event) => {
          if (!containFocusQuery || event.key !== 'Tab' || event.isDefaultPrevented()) {
            return;
          }

          const scope = scopeRef.current;
          if (!scope) return;

          if (event.shiftKey) {
            focusPreviousContained(
              containFocusQuery,
              scope,
              event,
              true,
              onEscapeFocusRegion ? handleEscape : undefined,
            );
          } else {
            focusNextContained(containFocusQuery, scope, event, true, onEscapeFocusRegion ? handleEscape : undefined);
          }
        },
      }),
      [containFocusQuery, handleEscape, onEscapeFocusRegion],
    ),
  );

  useLayoutEffect(() => {
    lastActiveElementRef.current = previousActiveElement;
    const currentFocusRegionState = focusRegionState;

    return () => {
      restoreFocus(currentFocusRegionState);
    };
  }, [focusRegionContext, autoRestoreFocus, restoreFocus, focusRegionState, previousActiveElement]);

  return (
    <Scope ref={focusProps} id={id}>
      {children}
    </Scope>
  );
}

FocusRegionStrictMode.displayName = `FocusRegionStrictMode [from ${module.id}]`;

// Helper function to focus a region by id from the registry.
function focusRegionById(regionId, query, preventScroll = false) {
  const region = focusRegionRegistry.get(regionId);
  if (region) {
    const node = region.DO_NOT_USE_queryFirstNode(query);
    if (node !== null) {
      focusElement(node, { preventScroll });
      return node;
    }
  }
  return null;
}

export { FocusRegionStrictMode as FocusRegion, focusRegionById };
