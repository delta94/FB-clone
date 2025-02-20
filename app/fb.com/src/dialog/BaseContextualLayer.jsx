import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  forwardRef,
} from 'react';
import { gkx } from '@fb-utils/gkx';

import {
  BaseContextualLayerAnchorRootContext,
  BaseContextualLayerAvailableHeightContext,
  BaseContextualLayerContextSizeContext,
  BaseContextualLayerLayerAdjustmentContext,
  BaseContextualLayerOrientationContext,
  BaseLinkNestedPressableContext,
  BaseScrollableAreaContext,
  BaseViewportMarginsContext,
  FDSTextContextProvider,
  HiddenSubtreeContext,
  LayoutAnimationBoundaryContext,
} from '@fb-contexts';
import { getComputedStyle } from '@fb-utils/getComputedStyle';
import { isElementFixedOrSticky } from '@fb-utils/isElementFixedOrSticky';
import Locale from 'fbjs/lib/Locale';
import { mergeRefs } from '@fb-utils/mergeRefs';
import { useResizeObserver, useLayoutAnimationEvents } from '@fb-hooks';

import { BaseContextualLayerAnchorRoot } from './BaseContextualLayerAnchorRoot';
import { BaseContextualLayerDefaultContainer } from './BaseContextualLayerDefaultContainer';
import { BasePortal } from './BasePortal';
import { calculateBaseContextualLayerPosition } from '@fb-utils/calculateBaseContextualLayerPosition';
import { FocusRegion } from '@fb-focus/FocusRegion';
import { headerFirstTabbableSecondScopeQuery, tabbableScopeQuery } from '@fb-focus/focusScopeQueries';
import stylex from '@stylexjs/stylex';

const justknobx432 = true;
const gkx7742 = false;
const gkx5608 = false; // ra

const LayoutAnimationEvents = {
  LAYOUT_ANIMATION_EVENT: 'layoutAnimation',
  LayoutAnimationEventType: { Start: 'Start', Stop: 'Stop' },
};

const styles = stylex.create({
  root: {
    left: '0',
    marginRight: '-9999px',
    position: 'absolute',
    top: '0',
  },

  rootReflowToPosition: {
    marginRight: 0,
    marginLeft: null,
    top: 'auto',
  },
});

// Helper functions
function getElementRect(element) {
  const rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    top: rect.top,
  };
}

function getRemainingScrollDistance() {
  const documentHeight = document.documentElement?.scrollHeight ?? 0;
  const windowHeight = window.innerHeight;
  const scrollableHeight = documentHeight - windowHeight;
  const currentScrollPosition = window.pageYOffset;

  return Math.max(0, scrollableHeight - currentScrollPosition);
}
function getScrollTop(elements) {
  const lastElement = elements[elements.length - 1];
  const domNode = lastElement?.getDOMNode();
  return domNode?.scrollTop ? domNode.scrollTop : window.pageYOffset;
}

function getOffsetRect(element) {
  const style = getComputedStyle(element);
  return style && style.getPropertyValue('position') !== 'static'
    ? element
    : (element instanceof HTMLElement && element.offsetParent) || element.ownerDocument.documentElement;
}

const OFFSET = 8;
const MIN_AVAILABLE_HEIGHT = 40; // fa
const MIN_VIEWPORT_HEIGHT = 145; // ga

function getRectIntersection(rect1, rect2) {
  return rect1.bottom < rect2.top || rect2.bottom < rect1.top || rect1.right < rect2.left || rect2.right < rect1.left
    ? null
    : {
        bottom: Math.min(rect1.bottom, rect2.bottom),
        left: Math.max(rect1.left, rect2.left),
        right: Math.min(rect1.right, rect2.right),
        top: Math.max(rect1.top, rect2.top),
      };
}

const isRTL = Locale.isRTL();

//
// Reducer and initial state for managing the contextual layer state
function layerReducer(state, action) {
  switch (action.type) {
    case 'determine_direction':
      if (state.position !== action.position || state.availableHeight !== action.availableHeight) {
        return {
          ...state,
          availableHeight: action.availableHeight,
          position: action.position,
        };
      }
      break;
    case 'reposition':
      if (
        state.adjustment !== action.adjustment ||
        state.contextSize?.height !== action.contextSize?.height ||
        state.contextSize?.width !== action.contextSize?.width
      ) {
        return {
          ...state,
          adjustment: action.adjustment,
          contextSize: action.contextSize,
          isPositionIndeterminate: false,
        };
      }
      break;
    case 'position_indeterminate':
      return { ...state, isPositionIndeterminate: true };
    case 'position_changed':
      if (state.position !== action.position) {
        return { ...state, position: action.position };
      }
      break;
    default:
      return state;
  }
  return state;
}

//
function initialState(position) {
  return {
    adjustment: null,
    availableHeight: null,
    contextSize: null,
    isPositionIndeterminate: false,
    position,
  };
}

//
// CHANGED
// @Becareful
function _BaseContextualLayer(props, ref) {
  const {
    align = 'start',
    disableAutoAlign = false,
    children,
    containFocus = false,
    customContainer: CustomContainer = BaseContextualLayerDefaultContainer,
    disableAutoFlip = false,
    hidden = false,
    imperativeRef,
    onEscapeFocusRegion,
    onIndeterminatePosition,
    position = 'below',
    presencePayload,
    reflowToPosition = false,
    restoreFocus = true,
    stopClickPropagation = false,
    xstyle,
    ...rest
  } = props;

  const [
    { adjustment: layerAdjustment, availableHeight, contextSize, isPositionIndeterminate, position: currentPosition },
    dispatch,
  ] = useReducer(layerReducer, position, initialState);

  const baseContextualLayerAnchorRoot = useContext(BaseContextualLayerAnchorRootContext); // I
  const scrollableAreas = useContext(BaseScrollableAreaContext);
  const K = reflowToPosition ? true : disableAutoFlip;
  const L = reflowToPosition ? true : disableAutoAlign;
  const viewportMargins = useContext(BaseViewportMarginsContext);
  const layoutAnimationBoundary = useContext(LayoutAnimationBoundaryContext);

  const [isAnimating, setIsAnimating] = useState(false);
  const { hidden: subtreeHidden } = useContext(HiddenSubtreeContext);
  const isHidden = subtreeHidden || hidden;

  const containerRef = useRef(null);
  const contextualLayerRef = useRef(null);

  const getContextualLayerElement = useCallback(() => {
    return !rest.context_DEPRECATED && rest.contextRef ? rest.contextRef.current : rest.context_DEPRECATED;
  }, [rest.contextRef, rest.context_DEPRECATED]);

  const getViewportBounds = useCallback(() => {
    const html = document.documentElement;
    if (!html) {
      return;
    }
    return {
      bottom: html.clientHeight - viewportMargins.bottom - OFFSET,
      left: viewportMargins.left + OFFSET,
      right: html.clientWidth - viewportMargins.right - OFFSET,
      top: viewportMargins.top + OFFSET,
    };
  }, [viewportMargins.bottom, viewportMargins.left, viewportMargins.right, viewportMargins.top]);

  let U = null;
  reflowToPosition && (U = getRemainingScrollDistance());

  // Determine the optimal position of the contextual layer

  const determinePosition = useCallback(() => {
    const containerElement = containerRef.current;
    let contextElement = getContextualLayerElement(); // b = S()
    let viewportBounds = getViewportBounds(); // d = T()
    if (!containerElement || !contextElement || !viewportBounds) return;

    const containerRect = getElementRect(containerElement);
    console.log('🚀 ~ determinePosition ~ containerRect:', containerRect);
    const contextRect = getElementRect(contextElement); // e
    console.log('🚀 ~ determinePosition ~ contextRect:', contextRect);

    const containerHeight = containerRect.bottom - containerRect.top;
    const containerWidth = containerRect.right - containerRect.left;

    let startPosition = isRTL ? 'start' : 'end'; // g
    let endPosition = isRTL ? 'end' : 'start'; // h
    let newPosition = currentPosition;
    let availableHeight = null; // j

    // Determine the new position if auto-flip is enabled
    // !disableAutoFlip
    if (!K) {
      if (currentPosition === 'above' || currentPosition === 'below') {
        if (
          currentPosition === 'above' &&
          contextRect.top - containerHeight < viewportBounds.top &&
          contextRect.bottom + containerHeight < viewportBounds.bottom
        ) {
          newPosition = 'below';
        } else if (currentPosition === 'above' && getScrollTop(scrollableAreas) + contextRect.top < containerHeight) {
          newPosition = 'below';
        } else if (
          currentPosition === 'below' &&
          contextRect.bottom + containerHeight > viewportBounds.bottom &&
          contextRect.top - containerHeight > viewportBounds.top
        ) {
          newPosition = 'above';
        }
      } else if (currentPosition === 'start' || currentPosition === 'end') {
        if (
          currentPosition === endPosition &&
          contextRect.left - containerWidth < viewportBounds.left &&
          contextRect.right + containerWidth < viewportBounds.right
        ) {
          newPosition = startPosition;
        } else if (
          currentPosition === startPosition &&
          contextRect.right + containerWidth > viewportBounds.right &&
          contextRect.left - containerWidth > viewportBounds.left
        ) {
          newPosition = endPosition;
        }
      }
    }

    if (newPosition === 'above' || newPosition === 'below') {
      availableHeight =
        newPosition === 'above' ? contextRect.top - viewportBounds.top : viewportBounds.bottom - contextRect.bottom;
    } else if (newPosition === 'start' || newPosition === 'end') {
      availableHeight =
        Math.max(viewportBounds.bottom, contextRect.bottom) - Math.min(contextRect.top, viewportBounds.top);
    }

    if (reflowToPosition && U !== null) {
      // g = I.current;
      // h = g ? c("isElementFixedOrSticky")(g) : !1;
      // g = !h && b.nodeType === 1 && c("isElementFixedOrSticky")(b);
      // h = ((h = d == null ? void 0 : d.bottom) != null ? h : 0) - ((b = d == null ? void 0 : d.top) != null ? b : 0);
      // b = g ? 0 : U;
      // g = b + h - fa;
      // h = b + d.bottom - e.bottom;
      // j = Math.max(Math.min(g, h), ga)

      // BUG: temp, fix later
      startPosition = baseContextualLayerAnchorRoot.current;
      endPosition = startPosition ? isElementFixedOrSticky(startPosition) : !1;
      startPosition = !endPosition && contextElement.nodeType === 1 && isElementFixedOrSticky(contextElement);
      endPosition =
        ((endPosition = viewportBounds === null ? void 0 : viewportBounds.bottom) !== null ? endPosition : 0) -
        ((contextElement = viewportBounds === null ? void 0 : viewportBounds.top) !== null ? contextElement : 0);
      contextElement = startPosition ? 0 : U;
      startPosition = contextElement + endPosition - MIN_AVAILABLE_HEIGHT;
      endPosition = contextElement + viewportBounds.bottom - contextRect.bottom;
      availableHeight = Math.max(Math.min(startPosition, endPosition), MIN_VIEWPORT_HEIGHT);
    }

    contextualLayerRef.current = {
      height: containerHeight,
      width: containerWidth,
    };

    dispatch({
      availableHeight: availableHeight,
      position: newPosition,
      type: 'determine_direction',
    });
  }, [
    getContextualLayerElement, // S
    getViewportBounds, // T
    currentPosition, // G
    K,
    reflowToPosition, // z
    scrollableAreas, // J
    baseContextualLayerAnchorRoot, // I
    U,
  ]);

  let W = null;
  reflowToPosition && (W = availableHeight);

  // Reposition the contextual layer

  const repositionLayer = useCallback(() => {
    const html = document.documentElement;
    const anchorRootElement = baseContextualLayerAnchorRoot.current;
    const viewportBounds = getViewportBounds(); //
    const contextElement = getContextualLayerElement(); //

    let g = containerRef.current;

    if (!html || !anchorRootElement || !viewportBounds || !contextElement || !g) return;

    const containerRect = getOffsetRect(anchorRootElement); // h

    let i = getOffsetRect(anchorRootElement);

    if (!i) {
      return;
    }

    const isFixedOrSticky =
      isElementFixedOrSticky(anchorRootElement) ||
      (contextElement.nodeType === 1 && isElementFixedOrSticky(contextElement));

    const scrollableRects = scrollableAreas
      .map((area) => area.getDOMNode())
      .filter(Boolean)
      .filter((node) => containerRect.contains(node))
      .reduce(
        (acc, node) => (acc ? getRectIntersection(acc, getElementRect(node)) : null),
        getElementRect(contextElement),
      );

    if (!scrollableRects || (scrollableRects.left === 0 && scrollableRects.right === 0)) {
      dispatch({ type: 'position_indeterminate' });
      if (onIndeterminatePosition) onIndeterminatePosition();
      return;
    }

    const offsetRect = isFixedOrSticky
      ? {
          bottom: html.clientHeight,
          left: 0,
          right: html.clientWidth,
          top: 0,
        }
      : getElementRect(containerRect);

    const { adjustment, style } = calculateBaseContextualLayerPosition({
      align,
      contextRect: scrollableRects, // scrollableRects is e
      contextualLayerSize: L ? null : contextualLayerRef.current,
      fixed: isFixedOrSticky, // isFixedOrSticky is b
      offsetRect, // offsetRect is a
      position: currentPosition,
      screenRect: viewportBounds, // viewportBounds is d
    });

    let l = style;
    let h;

    if (justknobx432) {
      l = { left: null, 'max-height': null, position: null, right: null, top: null, 'z-index': null, ...style };
      let j;
      if (reflowToPosition) {
        j = containerRect.bottom - containerRect.top;
        h = viewportBounds.bottom - scrollableRects.bottom;
        j = j - h;
        h = isFixedOrSticky ? 0 : getRemainingScrollDistance();
        let m = scrollableRects.bottom - offsetRect.top;
        j - h > 0 && (m -= j);
        h = viewportBounds.left - offsetRect.left;
        j = viewportBounds.right - viewportBounds.left;
        l = {
          left: h + 'px',
          'max-height': (W ?? 0) + 'px',
          position: isFixedOrSticky ? 'fixed' : 'absolute',
          top: m + 'px',
          width: j + 'px',
          'z-index': gkx[7742] ? '299' : '3',
        };
      }
    }

    // applyStyles(containerRef.current, style);
    if (g) {
      const _style = Object.keys(l);
      for (h = 0; h < _style.length; h++) {
        let a = _style[h];
        let b = l[a];
        b !== null ? g.style.setProperty(a, b) : g.style.removeProperty(a);
      }
    }

    dispatch({
      adjustment,
      contextSize: {
        height: scrollableRects.bottom - scrollableRects.top,
        width: scrollableRects.right - scrollableRects.left,
      },
      type: 'reposition',
    });
  }, [
    baseContextualLayerAnchorRoot,
    getViewportBounds,
    getContextualLayerElement,
    scrollableAreas,
    L,
    align,
    currentPosition,
    onIndeterminatePosition,
    W,
    reflowToPosition,
  ]);

  const handleLayoutAnimationEvent = useCallback(
    (event) => {
      if (event === LayoutAnimationEvents.LayoutAnimationEventType.Start) {
        setIsAnimating(true);
      } else if (event === LayoutAnimationEvents.LayoutAnimationEventType.Stop) {
        setIsAnimating(false);
        repositionLayer();
      }
    },
    [repositionLayer, setIsAnimating],
  );

  useLayoutEffect(() => {
    if (layoutAnimationBoundary && layoutAnimationBoundary.getIsAnimating()) {
      handleLayoutAnimationEvent(LayoutAnimationEvents.LayoutAnimationEventType.Start);
    }
  }, [layoutAnimationBoundary, handleLayoutAnimationEvent]);

  useLayoutAnimationEvents(handleLayoutAnimationEvent);

  useImperativeHandle(
    imperativeRef,
    () => ({
      reposition: (options = {}) => {
        if (!isHidden) {
          const { autoflip = false } = options;
          if (autoflip) determinePosition();
          repositionLayer();
        }
      },
    }),
    [isHidden, repositionLayer, determinePosition],
  );

  const resizeObserver = useResizeObserver(({ height, width }) => {
    contextualLayerRef.current = { height, width };
    repositionLayer();
  });

  const initialPositionRef = useRef(position);

  useLayoutEffect(
    () => {
      if (position !== initialPositionRef.current) {
        dispatch({ position, type: 'position_changed' });
        if (!isHidden) {
          determinePosition();
          repositionLayer();
        }
        initialPositionRef.current = position;
      }
    },
    // , [position, isHidden, determinePosition, repositionLayer]
  );

  const handleContainerRef = useCallback(
    (element) => {
      containerRef.current = element;
      if (element && !isHidden) {
        determinePosition();
        repositionLayer();
      }
    },
    [isHidden, determinePosition, repositionLayer],
  );

  useEffect(() => {
    if (!gkx[5608] || isHidden) return;
    let a = getContextualLayerElement();
    let b = new ResizeObserver(() => {
      determinePosition();
      repositionLayer();
    });
    if (!a || !(a instanceof HTMLElement)) return;
    b.observe(a);
    return function () {
      b.disconnect();
    };
  }, [
    getContextualLayerElement,
    determinePosition,
    repositionLayer,
    isHidden,
    // , ra
  ]);

  useEffect(() => {
    if (isHidden) return;
    const onResize = () => {
      determinePosition();
      repositionLayer();
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [isHidden, determinePosition, repositionLayer]);

  useEffect(() => {
    if (isHidden) return;
    const scrollableElements = scrollableAreas.map((area) => area.getDOMNode()).filter(Boolean);
    if (scrollableElements.length > 0) {
      scrollableElements.forEach((element) => {
        element.addEventListener('scroll', repositionLayer, { passive: true });
      });
      return () => {
        scrollableElements.forEach((element) => {
          element.removeEventListener('scroll', repositionLayer, {
            passive: true,
          });
        });
      };
    }
  }, [isHidden, repositionLayer, scrollableAreas]);

  useEffect(() => {
    if (!window.addEventListener || isHidden) {
      return;
    }
    window.addEventListener('scroll', repositionLayer, { passive: true });
    return () => {
      window.removeEventListener('scroll', repositionLayer, { passive: true });
    };
  }, [isHidden, repositionLayer]);

  const combinedRef = useMemo(
    () => mergeRefs(handleContainerRef, resizeObserver, ref),
    [handleContainerRef, resizeObserver, ref],
  );

  const baseContextualLayerOrientation = useMemo(
    () => ({
      align,
      position: currentPosition,
    }),
    [align, currentPosition],
  );

  const shouldHide = hidden || isPositionIndeterminate;

  return (
    <BasePortal target={baseContextualLayerAnchorRoot?.current ?? baseContextualLayerAnchorRoot}>
      <CustomContainer
        hidden={shouldHide || isPositionIndeterminate || isAnimating}
        presencePayload={presencePayload}
        ref={combinedRef}
        stopClickPropagation={stopClickPropagation}
        xstyle={[styles.root, reflowToPosition && styles.rootReflowToPosition, xstyle]}
        testid={undefined}
      >
        <FocusRegion
          autoFocusQuery={!shouldHide && containFocus ? headerFirstTabbableSecondScopeQuery : null}
          autoRestoreFocus={!shouldHide && restoreFocus}
          containFocusQuery={!shouldHide && containFocus ? tabbableScopeQuery : null}
          onEscapeFocusRegion={onEscapeFocusRegion}
          recoverFocusQuery={shouldHide ? null : headerFirstTabbableSecondScopeQuery}
        >
          <BaseContextualLayerAnchorRoot>
            <BaseContextualLayerContextSizeContext.Provider value={contextSize}>
              <BaseContextualLayerLayerAdjustmentContext.Provider value={layerAdjustment}>
                <BaseContextualLayerAvailableHeightContext.Provider value={availableHeight}>
                  <BaseContextualLayerOrientationContext.Provider value={baseContextualLayerOrientation}>
                    <BaseLinkNestedPressableContext.Provider value={false}>
                      <FDSTextContextProvider color={null} type={null}>
                        {children}
                      </FDSTextContextProvider>
                    </BaseLinkNestedPressableContext.Provider>
                  </BaseContextualLayerOrientationContext.Provider>
                </BaseContextualLayerAvailableHeightContext.Provider>
              </BaseContextualLayerLayerAdjustmentContext.Provider>
            </BaseContextualLayerContextSizeContext.Provider>
          </BaseContextualLayerAnchorRoot>
        </FocusRegion>
      </CustomContainer>
    </BasePortal>
  );
}

export const BaseContextualLayer = forwardRef(_BaseContextualLayer);

BaseContextualLayer.displayName = 'BaseContextualLayer [from BaseContextualLayer.react]';

// Helper function to apply styles to an element
function applyStyles(element, styles) {
  if (element) {
    const styleKeys = Object.keys(styles);
    for (let key of styleKeys) {
      const value = styles[key];
      if (value) {
        element.style.setProperty(key, value);
      } else {
        element.style.removeProperty(key);
      }
    }
  }
}
