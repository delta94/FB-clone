import React from 'react';
import stylex from '@stylexjs/stylex';

const offscreenAccessibilityElement = {
  clip: 'rect(0,0,0,0)',
  clipPath: 'clip-path: inset(50%)',
  height: '1px',
  overflowX: 'hidden',
  overflowY: 'hidden',
  position: 'absolute',
  width: '1px',
};

export const CometAccessibilityAnnouncement = ({
  assertive = false,
  children = null,
  isVisible = false,
  role = 'alert',
}) => {
  const styleProps = !isVisible ? stylex.props(offscreenAccessibilityElement) : {};
  const ariaLive = assertive ? 'assertive' : 'polite';

  return (
    <div aria-atomic={true} aria-live={ariaLive} role={role} {...styleProps}>
      {children}
    </div>
  );
};
