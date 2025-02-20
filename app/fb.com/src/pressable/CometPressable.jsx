import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { BaseButton } from '@fb-button';
import {
  BasePlaceholderContext,
  CometContainerPressableContext,
  CometDangerouslySuppressInteractiveElementsContext,
} from '@fb-contexts';
import { ReactFocusEvent } from '@fb-event-interaction/ReactFocusEvent';
import { BaseLink } from '@fb-link/BaseLink';
import { useMergeRefs } from '@fb-hooks';
import stylex from '@stylexjs/stylex';

import { CometPressableOverlay } from './CometPressableOverlay';

//  n = c("gkx")("1721477") || c("gkx")("1459")
// eslint-disable-next-line no-unused-vars
const n = true;

// BUG
// eslint-disable-next-line complexity
export const CometPressable = forwardRef((props, externalRef) => {
  const {
    allowClickEventPropagation,
    children,
    className_DEPRECATED,
    cursorDisabled = false,
    xstyle,
    disabled = false,
    display,
    expanding,
    hideFocusOverlay = false,
    hideHoverOverlay = false,

    isContainerTarget = false,
    linkProps,
    onFocusChange,
    onFocusVisibleChange,
    onFocusIn,
    onFocusOut, // A

    onHoverChange,
    onHoverIn,
    onHoverMove,
    onHoverOut,

    onPress, // da
    onPressChange,
    onPressIn,
    onPressOut,

    preventContextMenu,
    overlayDisabled = false,
    overlayOffset,
    overlayFocusRingPosition,
    overlayFocusVisibleStyle,
    overlayHoveredStyle,
    overlayPressedStyle,
    overlayFocused = false,
    overlayRadius,
    overlayXStyle,
    suppressFocusRing = false,
    testOnly_pressed = false,
    // eslint-disable-next-line no-unused-vars
    testid,

    pressedStyleValue,
    style,
    // eslint-disable-next-line no-unused-vars
    showDynamicHover,
    ...rest
  } = props;

  // const _display = !expanding ? 'block' : display;

  const _expanding = !expanding ? display === 'block' : expanding;

  // S ha
  const [pressedState, setPressed] = useState(testOnly_pressed);
  // T ia
  const [focusedState, setFocused] = useState(false);
  // U ja
  const [focusVisibleState, setFocusVisible] = useState(false);
  // V ka
  const [hoveredState, setHovered] = useState(false);

  // R
  const onPressChangeCb = useCallback(
    (e) => {
      setPressed(e || testOnly_pressed);
      onPressChange && onPressChange(e);
    },
    [onPressChange, testOnly_pressed],
  );

  // W
  const onFocusChangeCb = useCallback(
    (e) => {
      setFocused(e);
      onFocusChange && onFocusChange(e);
    },
    [onFocusChange],
  );

  // X
  const onFocusVisibleChangeCb = useCallback(
    (e) => {
      setFocusVisible(e);
      onFocusVisibleChange && onFocusVisibleChange(e);
    },
    [onFocusVisibleChange],
  );

  // la
  const onHoverChangeCb = useCallback(
    (e) => {
      setHovered(e);
      onHoverChange && onHoverChange(e);
    },
    [onHoverChange],
  );

  const overlay = overlayDisabled ? undefined : (
    <CometPressableOverlay
      focusRingPosition={overlayFocusRingPosition}
      focusVisible={!hideFocusOverlay && (focusVisibleState || overlayFocused)}
      focusVisibleStyle={overlayFocusVisibleStyle}
      hovered={!hideHoverOverlay && hoveredState}
      hoveredStyle={overlayHoveredStyle}
      offset={overlayOffset}
      pressed={pressedState}
      pressedStyle={overlayPressedStyle}
      radius={overlayRadius}
      showFocusRing
      xstyle={overlayXStyle}
    />
  );

  const _children =
    typeof children === 'function' ? (
      children({
        disabled,
        focused: focusedState,
        focusVisible: focusVisibleState,
        hovered: hoveredState,
        overlay,
        pressed: pressedState,
      })
    ) : (
      <>
        {children}
        {overlay}
      </>
    );

  const _classNameWith =
    typeof xstyle === 'function'
      ? xstyle({
          disabled,
          focused: focusedState,
          focusVisible: focusVisibleState,
          hovered: hoveredState,
          pressed: pressedState,
        })
      : xstyle;

  const cometContainerPressableContextValue = useContext(CometContainerPressableContext);

  const cometDangerouslySuppressInteractiveElementsContextValue = useContext(
    CometDangerouslySuppressInteractiveElementsContext,
  );

  const _suppressFocusRing = focusVisibleState && (hideFocusOverlay || overlayDisabled) && !suppressFocusRing;

  const _className = [
    display === 'inline' ? styles.root_DEPRECATED : styles.root,
    cursorDisabled === true && styles.defaultCursor,
    _expanding && styles.expanding,
    linkProps && styles.linkBase,
    !focusVisibleState && styles.hideOutline,
    // overlayHoveredStyle,
    //
    _classNameWith,
    _suppressFocusRing && (overlayFocusRingPosition === 'inset' ? styles.focusRingInset : styles.focusRing),
    cometContainerPressableContextValue !== undefined && styles.zIndex,
  ];

  let pressedStyle = {};

  if (pressedState && pressedStyleValue !== undefined) {
    const { opacity: opacityValue, scale: scaleValue } = pressedStyleValue;

    // N = pressedStyleValue.opacity;
    // f = pressedStyleValue.scale;

    if (opacityValue) {
      pressedStyle = {
        opacity: opacityValue,
      };
    }

    if (scaleValue) {
      pressedStyle = { ...pressedStyle, transform: 'scale(' + scaleValue + ')' };
    }
  }

  const mergedStyle = { ...style, ...pressedStyle };

  // T
  const _props = {
    onBlur: onFocusOut,
    onClick: onPress,
    onFocus: onFocusIn,
    onFocusChange: onFocusChangeCb,
    onFocusVisibleChange: onFocusVisibleChangeCb,
    onHoverChange: onHoverChangeCb,
    onHoverEnd: onHoverOut,
    onHoverMove: onHoverMove,
    onHoverStart: onHoverIn,
    onPressChange: onPressChangeCb,
    onPressEnd: onPressOut,
    onPressStart: onPressIn,
  };

  const ma = useRef(null);
  const Z = useRef(null);

  const _onContextMenu = rest.onContextMenu;

  useEffect(() => {
    if (isContainerTarget && cometContainerPressableContextValue) {
      cometContainerPressableContextValue.onMount(
        {
          onContextMenu: (ev) => {
            preventContextMenu === true && ev.preventDefault();
            _onContextMenu && _onContextMenu(ev);
          },
          onPress: () => {
            Z.current && Z.current.click();
          },
          target: !linkProps ? undefined : linkProps.target,
          url: !linkProps ? undefined : linkProps.url,
        },
        ma,
      );
    }
  }, [
    cometContainerPressableContextValue,
    isContainerTarget,
    testOnly_pressed,
    _onContextMenu,
    preventContextMenu,
    !linkProps ? undefined : linkProps.url,
    !linkProps ? undefined : linkProps.target,
  ]);

  useEffect(() => {
    if (!Z.current) {
      return;
    }

    if (Z.current === document.activeElement) {
      onFocusChangeCb(true);
      ReactFocusEvent.getGlobalFocusVisible() && onFocusVisibleChangeCb(true);
    }
  }, [onFocusChangeCb, onFocusVisibleChangeCb]);

  const V = useMergeRefs(externalRef, Z);

  const q = useContext(BasePlaceholderContext);

  if (cometDangerouslySuppressInteractiveElementsContextValue) {
    const SpanOrDivComp = display === 'inline' ? 'span' : 'div';

    return (
      <SpanOrDivComp
        className_DEPRECATED={className_DEPRECATED}
        display={display === 'inline' ? display : 'block'}
        preventContextMenu={preventContextMenu}
        {...rest}
        className={stylex(_className)}
        data-testid={undefined}
        ref={V}
        style={mergedStyle}
      >
        {_children}
      </SpanOrDivComp>
    );
  }

  if (linkProps) {
    const { url, ...restLinkProps } = linkProps;

    const baseLinkProps = { ...restLinkProps, href: url };

    return (
      <BaseLink
        {..._props}
        {...rest}
        {...baseLinkProps}
        className_DEPRECATED={className_DEPRECATED}
        disabled={disabled}
        display={display === 'inline' ? display : 'block'}
        preventContextMenu={preventContextMenu}
        // BUG
        // ref={ref}
        ref={V}
        style={mergedStyle}
        // suppressFocusRing={!_suppressFocusRing || n}
        suppressFocusRing
        testid={undefined}
        xstyle={_className}
      >
        {_children}
      </BaseLink>
    );
  }

  return (
    <BaseButton
      {..._props}
      {...rest}
      allowClickEventPropagation={allowClickEventPropagation}
      className_DEPRECATED={className_DEPRECATED}
      disabled={disabled}
      display={display === 'inline' ? display : 'block'}
      preventContextMenu={preventContextMenu}
      // BUG
      // ref={ref}
      ref={V}
      style={mergedStyle}
      suppressFocusRing
      testid={undefined}
      xstyle={_className}
    >
      {_children}
    </BaseButton>
  );
});

CometPressable.displayName = 'CometPressable';

const styles = stylex.create({
  defaultCursor: {
    cursor: 'default',
  },

  expanding: {
    display: 'flex',
  },

  focusRing: {
    boxShadow: 'var(--focus-ring-shadow-default)',
    outline: 'none',
    // eslint-disable-next-line @stylexjs/valid-styles
    '@media (forced-colors: active)': {
      outline: 'var(--focus-ring-outline-forced-colors)',
    },
  },
  focusRingInset: {
    boxShadow: 'var(--focus-ring-shadow-inset)',
  },

  hideOutline: {
    outline: 'none',
  },

  linkBase: {
    display: 'inline-block',
  },

  root: {
    textDecoration: {
      default: null,
      ':hover': 'none',
    },

    borderRadius: 'inherit',
    display: 'inline-flex',
    flexDirection: 'row',

    userSelect: 'none',
  },

  root_DEPRECATED: {
    textDecoration: {
      default: null,
      ':hover': 'none',
    },
    borderRadius: 'inherit',
    position: 'relative',

    userSelect: 'none',
  },

  zIndex: {
    zIndex: 1,
  },
});
