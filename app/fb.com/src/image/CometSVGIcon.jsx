import React, { cloneElement, isValidElement, useId } from 'react';
import { useCometIconColors } from '@fb-hooks';
import stylex from '@stylexjs/stylex';

import { BaseSVGIcon } from './BaseSVGIcon';

/**
 *
 * @param {import("./types").CometIconProps} props
 */
export const CometSVGIcon = (props) => {
  const iconId = useId();

  const colors = useCometIconColors();

  if (!props.viewBox) {
    const { alt, color, component, inline = false, shadow = false, size } = props;

    return (
      <BaseSVGIcon
        alt={alt}
        color={colors[color]}
        icon={component}
        size={size}
        xstyle={[styles.icon, inline && styles.inline, shadow && styles.shadow]}
      />
    );
  } else {
    const { children, color, inline = false, shadow = false, size, ...rest } = props;

    const clonedElements = [];

    let fillValue;

    if (color && typeof color !== 'string' && isValidElement(color)) {
      clonedElements.push(
        cloneElement(color, {
          id: iconId,
          key: '1',
          suppressHydrationWarning: true,
        }),
      );

      fillValue = 'url(#' + iconId + ')';
    }

    return (
      <svg
        {...rest}
        {...stylex.props([
          styles.icon,
          inline && styles.inline,
          shadow && styles.shadow,
          typeof color === 'string' && styles.color(colors[color]),
        ])}
        fill={fillValue ?? 'currentColor'}
        height={size}
        width={size}
        suppressHydrationWarning={true}
      >
        {clonedElements.length > 0 && <defs>{clonedElements}</defs>}
        {children}
      </svg>
    );
  }
};

const styles = stylex.create({
  color: (color) => ({
    color,
  }),

  icon: {
    display: 'block',
    transitionDuration: 'var(--fds-fast)',
    transitionProperty: 'color,fill,stroke',
    transitionTimingFunction: 'var(--fds-soft)',
  },
  inline: {
    display: 'inline-block',
  },
  shadow: {
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitFilter: 'drop-shadow(0 2px 8px var(--shadow-1))',
    filter: 'drop-shadow(0 2px 8px var(--shadow-1))',
  },
});
