/* eslint-disable react-compiler/react-compiler */
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { unstable_createEventHandle } from 'react-dom';
import { ReactEventHelpers } from '@fb-event-interaction/ReactEventHelpers';
import { ReactEventHookPropagation } from '@fb-event-interaction/ReactEventHookPropagation';
import { useReactEvent } from '@fb-event-interaction/ReactUseEvent';
import { useUnsafeRef_DEPRECATED } from '@fb-hooks';
import { gkx } from '@fb-utils/gkx';

const globalFocusVisibleEvents = ReactEventHelpers.hasPointerEvents
  ? ['keydown', 'pointermove', 'pointerdown', 'pointerup']
  : ['keydown', 'mousedown', 'mousemove', 'mouseup', 'touchmove', 'touchstart', 'touchend'];

const eventOption = {
  passive: true,
};

let isGlobalFocusVisible = true;
let hasTrackedGlobalFocusVisible = false;

function trackGlobalFocusVisible() {
  globalFocusVisibleEvents.forEach((type) => {
    // @ts-ignore
    window.addEventListener(
      type,
      handleGlobalFocusVisibleEvent,
      // checkPassiveEventsSupported
      //   ? {
      //       capture: true,
      //       passive: true,
      //     }
      //   :
      true,
    );
  });
}

/**
 *
 * @param {KeyboardEvent} nativeEvent
 * @returns
 */
function isValidKey(nativeEvent) {
  const { metaKey, altKey, ctrlKey } = nativeEvent;
  return !(metaKey || (!ReactEventHelpers.isMac && altKey) || ctrlKey);
}

/**
 *
 * @param {KeyboardEvent} nativeEvent
 * @returns
 */
function isTextInput(nativeEvent) {
  const { key, target } = nativeEvent;
  if (key === 'Tab' || key === 'Escape') {
    return false;
  }
  const { isContentEditable, tagName } = target;

  return tagName === 'INPUT' || tagName === 'TEXTAREA' || isContentEditable;
}

/**
 *
 * @param {MouseEvent | TouchEvent | KeyboardEvent} nativeEvent
 * @returns
 */
function handleGlobalFocusVisibleEvent(nativeEvent) {
  if (nativeEvent.type === 'keydown') {
    if (isValidKey(nativeEvent)) {
      // KeyboardEvent
      isGlobalFocusVisible = true;
    }
  } else {
    const { nodeName } = nativeEvent.target;

    // Safari calls mousemove/pointermove events when you tab out of the active
    // Safari frame.
    if (nodeName === 'HTML') {
      return;
    }
    // Handle all the other mouse/touch/pointer events
    isGlobalFocusVisible = false;
  }
}

/**
 *
 * @param {React.SyntheticEvent<EventTarget>} event
 * @param {(v: boolean) => void} callback
 */
function handleFocusVisibleTargetEvents(event, b, callback) {
  if (event.type === 'keydown') {
    const { nativeEvent } = event;
    if (isValidKey(nativeEvent) && !isTextInput(nativeEvent)) {
      callback(true);
    }
    // isValidKey(nativeEvent as any) &&
    //   !isFocusNavigationEvent(nativeEvent) &&
    //   callback(true)
  } else {
    if (b.isFocused) {
      callback(b.isFocusVisible);
    } else {
      isGlobalFocusVisible = false;
      callback(false);
    }
  }
}

/**
 *
 * @param {any[]} focusVisibleHandles
 * @param {EventTarget} focusTarget
 * @param { (v: boolean) => void} callback
 */
// eslint-disable-next-line max-params
function setFocusVisibleListeners(focusVisibleHandles, focusTarget, c, callback) {
  focusVisibleHandles.forEach((focusVisibleHandle) => {
    focusVisibleHandle.setListener(focusTarget, (event) => {
      handleFocusVisibleTargetEvents(event, c, callback);
    });
  });
}

function useFocusVisibleInputHandles() {
  const mousedownHandle = useReactEvent('mousedown', eventOption);
  const pointerHandle = useReactEvent(ReactEventHelpers.hasPointerEvents ? 'pointerdown' : 'touchstart', eventOption);
  const keydownHandle = useReactEvent('keydown', eventOption);

  return [mousedownHandle, pointerHandle, keydownHandle];
}

function useFocusLifecycles() {
  useEffect(() => {
    // if (!hasTrackedGlobalFocusVisible) {
    //   hasTrackedGlobalFocusVisible = true
    //   trackGlobalFocusVisible()
    // }

    if (!hasTrackedGlobalFocusVisible) {
      hasTrackedGlobalFocusVisible = true;
      trackGlobalFocusVisible();
    }

    // hasTrackedGlobalFocusVisible ||
    //   ((hasTrackedGlobalFocusVisible = true), trackGlobalFocusVisible());
  }, []);
}

/**
 *
 * @param {{ current: null | Node }} focusTargetRef
 * @param {import("./types").UseFocusOptions} param
 */
function useFocus(focusTargetRef, { disabled, onBlur, onFocus, onFocusChange, onFocusVisibleChange }) {
  const stateRef = useRef({
    isFocusVisible: false,
    isFocused: false,
  });

  const focusHandle = useReactEvent('focusin', eventOption);
  const blurHandle = useReactEvent('focusout', eventOption);
  const focusVisibleHandles = useFocusVisibleInputHandles();

  useLayoutEffect(() => {
    const focusTarget = focusTargetRef.current;
    const state = stateRef.current;

    if (focusTarget && focusTarget.nodeType === 1) {
      setFocusVisibleListeners(
        focusVisibleHandles,
        focusTarget,
        state,
        /**
         *
         * @param {boolean} isFocusVisible
         */
        (isFocusVisible) => {
          if (state.isFocused && state.isFocusVisible !== isFocusVisible) {
            state.isFocusVisible = isFocusVisible;
            if (onFocusVisibleChange) {
              onFocusVisibleChange(isFocusVisible);
            }
          }
          // state.isFocused &&
          //   state.isFocusVisible !== isFocusVisible &&
          //   ((state.isFocusVisible = isFocusVisible),
          //   onFocusVisibleChange && onFocusVisibleChange(isFocusVisible))
        },
      );

      focusHandle.setListener(
        focusTarget,
        /**
         *
         * @param {FocusEvent} event
         */
        (event) => {
          if (disabled === true) {
            return;
          }

          if (ReactEventHookPropagation.hasEventHookPropagationStopped(event, 'useFocus')) {
            return;
          }
          ReactEventHookPropagation.stopEventHookPropagation(event, 'useFocus');

          if (!state.isFocused && focusTarget === event.target) {
            state.isFocused = true;
            state.isFocusVisible = isGlobalFocusVisible;
            if (onFocus) {
              onFocus(event);
            }
            if (onFocusChange) {
              onFocusChange(true);
            }
            if (state.isFocusVisible && onFocusVisibleChange) {
              onFocusVisibleChange(true);
            }
          }

          // !state.isFocused &&
          //   focusTarget === event.target &&
          //   ((state.isFocused = true),
          //   (state.isFocusVisible = isGlobalFocusVisible),
          //   onFocus && onFocus(event),
          //   onFocusChange && onFocusChange(true),
          //   state.isFocusVisible &&
          //     onFocusVisibleChange &&
          //     onFocusVisibleChange(true))
        },
      );

      // const onFocusCallback = (event: FocusEvent) => {
      //   if (state.isFocused) {
      //     state.isFocused = false
      //     state.isFocusVisible = isGlobalFocusVisible
      //     if (onBlur) {
      //       onBlur(event)
      //     }
      //     if (onFocusChange) {
      //       onFocusChange(false)
      //     }
      //     if (state.isFocusVisible && onFocusVisibleChange) {
      //       onFocusVisibleChange(false)
      //     }
      //   }

      //   // state.isFocused &&
      //   //   ((state.isFocused = false),
      //   //   onBlur && onBlur(event),
      //   //   onFocusChange && onFocusChange(false),
      //   //   state.isFocusVisible &&
      //   //     onFocusVisibleChange &&
      //   //     onFocusVisibleChange(false),
      //   //   (state.isFocusVisible = isGlobalFocusVisible))
      // }

      blurHandle.setListener(
        focusTarget,

        /**
         *
         * @param {FocusEvent} event
         */
        (event) => {
          if (disabled === true) {
            return;
          }

          if (ReactEventHookPropagation.hasEventHookPropagationStopped(event, 'useFocus')) {
            return;
          }

          ReactEventHookPropagation.stopEventHookPropagation(event, 'useFocus');

          // onFocusCallback(event)

          if (state.isFocused) {
            state.isFocused = false;
            if (onBlur) {
              onBlur(event);
            }
            // if (onFocusChange) {
            //   onFocusChange(false);
            // }
            if (state.isFocusVisible && onFocusVisibleChange) {
              onFocusVisibleChange(false);
            }

            state.isFocusVisible = isGlobalFocusVisible;
          }
        },
      );
    }
  }, [
    blurHandle,
    disabled,
    focusHandle,
    focusTargetRef,
    focusVisibleHandles,
    onBlur,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
  ]);

  useEffect(() => {
    const focusTargetCurrent = focusTargetRef.current;
    const stateRefCurrent = stateRef.current;
    return () => {
      if (!focusTargetRef.current && stateRefCurrent.isFocused) {
        stateRefCurrent.isFocused = false;
        const focusEventBlur = new window.FocusEvent('blur');
        Object.defineProperty(focusEventBlur, 'target', {
          value: focusTargetCurrent,
        });

        if (onBlur) {
          onBlur(focusEventBlur);
        }

        if (onFocusChange) {
          onFocusChange(false);
        }

        if (stateRefCurrent.isFocusVisible && onFocusVisibleChange) {
          onFocusVisibleChange(false);
        }

        // onBlur && onBlur(focusEventBlur as any)
        // onFocusChange && onFocusChange(false)
        // stateRefCurrent.isFocusVisible &&
        //   onFocusVisibleChange &&
        //   onFocusVisibleChange(false)
        stateRefCurrent.isFocusVisible = isGlobalFocusVisible;
      }
    };
  });

  // Mount/Unmount logic
  useFocusLifecycles();
}

/**
 * @template T
 * @param {{ current: null | T } | ((focusWithinTarget: null | T) => void)} focusWithinTargetRef
 * @param {import("./types").UseFocusWithinOptions} param1
 * @returns {(focusWithinTarget: null | T) => void}
 */
function useFocusWithin(
  focusWithinTargetRef,
  {
    disabled,
    onAfterBlurWithin,
    onBeforeBlurWithin,
    onBlurWithin,
    onFocusWithin,
    onFocusWithinChange,
    onFocusWithinVisibleChange,
  },
) {
  // Setup controlled state for this useFocus hook
  const stateRef = useRef({
    isFocusVisible: false,
    isFocused: false,
  });

  const focusHandle = useReactEvent('focusin', eventOption);
  const blurHandle = useReactEvent('focusout', eventOption);
  const afterBlurHandle = useReactEvent('afterblur', eventOption);
  const beforeBlurHandle = useReactEvent('beforeblur', eventOption);

  const focusVisibleHandles = useFocusVisibleInputHandles();

  const useFocusWithinRef = useCallback(
    /**
     *
     * @param {null | T} focusWithinTarget
     */
    (focusWithinTarget) => {
      // Handle the incoming focusTargetRef. It can be either a function ref
      // or an object ref.

      if (typeof focusWithinTargetRef === 'function') {
        focusWithinTargetRef(focusWithinTarget);
      } else {
        focusWithinTargetRef.current = focusWithinTarget;
      }

      const state = stateRef.current;

      if (focusWithinTarget && state) {
        // Handle focus visible
        setFocusVisibleListeners(
          focusVisibleHandles,
          //  focusWithinTarget is not null here
          focusWithinTarget,
          (isFocusVisible) => {
            if (state.isFocused && state.isFocusVisible !== isFocusVisible) {
              state.isFocusVisible = isFocusVisible;
              if (onFocusWithinVisibleChange) {
                onFocusWithinVisibleChange(isFocusVisible);
              }
            }
          },
        );
        // Handle focus
        //  focusWithinTarget is not null here
        focusHandle.setListener(
          focusWithinTarget,
          /**
           *
           * @param {FocusEvent} event
           * @returns
           */
          (event) => {
            if (!gkx[5403] && disabled === true) {
              return;
            }
            if (ReactEventHookPropagation.hasEventHookPropagationStopped(event, 'useFocusWithin')) {
              return;
            }

            if (!state.isFocused) {
              state.isFocused = true;
              state.isFocusVisible = isGlobalFocusVisible;
              if (onFocusWithinChange) {
                onFocusWithinChange(true);
              }
              if (state.isFocusVisible && onFocusWithinVisibleChange) {
                onFocusWithinVisibleChange(true);
              }
            }

            if (!state.isFocusVisible && isGlobalFocusVisible) {
              state.isFocusVisible = isGlobalFocusVisible;
              if (onFocusWithinVisibleChange) {
                onFocusWithinVisibleChange(true);
              }
            }

            if (onFocusWithin) {
              onFocusWithin(event);
            }

            // state.isFocused ||
            //   ((state.isFocused = true),
            //   (state.isFocusVisible = isGlobalFocusVisible),
            //   onFocusWithinChange && onFocusWithinChange(true),
            //   state.isFocusVisible &&
            //     onFocusWithinVisibleChange &&
            //     onFocusWithinVisibleChange(true))
            // !state.isFocusVisible &&
            //   isGlobalFocusVisible &&
            //   ((state.isFocusVisible = isGlobalFocusVisible),
            //   onFocusWithinVisibleChange && onFocusWithinVisibleChange(true))
            // onFocusWithin && onFocusWithin(event)
          },
        );

        blurHandle.setListener(
          focusWithinTarget,

          /**
           *
           * @param {FocusEvent} event
           * @returns
           */
          (event) => {
            if (!gkx[5403] && disabled) {
              return;
            }
            const { relatedTarget } = event.nativeEvent;

            if (ReactEventHookPropagation.hasEventHookPropagationStopped(event, 'useFocusWithin')) {
              return;
            }

            if (state.isFocused && !ReactEventHelpers.isRelatedTargetWithin(focusWithinTarget, relatedTarget)) {
              state.isFocused = false;
              if (onFocusWithinChange) {
                onFocusWithinChange(false);
              }
              if (state.isFocusVisible && onFocusWithinVisibleChange) {
                onFocusWithinVisibleChange(false);
              }
              if (onBlurWithin) {
                onBlurWithin(event);
              }
            } else {
              ReactEventHookPropagation.stopEventHookPropagation(event, 'useFocusWithin');
            }
          },
        );

        // Handle before blur. This is a special
        // React provided event.
        //  focusWithinTarget is not null here
        beforeBlurHandle.setListener(
          focusWithinTarget,

          /**
           *
           * @param {FocusEvent} event
           */
          (event) => {
            if (!gkx[5403] && disabled) {
              return;
            }

            if (onBeforeBlurWithin) {
              onBeforeBlurWithin(event);
              // Add an "afterblur" listener on document. This is a special
              // React provided event.
              afterBlurHandle.setListener(
                document,
                /**
                 *
                 * @param {FocusEvent} afterBlurEvent
                 */
                (afterBlurEvent) => {
                  if (onAfterBlurWithin) {
                    onAfterBlurWithin(afterBlurEvent);
                  }
                  // Clear listener on document
                  afterBlurHandle.setListener(document, null);
                },
              );
            }
          },
        );
      }
    },
    [
      afterBlurHandle,
      beforeBlurHandle,
      blurHandle,
      disabled,
      focusHandle,
      focusVisibleHandles,
      focusWithinTargetRef,
      onAfterBlurWithin,
      onBeforeBlurWithin,
      onBlurWithin,
      onFocusWithin,
      onFocusWithinChange,
      onFocusWithinVisibleChange,
    ],
  );

  // Mount/Unmount logic
  useFocusLifecycles();

  return useFocusWithinRef;
}

function useDOMEventListener(domEventName, eventOption) {
  const unsafeRef = useUnsafeRef_DEPRECATED(null);
  let unsafeRefCurrent = unsafeRef.current;
  eventOption && (eventOption.passive = undefined);
  if (!unsafeRefCurrent) {
    const eventHandler = unstable_createEventHandle(domEventName, eventOption);
    const map = new Map();

    unsafeRefCurrent = {
      clear: function () {
        let a = Array.from(map.values());
        for (let b = 0; b < a.length; b++) a[b]();
        map.clear();
      },
      setListener: (key, cb) => {
        let c = map.get(key);
        c !== undefined && c();
        if (!cb) {
          map.delete(key);
          return;
        }
        c = eventHandler(key, function () {
          cb.apply(undefined, arguments);
        });
        map.set(key, c);
      },
    };
    unsafeRef.current = unsafeRefCurrent;
  }
  return unsafeRefCurrent;
}

function useInteractionHandlers() {
  const mousedownHandler = useDOMEventListener('mousedown', eventOption);
  const downHandler = useDOMEventListener(
    ReactEventHelpers.hasPointerEvents ? 'pointerdown' : 'touchstart',
    eventOption,
  );
  const keydownHandler = useDOMEventListener('keydown', eventOption);
  return [mousedownHandler, downHandler, keydownHandler];
}

function useFocusWithinStrictMode({
  disabled,
  onAfterBlurWithin,
  onBeforeBlurWithin,
  onBlurWithin,
  onFocusWithin,
  onFocusWithinChange,
  onFocusWithinVisibleChange,
}) {
  const focusRef = useRef({
    isFocusVisible: false,
    isFocused: false,
  });
  const focusHandle = useDOMEventListener('focusin', eventOption);
  const blurHandle = useDOMEventListener('focusout', eventOption);
  const afterblurHandle = useDOMEventListener('afterblur', eventOption);
  const beforeblurHandle = useDOMEventListener('beforeblur', eventOption);
  const handlerArr = useInteractionHandlers();

  const focusWithinStrictModeCallBack = useCallback(
    (props) => {
      const focusRefCurrent = focusRef.current;
      props && focusRefCurrent
        ? (setFocusVisibleListeners(handlerArr, props, (param) => {
            focusRefCurrent.isFocused &&
              focusRefCurrent.isFocusVisible !== param &&
              ((focusRefCurrent.isFocusVisible = param),
              onFocusWithinVisibleChange && onFocusWithinVisibleChange(param));
          }),
          focusHandle.setListener(props, (param) => {
            if (!gkx[5403] && disabled === true) {
              return;
            }
            if (ReactEventHookPropagation.hasEventHookPropagationStopped(param, 'useFocusWithin')) return;
            focusRefCurrent.isFocused ||
              ((focusRefCurrent.isFocused = true),
              (focusRefCurrent.isFocusVisible = isGlobalFocusVisible),
              onFocusWithinChange && onFocusWithinChange(true),
              focusRefCurrent.isFocusVisible && onFocusWithinVisibleChange && onFocusWithinVisibleChange(true));
            !focusRefCurrent.isFocusVisible &&
              isGlobalFocusVisible &&
              ((focusRefCurrent.isFocusVisible = isGlobalFocusVisible),
              onFocusWithinVisibleChange && onFocusWithinVisibleChange(true));
            onFocusWithin && onFocusWithin(param);
          }),
          blurHandle.setListener(props, (param) => {
            if (!gkx[5403] && disabled === true) return;
            let relatedTarget = param.nativeEvent.relatedTarget;
            if (ReactEventHookPropagation.hasEventHookPropagationStopped(param, 'useFocusWithin')) return;
            focusRefCurrent.isFocused && !ReactEventHelpers.isRelatedTargetWithin(props, relatedTarget)
              ? ((focusRefCurrent.isFocused = false),
                onFocusWithinChange && onFocusWithinChange(false),
                focusRefCurrent.isFocusVisible && onFocusWithinVisibleChange && onFocusWithinVisibleChange(false),
                onBlurWithin && onBlurWithin(param))
              : ReactEventHookPropagation.stopEventHookPropagation(param, 'useFocusWithin');
          }),
          beforeblurHandle.setListener(props, (param) => {
            if (!gkx[5403] && disabled === true) return;
            onBeforeBlurWithin &&
              (onBeforeBlurWithin(param),
              afterblurHandle.setListener(document, (e) => {
                onAfterBlurWithin && onAfterBlurWithin(e);
                afterblurHandle.setListener(document, null);
              }));
          }))
        : !props && (focusHandle.clear(), blurHandle.clear(), beforeblurHandle.clear());
    },
    [
      afterblurHandle,
      beforeblurHandle,
      blurHandle,
      disabled,
      focusHandle,
      handlerArr,
      onAfterBlurWithin,
      onBeforeBlurWithin,
      onBlurWithin,
      onFocusWithin,
      onFocusWithinChange,
      onFocusWithinVisibleChange,
    ],
  );
  useFocusLifecycles();
  return focusWithinStrictModeCallBack;
}

export const ReactFocusEvent = {
  getGlobalFocusVisible: () => isGlobalFocusVisible,
  useFocus,
  useFocusWithin,
  useFocusWithinStrictMode,
};
