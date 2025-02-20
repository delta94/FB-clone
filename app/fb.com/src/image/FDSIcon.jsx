import React, { forwardRef, useMemo } from 'react';
import { BaseIsDecorativeContext } from '@fb-contexts';
import { CometPressable } from '@fb-pressable/CometPressable';
import stylex from '@stylexjs/stylex';

import { BaseImage_DEPRECATED } from './BaseImage_DEPRECATED';
import { CometSVGIcon } from './CometSVGIcon';
import { FDSTintedIcon_DEPRECATED } from './FDSTintedIcon_DEPRECATED';
import { FlightSerializableIcon } from './FlightSerializableIcon';
import { IconSource } from './IconSource';
import { ImageIconSource } from './ImageIconSource';
import { SVGIcon } from './SVGIcon';
import { TintableIconSource } from './TintableIconSource';

export const FDSIcon = forwardRef(
  // eslint-disable-next-line complexity
  (
    {
      alt = '',
      color = 'primary',
      disabled = false,
      disableOverlay_DEPRECATED = false,
      draggable,
      focusable,
      hideHoverOverlay = false,
      icon,
      id,
      isDecorative = false,
      linkProps,
      onHoverIn,
      onHoverOut,
      onPress,
      onPressIn,
      onPressOut,
      size = 8,
      testid,
      testOnly_pressed = false,
      xstyle,
      ...rest
    },
    ref,
  ) => {
    const normalizeIcon = FlightSerializableIcon.parseFlightIcon(icon);
    const _testid = !onPress ? testid : undefined;
    const _color = disabled ? 'disabled' : color;
    let pressableComp = onPress || linkProps;
    const ariaLabel = rest['aria-label'];

    const _alt = useMemo(() => {
      if (!pressableComp) {
        return ariaLabel;
      }
      return isDecorative ? '' : alt;
    }, [ariaLabel, isDecorative, pressableComp, alt]);

    const _ref = pressableComp ? undefined : ref;

    const Comp =
      icon instanceof TintableIconSource ? (
        // eslint-disable-next-line react/jsx-pascal-case
        <FDSTintedIcon_DEPRECATED
          alt={_alt}
          color={getColor(_color)}
          draggable={draggable}
          icon={icon}
          id={id}
          ref={_ref}
          testid={undefined}
          xstyle={xstyle}
        />
      ) : normalizeIcon instanceof ImageIconSource ? (
        // eslint-disable-next-line react/jsx-pascal-case
        <BaseImage_DEPRECATED
          alt={_alt}
          className={stylex(
            styles.image,
            icon.resizeStrategy === 'contain' && styles.imageContain,
            normalizeIcon.resizeStrategy === 'cover' && styles.imageCover,
            xstyle,
          )}
          draggable={draggable}
          id={id}
          ref={_ref}
          src={normalizeIcon.src}
          style={{
            height: normalizeIcon.height,
            width: normalizeIcon.width,
          }}
          testid={undefined}
        />
      ) : normalizeIcon instanceof IconSource ? (
        // eslint-disable-next-line react/jsx-pascal-case
        <BaseImage_DEPRECATED
          alt={_alt}
          className={stylex(styles.image, xstyle)}
          draggable={draggable}
          height={normalizeIcon.size}
          id={id}
          ref={_ref}
          src={normalizeIcon.src}
          width={normalizeIcon.size}
        />
      ) : normalizeIcon instanceof SVGIcon.LegacySVGIcon ? (
        React.createElement(normalizeIcon.component, {
          alt: _alt,
          color: _color,
          'data-testid': _testid,
          id: id,
          size: size,
        })
      ) : normalizeIcon instanceof SVGIcon.SVGIcon ? (
        <CometSVGIcon
          alt={_alt}
          color={_color}
          component={normalizeIcon.component}
          data-testid={undefined}
          id={id}
          size={size}
        />
      ) : normalizeIcon instanceof SVGIcon.EmojiIcon ? (
        React.createElement(normalizeIcon.component, {
          emoji: normalizeIcon.codepoints,
          size: size === 112 ? 128 : size, // size,
        })
      ) : (
        <CometSVGIcon alt={_alt} color={_color} component={normalizeIcon} data-testid={undefined} id={id} size={size} />
      );

    const CompWithContext = isDecorative ? (
      <BaseIsDecorativeContext.Provider value={true}>{Comp}</BaseIsDecorativeContext.Provider>
    ) : (
      Comp
    );

    return pressableComp ? (
      <CometPressable
        {...rest}
        disabled={disabled}
        focusable={focusable}
        hideHoverOverlay={hideHoverOverlay}
        linkProps={linkProps}
        onHoverIn={onHoverIn}
        onHoverOut={onHoverOut}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        overlayDisabled={disableOverlay_DEPRECATED}
        overlayOffset={8}
        overlayRadius="50%"
        ref={ref}
        testOnly_pressed={testOnly_pressed}
        testid={undefined}
        xstyle={({ pressed }) => [styles.button_LEGACY, pressed && styles.pressed]}
      >
        {CompWithContext}
      </CometPressable>
    ) : (
      CompWithContext
    );
  },
);

function getColor(color) {
  switch (color) {
    case 'positive':
      return 'positive';
    case 'negative':
      return 'negative';
    case 'disabled':
      return 'disabled';
    case 'highlight':
      return 'accent';
    case 'secondary':
      return 'secondary';
    case 'tertiary':
      return 'placeholder';
    case 'white':
      return 'white';
    case 'primary':
      return 'primary';
    case 'warning':
      return 'warning';
    case 'blueLink':
      return 'blueLink';
    case 'primaryAccent':
      return 'primaryAccent';
    default:
      return 'black';
  }
}

const styles = stylex.create({
  button: {
    appearance: 'none',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: '0',
    display: 'inline-flex',
    margin: 0,
    padding: 0,

    position: {
      default: 'relative',
      '::after': 'absolute',
    },
    verticalAlign: 'bottom',

    borderRadius: {
      '::after': '50%',
    },

    bottom: {
      '::after': '-8px',
    },
    content: {
      '::after': "''",
    },
    right: {
      '::after': '-8px',
    },

    left: {
      '::after': '-8px',
    },

    top: {
      '::after': '-8px',
    },

    zIndex: {
      '::after': 1,
    },
  },
  image: {
    verticalAlign: '-0.25em',
  },
  imageContain: {
    objectFit: 'fill',
  },
  imageCover: {
    objectFit: 'cover',
  },
  pressed: {
    transform: 'scale(.96)',
  },

  // ==============================================
  // ==============================================

  button_LEGACY: {
    appearance: 'none',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: '0',
    display: 'inline-flex',
    margin: 0,
    padding: 0,

    verticalAlign: 'bottom',
    position: 'relative',

    '::after': {
      position: 'absolute',
      borderRadius: '50%',
      bottom: '-8px',
      content: "''",
      right: '-8px',
      left: '-8px',
      top: '-8px',
      zIndex: 1,
    },
  },
});
