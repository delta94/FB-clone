import React from 'react';

export const FBNucleusEyeFilled20Icon = (props) => {
  return (
    <svg viewBox="0 0 20 20" width="1em" height="1em" fill="currentColor" {...props}>
      {props.title && <title>{props.title}</title>}
      {props.children && <defs>{props.children}</defs>}
      <path d="M7.5 10a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z" />
      <path d="M3.707 5.488C5.232 4.163 7.333 3 10.001 3c2.667 0 4.768 1.163 6.293 2.488 1.52 1.32 2.5 2.831 2.953 3.62a1.78 1.78 0 0 1 0 1.784c-.453.789-1.434 2.3-2.953 3.62C14.769 15.837 12.668 17 10 17c-2.668 0-4.77-1.163-6.294-2.488-1.519-1.32-2.5-2.831-2.953-3.62a1.78 1.78 0 0 1 0-1.784c.453-.789 1.434-2.3 2.953-3.62zM10 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
    </svg>
  );
};
