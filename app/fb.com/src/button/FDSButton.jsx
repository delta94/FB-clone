/* eslint-disable complexity */
import React, { forwardRef, useContext, useRef } from 'react';
import { CometGHLRenderingContext } from '@fb-contexts';
import { useCometTheme } from '@fb-hooks';
import { FDSIcon } from '@fb-image/FDSIcon';
import { FDSText } from '@fb-text/FDSText';
import { useMergeRefs } from '@fb-hooks';
import stylex from '@stylexjs/stylex';

import { BaseStyledButton } from './BaseStyledButton';

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").FDSButtonProps>
 */
export const FDSButton = forwardRef((props, ref) => {
  const {
    addOnPrimary,
    addOnSecondary,
    disabled = false,
    icon,
    id,
    label,
    labelIsHidden = false,
    linkProps,
    onFocusIn,
    onFocusOut,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    onPressOut,
    padding = 'normal',
    reduceEmphasis = false,
    showDynamicHover,
    size = 'medium',
    suppressHydrationWarning = false,
    testid,
    testOnly_pressed = false,
    tooltip,
    tooltipPosition = 'above',
    type = 'primary',
    ...rest
  } = props;

  const buttonType =
    type === 'fdsOverride_collaborativePostCTA' ? 'secondary' : type in buttonStyleMap ? type : 'primary';

  let buttonState = disabled ? 'disabled' : reduceEmphasis ? 'deemphasized' : 'default';

  let buttonColor = buttonStyleMap[buttonType][buttonState];

  const buttonOverlayStateColor = buttonOverlayStyle[buttonType][buttonState];

  const internalRef = useRef(null);

  const [ThemeWrapper, themeClassName] = useCometTheme('light');

  const ghlRenderingContext = useContext(CometGHLRenderingContext);
  const cometGHLRenderingWithLink = linkProps && ghlRenderingContext;
  const _label = rest['aria-label'] ?? label; // N

  const _ariaLabel = cometGHLRenderingWithLink ?? _label;

  const combineRef = useMergeRefs(internalRef, ref);

  // const buttonContent = labelIsHidden ? null : (
  //   <FDSText color={buttonColor} numberOfLines={1} type={size === 'large' ? 'button1' : 'button2'}>
  //     {label}
  //   </FDSText>
  // );

  // const iconContent = icon && <FDSIcon color={buttonOverlayStateColor} icon={icon} isDecorative size={16} />;

  const buttonComp = (
    <BaseStyledButton
      {...rest}
      addOnEnd={addOnSecondary}
      addOnStart={addOnPrimary}
      aria-label={_ariaLabel}
      content={
        labelIsHidden ? null : (
          <FDSText color={buttonColor} numberOfLines={1} type={size === 'large' ? 'button1' : 'button2'}>
            {label}
          </FDSText>
        )
      }
      contentXstyle={[
        type === 'overlay' && disabled && styles.contentDisabled,
        type === 'overlay' && themeClassName,
        size === 'medium' && styles.sizeMedium,
        size === 'large' && styles.sizeLarge,
        icon && labelIsHidden && styles.paddingIconOnly,
      ]}
      disabled={disabled}
      icon={icon && <FDSIcon color={buttonOverlayStateColor} icon={icon} isDecorative size={16} />}
      id={id}
      linkProps={linkProps}
      onFocusIn={onFocusIn}
      onFocusOut={onFocusOut}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      overlayPressedStyle={[
        styles.primaryOverlayPressed,
        reduceEmphasis && styles.primaryDeemphasizedOverlayPressed,
        buttonType === 'secondary' && styles.secondaryOverlayPressed,
        buttonType === 'secondary' && reduceEmphasis && styles.secondaryDeemphasizedOverlayPressed,
        buttonType === 'overlay' && styles.overlayOverlayPressed,
        buttonType === 'overlay' && reduceEmphasis && styles.overlayDeemphasizedOverlayPressed,
        buttonType === 'dark-overlay' && styles.darkOverlayPressed,
        buttonType === 'dark-overlay' && reduceEmphasis && styles.overlayDeemphasizedOverlayPressed,
        styles.fadeOut,
      ]}
      padding={padding}
      ref={combineRef}
      suppressHydrationWarning={suppressHydrationWarning}
      testOnly_pressed={testOnly_pressed}
      testid={undefined}
      xstyle={[
        type === 'primary' && styles.primary,
        type === 'primary' && reduceEmphasis && styles.primaryDeemphasized,
        type === 'secondary' && styles.secondary,
        type === 'secondary' && reduceEmphasis && styles.secondaryDeemphasized,
        type === 'fdsOverride_black' && styles.fdsOverrideBlack,
        type === 'fdsOverride_negative' && styles.fdsOverrideNegative,
        type === 'fdsOverride_positive' && styles.fdsOverridePositive,
        type === 'fdsOverride_collaborativePostCTA' && styles.fdsOverrideCollaborativePostCTA,
        type === 'overlay' && styles.overlay,
        type === 'overlay' && reduceEmphasis && styles.overlayDeemphasized,
        disabled && styles.disabled,
        type === 'overlay' && disabled && styles.overlayDisabled,
        type === 'dark-overlay' && styles.darkOverlay,
      ]}
    />
  );

  const fdsButtonWrapper = type === 'overlay' ? <ThemeWrapper>{buttonComp}</ThemeWrapper> : buttonComp;

  // if (tooltip) {
  //   return (
  //     <FDSTooltip position={tooltipPosition} tooltip={tooltip}>
  //       {fdsButtonComp}
  //     </FDSTooltip>
  //   );
  // }

  return fdsButtonWrapper;
});

FDSButton.displayName = 'FDSButton';

const styles = stylex.create({
  contentDisabled: {
    opacity: 0.3,
  },
  darkOverlay: {
    backgroundColor: 'var(--always-dark-overlay)',
    color: 'var(--always-white)',
  },
  darkOverlayPressed: {
    backgroundColor: 'var(--non-media-pressed)',
  },
  disabled: {
    backgroundColor: 'var(--disabled-button-background)',
  },
  fadeOut: {
    opacity: 0.23,
    transitionDelay: '.2s',
    transitionDuration: '.1s',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'linear',
  },
  fdsOverrideBlack: {
    backgroundColor: 'var(--always-black)',
  },
  fdsOverrideCollaborativePostCTA: {
    backgroundColor: 'var(--always-white)',
    mixBlendMode: 'lighten',
  },
  fdsOverrideNegative: {
    backgroundColor: 'var(--negative)',
  },
  fdsOverridePositive: {
    backgroundColor: 'var(--positive)',
  },
  overlay: {
    backgroundColor: 'var(--always-white)',
  },
  overlayDeemphasized: {
    backgroundColor: 'var(--always-light-overlay)',
  },
  overlayDeemphasizedOverlayPressed: {
    backgroundColor: 'var(--always-light-overlay)',
  },
  overlayDisabled: {
    backgroundColor: 'var(--progress-ring-on-media-background)',
  },
  overlayOverlayPressed: {
    backgroundColor: 'var(--shadow-1)',
  },
  paddingIconOnly: {
    paddingEnd: 'var(--button-padding-icon-only)',
    paddingStart: 'var(--button-padding-icon-only)',
  },
  primary: {
    backgroundColor: 'var(--primary-button-background)',
  },
  primaryDeemphasized: {
    backgroundColor: 'var(--primary-deemphasized-button-background)',
  },
  primaryDeemphasizedOverlayPressed: {
    backgroundColor: 'var(--primary-deemphasized-button-pressed-overlay)',
  },
  primaryOverlayPressed: {
    backgroundColor: 'var(--press-overlay)',
  },
  secondary: {
    backgroundColor: 'var(--secondary-button-background)',
  },
  secondaryDeemphasized: {
    backgroundColor: 'transparent',
  },
  secondaryDeemphasizedOverlayPressed: {
    backgroundColor: 'var(--primary-deemphasized-button-pressed-overlay)',
  },
  secondaryOverlayPressed: {
    backgroundColor: 'var(--press-overlay)',
  },
  sizeLarge: {
    height: 'var(--button-height-large)',
  },
  sizeMedium: {
    height: 'var(--button-height-medium)',
  },
});

const buttonStyleMap = {
  'dark-overlay': {
    deemphasized: 'white',
    default: 'white',
    disabled: 'disabled',
  },
  overlay: {
    deemphasized: 'white',
    default: 'primary',
    disabled: 'disabled',
  },
  primary: {
    deemphasized: 'highlight',
    default: 'white',
    disabled: 'disabled',
  },
  secondary: {
    deemphasized: 'highlight',
    default: 'secondary',
    disabled: 'disabled',
  },
};

const buttonOverlayStyle = {
  'dark-overlay': {
    deemphasized: 'white',
    default: 'white',
    disabled: 'disabled',
  },
  overlay: {
    deemphasized: 'white',
    default: 'primary',
    disabled: 'disabled',
  },
  primary: {
    deemphasized: 'highlight',
    default: 'white',
    disabled: 'disabled',
  },
  secondary: {
    deemphasized: 'highlight',
    default: 'primary',
    disabled: 'disabled',
  },
};
