import { useEffect, useRef } from 'react';

import { ReactEventHelpers } from './ReactEventHelpers';
import { ReactEventHookPropagation } from './ReactEventHookPropagation';
import { useReactEvent } from './ReactUseEvent';

const eventOptions = {
  passive: !0,
};

// eslint-disable-next-line max-params
function createExtendedEventObject(type, buttons, pointerType, originalEvent, target) {
  return {
    altKey: originalEvent.altKey,
    buttons: buttons,
    clientX: originalEvent.clientX,
    clientY: originalEvent.clientY,
    ctrlKey: originalEvent.ctrlKey,
    defaultPrevented: originalEvent.defaultPrevented,
    metaKey: originalEvent.metaKey,
    pageX: originalEvent.pageX,
    pageY: originalEvent.pageY,
    pointerType: pointerType,
    preventDefault: () => {
      // eslint-disable-next-line no-invalid-this
      this.defaultPrevented = true;
      originalEvent.preventDefault();
    },
    screenX: originalEvent.screenX,
    screenY: originalEvent.screenY,
    shiftKey: originalEvent.shiftKey,
    stopPropagation: () => {
      originalEvent.stopPropagation();
    },
    target: target,
    timeStamp: originalEvent.timeStamp,
    type: type,
    x: originalEvent.clientX,
    y: originalEvent.clientY,
  };
}

/**
 * // TODO jsdoc
 * @param {*} target
 * @param {*} options
 */
const usePress = (target, options) => {
  const { disabled, onPressStart, onPressMove, onPressEnd, onPressChange } = options;

  const pointerdownHandler = useReactEvent('pointerdown');
  const pointermoveHanlder = useReactEvent('pointermove', eventOptions);
  const pointerupHandler = useReactEvent('pointerup', eventOptions);
  const pointercancelHandler = useReactEvent('pointercancel', eventOptions);
  const mousedownHandler = useReactEvent('mousedown');
  const mouseupHandler = useReactEvent('mouseup', eventOptions);
  const mousemoveHandler = useReactEvent('mousemove', eventOptions);
  const dragstartHandler = useReactEvent('dragstart', eventOptions);
  const focusoutHandler = useReactEvent('focusout', eventOptions);

  const pressRef = useRef({
    activationEvent: null,
    bounds: null,
    buttons: 0,
    isPressActive: false,
    isPressed: false,
    pointerId: null,
    pointerType: '',
  });

  useEffect(() => {
    const targetElement = target.current;
    const pressRefCurrent = pressRef.current;

    if (targetElement) {
      const handlePressEnd = (event) => {
        pressRefCurrent.isPressActive = false;
        pressRefCurrent.bounds = null;
        pressRefCurrent.activationEvent = null;

        handlePressMoveOrPressStart(event);

        if (ReactEventHelpers.hasPointerEvents) {
          pointerupHandler.setListener(document, null);
          pointermoveHanlder.setListener(document, null);
          pointercancelHandler.setListener(document, null);
        } else {
          mousemoveHandler.setListener(document, null);
          mouseupHandler.setListener(document, null);
          dragstartHandler.setListener(document, null);
        }

        // ReactEventHelpers.hasPointerEvents
        //   ? (pointerupHandler.setListener(document, null),
        //     pointermoveHanlder.setListener(document, null),
        //     pointercancelHandler.setListener(document, null))
        //   : (mousemoveHandler.setListener(document, null),
        //     mouseupHandler.setListener(document, null),
        //     dragstartHandler.setListener(document, null));
      };

      const handlePressStart = (event) => {
        if (disabled === true) {
          handlePressEnd(event);
          return;
        }

        if (ReactEventHookPropagation.hasEventHookPropagationStopped(event, 'usePress')) {
          return;
        }

        ReactEventHookPropagation.stopEventHookPropagation(event, 'usePress');

        if (
          event.buttons === 2 ||
          event.buttons > 4 ||
          (ReactEventHelpers.isMac && event.pointerType === 'mouse' && event.ctrlKey)
        ) {
          return;
        }
        pressRefCurrent.buttons = event.buttons;
        event.button === 1 && (pressRefCurrent.buttons = 4);
        handlePressMove(event);
      };

      const handlePressMove = (event) => {
        if (!pressRefCurrent.isPressed) {
          let pointerType = event;
          const pointerId = pointerType.pointerId;
          // TODO improve this
          pointerType = pointerType.pointerType || 'mouse';
          pressRefCurrent.isPressed = true;
          pressRefCurrent.isPressActive = true;
          pressRefCurrent.pointerId = pointerId !== undefined ? pointerId : null;
          pressRefCurrent.pointerType = pointerType;
          pressRefCurrent.activationEvent = event;
          pointerType !== 'mouse' && (pressRefCurrent.bounds = targetElement.getBoundingClientRect());

          onPressStart &&
            onPressStart(
              createExtendedEventObject('pressstart', pressRefCurrent.buttons, pointerType, event, targetElement),
            );

          onPressChange && onPressChange(true);

          if (ReactEventHelpers.hasPointerEvents) {
            pointerupHandler.setListener(document, handlePressEnd);
            pointermoveHanlder.setListener(document, handlePressEndOrMouseMove);
            pointercancelHandler.setListener(document, handlePressEnd);
          } else {
            mousemoveHandler.setListener(document, handlePressEndOrMouseMove);
            mouseupHandler.setListener(document, handlePressEnd);
            dragstartHandler.setListener(document, handlePressEnd);
          }

          // ReactEventHelpers.hasPointerEvents
          //   ? (pointerupHandler.setListener(document, handlePressEnd),
          //     pointermoveHanlder.setListener(
          //       document,
          //       handlePressEndOrMouseMove
          //     ),
          //     pointercancelHandler.setListener(document, handlePressEnd))
          //   : (mousemoveHandler.setListener(
          //       document,
          //       handlePressEndOrMouseMove
          //     ),
          //     mouseupHandler.setListener(document, handlePressEnd),
          //     dragstartHandler.setListener(document, handlePressEnd));
        }
      };

      const handlePressMoveOrPressStart = (event) => {
        if (pressRefCurrent.isPressed) {
          pressRefCurrent.isPressed = false;
          onPressEnd &&
            onPressEnd(
              createExtendedEventObject(
                'pressend',
                pressRefCurrent.buttons,
                pressRefCurrent.pointerType,
                event,
                targetElement,
              ),
            );

          onPressChange && onPressChange(false);
        }

        // pressRefCurrent.isPressed &&
        //   ((pressRefCurrent.isPressed = !1),
        //   onPressEnd &&
        //     onPressEnd(
        //       createExtendedEventObject(
        //         'pressend',
        //         pressRefCurrent.buttons,
        //         pressRefCurrent.pointerType,
        //         event,
        //         targetElement
        //       )
        //     ),
        //   onPressChange && onPressChange(!1));
      };

      const handlePressEndOrMouseMove = (event) => {
        if (disabled === true) {
          handlePressEnd(event);
          return;
        }
        if (!pressRefCurrent.isPressActive) {
          return;
        }

        const pointerType = pressRefCurrent.pointerType;
        const isPressed = pressRefCurrent.isPressed;
        let isInside = false;

        if (pointerType === 'mouse') {
          const evtTarget = event.target;
          isInside = targetElement.contains(evtTarget);
        } else {
          const pointerId = event.pointerId;
          const bounds = pressRefCurrent.bounds;
          if (pointerId !== pressRefCurrent.pointerId || !bounds) {
            return;
          }

          const clientX = event.clientX;
          const clientY = event.clientY;
          // const top = bounds.top;
          // const left = bounds.left;
          // const right = bounds.right;
          // const bottom = bounds.bottom;

          const { top, left, right, bottom } = bounds;

          isInside = clientX >= left && clientX <= right && clientY >= top && clientY <= bottom;

          // clientX >= left &&
          //   clientX <= right &&
          //   clientY >= top &&
          //   clientY <= bottom &&
          //   (isInside = !0);
        }

        if (isInside) {
          if (isPressed) {
            if (onPressMove) {
              onPressMove(
                createExtendedEventObject('pressmove', pressRefCurrent.buttons, pointerType, event, targetElement),
              );
            }
          } else {
            handlePressMove(event);
          }
        } else {
          if (isPressed) {
            handlePressMoveOrPressStart(event);
          }
        }

        // isInside
        //   ? isPressed
        //     ? onPressMove &&
        //       onPressMove(
        //         createExtendedEventObject(
        //           'pressmove',
        //           pressRefCurrent.buttons,
        //           pointerType,
        //           event,
        //           targetElement
        //         )
        //       )
        //     : handlePressMove(event)
        //   : isPressed && handlePressMoveOrPressStart(event);
      };

      if (ReactEventHelpers.hasPointerEvents) {
        pointerdownHandler.setListener(targetElement, handlePressStart);
      } else {
        mousedownHandler.setListener(targetElement, handlePressStart);
      }

      focusoutHandler.setListener(targetElement, (param) => {
        const activationEvent = pressRefCurrent.activationEvent;
        if (param.target === targetElement && activationEvent) {
          handlePressEnd(activationEvent);
        }
      });

      if (pressRefCurrent.isPressActive && ReactEventHelpers.hasPointerEvents) {
        pointerupHandler.setListener(document, handlePressEnd);
        pointermoveHanlder.setListener(document, handlePressEndOrMouseMove);
        pointercancelHandler.setListener(document, handlePressEnd);
      } else {
        mousemoveHandler.setListener(document, handlePressEndOrMouseMove);
        mouseupHandler.setListener(document, handlePressEnd);
        dragstartHandler.setListener(document, handlePressEnd);
      }

      // pressRefCurr.isPressActive &&
      //   (ReactEventHelpers.hasPointerEvents
      //     ? (pointerupHandler.setListener(document, handlePressEnd),
      //       pointermoveHanlder.setListener(document, z),
      //       pointercancelHandler.setListener(document, handlePressEnd))
      //     : (mousemoveHandler.setListener(document, z),
      //       mouseupHandler.setListener(document, handlePressEnd),
      //       dragstartHandler.setListener(document, handlePressEnd)));

      return function () {
        const activationEvent = pressRefCurrent.activationEvent;
        !target.current && activationEvent && handlePressEnd(activationEvent);
      };
    }
  }, [
    disabled,
    dragstartHandler,
    focusoutHandler,
    mousedownHandler,
    mousemoveHandler,
    mouseupHandler,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    pointercancelHandler,
    pointerdownHandler,
    pointermoveHanlder,
    pointerupHandler,
    target,
  ]);
};

export const ReactPressEvent = {
  usePress,
};
