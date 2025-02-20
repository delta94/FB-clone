import React, { useLayoutEffect, useCallback } from 'react';

const TIMEOUT = 1000;

/**
 *
 * @param {any} state
 * @param {any} action
 * @returns
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return {
        isTransitioning: true,
        shouldBeVisible: action.shouldBeVisible,
      };
    case 'finish':
      return {
        isTransitioning: false,
        shouldBeVisible: state.shouldBeVisible,
      };
    default:
      return state;
  }
};

/**
 *
 * @param {boolean} visible
 * @returns
 */
export const useFadeEffect = (visible) => {
  console.log('🚀 ~ visible:', { visible });
  const ref = React.useRef(null);
  const [state, setState] = React.useReducer(reducer, {
    isTransitioning: false,
    shouldBeVisible: false,
  });

  const { isTransitioning, shouldBeVisible } = state;
  console.log('🚀 ~ useFadeEffect ~ isTransitioning:', isTransitioning);
  const hiddenRef = React.useRef(null);
  const showRef = React.useRef(null);

  // useDoubleEffectHack_DO_NOT_USE_THIS_IS_TRACKED
  React.useEffect(() => {
    return () => {
      if (hiddenRef.current) {
        clearTimeout(hiddenRef.current);
      }
      if (showRef.current) {
        window.cancelAnimationFrame(showRef.current);
      }
    };
  }, []);

  const handleFinish = React.useCallback(() => {
    setState({
      type: 'finish',
    });
    if (hiddenRef.current) {
      clearTimeout(hiddenRef.current);
      hiddenRef.current = null;
    }
  }, []);

  const handleStart = React.useCallback(
    /**
     *
     * @param {boolean} visible
     */
    (visible) => {
      if (showRef.current) {
        window.cancelAnimationFrame(showRef.current);
      }

      showRef.current = window.requestAnimationFrame(() => {
        setState({
          shouldBeVisible: visible,
          type: 'start',
        });

        showRef.current = null;

        if (hiddenRef.current) {
          clearTimeout(hiddenRef.current);
          hiddenRef.current = setTimeout(handleFinish, TIMEOUT);
        }
      });
    },
    [handleFinish],
  );

  const visibleRef = React.useRef(false);

  useLayoutEffect(() => {
    console.log('🚀 ~ visibleRef.current:', visibleRef.current);
    if (visibleRef.current !== visible && (!visible || ref.current)) {
      handleStart(visible);
      visibleRef.current = visible;
    }
  }, [visible, handleStart]);

  const _ref = useCallback(
    (_re) => {
      let _elm = ref.current;
      ref.current = _re;
      if (_re) {
        if (_re.addEventListener) {
          _re.addEventListener('transitionend', handleFinish);
          _re.addEventListener('webkitTransitionEnd', handleFinish);
        }

        if (visibleRef.current) {
          handleStart(true);
        }
      } else if (_elm) {
        if (_elm.removeEventListener) {
          _elm.removeEventListener('transitionend', handleFinish);
          _elm.removeEventListener('webkitTransitionEnd', handleFinish);
        }
      }
    },
    [handleFinish, handleStart],
  );
  const _isTransitioning = isTransitioning || shouldBeVisible || visible;
  console.log('🚀 ~ _isTransitioning:', _isTransitioning);
  return [_isTransitioning, shouldBeVisible, _ref];
};
