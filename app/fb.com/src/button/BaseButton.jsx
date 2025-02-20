import React, { forwardRef, useContext } from 'react';
import { BaseButtonPopoverContext } from '@fb-contexts';
// import { Pressable } from '@fb-pressable/pressable';
// import { PressableText } from '@fb-pressable/PressableText';

const PressableText = React.lazy(() => import('@fb-pressable/lazy/PressableText'));
const Pressable = React.lazy(() => import('@fb-pressable/lazy/WebPressable'));

// eslint-disable-next-line complexity
export const BaseButton = forwardRef((props, ref) => {
  // TODO add js doc
  const {
    allowClickEventPropagation,
    'aria-activedescendant': ariaActivedescendant,
    'aria-checked': ariaChecked,
    'aria-controls': ariaControls,
    'aria-current': ariaCurrent,
    'aria-describedby': ariaDescribedby,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHaspopup,
    'aria-hidden': ariaHidden,
    'aria-invalid': ariaInvalid,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-pressed': ariaPressed,
    'aria-selected': ariaSelected,
    children,
    className_DEPRECATED,
    disabled = false,
    display = 'inline',
    focusable,
    id,
    label,
    onBlur,
    onClick,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverStart,
    onPressChange,
    onPressEnd,
    onPressStart,
    preventContextMenu,
    role,
    style,
    suppressFocusRing,
    suppressHydrationWarning,
    // eslint-disable-next-line no-unused-vars
    testid,
    testOnly_pressed = false,
    xstyle,
    //
  } = props;

  const _role = role === 'presentation' ? 'none' : role;

  let _ariaLabel;

  if (_role !== 'none') {
    if (ariaLabel) {
      _ariaLabel = ariaLabel;
    } else {
      _ariaLabel = label;
    }
  } else {
    _ariaLabel = undefined;
  }

  const refClone = ref;

  const baseButtonPopoverContextValue = useContext(BaseButtonPopoverContext);

  const internalProps = {
    accessibilityLabel: _ariaLabel,
    accessibilityRelationship: {
      activedescendant: ariaActivedescendant,
      controls: ariaControls,
      current: ariaCurrent,
      describedby: ariaDescribedby,
      haspopup: baseButtonPopoverContextValue && ariaHaspopup ? baseButtonPopoverContextValue.haspopup : ariaHaspopup,
      labelledby: ariaLabelledby,
    },
    accessibilityState: {
      checked: ariaChecked,
      disabled: disabled,
      expanded: baseButtonPopoverContextValue && !ariaExpanded ? baseButtonPopoverContextValue.expanded : ariaExpanded,
      hidden: ariaHidden,
      invalid: ariaInvalid,
      pressed: ariaPressed,
      selected: ariaSelected,
    },

    className_DEPRECATED,
    disabled,
    forwardedRef: refClone,
    nativeID: id,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverStart,
    onPress: onClick,
    onPressChange,
    onPressEnd,
    onPressStart,
    preventContextMenu,
    style,
    suppressHydrationWarning,
    // testID: testid,
    testOnly_state: {
      disabled: false,
      focused: false,
      focusVisible: false,
      hovered: false,
      pressed: testOnly_pressed,
    },
    xstyle,
  };

  if (display === 'block') {
    const accessibilityRole =
      _role === 'menuitem' ||
      _role === 'none' ||
      _role === 'gridcell' ||
      _role === 'switch' ||
      _role === 'combobox' ||
      _role === 'checkbox' ||
      _role === 'tab' ||
      _role === 'radio' ||
      _role === 'option'
        ? _role
        : 'button';

    return (
      <Pressable
        {...internalProps}
        accessibilityRole={accessibilityRole}
        allowClickEventPropagation={allowClickEventPropagation}
        tabbable={focusable}
      >
        {children}
      </Pressable>
    );

    // return jsx(Pressable, {
    //   ...internalProps,
    //   accessibilityRole,
    //   allowClickEventPropagation,
    //   suppressFocusRing,
    //   tabbable: focusable,
    //   children,
    // });
  } else {
    const accessibilityRole =
      _role === 'combobox' ||
      _role === 'menuitem' ||
      _role === 'menuitemcheckbox' ||
      _role === 'menuitemradio' ||
      _role === 'option' ||
      _role === 'none' ||
      _role === 'tab'
        ? _role
        : 'button';

    return (
      <PressableText
        focusable={focusable}
        {...internalProps}
        accessibilityRole={accessibilityRole}
        direction="none"
        suppressFocusRing={suppressFocusRing}
      >
        {children}
      </PressableText>
    );
  }
});

BaseButton.displayName = 'BaseButton.react';
