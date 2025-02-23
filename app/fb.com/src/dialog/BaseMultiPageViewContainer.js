import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { BaseMultiPageViewContext } from '@fb-contexts';
import { FocusInertRegion } from '@fb-focus/FocusInertRegion';
import { FocusRegion } from '@fb-focus/FocusRegionStrictMode';
import { HiddenSubtreeContextProvider } from '@fb-platform/HiddenSubtreeContextProvider';
import Locale from 'fbjs/lib/Locale';
import emptyFunction from 'fbjs/lib/emptyFunction';
import { headerOrTabbableScopeQuery, tabbableScopeQuery } from '@focus/focusScopeQueries';
import { getPrefersReducedMotion } from '@fb-utils/getPrefersReducedMotion';
import { gkx } from '@fb-utils/gkx';
import { mergeRefs } from '@fb-utils/mergeRefs';
import stylex from '@stylexjs/stylex';
import { testID } from '@fb-utils/testID';

const styles = {
  page: {
    borderTopStartRadius: 'inherit',
    borderTopEndRadius: 'inherit',
    borderBottomEndRadius: 'inherit',
    borderBottomStartRadius: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    transformOrigin: 'left',
  },
  pageInactive: {
    display: 'none',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  root: {
    alignItems: 'stretch',
    clipPath: 'inset(0px 0px 0px 0px)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transformOrigin: 'left',
  },
};

const isRTL = Locale.isRTL();
const ANIMATION_DURATION = 300;
const disableAnimationsByPref = getPrefersReducedMotion() || !gkx('22877');

function easingFunction(progress) {
  return Math.cos((progress + 1) * Math.PI) / 2 + 0.5;
}

export const BaseMultiPageViewContainer = forwardRef(function BaseMultiPageViewContainer(props, ref) {
  const {
    onAddPage,
    onClearRemovedPages,
    onPopPage,
    pageHistory,
    children,
    disableAnimations = false,
    disableAutoFocus = false,
    disableAutoRestoreFocus = false,
    disableFocusContainment = false,
    disableInitialAutoFocus = false,
    fallback,
    imperativeRef,
    onPageChange = emptyFunction,
    pageXStyle,
    placeholderComponent,
    xstyle,
  } = props;

  // Refs for DOM elements and for storing measurements.
  const containerRef = useRef(null);
  const animatedContainerRef = useRef(null);
  const boundingRectRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const disableInitialFocusAnimation = disableInitialAutoFocus && !hasAnimatedRef.current;
  const shouldDisableAnimations = disableAnimations || disableAnimationsByPref;

  // Update bounding rect from the animated element (if available) or from the container.
  const updateBoundingRect = useCallback(() => {
    if (animatedContainerRef.current) {
      boundingRectRef.current = animatedContainerRef.current.getBoundingClientRect();
    } else if (containerRef.current) {
      boundingRectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, []);

  // Push a new page onto the view.
  const pushPage = useCallback(
    (direction, component, pageInfo) => {
      updateBoundingRect();
      hasAnimatedRef.current = true;
      onAddPage(direction, component, pageInfo);
    },
    [onAddPage, updateBoundingRect],
  );

  // Pop the current page.
  const popPage = useCallback(
    (page) => {
      updateBoundingRect();
      onPopPage(page);
    },
    [onPopPage, updateBoundingRect],
  );

  // Shortcut for pushing a page with "end" direction.
  const pushPageEnd = useCallback((component, pageInfo) => pushPage('end', component, pageInfo), [pushPage]);

  // Determine the index of the active page (the last non-removed pushed page).
  const activePageIndex = useMemo(() => {
    for (let i = pageHistory.length - 1; i >= 0; i--) {
      const page = pageHistory[i];
      if (page.type !== 'pushed_page' || !page.removed) {
        return i;
      }
    }
    return 0;
  }, [pageHistory]);

  // Keep track of the previously active page index.
  const activePageIndexRef = useRef(activePageIndex);
  useEffect(() => {
    if (activePageIndex !== activePageIndexRef.current) {
      onPageChange(activePageIndex);
      activePageIndexRef.current = activePageIndex;
    }
  }, [activePageIndex, onPageChange]);

  // Animate the active page transition.
  const animateActivePage = useCallback(
    (element) => {
      const animatedElem = animatedContainerRef.current;
      const containerElem = containerRef.current;
      if (element != null) {
        const activePage = pageHistory[activePageIndex];
        let direction = activePage.type === 'pushed_page' ? activePage.direction : 'end';
        if (activePageIndexRef.current > activePageIndex) {
          direction = direction === 'start' ? 'end' : 'start';
        }
        const boundingRect = boundingRectRef.current;
        const elementRect = element.getBoundingClientRect();
        if (
          !shouldDisableAnimations &&
          animatedElem != null &&
          animatedElem !== element &&
          boundingRect != null &&
          containerElem != null
        ) {
          const multiplier = (direction === 'start' ? -1 : 1) * (isRTL ? -1 : 1);
          // Reset styles.
          animatedElem.style.cssText = '';
          element.style.cssText = '';
          animatedElem.style.setProperty('display', 'flex');
          animatedElem.style.setProperty('width', `${boundingRect.width}px`);
          animatedElem.style.setProperty('height', `${boundingRect.height}px`);
          element.style.removeProperty('display');
          element.style.removeProperty('width');
          element.style.removeProperty('height');
          const frameCount = Math.round(60 * (ANIMATION_DURATION / 1000));
          const animFrames1 = [];
          const animFrames2 = [];
          const animFrames3 = [];
          for (let m = 0; m <= frameCount; m++) {
            const progress = m / frameCount;
            const eased = easingFunction(progress);
            let scaleX = boundingRect.width / elementRect.width;
            let scaleY = boundingRect.height / elementRect.height;
            scaleX = scaleX + (1 - scaleX) * eased;
            scaleY = scaleY + (1 - scaleY) * eased;
            let deltaX = boundingRect.left - elementRect.left;
            let deltaY = boundingRect.top - elementRect.top;
            deltaX = deltaX * (1 - eased);
            deltaY = deltaY * (1 - eased);
            const minDimension = Math.min(boundingRect.width, elementRect.width);
            let translateX = minDimension * -multiplier * eased;
            const computedTranslateX = minDimension * multiplier * (1 - eased);
            // For simplicity, we use deltaY for vertical translation.
            animFrames1.push({
              easing: 'step-end',
              offset: progress,
              transform: `translateX(${deltaX}px) translateY(${deltaY}px) scaleX(${scaleX}) scaleY(${scaleY})`,
            });
            animFrames2.push({
              easing: 'step-end',
              offset: progress,
              transform: `scaleX(${1 / scaleX}) scaleY(${
                1 / scaleY
              }) translateX(${translateX}px) translateY(${deltaY}px)`,
            });
            animFrames3.push({
              easing: 'step-end',
              offset: progress,
              transform: `scaleX(${1 / scaleX}) scaleY(${
                1 / scaleY
              }) translateX(${computedTranslateX}px) translateY(${deltaY}px)`,
            });
          }
          element.animate(animFrames3, ANIMATION_DURATION);
          containerElem.animate(animFrames1, ANIMATION_DURATION);
          animatedElem.animate(animFrames2, ANIMATION_DURATION);
          element.animate([{ opacity: 0 }, { opacity: 1 }], ANIMATION_DURATION);
          animatedElem.animate([{ opacity: 1 }, { opacity: 0 }], ANIMATION_DURATION).onfinish = function () {
            animatedElem.style.cssText = '';
            if (onClearRemovedPages) onClearRemovedPages();
          };
        }
      }
    },
    [activePageIndex, onClearRemovedPages, pageHistory, shouldDisableAnimations],
  );

  // Expose imperative methods.
  useImperativeHandle(
    imperativeRef,
    () => ({
      addPage: pushPage,
      popPage: popPage,
    }),
    [popPage, pushPage],
  );

  // Prepare the context value to pass down.
  const contextValue = useMemo(
    () => ({
      fallback,
      placeholderComponent,
      popPage,
      pushPage: pushPageEnd,
    }),
    [fallback, placeholderComponent, popPage, pushPageEnd],
  );

  // Merge the container ref with the forwarded ref.
  const mergedRef = useMemo(() => mergeRefs(containerRef, ref), [ref]);

  return (
    <div className={stylex(styles.root, xstyle)} ref={mergedRef} {...testID('BaseMultiStepContainer')}>
      {pageHistory.map((page, index) => (
        <div
          key={page.key}
          aria-hidden={index !== activePageIndex}
          className={stylex(styles.page, index !== activePageIndex && styles.pageInactive, pageXStyle)}
          ref={index === activePageIndex ? animateActivePage : null}
          {...testID(index === 0 ? 'base-multistep-container-first-step' : null)}
        >
          <FocusRegion
            autoFocusQuery={
              !disableAutoFocus && !disableInitialFocusAnimation && index === activePageIndex
                ? headerOrTabbableScopeQuery
                : null
            }
            autoRestoreFocus={!disableAutoRestoreFocus}
            containFocusQuery={disableFocusContainment ? null : tabbableScopeQuery}
            recoverFocusQuery={headerOrTabbableScopeQuery}
          >
            <FocusInertRegion disabled={index === activePageIndex}>
              <HiddenSubtreeContextProvider isHidden={index !== activePageIndex}>
                <BaseMultiPageViewContext.Provider value={contextValue}>
                  {page.type === 'initial_page'
                    ? typeof children === 'function'
                      ? children(pushPageEnd)
                      : children
                    : page.type === 'pushed_page'
                    ? React.createElement(page.component, { onReturn: popPage })
                    : null}
                </BaseMultiPageViewContext.Provider>
              </HiddenSubtreeContextProvider>
            </FocusInertRegion>
          </FocusRegion>
        </div>
      ))}
    </div>
  );
});
