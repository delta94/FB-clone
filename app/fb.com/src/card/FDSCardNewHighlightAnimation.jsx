import React from 'react';
import { html } from 'react-strict-dom';
import stylex from '@stylexjs/stylex';

/**
 * Changelog:
 * - 09/01/2025
 */

export const FDSCardNewHighlightAnimation = ({ xstyle }) => {
  return <html.div style={[xstyle, styles.borderHighlightAnimation]} />;
};

const x1raiwjw = stylex.keyframes({
  '0%': {
    borderTop: '2px solid var(--accent)',
    borderRight: '2px solid var(--accent)',
    borderBottom: '2px solid var(--accent)',
    borderLeft: '2px solid var(--accent)',
  },

  '100%': {
    borderTop: '2px solid transparent',
    borderRight: '2px solid transparent',
    borderBottom: '2px solid transparent',
    borderLeft: '2px solid transparent',
  },
});

const styles = stylex.create({
  borderHighlightAnimation: {
    animationDuration: '1s',
    animationFillMode: 'both',
    animationName: x1raiwjw,
    animationTimingFunction: 'cubic-bezier(.25, .75, .75, .25)',
  },
});
