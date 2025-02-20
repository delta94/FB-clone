import React, { forwardRef, useContext, useMemo, useRef } from 'react';
import { BaseLinkNestedPressableContext } from '@fb-contexts';
import { BaseNestedPressableHack_DO_NOT_USE } from '@fb-pressable/BaseNestedPressableHack_DO_NOT_USE';
import { Pressable } from '@fb-pressable/pressable';
import { PressableText } from '@fb-pressable/PressableText';
import { mergeRefs } from '@fb-utils/mergeRefs';

export const BaseLink = forwardRef(
  // eslint-disable-next-line complexity
  (
    {
      attributionsrc,
      children,
      className_DEPRECATED,
      disabled,
      disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
      disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
      display = 'inline',
      download,
      fbclid,
      focusable,
      href,
      id,
      label,
      lynxMode,

      onBlur,
      onClick,
      onContextMenu,
      onFocus,
      onFocusChange,
      onFocusVisibleChange,
      onHoverChange,
      onHoverEnd,
      onHoverMove,
      onHoverStart,
      onNavigate,
      onPressChange,
      onPressEnd,
      onPressStart,

      passthroughProps,
      prefetchQueriesOnHover,
      preloadCodeOnMount,
      preserveQueryInShim,
      preventContextMenu,
      preventLocalNavigation,
      productAttribution,
      rel,
      replace,
      role,
      routeTarget,
      style,
      suppressFocusRing,
      suppressHydrationWarning,
      target,
      testid,
      testOnly_pressed = false,
      traceParams,

      xstyle,
      // color,

      ...props
    },
    externalRef,
  ) => {
    const internalRef = useRef(null);

    // eslint-disable-next-line react-compiler/react-compiler
    const ref = useMemo(() => mergeRefs(externalRef, internalRef), [externalRef, internalRef]);

    const {
      'aria-activedescendant': ariaActivedescendant,
      'aria-checked': ariaChecked,
      'aria-controls': ariaControls,
      'aria-current': ariaCurrent,
      'aria-describedby': ariaDescribedly,
      'aria-expanded': ariaExpanded,
      'aria-haspopup': ariaHaspopup,
      'aria-hidden': ariaHidden,
      'aria-invalid': ariaInvalid,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-owns': ariaOwns,
      'aria-selected': ariaSelected,
    } = props;

    const baseLinkNestedPressableValue = useContext(BaseLinkNestedPressableContext);

    const _role = role === 'presentation' ? 'none' : role;
    const _accessibilityLabel = label !== undefined && _role !== 'none' ? label : ariaLabel;

    //

    const allProps = {
      accessibilityLabel: _accessibilityLabel,
      accessibilityRelationship: {
        activedescendant: ariaActivedescendant,
        controls: ariaControls,
        current: ariaCurrent,
        describedby: ariaDescribedly,
        haspopup: ariaHaspopup,
        labelledby: ariaLabelledby,
        owns: ariaOwns,
      },
      accessibilityState: {
        checked: ariaChecked,
        disabled: disabled,
        expanded: ariaExpanded,
        hidden: ariaHidden,
        invalid: ariaInvalid,
        selected: ariaSelected,
      },
      className_DEPRECATED,
      disabled,
      forwardedRef: ref,
      link: {
        // TODO
        attributionsrc: attributionsrc ?? 'T',
        download,
        rel,
        target,
        url: href,
      },
      nativeID: id,
      onBlur,
      onContextMenu,
      onHoverMove,
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
      preventDefault: target !== '_blank',
      style,
      suppressHydrationWarning: suppressHydrationWarning === true ? true : undefined,
      testID: testid,
      testOnly_state: {
        disabled: false,
        focusVisible: false,
        focused: false,
        hovered: false,
        pressed: testOnly_pressed,
      },
      xstyle,
    };

    let _child;

    if (display === 'block') {
      const nestedAccessibilityRole =
        _role === 'button' ||
        _role === 'menuitem' ||
        _role === 'none' ||
        _role === 'switch' ||
        _role === 'checkbox' ||
        _role === 'article' ||
        _role === 'radio' ||
        _role === 'tab'
          ? _role
          : 'link';

      _child = (
        <Pressable
          {...allProps}
          accessibilityRole={nestedAccessibilityRole}
          suppressFocusRing={suppressFocusRing}
          tabbable={focusable}
        >
          <BaseLinkNestedPressableContext.Provider value={true}>{children}</BaseLinkNestedPressableContext.Provider>
        </Pressable>
      );
    } else {
      const nestedAccessibilityRole =
        _role === 'button' ||
        _role === 'menuitem' ||
        _role === 'menuitemradio' ||
        _role === 'menuitemcheckbox' ||
        _role === 'none' ||
        _role === 'tab'
          ? _role
          : 'link';

      _child = (
        <PressableText
          {...allProps}
          accessibilityRole={nestedAccessibilityRole}
          direction="none"
          focusable={focusable}
          suppressFocusRing={suppressFocusRing}
        >
          <BaseLinkNestedPressableContext.Provider value={true}>{children}</BaseLinkNestedPressableContext.Provider>
        </PressableText>
      );
    }

    return baseLinkNestedPressableValue ? (
      // eslint-disable-next-line react/jsx-pascal-case
      <BaseNestedPressableHack_DO_NOT_USE>{_child}</BaseNestedPressableHack_DO_NOT_USE>
    ) : (
      _child
    );
  },
);
