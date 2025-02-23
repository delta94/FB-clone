import React from 'react';
import { html } from 'react-strict-dom';

const styles = {
  divider: {
    backgroundColor: 'var(--divider)',
    boxSizing: 'border-box',
    height: '1px',
  },
  reset: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderEndWidth: 0,
    borderBottomWidth: 0,
    borderStartWidth: 0,
    marginTop: 0,
    marginEnd: 0,
    marginBottom: 0,
    marginStart: 0,
  },
};

export function BaseDivider({ ariaHidden, xstyle }) {
  const combinedStyle = [styles.reset, styles.divider, xstyle];
  return <html.hr aria-hidden={ariaHidden} style={combinedStyle} />;
}
