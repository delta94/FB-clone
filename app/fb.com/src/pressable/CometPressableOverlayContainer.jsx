import React from 'react';
import stylex from '@stylexjs/stylex';

export const CometPressableOverlayContainer = ({ children, role, style, xstyle, ...rest }) => {
  return (
    <div className={stylex(xstyle)} role={role} style={style} {...rest}>
      {children}
    </div>
  );
};
