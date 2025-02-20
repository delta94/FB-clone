import React, { useCallback, useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { WebPressableGroupContext } from '@fb-contexts';
import { useWebPressableTouchStartHandler } from '@fb-event-interaction/useWebPressableTouchStartHandler';
import stylex from '@stylexjs/stylex';
import joinClasses from 'fbjs/lib/joinClasses';

import { usePressability } from './usePressability';

// Assuming there is a function c("UserAgent").isBrowser() that checks the user agent
// It returns true if the user agent is "Safari" or "Mobile Safari", otherwise false

const styles = stylex.create({
  disabled: {
    cursor: 'not-allowed',
  },
  focusNotVisible: {
    outline: 'none',
  },
  root: {
    WebkitTapHighlightColor: 'transparent',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    borderColor: 'var(--always-dark-overlay)',
    borderStyle: 'solid',
    borderWidth: '0px',
    // border: '0 solid var(--always-dark-overlay)',
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    listStyleType: 'none',
    margin: '0',
    minHeight: 0,
    minWidth: 0,
    padding: '0',
    position: 'relative',
    textAlign: 'inherit',
    textDecoration: 'none',
    touchAction: 'manipulation',
    zIndex: 0,
  },
  rootInGroup: {
    touchAction: 'none',
  },
});
const validElementTypes = ['menuitem', 'tab', 'none'];
const specialElements = {
  article: 'article',
  banner: 'header',
  complementary: 'aside',
  contentinfo: 'footer',
  figure: 'figure',
  form: 'form',
  heading: 'h1',
  label: 'label',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  none: 'div',
  region: 'section',
};
/**
 *
 * @param {string} elementType
 * @param {{ url?: string,attributionsrc?: any,download?: any,rel?: any,target?: any}} additionalData
 * @returns {string}
 */
function determineElementTag(elementType, additionalData) {
  let tag = 'div';
  if (validElementTypes.includes(elementType) && additionalData && additionalData.url) {
    tag = 'a';
  } else if (elementType) {
    /**
     * @type {string | undefined}
     */
    const mappedTag = specialElements[elementType];
    if (mappedTag) {
      tag = mappedTag;
    }
    return tag;
  }
  // let tag = 'div';
  // if (
  //   Object.keys(specialElements).includes(elementType) &&
  //   additionalData !== undefined &&
  //   additionalData.url != undefined
  // ) {
  //   tag = 'a';
  // } else if (elementType !== undefined) {
  //   /**
  //    * @type {string | undefined}
  //    */
  //   const mappedTag = specialElements[elementType];
  //   if (mappedTag !== undefined) {
  //     tag = mappedTag;
  //   }
  // }
  // return tag;
}
function useChainedCallbacks(callbackA, callbackB) {
  return useCallback(
    (arg) => {
      callbackA(arg);
      if (callbackB) {
        callbackB(arg);
      }
    },
    [callbackA, callbackB],
  );
}
/**
 *
 * @param {HTMLElement} a
 * @returns {boolean}
 */
function isElementInDocument(a) {
  return typeof document !== 'undefined' && typeof document.contains === 'function' ? document.contains(a) : false;
}
function hasValidAncestorAnchor(el) {
  let elTemp = el;
  while (elTemp) {
    if (elTemp.tagName === 'A' && elTemp.href) {
      return true;
    }
    elTemp = elTemp.parentNode;
  }
  return false;
}
function shouldHandleClickEvent(event, preventDefault) {
  const { altKey, ctrlKey, currentTarget, metaKey, shiftKey, target } = event;
  // var d = event.altKey,
  //   e = event.ctrlKey,
  //   f = event.currentTarget,
  //   g = event.metaKey,
  //   h = event.shiftKey
  // event = event.target
  let i = target;
  // c('justknobx')._('450') &&
  i = isElementInDocument(target) ? target : currentTarget;
  event = hasValidAncestorAnchor(i);
  const key = altKey || ctrlKey || metaKey || shiftKey;
  return preventDefault !== false && event && !key;
}
// var s = function (el) {
//   var b = el.target,
//     c = b.tagName;
//   c =
//     b.isContentEditable ||
//     (c === 'A' && b.href != null) ||
//     c === 'BUTTON' ||
//     c === 'INPUT' ||
//     c === 'SELECT' ||
//     c === 'TEXTAREA';
//   if (b.tabIndex === 0 && !c) {
//     c = el.key;
//     if (c === 'Enter') return true;
//     el = b.getAttribute('role');
//     if (
//       (c === ' ' || c === 'Spacebar') &&
//       (el === 'button' ||
//         el === 'checkbox' ||
//         el === 'combobox' ||
//         el === 'menuitem' ||
//         el === 'menuitemcheckbox' ||
//         el === 'menuitemradio' ||
//         el === 'option' ||
//         el === 'radio' ||
//         el === 'switch' ||
//         el === 'tab')
//     )
//       return true;
//   }
//   return false;
// };
/**
 * Determines whether a key event on a target element should trigger an action.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 * @returns {boolean} - True if the event should trigger an action, otherwise false.
 */
// eslint-disable-next-line complexity
const shouldTriggerActionForKeyEvent = (event) => {
  // Retrieve target element and its tag name
  const targetElement = event.target;
  const tagName = targetElement.tagName;
  // Check conditions related to the element's type
  const isContentEditable =
    targetElement.isContentEditable ||
    (tagName === 'A' && targetElement.href) ||
    tagName === 'BUTTON' ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA';
  // Check conditions based on tabIndex and key event
  if (targetElement.tabIndex === 0 && !isContentEditable) {
    const pressedKey = event.key;
    // Check if Enter key is pressed
    if (pressedKey === 'Enter') {
      return true;
    }
    // Check if Spacebar or ' ' key is pressed and the element's role allows it
    const role = targetElement.getAttribute('role');
    if (
      (pressedKey === ' ' || pressedKey === 'Spacebar') &&
      (role === 'button' ||
        role === 'checkbox' ||
        role === 'combobox' ||
        role === 'menuitem' ||
        role === 'menuitemcheckbox' ||
        role === 'menuitemradio' ||
        role === 'option' ||
        role === 'radio' ||
        role === 'switch' ||
        role === 'tab')
    )
      return true;
  }
  // Default case: return false
  return false;
};

function responseRoleType(type) {
  switch (type) {
    case 'none':
      return 'presentation';
    case 'label':
      return undefined;
    default:
      return type;
  }
}
/**
 *
 * @param {import("./types").CometPressableProps} props
 * @returns
 */
// eslint-disable-next-line complexity
export const WebPressable = (props) => {
  const targetRef = useRef(null);

  //
  const [focusChangeState, setFocusChangeState] = useState(false);
  const [focusVisibleChangeState, setFocusVisibleChangeState] = useState(false);
  const [hoverChangeState, setHoverChangeState] = useState(false);
  const [pressChangeState, setPressChangeState] = useState(false);
  const webPressableGroupContextValue = useContext(WebPressableGroupContext);
  // TODO add jsdoc
  const {
    accessibilityLabel,
    accessibilityRelationship,
    accessibilityRole,
    accessibilityState,
    accessibilityValue,
    allowClickEventPropagation,
    children,
    className_DEPRECATED,
    disabled,
    forwardedRef,
    link,
    nativeID,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onKeyDown,
    onPress,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
    preventDefault,
    style,
    suppressFocusRing = false,
    tabbable,
    testOnly_state,
    xstyle,
    ...rest
  } = props;
  const isAllowClickEventPropagation = allowClickEventPropagation === undefined ? false : allowClickEventPropagation;
  const ElementTagComponent = determineElementTag(accessibilityRole, link);
  const _disabled = disabled === true || (!accessibilityState ? undefined : accessibilityState.disabled) === true;
  const ariaHidden = !accessibilityState ? undefined : accessibilityState.hidden;
  const isAnchorTagAndNotDisable = ElementTagComponent === 'a' && _disabled !== true;
  const _props = {
    disabled: _disabled === true || (!testOnly_state ? undefined : testOnly_state.disabled) === true || false,
    focusVisible: focusVisibleChangeState || (!testOnly_state ? undefined : testOnly_state.focusVisible) === true,
    focused: focusChangeState || (!testOnly_state ? undefined : testOnly_state.focused) === true,
    hovered: hoverChangeState || (!testOnly_state ? undefined : testOnly_state.hovered) === true,
    pressed: pressChangeState || (!testOnly_state ? undefined : testOnly_state.pressed) === true,
  };
  const _children = typeof children === 'function' ? children(_props) : children;
  const _className_DEPRECATED =
    typeof className_DEPRECATED === 'function' ? className_DEPRECATED(_props) : className_DEPRECATED;
  const _style = typeof style === 'function' ? style(_props) : style;
  const _className = typeof xstyle === 'function' ? xstyle(_props) : xstyle;

  usePressability(targetRef, {
    disabled: _disabled,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange: useChainedCallbacks(setFocusChangeState, onFocusChange),
    onFocusVisibleChange: useChainedCallbacks(setFocusVisibleChangeState, onFocusVisibleChange),
    onHoverChange: useChainedCallbacks(setHoverChangeState, onHoverChange),
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onPressChange: useChainedCallbacks(setPressChangeState, onPressChange),
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
    preventDefault: !preventDefault ? true : preventDefault,
  });
  const onPressCallBack = useCallback(
    (event) => {
      if (onPress) {
        onPress(event);
      }

      if ((onPress || link) && isAllowClickEventPropagation !== true) {
        event.stopPropagation();
      }

      if (shouldHandleClickEvent(event, preventDefault)) {
        event.nativeEvent.preventDefault();
      }
    },
    [isAllowClickEventPropagation, link, onPress, preventDefault],
  );
  const onKeyDownCallBack = useCallback(
    (event) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (shouldTriggerActionForKeyEvent(event)) {
        const key = event.key;
        if (key === ' ' || key === 'Spacebar') {
          event.preventDefault();
        }

        if (onPress) {
          onPress(event);
          event.stopPropagation();
        }

        // (b === ' ' || b === 'Spacebar') && a.preventDefault()
        // onPress && (onPress(event), event.stopPropagation());
      }
    },
    [onKeyDown, onPress],
  );
  const cbFunc1Ref = useCallback(
    (node) => {
      targetRef.current = node;

      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else {
        if (forwardedRef) {
          // eslint-disable-next-line react-compiler/react-compiler
          forwardedRef.current = node;
        }
      }
    },
    [forwardedRef],
  );
  useWebPressableTouchStartHandler(targetRef, webPressableGroupContextValue, onPressCallBack);

  let _tabIndex = -1;
  // c('gkx')('5403')
  // ? Z !== true && tabbable !== false && (xstyle = 0):
  _disabled !== true && ariaHidden !== true && tabbable !== false && (_tabIndex = 0);
  const linkDownload = !link ? undefined : link.download;
  const canDownload = (linkDownload === true || typeof linkDownload === 'string') && isAnchorTagAndNotDisable;

  const LinkComp = ElementTagComponent === 'a' ? Link : ElementTagComponent;

  return (
    <LinkComp
      {...rest}
      aria-activedescendant={!accessibilityRelationship ? undefined : accessibilityRelationship.activedescendant}
      aria-busy={!accessibilityState ? undefined : accessibilityState.busy}
      aria-checked={!accessibilityState ? undefined : accessibilityState.checked}
      aria-controls={!accessibilityRelationship ? undefined : accessibilityRelationship.controls}
      aria-current={!accessibilityRelationship ? undefined : accessibilityRelationship.current}
      aria-describedby={!accessibilityRelationship ? undefined : accessibilityRelationship.describedby}
      aria-details={!accessibilityRelationship ? undefined : accessibilityRelationship.details}
      aria-disabled={disabled === true ? _disabled : undefined}
      aria-errormessage={!accessibilityRelationship ? undefined : accessibilityRelationship.errormessage}
      aria-expanded={!accessibilityState ? undefined : accessibilityState.expanded}
      aria-haspopup={!accessibilityRelationship ? undefined : accessibilityRelationship.haspopup}
      aria-hidden={ariaHidden}
      aria-invalid={!accessibilityState ? undefined : accessibilityState.invalid}
      aria-label={accessibilityLabel}
      aria-labelledby={!accessibilityRelationship ? undefined : accessibilityRelationship.labelledby}
      aria-modal={!accessibilityState ? undefined : accessibilityState.modal}
      aria-orientation={!accessibilityState ? undefined : accessibilityState.orientation}
      aria-owns={!accessibilityRelationship ? undefined : accessibilityRelationship.owns}
      aria-pressed={!accessibilityState ? undefined : accessibilityState.pressed}
      aria-readonly={!accessibilityState ? undefined : accessibilityState.readonly}
      aria-required={!accessibilityState ? undefined : accessibilityState.required}
      aria-selected={!accessibilityState ? undefined : accessibilityState.selected}
      aria-valuemax={!accessibilityValue ? undefined : accessibilityValue.max}
      aria-valuemin={!accessibilityValue ? undefined : accessibilityValue.min}
      aria-valuenow={!accessibilityValue ? undefined : accessibilityValue.now}
      aria-valuetext={!accessibilityValue ? undefined : accessibilityValue.text}
      attributionsrc={isAnchorTagAndNotDisable ? (!link ? undefined : link.attributionsrc) : undefined}
      className={joinClasses(
        stylex.props(
          styles.root,
          _props.disabled && styles.disabled,
          (!_props.focusVisible || suppressFocusRing === true) && styles.focusNotVisible,
          _className,
          webPressableGroupContextValue && styles.rootInGroup,
        ).className,
        _className_DEPRECATED,
        // classes.root,
        // _props.disabled && classes.disabled,
        // (!_props.focusVisible || suppressFocusRing === true) &&
        //   classes.focusNotVisible,
        // _className,
        // webPressableGroupContextValue && classes.rootInGroup,
        // _className_DEPRECATED
      )}
      data-testid={undefined}
      download={canDownload ? linkDownload : undefined}
      to={isAnchorTagAndNotDisable ? (!link ? undefined : link.url) : undefined}
      id={nativeID}
      onClick={_disabled ? undefined : onPressCallBack}
      onKeyDown={_disabled ? undefined : onKeyDownCallBack}
      ref={cbFunc1Ref}
      rel={isAnchorTagAndNotDisable ? (!link ? undefined : link.rel) : undefined}
      role={responseRoleType(accessibilityRole)}
      style={_style}
      tabIndex={_tabIndex}
      target={isAnchorTagAndNotDisable ? (!link ? undefined : link.target) : undefined}
    >
      {_children}
    </LinkComp>
  );
};
