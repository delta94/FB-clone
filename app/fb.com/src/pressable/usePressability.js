import { ReactContextMenuEvent } from '@fb-event-interaction/ReactContextMenuEvent';
import { ReactFocusEvent } from '@fb-event-interaction/ReactFocusEvent';
import { ReactHoverEvent } from '@fb-event-interaction/ReactHoverEvent';
import { ReactPressEvent } from '@fb-event-interaction/ReactPressEvent';

const usePressability = (targetRef, options) => {
  const {
    disabled,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
  } = options;

  ReactHoverEvent.useHover(targetRef, {
    disabled,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
  });

  ReactPressEvent.usePress(targetRef, {
    disabled,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
  });

  ReactFocusEvent.useFocus(targetRef, {
    disabled,
    onBlur,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
  });

  ReactContextMenuEvent.useContextMenu(targetRef, {
    disabled,
    onContextMenu,
    preventDefault: preventContextMenu || false,
  });
};

export { usePressability };
