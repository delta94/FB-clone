/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/**
 * Changelog:
 * - 08/01/2025
 */

import React from 'react';
import { BaseFocusRing } from '@fb-focus/BaseFocusRing';
import { FocusWithinHandler } from '@fb-focus/FocusWithinHandler';
import { gkx } from '@fb-utils/gkx';
import { useMergeRefs } from '@fb-hooks';
import stylex from '@stylexjs/stylex';

import { FDSFormInputValidationStateIcon } from './FDSFormInputValidationStateIcon';
import { FDSFormInputWrapperHelperText } from './FDSFormInputWrapperHelperText';
import { getBaseInputValidationStateDescription } from './getBaseInputValidationStateDescription';
import { useBaseInputValidationAnnouncement } from './useBaseInputValidationAnnouncement';

function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === 'object') {
    // eslint-disable-next-line no-unreachable-loop, guard-for-in
    if (value) for (let key in value) return false;
    return true;
  } else {
    return !value || value === '';
  }
}

// eslint-disable-next-line complexity
export const FDSFormInputWrapper = (props) => {
  const {
    addOnBottom,
    addOnStart,
    alwaysShrinkLabel = false,
    'aria-activedescendant': ariaActiveDescendant,
    'aria-controls': ariaControls,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    'aria-label': ariaLabel,
    auxContent,
    children,
    // ariaLabel,
    comboboxKeyDown,
    containerRef,
    cursor,
    hideLabel = false,
    onFocusChange,
    onPress,
    role,
    shrinkLabelOnFocus = true,
    suppressFocusRing,
    value,
    withHeaderMask = false,

    disabled = false,
    helperText,
    helperTextIsHidden = false,
    label,
    labelLocation_INTERNAL = 'inside',
    labelRef,
    validationState,
  } = props;

  const id = React.useId();
  const helperTextId = React.useId();
  const validationId = React.useId();

  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isShaking, setIsShaking] = React.useState(false);
  const [showValidationIcon, setShowValidationIcon] = React.useState(false);

  const filled = !isEmpty(value);
  const labelOutside = labelLocation_INTERNAL === 'outside';

  // eslint-disable-next-line react/no-unstable-nested-components
  const LabelComponent = (highlighted) =>
    labelOutside ? (
      <label className={stylex(tempStyles.labelOutside)} suppressHydrationWarning>
        {label}
      </label>
    ) : (
      <span
        className={stylex(
          styles.label,
          styles.labelInside,
          gkx[6275] && m.labelInside,
          validationState === 'ERROR' && (gkx[6275] ? m.labelError : styles.labelError),
          !validationState && highlighted && (gkx[6275] ? m.labelHighlighted : styles.labelHighlighted),
          (filled || alwaysShrinkLabel || (highlighted && shrinkLabelOnFocus)) && styles.labelShrunk,
          disabled && styles.labelDisabled,
        )}
        ref={labelRef}
      >
        {label}
      </span>
    );

  const handleMouseEnter = () => {
    !isHovered && setIsHovered(true);
  };

  const handleMouseLeave = () => {
    isHovered && setIsHovered(false);
  };

  const inputRef = React.useRef(null);
  const rootRef = React.useRef(null);
  const isCombobox = role === 'combobox';
  const validationAnnouncement = useBaseInputValidationAnnouncement({
    label,
    validationState,
  });
  const mergedRefs = useMergeRefs(inputRef, containerRef, isCombobox ? validationAnnouncement : null);

  const ariaProps = {
    'aria-busy': validationState === 'LOADING' ? true : undefined,
    'aria-describedby': [
      validationState === 'WARN' || validationState === 'CORRECT' ? validationId : undefined,
      helperText ? helperTextId : undefined,
      ariaDescribedBy,
    ]
      .filter(Boolean)
      .join(' '),
    'aria-errormessage': validationState === 'ERROR' && ariaErrorMessage ? ariaErrorMessage : undefined,
    'aria-invalid': validationState === 'ERROR' ? true : undefined,
  };

  const validationIconProps = {
    hidden: validationState === 'ERROR' || validationState === 'LOADING',
    id: validationId,
    label:
      validationState === 'CORRECT' || validationState === 'WARN'
        ? getBaseInputValidationStateDescription({
            label,
            validationState,
          })
        : undefined,
  };

  React.useEffect(() => {
    if (!comboboxKeyDown) {
      return;
    }

    const element = rootRef.current;

    if (element) {
      element.addEventListener('keydown', comboboxKeyDown);
      return () => {
        element.removeEventListener('keydown', comboboxKeyDown);
      };
    }
  }, [comboboxKeyDown]);

  return (
    <div className={stylex(tempStyles.wrapper)} ref={rootRef}>
      {/* span */}
      {labelOutside && LabelComponent(false)}
      {/*  */}
      <FocusWithinHandler onFocusChange={onFocusChange}>
        {(focused) => {
          return (
            <BaseFocusRing suppressFocusRing={!showValidationIcon || suppressFocusRing}>
              {/* eslint-disable-next-line complexity */}
              {(focusStyle) => (
                <div
                  {...stylex.props(
                    styles.root,
                    cursorStyles[cursor],
                    isHovered && styles.hovered,
                    focused && styles.focusRing,
                    validationState === 'WARN' && [
                      styles.warn,
                      isHovered && styles.warnHovered,
                      focused && styles.warnFocused,
                    ],
                    validationState === 'ERROR' && [
                      styles.error,
                      isHovered && styles.errorHovered,
                      focused && styles.errorFocused,
                    ],
                    disabled && styles.disabled,
                    isShaking && styles.shake,
                    focusStyle,
                  )}
                >
                  <label
                    {...(isCombobox ? ariaProps : {})}
                    aria-activedescendant={ariaActiveDescendant}
                    aria-controls={ariaControls}
                    aria-disabled={isCombobox && disabled ? true : undefined}
                    aria-expanded={ariaExpanded}
                    aria-haspopup={ariaHasPopup}
                    aria-label={ariaLabel ? ariaLabel : label}
                    className={stylex(tempStyles.flex)}
                    htmlFor={id}
                    onAnimationEnd={() => setIsShaking(false)}
                    onClick={(event) => {
                      disabled ? setIsShaking(true) : onPress && onPress(event);
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    ref={mergedRefs}
                    role={onPress ? (role ? role : 'button') : undefined}
                    suppressHydrationWarning
                    tabIndex={onPress ? 0 : undefined}
                  >
                    {addOnStart}
                    <div className={stylex(tempStyles.wrapper02)}>
                      {withHeaderMask && !disabled && (filled || focused) && (
                        <span
                          {...stylex.props(
                            styles.headerMask,
                            validationState === 'WARN' && isHovered && styles.warnHovered,
                            validationState === 'ERROR' && isHovered && styles.errorHovered,
                          )}
                        />
                      )}
                      {!hideLabel && !labelOutside && LabelComponent(focused)}
                      <FocusWithinHandler onFocusChange={setShowValidationIcon}>
                        {children({
                          filled,
                          focused,
                          helperTextID: helperText && validationState ? helperTextId : undefined,
                          id,
                          inputAriaProps: isCombobox ? {} : ariaProps,
                          inputRef: isCombobox ? null : validationAnnouncement,
                          rootRef: inputRef,
                        })}
                      </FocusWithinHandler>
                    </div>
                    {(auxContent || validationState) && (
                      <div className={stylex(styles.t3)}>
                        {validationState && (
                          <div {...stylex.props(styles.validationIcon, hideLabel && styles.validationIconHideLabel)}>
                            <FDSFormInputValidationStateIcon {...validationIconProps} state={validationState} />

                            {FDSFormInputValidationStateIcon[validationState] &&
                              FDSFormInputValidationStateIcon[validationState](validationIconProps)}
                          </div>
                        )}
                        {auxContent}
                      </div>
                    )}
                    {addOnBottom}
                  </label>
                </div>
              )}
            </BaseFocusRing>
          );
        }}
      </FocusWithinHandler>
      {helperText &&
        (helperTextIsHidden ? (
          <div className={stylex(tempStyles.t2)} id={helperTextId}>
            {helperText}
          </div>
        ) : (
          <div className={stylex(tempStyles.t1)} id={helperTextId}>
            <FDSFormInputWrapperHelperText validationState={validationState} value={helperText} />
          </div>
        ))}
    </div>
  );
};

const shakeAnimation = stylex.keyframes({
  '10%': {
    transform: 'translate3d(-1px,0,0)',
  },

  '20%': {
    transform: 'translate3d(2px,0,0)',
  },

  '30%': {
    transform: 'translate3d(-4px,0,0)',
  },

  '40%': {
    transform: 'translate3d(4px,0,0)',
  },

  '50%': {
    transform: 'translate3d(-4px,0,0)',
  },

  '60%': {
    transform: 'translate3d(4px,0,0)',
  },

  '70%': {
    transform: 'translate3d(-4px,0,0)',
  },

  '80%': {
    transform: 'translate3d(2px,0,0)',
  },

  '90%': {
    transform: 'translate3d(-1px,0,0)',
  },
});

const styles = stylex.create({
  disabled: {
    backgroundColor: 'var(--input-background-disabled)',
    borderTopColor: 'var(--input-border-color)',
    borderRightColor: 'var(--input-border-color)',
    borderBottomColor: 'var(--input-border-color)',
    borderLeftColor: 'var(--input-border-color)',
    boxShadow: 'none',
    cursor: 'not-allowed',
    // eslint-disable-next-line @stylexjs/valid-styles
    ':active': {
      backgroundColor: 'var(--input-background-disabled)',
    },
  },
  error: {
    borderTopColor: 'var(--negative)',
    borderRightColor: 'var(--negative)',
    borderBottomColor: 'var(--negative)',
    borderLeftColor: 'var(--negative)',
    // eslint-disable-next-line @stylexjs/valid-styles
    ':active': {
      backgroundColor: 'hsla(var(--negative-h),var(--negative-s),var(--negative-l),.05)',
    },
  },
  errorFocused: {
    boxShadow: '0 0 0 2px var(--always-white),0 0 0 4px var(--negative)',
    outline: 'none',
  },
  errorHovered: {
    backgroundColor: 'hsla(var(--negative-h),var(--negative-s),var(--negative-l),.05)',
  },
  focusRing: {
    boxShadow: 'var(--focus-ring-shadow-default)',
    outline: 'var(--focus-ring-outline-forced-colors) none',
  },
  headerMask: {
    backgroundColor: 'var(--input-background)',
    right: '16px',
    height: '16px',
    position: 'absolute',
    left: '16px',
    top: '8px',
  },
  hovered: {
    borderTopColor: 'var(--input-border-color-hover)',
    borderRightColor: 'var(--input-border-color-hover)',
    borderBottomColor: 'var(--input-border-color-hover)',
    borderLeftColor: 'var(--input-border-color-hover)',
  },
  label: {
    fontSize: '1rem',
    fontWeight: 'normal',
    lineHeight: '1.25',
    maxWidth: '100%',
    transformOrigin: 'top left',
  },
  labelDisabled: {
    color: 'var(--disabled-text)',
  },
  labelError: {
    color: 'var(--negative)',
  },
  labelHighlighted: {
    color: 'var(--input-label-color-highlighted)',
  },
  labelInside: {
    color: 'var(--secondary-text)',
    cursor: 'inherit',
    display: 'block',
    right: '8px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    left: '16px',
    textOverflow: 'ellipsis',
    top: '18px',
    transitionDuration: 'var(--fds-fast)',
    transitionProperty: 'transform',
    transitionTimingFunction: 'var(--fds-soft)',
    whiteSpace: 'nowrap',
  },
  labelShrunk: {
    right: 'auto',
    transform: 'scale(.75) translateY(-11px)',
  },
  root: {
    backgroundColor: 'var(--input-background)',
    borderTopColor: 'var(--input-border-color)',
    borderRightColor: 'var(--input-border-color)',
    borderBottomColor: 'var(--input-border-color)',
    borderLeftColor: 'var(--input-border-color)',
    borderTopLeftRadius: 'var(--input-corner-radius)',
    borderTopRightRadius: 'var(--input-corner-radius)',
    borderBottomRightRadius: 'var(--input-corner-radius)',
    borderBottomLeftRadius: 'var(--input-corner-radius)',
    borderTopStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderTopWidth: 'var(--input-border-width)',
    borderRightWidth: 'var(--input-border-width)',
    borderBottomWidth: 'var(--input-border-width)',
    borderLeftWidth: 'var(--input-border-width)',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'relative',
    zIndex: '0',
    // eslint-disable-next-line @stylexjs/valid-styles
    ':active': {
      backgroundColor: 'hsla(var(--accent-h),var(--accent-s),var(--accent-l),.05)',
    },
  },
  shake: {
    animationDuration: '.82s',
    animationFillMode: 'both',
    animationName: shakeAnimation,
    animationTimingFunction: 'var(--fds-soft)',
  },
  validationIcon: {
    paddingRight: '16px',
    paddingTop: '18px',
  },
  validationIconHideLabel: {
    paddingTop: '12px',
  },
  warn: {
    borderTopColor: 'var(--warning)',
    borderRightColor: 'var(--warning)',
    borderBottomColor: 'var(--warning)',
    borderLeftColor: 'var(--warning)',
    // eslint-disable-next-line @stylexjs/valid-styles
    ':active': {
      backgroundColor: 'hsla(var(--warning-h),var(--warning-s),var(--warning-l),.05)',
    },
  },
  warnFocused: {
    boxShadow: '0 0 0 2px var(--always-white),0 0 0 4px var(--warning)',
    outline: 'none',
  },
  warnHovered: {
    backgroundColor: 'hsla(var(--warning-h),var(--warning-s),var(--warning-l),.05)',
  },
});

const m = stylex.create({
  labelError: {
    color: 'var(--secondary-text)',
  },
  labelHighlighted: {
    color: 'var(--text-input-active-text)',
  },
  labelInside: {
    color: 'var(--secondary-text)',
  },
});

const cursorStyles = stylex.create({
  pointer: {
    cursor: 'pointer',
  },
  text: {
    cursor: 'text',
  },
});

// const blueprintStyles = stylex.create({
//   root: {
//     borderTopLeftRadius: '12px',
//     borderTopRightRadius: '12px',
//     borderBottomRightRadius: '12px',
//     borderBottomLeftRadius: '12px',
//   },
// });

const tempStyles = stylex.create({
  labelOutside: {
    fontSize: '1rem',
    fontWeight: 'normal',
    lineHeight: 1.25,
    maxWidth: '100%',
    transformOrigin: 'top left',
    color: 'var(--text-input-outside-label)',
    marginBottom: '8px',
    position: 'relative',
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  flex: {
    display: 'flex',
    width: '100%',
  },

  wrapper02: {
    backgroundColor: 'transparent',
    flexGrow: 1,
    maxWidth: '100%',
    minWidth: 0,
    position: 'relative',
  },

  t1: {
    marginTop: '8px',
  },

  t2: {
    clip: 'rect(0,0,0,0)',
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitClipPath: 'inset(50%)',
    clipPath: 'inset(50%)',
    height: '1px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'absolute',
    width: '1px',
  },

  t3: {
    display: 'flex',
  },
});
