import React from 'react';

export function FBNucleusCrossFilled24Icon(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
      {props.title != null && <title>{props.title}</title>}
      {props.children != null && <defs>{props.children}</defs>}
      <path d="M19.884 5.884a1.25 1.25 0 0 0-1.768-1.768L12 10.232 5.884 4.116a1.25 1.25 0 1 0-1.768 1.768L10.232 12l-6.116 6.116a1.25 1.25 0 0 0 1.768 1.768L12 13.768l6.116 6.116a1.25 1.25 0 0 0 1.768-1.768L13.768 12l6.116-6.116z" />
    </svg>
  );
}

FBNucleusCrossFilled24Icon.displayName = 'FBNucleusCrossFilled24Icon';
FBNucleusCrossFilled24Icon._isSVG = true;
