import React, { forwardRef, useRef } from 'react';
import { BaseRow } from '@fb-layout/BaseRow';
import { BaseRowItem } from '@fb-layout/BaseRowItem';
import { CometPressable } from '@fb-pressable/CometPressable';
import { stylexCompat } from '@fb-utils/stylexCompat';
import { stylexCompose } from '@fb-utils/stylexCompose';
import stylex from '@stylexjs/stylex';

const SCALE_FACTOR = 0.96;
const PRESS_OFFSET = 10;

const cache = new WeakMap();

const extractStyles = (xstyle) => {
  if (!xstyle) {
    return [{}, {}];
  }
  let cachedStyles = cache.get(xstyle);
  if (cachedStyles) {
    return cachedStyles;
  }
  cachedStyles = stylexCompose.compose(xstyle);

  const {
    alignSelf,
    flexBasis,
    flexGrow,
    flexShrink,
    height,
    justifySelf,
    margin,
    marginBottom,
    marginEnd,
    marginStart,
    marginTop,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    position,
    width,
    ...restStyle
  } = cachedStyles;

  const xStyleProps = {
    alignSelf,
    flexBasis,
    flexGrow,
    flexShrink,
    height,
    justifySelf,
    margin,
    marginBottom,
    marginEnd,
    marginStart,
    marginTop,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    position,
    width,
  };

  const filteredXStyleProps = {};

  for (let prop in xStyleProps) {
    if (xStyleProps[prop]) {
      filteredXStyleProps[prop] = xStyleProps[prop];
    }
  }

  const namespaces = [stylexCompat.makeNamespace(filteredXStyleProps), stylexCompat.makeNamespace(restStyle)];

  cache.set(xstyle, namespaces);
  return namespaces;
};

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").BaseStyledButtonProps>
 */
const _BaseStyledButton = (props, ref) => {
  const {
    addOnAbsolute,
    addOnEnd,
    addOnStart,
    content,
    contentXstyle,
    disabled = false,
    display = 'inline',
    focusable,
    icon,
    id,
    linkProps,
    onFocusIn,
    onFocusOut,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    onPressOut,
    overlayHoveredStyle,
    overlayPressedStyle,
    padding = 'normal',
    size = 'medium',
    suppressHydrationWarning = false,
    testOnly_pressed = false,
    xstyle,
    ...rest
  } = props;

  const childRef = useRef(null);
  const onPressInInternal = (event) => {
    if (childRef.current) {
      if (childRef.current instanceof HTMLDivElement) {
        childRef.current.style.transform =
          'scale(' +
          Math.max(SCALE_FACTOR, (childRef.current.offsetWidth - PRESS_OFFSET) / childRef.current.offsetWidth) +
          ')';
      }
    }
    typeof onPressIn === 'function' && onPressIn(event);
  };

  const onPressOutInternal = (event) => {
    if (childRef.current) {
      if (childRef.current instanceof HTMLDivElement) {
        childRef.current.style.transform = 'none';
      }
    }
    typeof onPressOut === 'function' && onPressOut(event);
  };

  const [xStyle, contentStyle] = extractStyles(xstyle);

  const baseRowItemStyle = [styles.item, size === 'large' && styles.sizeLargeItem];

  const ButtonContent = (childProps) => {
    const { overlay } = childProps;

    return (
      <BaseRow
        align="center"
        ref={childRef}
        role="none"
        verticalAlign="center"
        xstyle={[
          styles.content,
          padding === 'wide' && styles.paddingWide,
          disabled && styles.disabled,
          contentStyle,
          contentXstyle,
        ]}
      >
        <div {...stylex.props([styles.offset, size === 'large' && styles.sizeLargeOffset])}>
          {addOnStart ? (
            <BaseRowItem role="none" useDeprecatedStyles xstyle={baseRowItemStyle}>
              {addOnStart}
            </BaseRowItem>
          ) : (
            icon && (
              <BaseRowItem role="none" useDeprecatedStyles xstyle={baseRowItemStyle}>
                {icon}
              </BaseRowItem>
            )
          )}
          {content && (
            <BaseRowItem role="none" useDeprecatedStyles xstyle={baseRowItemStyle}>
              {content}
            </BaseRowItem>
          )}
          {addOnEnd && (
            <BaseRowItem role="none" useDeprecatedStyles xstyle={baseRowItemStyle}>
              {addOnEnd}
            </BaseRowItem>
          )}
        </div>
        {overlay}
        {addOnAbsolute && addOnAbsolute}
      </BaseRow>
    );
  };

  return (
    <CometPressable
      {...rest}
      disabled={disabled}
      display={display}
      focusable={focusable}
      id={id}
      linkProps={linkProps}
      onFocusIn={onFocusIn}
      onFocusOut={onFocusOut}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      onPress={onPress}
      onPressIn={onPressInInternal}
      onPressOut={onPressOutInternal}
      overlayHoveredStyle={overlayHoveredStyle}
      overlayPressedStyle={overlayPressedStyle}
      ref={ref}
      suppressHydrationWarning={suppressHydrationWarning}
      testOnly_pressed={testOnly_pressed}
      testid={undefined}
      xstyle={[styles.button, xStyle]}
    >
      {ButtonContent}
    </CometPressable>
  );
};

_BaseStyledButton.displayName = 'BaseStyledButton';

export const BaseStyledButton = forwardRef(_BaseStyledButton);

const styles = stylex.create({
  button: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  content: {
    borderRadius: 'var(--button-corner-radius)',
    borderWidth: '0',

    boxSizing: 'border-box',
    paddingRight: '12px',
    paddingLeft: '12px',
  },
  disabled: {
    backgroundColor: 'var(--disabled-button-background)',
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    marginRight: 'var(--button-inner-icon-spacing-medium)',
    marginLeft: 'var(--button-inner-icon-spacing-medium)',
  },
  offset: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginRight: 'calc(-1*var(--button-inner-icon-spacing-medium))',
    marginLeft: 'calc(-1*var(--button-inner-icon-spacing-medium))',
    width: 'calc(100% + 6px)',
  },
  paddingWide: {
    paddingRight: '40px',
    paddingLeft: '40px',
  },
  sizeLargeItem: {
    marginRight: 'var(--button-inner-icon-spacing-large)',
    marginLeft: 'var(--button-inner-icon-spacing-large)',
  },
  sizeLargeOffset: {
    marginRight: 'calc(-1*var(--button-inner-icon-spacing-large))',
    marginLeft: 'calc(-1*var(--button-inner-icon-spacing-large))',
  },
});
