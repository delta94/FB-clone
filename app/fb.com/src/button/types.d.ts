import React from 'react';

export interface FDSButtonProps {
  addOnPrimary?: React.ReactNode;
  addOnSecondary?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  id?: any;
  label?: any;
  labelIsHidden?: boolean;
  linkProps?: any;

  onFocusIn?: any;
  onFocusOut?: any;
  onHoverIn?: any;
  onHoverOut?: any;
  onPress?: any;
  onPressIn?: any;
  onPressOut?: any;

  padding?: 'normal' | 'wide';
  reduceEmphasis?: boolean;
  size?: 'medium' | 'large';

  suppressHydrationWarning?: boolean;
  testOnly_pressed?: boolean;

  tooltip?: React.ReactNode;
  tooltipPosition?: 'above'; //

  type: 'fdsOverride_collaborativePostCTA' | 'dark-overlay' | 'overlay' | 'primary' | 'secondary';
}

export interface FDSCircleButtonProps {
  color_DEPRECATED?: string;
  dataAttributes?: any;
  disabled?: boolean;
  focusable?: boolean;
  icon?: React.ReactNode;
  iconRatio?: 'large';
  label?: any;
  linkProps?: any;
  //
  onFocusIn?: any;
  onFocusOut?: any;
  onHoverIn?: any;
  onHoverOut?: any;
  onPress?: any;
  onPressIn?: any;
  onPressOut?: any;
  overlayHoveredStyle?: any;
  showDynamicHover?: boolean;
  size?: 24 | 28 | 32 | 36 | 40 | 48;
  testOnly_pressed?: boolean;
  type?:
    | 'default'
    | 'disabled'
    | 'primary-deemphasized'
    | 'primary-on-color'
    | 'primary-on-media'
    | 'secondary-on-color'
    | 'secondary-on-media';
  type_DEPRECATED?:
    | 'normal'
    | 'dark-overlay'
    | 'deemphasized'
    | 'deemphasized-overlay'
    | 'overlay'
    | 'overlay-floating'
    | 'overlay-raised'
    | 'primary-background-overlay';
}
