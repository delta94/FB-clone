import React, { useCallback, useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { WebPressableGroupContext } from '@fb-contexts';
import { useWebPressableTouchStartHandler } from '@fb-event-interaction/useWebPressableTouchStartHandler';
import { usePressability } from '@fb-pressable/usePressability';
import { gkx } from '@fb-utils/gkx';
import { useMergeRefs } from '@fb-hooks';
import stylex from '@stylexjs/stylex';
import joinClasses from 'fbjs/lib/joinClasses';

// eslint-disable-next-line complexity
const PressableText = (props) => {
  const targetRef = useRef(null);

  const [focused, setFocusedChange] = useState(false);
  const [focusVisible, setFocusVisibleChange] = useState(false);
  const [hoverr, setHoverChange] = useState(false);
  const [presss, setPressChange] = useState(false);

  const pressableGroupContextValue = useContext(WebPressableGroupContext);

  // TODO
  const {
    accessibilityLabel,
    accessibilityRelationship,
    accessibilityRole,
    accessibilityState,
    children,
    className_DEPRECATED,
    direction,
    disabled,
    focusable,
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
    onPress,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
    preventDefault,
    selectable,
    style,
    suppressFocusRing,
    testOnly_state,
    xstyle,
    ...rest
  } = props;

  const ElementComponent = determineTagBasedOnAccessibilityRoleAndLink(accessibilityRole, link);

  const _disabled = disabled === true || (!accessibilityState ? undefined : accessibilityState.disabled) === true;

  const ariaHidden = !accessibilityState ? undefined : accessibilityState.hidden;

  const anchorTagAndNotDisable = ElementComponent === 'a' && disabled !== true;

  const _props = {
    disabled: _disabled === true || (!testOnly_state ? undefined : testOnly_state.disabled) === true || false,
    focused: focused || (!testOnly_state ? undefined : testOnly_state.focused) === true,
    focusVisible:
      (focusVisible && suppressFocusRing !== true) ||
      (!testOnly_state ? undefined : testOnly_state.focusVisible) === true,
    hovered: hoverr || (!testOnly_state ? undefined : testOnly_state.hovered) === true,
    pressed: presss || (!testOnly_state ? undefined : testOnly_state.pressed) === true,
  };

  const _children = typeof children === 'function' ? children(_props) : children;

  const _className_DEPRECATED =
    typeof className_DEPRECATED === 'function' ? className_DEPRECATED(_props) : className_DEPRECATED;

  const _style = typeof style === 'function' ? style(_props) : style;

  const _className = typeof xstyle === 'function' ? xstyle(_props) : xstyle;

  usePressability(targetRef, {
    disabled: _disabled,
    onBlur: onBlur,
    onContextMenu: onContextMenu,
    onFocus: onFocus,
    onFocusChange: useCombinedCallbacks(setFocusedChange, onFocusChange),
    onFocusVisibleChange: useCombinedCallbacks(setFocusVisibleChange, onFocusVisibleChange),
    onHoverChange: useCombinedCallbacks(setHoverChange, onHoverChange),
    onHoverEnd: onHoverEnd,
    onHoverMove: onHoverMove,
    onHoverStart: onHoverStart,
    onPressChange: useCombinedCallbacks(setPressChange, onPressChange),
    onPressEnd: onPressEnd,
    onPressMove: onPressMove,
    onPressStart: onPressStart,
    preventContextMenu: preventContextMenu,
    preventDefault: !preventDefault ? true : preventDefault,
  });

  const onClickCbFunc = useCallback(
    (event) => {
      if (onPress) {
        onPress(event);
      }
      if (onPress || link) {
        event.stopPropagation();
      }

      if (handleClickEventAndPreventDefault(event, preventDefault)) {
        event.nativeEvent.preventDefault();
      }
    },
    [link, onPress, preventDefault],
  );

  const onKeyDownCbFunc = useCallback(
    (event) => {
      if (shouldTriggerActionOnEvent(event)) {
        let key = event.key;

        if (key === ' ' || key === 'Spacebar') {
          event.preventDefault();
        }

        // ;(b === ' ' || b === 'Spacebar') && event.preventDefault()
        // onPress && (onPress(event), event.stopPropagation())

        if (onPress) {
          onPress(event);
          event.stopPropagation();
        }
      }
    },
    [onPress],
  );

  // var ja,

  let _dir;
  switch (direction) {
    case 'none':
      break;
    default:
      direction && (_dir = direction);
      break;
  }

  // const mergeRef = useMergeRefs_Legacy(bRef, forwardedRef);
  const mergeRef = useMergeRefs(targetRef, forwardedRef);

  useWebPressableTouchStartHandler(targetRef, pressableGroupContextValue, onClickCbFunc);

  // vFuncHooks(bRef, pressableGroupContextValue, onClickCbFunc);

  let tabIndexValue;
  const anchorTagOrButtonRole = ElementComponent === 'a' || accessibilityRole === 'button';

  anchorTagOrButtonRole
    ? ariaHidden === true || focusable === false || (!gkx[5403] && _disabled === true)
      ? (tabIndexValue = -1)
      : (tabIndexValue = 0)
    : gkx[5403]
    ? ariaHidden !== true && focusable !== false && accessibilityRole !== 'none' && (tabIndexValue = 0)
    : _disabled !== true &&
      ariaHidden !== true &&
      focusable !== false &&
      accessibilityRole !== 'none' &&
      (tabIndexValue = 0);

  const linkDownload = !link ? undefined : link.download;
  const canDownload = (linkDownload === true || typeof linkDownload === 'string') && anchorTagAndNotDisable;
  const ariaDisable = accessibilityRole === 'none' ? 'presentation' : accessibilityRole;

  const PressableText = ElementComponent === 'a' ? Link : ElementComponent;

  return (
    <PressableText
      {...rest}
      aria-activedescendant={!accessibilityRelationship ? undefined : accessibilityRelationship.activedescendant}
      aria-busy={!accessibilityState ? undefined : accessibilityState.busy}
      aria-checked={!accessibilityState ? undefined : accessibilityState.checked}
      aria-controls={!accessibilityRelationship ? undefined : accessibilityRelationship.controls}
      aria-current={!accessibilityRelationship ? undefined : accessibilityRelationship.current}
      aria-describedby={!accessibilityRelationship ? undefined : accessibilityRelationship.describedby}
      aria-details={!accessibilityRelationship ? undefined : accessibilityRelationship.details}
      aria-disabled={disabled === true && ariaDisable !== 'presentation' ? _disabled : undefined}
      aria-expanded={!accessibilityState ? undefined : accessibilityState.expanded}
      aria-haspopup={!accessibilityRelationship ? undefined : accessibilityRelationship.haspopup}
      aria-hidden={ariaHidden}
      aria-invalid={!accessibilityState ? undefined : accessibilityState.invalid}
      aria-label={accessibilityLabel}
      aria-labelledby={!accessibilityRelationship ? undefined : accessibilityRelationship.labelledby}
      aria-owns={!accessibilityRelationship ? undefined : accessibilityRelationship.owns}
      aria-pressed={!accessibilityState ? undefined : accessibilityState.pressed}
      aria-readonly={!accessibilityState ? undefined : accessibilityState.readonly}
      aria-required={!accessibilityState ? undefined : accessibilityState.required}
      aria-selected={!accessibilityState ? undefined : accessibilityState.selected}
      attributionsrc={anchorTagAndNotDisable ? (!link ? undefined : link.attributionsrc) : undefined}
      className={joinClasses(
        stylex(
          styles.root,
          selectable === false && styles.notSelectable,
          _props.disabled && styles.disabled,
          !_props.focusVisible && styles.focusNotVisible,
          _props.focusVisible && anchorTagOrButtonRole && styles.linkFocusRingXStyle,
          _className,
          pressableGroupContextValue && styles.rootInGroup,
        ),
        _className_DEPRECATED,
      )}
      data-testid={undefined}
      dir={_dir}
      download={canDownload ? linkDownload : undefined}
      to={anchorTagAndNotDisable ? (!link ? undefined : link.url) : undefined}
      id={nativeID}
      onClick={disabled ? undefined : onClickCbFunc}
      onKeyDown={disabled ? undefined : onKeyDownCbFunc}
      ref={mergeRef}
      rel={anchorTagAndNotDisable ? (!link ? undefined : link.rel) : undefined}
      role={ariaDisable}
      style={_style}
      tabIndex={tabIndexValue}
      target={anchorTagAndNotDisable ? (!link ? undefined : link.target) : undefined}
    >
      {_children}
    </PressableText>
  );
};

const tabArr = ['menuitem', 'tab', 'none'];

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

function determineTagBasedOnAccessibilityRoleAndLink(accessibilityRole, link) {
  let tag = 'div';
  if (
    ((!link ? undefined : link.url) && (!link ? undefined : link.url) !== '#') ||
    (tabArr.includes(accessibilityRole) && (!link ? undefined : link.url))
  )
    tag = 'a';
  else if (accessibilityRole) {
    link = specialElements[accessibilityRole];
    link && (tag = link);
  }
  return tag;
}

function useCombinedCallbacks(cb1, cb2) {
  return useCallback(
    (params) => {
      cb1(params);
      cb2 && cb2(params);
    },
    [cb2, cb1],
  );
}

function handleClickEventAndPreventDefault(event, preventDefault) {
  let altKey = event.altKey;
  let ctrlKey = event.ctrlKey;
  let currentTarget = event.currentTarget;
  let metaKey = event.metaKey;
  let shiftKey = event.shiftKey;

  const target = event.target;

  // var i = target
  // c('justknobx')._('450') && (i = sFunc(a) ? a : f)
  const node = isElementInDocument(target) ? target : currentTarget;
  const _isElementOrAncestorLink = isElementOrAncestorLink(node);
  const isCoreKey = altKey || ctrlKey || metaKey || shiftKey;
  return preventDefault !== false && _isElementOrAncestorLink && !isCoreKey;
}

function isElementInDocument(node) {
  return typeof document !== 'undefined' && typeof document.contains === 'function' ? document.contains(node) : false;
}

function isElementOrAncestorLink(el) {
  // eslint-disable-next-line no-self-assign
  el = el;
  while (el) {
    if (el.tagName === 'A' && el.href) return true;
    el = el.parentNode;
  }
  return false;
}

const shouldTriggerActionOnEvent = function (event) {
  let target = event.target;
  let tagName = target.tagName;
  const isNeedTagName =
    target.isContentEditable ||
    (tagName === 'A' && target.href) ||
    tagName === 'BUTTON' ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA';
  if (target.tabIndex === 0 && !isNeedTagName) {
    const key = event.key;
    if (key === 'Enter') {
      return true;
    }
    const role = target.getAttribute('role');
    if (
      (key === ' ' || key === 'Spacebar') &&
      (role === 'button' || role === 'combobox' || role === 'menuitem' || role === 'menuitemradio' || role === 'option')
    )
      return true;
  }
  return false;
};

const styles = stylex.create({
  disabled: {
    cursor: 'not-allowed',
  },
  focusNotVisible: {
    outline: 'none',
  },
  linkFocusRingXStyle: {
    // "var(--base-blue) auto 2px
    outline: '2px auto var(--base-blue)',
  },
  notSelectable: {
    userSelect: 'none',
  },
  root: {
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    borderWidth: '0',
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'inline',
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    textAlign: 'inherit',
    textDecoration: 'none',
    touchAction: 'manipulation',
  },

  rootInGroup: {
    touchAction: 'none',
  },
});

export default PressableText;
