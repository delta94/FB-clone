import { useEffect, useRef } from 'react';

import { ReactEventHelpers } from './ReactEventHelpers';
import { ReactEventHookPropagation } from './ReactEventHookPropagation';
import { useReactEvent } from './ReactUseEvent';

const hoverOptions = {
  passive: true,
};

/**
 *
 * @param {string} name
 * @param {any} param
 * @param {any} target
 */
const createCustomEventObject = (name, param, target) => {
  return {
    clientX: param.clientX,
    clientY: param.clientY,
    pageX: param.pageX,
    pageY: param.pageY,
    screenX: param.screenX,
    screenY: param.screenY,
    target,
    timeStamp: param.timeStamp,
    type: name,
    x: param.clientX,
    y: param.clientY,
  };
};

const isAncestorOrSelfWithHover = (childRef, parentRef) => {
  // eslint-disable-next-line no-self-assign
  parentRef = parentRef;
  while (parentRef) {
    if (parentRef === childRef) {
      return true;
    }
    if (parentRef._hoverEventTarget) {
      return false;
    }
    parentRef = parentRef.parentNode;
  }
  return false;
};

const useHover = (target, options) => {
  const { disabled, onHoverStart, onHoverMove, onHoverEnd, onHoverChange } = options;

  const touchstartHandler = useReactEvent('touchstart', hoverOptions);
  const mouseoverHandler = useReactEvent('mouseover', hoverOptions);
  const mouseoutHandler = useReactEvent('mouseout', hoverOptions);
  console.log('🚀 ~ useHover ~ mouseoutHandler:', mouseoutHandler);
  const mousemoveHandler = useReactEvent('mousemove', hoverOptions);
  const pointeroverHandler = useReactEvent('pointerover', hoverOptions);
  const pointeroutHandler = useReactEvent('pointerout', hoverOptions);
  const pointermoveHandler = useReactEvent('pointermove', hoverOptions);
  const pointercancelHandler = useReactEvent('pointercancel', hoverOptions);

  const hoverTouchRef = useRef({
    isHovered: false,
    isTouched: false,
  });

  useEffect(() => {
    let targetElement = target.current;
    const hoverTouchRefCurrent = hoverTouchRef.current;

    if (targetElement && hoverTouchRefCurrent) {
      // targetElement = { ...targetElement, _hoverEventTarget: true };

      Object.defineProperty(targetElement, '_hoverEventTarget', {
        value: true,
        writable: true,
        configurable: true,
        enumerable: true,
      });

      // l
      const handleMouseOut = (param) => {
        if (hoverTouchRefCurrent.isHovered && !isAncestorOrSelfWithHover(targetElement, param.relatedTarget)) {
          hoverTouchRefCurrent.isHovered = false;
          onHoverEnd && onHoverEnd(createCustomEventObject('hoverend', param, targetElement));
          onHoverChange && onHoverChange(false);
          cleanup(param);
        }
      };

      // y
      const handleMouseMove = (param) => {
        hoverTouchRefCurrent.isTouched = false;
        if (disabled === true) {
          cleanup(param);
          return;
        }

        if (hoverTouchRefCurrent.isHovered && onHoverMove) {
          onHoverMove(createCustomEventObject('hovermove', param, targetElement));
        }
      };

      // y
      const cleanup = (param) => {
        hoverTouchRefCurrent.isTouched = false;

        if (ReactEventHelpers.hasPointerEvents) {
          pointermoveHandler.setListener(document, null);
          pointercancelHandler.setListener(document, null);
          pointeroutHandler.setListener(document, null);
        } else {
          mouseoutHandler.setListener(document, null);
        }

        handleMouseOut(param);
      };

      // j
      const handleMouseOver = (event) => {
        if (disabled === true) {
          cleanup(event);
          return;
        }

        if (ReactEventHookPropagation.hasEventHookPropagationStopped(event, 'useHover')) {
          return;
        }

        ReactEventHookPropagation.stopEventHookPropagation(event, 'useHover');

        if (!hoverTouchRefCurrent.isHovered && !isAncestorOrSelfWithHover(targetElement, event.relatedTarget)) {
          hoverTouchRefCurrent.isHovered = true;
          if (onHoverStart) {
            onHoverStart(createCustomEventObject('hoverstart', event, targetElement));
          }
          if (onHoverChange) {
            onHoverChange(true);
          }

          if (ReactEventHelpers.hasPointerEvents) {
            pointermoveHandler.setListener(document, handleMouseMove);
            pointercancelHandler.setListener(document, cleanup);
            pointeroutHandler.setListener(document, handleMouseOut);
          } else {
            mouseoutHandler.setListener(document, handleMouseOut);
          }
        }
      };

      if (ReactEventHelpers.hasPointerEvents) {
        pointeroverHandler.setListener(targetElement, (event) => {
          if (event.pointerType !== 'touch') {
            handleMouseOver(event);
          }
        });
      } else {
        mouseoverHandler.setListener(targetElement, (event) => {
          hoverTouchRefCurrent.isTouched || handleMouseOver(event);
        });
        touchstartHandler.setListener(targetElement, () => {
          hoverTouchRefCurrent.isTouched = true;
        });
        mousemoveHandler.setListener(document, handleMouseMove);
      }

      if (hoverTouchRefCurrent.isHovered) {
        if (ReactEventHelpers.hasPointerEvents) {
          pointermoveHandler.setListener(document, handleMouseMove);
          pointercancelHandler.setListener(document, cleanup);
          pointeroutHandler.setListener(document, handleMouseOut);
        } else {
          mouseoutHandler.setListener(document, handleMouseOut);
        }
      }
    }
  }, [
    disabled,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    pointercancelHandler,
    pointermoveHandler,
    pointeroutHandler,
    pointeroverHandler,
    mousemoveHandler,
    mouseoutHandler,
    mouseoverHandler,
    target,
    touchstartHandler,
  ]);
};

export const ReactHoverEvent = {
  useHover,
};

export { useHover };
