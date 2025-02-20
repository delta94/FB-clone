/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export type WebViewPropTypes = React.JSX.IntrinsicElements['html'] & {
  xstyle?: any;
};

export type BaseRowPropType = React.JSX.IntrinsicElements['html'] & {
  align?: 'start' | 'end' | 'center' | 'justify';
  columns?: number;
  direction?: 'forward' | 'backward';
  expanding?: boolean;
  verticalAlign?: 'bottom' | 'center' | 'stretch' | 'top';
  wrap?: 'none' | 'backward' | 'forward';
  xstyle?: any;
};

export type BaseRowItemPropType = WebViewPropTypes & {
  expanding?: boolean;
  useDeprecatedStyles?: boolean;
  verticalAlign?: 'bottom' | 'center' | 'stretch' | 'top';
};

export type CometRowItemPropTypes = BaseRowItemPropType & {
  fallback?: any;
};

export type CometColumnItemPropTypes = WebViewPropTypes & {
  align?: 'stretch' | 'center' | 'end' | 'start';
  expanding?: boolean;
  fallback?: any;
  paddingHorizontal?: 0 | 4 | 8 | 12 | 16 | 20;
  paddingVertical?: 0 | 4 | 8 | 12 | 16 | 20 | 24 | 40;
  paddingTop?: 0 | 4 | 8 | 12 | 16 | 20 | 24 | 40;
  verticalAlign?: 'top' | 'bottom' | 'center' | 'space-between';
};

export type CometRowPropTypes = BaseRowItemPropType & {
  paddingHorizontal?: 4 | 8 | 12 | 16;
  paddingVertical?: 0 | 4 | 8 | 12 | 16;
  paddingTop?: 0 | 4 | 8 | 12 | 16;
  spacingHorizontal?: 4 | 8 | 12 | 16 | 20 | 24 | 32;
  spacingVertical?: 4 | 8 | 12 | 16 | 20 | 24 | 32;
};

export type CometColumnPropTypes = WebViewPropTypes & {
  expanding?: boolean;
  paddingVertical?: 0 | 4 | 8 | 12 | 16 | 20;
  paddingTop?: 0 | 4 | 8 | 12 | 16 | 20;
  xstyle?: any;
  verticalAlign?: 'top' | 'bottom' | 'center' | 'verticalAlign';

  spacing?: number;
  align?: string;
  hasDividers?: boolean;
  paddingHorizontal?: number;
};
