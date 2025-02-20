import React, { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';

import { BaseImage_DEPRECATED } from './BaseImage_DEPRECATED';
import { TintableIconSource } from './TintableIconSource';

export const FDSTintedIcon_DEPRECATED = forwardRef((props, ref) => {
  // eslint-disable-next-line no-unused-vars
  const { alt = '', color = 'black', draggable, icon, id, testid, xstyle } = props;

  const isTintableIS = icon instanceof TintableIconSource;

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <BaseImage_DEPRECATED
      alt={alt}
      className={stylex(styles.image, isTintableIS && color !== 'black' && colorStyles[color], xstyle)}
      draggable={draggable}
      id={id}
      ref={ref}
      src={icon.src}
      testid={undefined}
    />
  );
});

const styles = stylex.create({
  image: {
    verticalAlign: '-0.25em',
  },
});

const colorStyles = stylex.create({
  accent: {
    filter: 'var(--filter-accent)',
  },
  blueLink: {
    filter: 'var(--filter-blue-link-icon)',
  },
  disabled: {
    filter: 'var(--filter-disabled-icon)',
  },
  negative: {
    filter: 'var(--filter-negative)',
  },
  placeholder: {
    filter: 'var(--filter-placeholder-icon)',
  },
  positive: {
    filter: 'var(--filter-positive)',
  },
  primary: {
    filter: 'var(--filter-primary-icon)',
  },
  primaryAccent: {
    filter: 'var(--filter-primary-accent)',
  },
  secondary: {
    filter: 'var(--filter-secondary-icon)',
  },
  warning: {
    filter: 'var(--filter-warning-icon)',
  },
  white: {
    filter: 'var(--filter-always-white)',
  },
});
