import React, { useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import { HiddenSubtreeContext } from '@fb-contexts/HiddenSubtreeContext';
import { usePrevious } from '@fb-hooks/usePrevious';
import { useStable } from '@fb-hooks/useStable';
import { BaseView } from '@fb-layout/BaseView';
import { HiddenSubtreeContextProvider } from './HiddenSubtreeContextProvider';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  detached: {
    // MsOverflowStyle: 'none',
    height: '100%',
    overflowX: 'auto',
    overflowY: 'auto',
    position: 'fixed',
    scrollbarWidth: 'none',
    left: 0,
    top: 0,
    width: '100%',
    '::-webkit-scrollbar': {
      display: 'none',
      height: 0,
      width: 0,
    },
  },
});

// p
const scrollElements = new Map();
// q
const hiddenElements = new Set();

// r
let activeScrollElement = null;

// s
function isFollowing(a, b) {
  return !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
}

// t
function findTopElement() {
  let topElement = null;
  scrollElements.forEach((_, element) => {
    // element &&
    if (!topElement || (isFollowing(topElement, element) && !hiddenElements.has(element))) {
      topElement = element;
    }
  });
  return topElement;
}

// u
const isAboveActive = (element) => !activeScrollElement || isFollowing(activeScrollElement, element);

export function BaseDocumentScrollView({
  contextKey = undefined,
  detached = false,
  detachedDefaultValue = false,
  detachedPageOffsets,
  disableNavigationScrollReset = false,
  hiddenWhenDetached = false,
  maintainScrollForContext = false,
  onInitialScroll,
  resetScrollOnMount = true,
  ...rest
}) {
  // y
  const scrollRef = useRef();
  // z
  const lastScrollPosition = useRef({ x: 0, y: 0 });
  // A
  const contextScrollPositions = useStable(() => {
    return {};
  });
  // B
  const prevContextKey = usePrevious(contextKey);
  // C D
  const [isDetached, setDetached] = useState(detachedDefaultValue);
  // E F
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  // G
  const prevDetached = usePrevious(isDetached);
  // H
  const { hidden: isParentHidden } = useContext(HiddenSubtreeContext);

  useLayoutEffect(() => {
    const element = scrollRef.current;

    if (!element) return;

    if (isAboveActive(element)) {
      if (activeScrollElement) {
        const updateVisibility = scrollElements.get(activeScrollElement);
        updateVisibility && updateVisibility(false);
      }
      activeScrollElement = element;
    } else {
      setDetached(true);
    }

    scrollElements.set(element, (visible) => {
      if (!visible) {
        setScrollPosition({ ...lastScrollPosition.current });
      }
      setDetached(!visible);
    });

    return () => {
      scrollElements.delete(element);
      if (activeScrollElement === element) {
        activeScrollElement = findTopElement();
        if (activeScrollElement) {
          const updateVisibility = scrollElements.get(activeScrollElement);
          updateVisibility && updateVisibility(true);
        }
      }
    };

    // if (element) {
    //   if (isAboveActive(element)) {
    //     if (activeScrollElement) {
    //       const callback = scrollElements.get(activeScrollElement);
    //       callback && callback(false);
    //     }
    //     activeScrollElement = element;
    //   } else {
    //     setDetached(true);
    //   }
    //   scrollElements.set(element, (isActive) => {
    //     isActive || setScrollPosition({ ...lastScrollPosition.current });
    //     setDetached(!isActive);
    //   });
    //   return () => {
    //     scrollElements.delete(element);
    //     if (activeScrollElement === element) {
    //       activeScrollElement = findTopElement();
    //       if (activeScrollElement) {
    //         const callback = scrollElements.get(activeScrollElement);
    //         callback && callback(true);
    //       }
    //     }
    //   };
    // }
  }, []);

  const handleScroll = useCallback(
    (x, y) => {
      window.scrollTo(x, y);

      if (typeof onInitialScroll === 'function') {
        onInitialScroll(x, y);
      }
    },
    [onInitialScroll],
  );

  useLayoutEffect(() => {
    (resetScrollOnMount || prevDetached) &&
      !isDetached &&
      isDetached !== prevDetached &&
      handleScroll(scrollPosition.x, scrollPosition.y);
  }, [isDetached, scrollPosition, prevDetached, handleScroll, resetScrollOnMount]);

  useLayoutEffect(() => {
    if ((resetScrollOnMount || prevContextKey) && contextKey !== prevContextKey) {
      const savedScrollPosition =
        maintainScrollForContext && contextKey && contextKey in contextScrollPositions
          ? contextScrollPositions[contextKey]
          : { x: 0, y: 0 };

      if (isDetached) {
        setScrollPosition(savedScrollPosition);
      } else if (disableNavigationScrollReset !== true) {
        handleScroll(savedScrollPosition.x, savedScrollPosition.y);
      }
    }
  }, [
    contextKey,
    contextScrollPositions,
    isDetached,
    maintainScrollForContext,
    prevContextKey,
    handleScroll,
    resetScrollOnMount,
    disableNavigationScrollReset,
  ]);

  useLayoutEffect(() => {
    if (!isDetached) {
      const updateLastScrollPosition = () => {
        const { pageXOffset: x, pageYOffset: y } = window;

        lastScrollPosition.current = { x, y };
        if (contextKey) {
          // contextScrollPositions[contextKey] = { x, y };
          Object.defineProperty(contextScrollPositions, contextKey, {
            value: { x, y },
            writable: true,
            configurable: true,
            enumerable: true,
          });
        }
      };
      window.addEventListener('scroll', updateLastScrollPosition, { passive: true });
      return () => window.removeEventListener('scroll', updateLastScrollPosition, { passive: true });
    }
  }, [isDetached, contextKey, contextScrollPositions]);

  useLayoutEffect(() => {
    const element = scrollRef.current;

    // if (isParentHidden) {
    //   hiddenElements.add(element);
    //   if (!isDetached) {
    //     setDetached(true);
    //     activeScrollElement = findTopElement();
    //     if (activeScrollElement) {
    //       const updateVisibility = scrollElements.get(activeScrollElement);
    //       updateVisibility && updateVisibility(true);
    //     }
    //   }
    //   return () => hiddenElements.delete(element);
    // }

    // if (isDetached && element !== activeScrollElement && element === findTopElement()) {
    //   if (activeScrollElement) {
    //     const updateVisibility = scrollElements.get(activeScrollElement);
    //     updateVisibility && updateVisibility(false);
    //   }
    //   activeScrollElement = element;
    //   const updateVisibility = scrollElements.get(activeScrollElement);
    //   updateVisibility && updateVisibility(true);
    // }

    if (element) {
      if (isParentHidden) {
        hiddenElements.add(element);
        if (!isDetached) {
          setDetached(true);
          activeScrollElement = findTopElement();
          if (activeScrollElement) {
            const callback = scrollElements.get(activeScrollElement);
            callback && callback(true);
          }
        }
        return () => {
          hiddenElements.delete(element);
        };
      } else if (isDetached && element !== activeScrollElement && element === findTopElement()) {
        if (activeScrollElement) {
          const callback = scrollElements.get(activeScrollElement);
          callback && callback(false);
        }
        activeScrollElement = element;
        const callback = scrollElements.get(activeScrollElement);
        callback && callback(true);
      }
    }
  }, [isDetached, isParentHidden]);

  const isAriaHidden = isDetached && !hiddenWhenDetached;

  useLayoutEffect(() => {
    const currentScrollView = scrollRef.current;
    if (isAriaHidden && currentScrollView !== undefined) {
      currentScrollView.scrollTop = scrollPosition.y;
    }
  }, [scrollPosition.y, isAriaHidden]);

  return (
    <HiddenSubtreeContextProvider ignoreParent isBackgrounded={detached || isDetached} isHidden={hiddenWhenDetached}>
      <BaseView
        id="BaseDocumentScrollView_BaseView"
        {...rest}
        hidden={hiddenWhenDetached}
        {...(isDetached &&
          !hiddenWhenDetached && {
            'aria-hidden': true,
            id: 'scrollview',
            style: { left: -scrollPosition.x },
            xstyle: styles.detached,
          })}
        ref={scrollRef}
      />
    </HiddenSubtreeContextProvider>
  );
}
