import React from 'react';

const Svg = ({ children, title, ...rest }) => {
  return (
    <svg {...rest}>
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
};

const Path = ({ props }) => {
  return <path {...props} />;
};

const Defs = ({ children }) => {
  return <defs>{children}</defs>;
};

export const XPlatReactSVG = {
  Svg,
  Path,
  Defs,
};
