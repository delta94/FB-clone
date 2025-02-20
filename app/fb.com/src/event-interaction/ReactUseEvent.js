import { useLayoutEffect } from 'react';
import REACTDOM from 'react-dom';
import { useUnsafeRef_DEPRECATED } from '@fb-hooks';

/**
 *
 * @param {string} event
 * @param {import("./types").EventOption} option
 * @returns {UseEventHandle}
 */
export const useReactEvent = (event, option) => {
  // TODO jsdoc with generic ref
  const handleRef = useUnsafeRef_DEPRECATED(null);

  let handleRefValue = handleRef.current;

  if (option) {
    Object.defineProperty(option, 'passive', {
      value: undefined,
      writable: true,
      configurable: true,
      enumerable: true,
    });
  }

  if (!handleRefValue) {
    const setEventHandle = REACTDOM.unstable_createEventHandle(event, option);
    const clears = new Map();

    handleRefValue = {
      /**
       *
       * @param {EventTarget} target
       * @param {null | ((e: React.SyntheticEvent<EventTarget>) => void)} callback
       */
      setListener: (target, callback) => {
        let clear = clears.get(target);

        if (clear) {
          clear();
        }

        if (!callback) {
          clears.delete(target);
          return;
        }
        clear = setEventHandle(target, callback);
        clears.set(target, clear);
      },

      clear: () => {
        // var a = Array.from(clears.values())
        // for (var b = 0; b < a.length; b++) a[b]()
        // clears.clear()
        clears.forEach((c) => {
          c();
        });
        clears.clear();
      },
    };

    handleRef.current = handleRefValue;
  }

  useLayoutEffect(() => {
    return () => {
      if (handleRefValue) {
        handleRefValue.clear();
      }
      handleRef.current = null;
    };
  }, [handleRefValue]);

  return handleRefValue;
};
