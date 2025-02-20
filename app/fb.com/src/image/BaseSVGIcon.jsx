import React, { useContext } from 'react';
import { BaseIsDecorativeContext } from '@fb-contexts';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  color: (color) => ({
    color: color,
  }),
});

const BaseSVGIcon = ({ alt, xstyle, color, icon: Icon, size = 8 }) => {
  const ah = useContext(BaseIsDecorativeContext) === true ? true : undefined;

  return (
    <Icon
      aria-hidden={ah}
      height={size}
      width={size}
      title={!alt || alt === '' ? undefined : alt}
      {...stylex.props([color && styles.color(color), xstyle])}
    />
  );
};

export { BaseSVGIcon };
