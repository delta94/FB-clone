/**
 * Changelog:
 * - 09/12/2024
 */

import React, { forwardRef } from 'react';
import { testID } from '@fb-utils/testID';
import stylex from '@stylexjs/stylex';

import { LegacyHidden } from './LegacyHidden';

const styles = stylex.create({
  hidden: {
    display: 'none',
  },
  root: {
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: '0',
  },
});

/**
 * WebView component that wraps LegacyHidden to manage visibility and rendering.
 *
 * @type React.ForwardRefRenderFunction<?, import("./layout").WebViewPropTypes>
 * @returns {React.Element} The rendered component.
 */
const WebView = forwardRef((props, ref) => {
  const { children, suppressHydrationWarning, testid, xstyle, ...restProps } = props;

  const isHidden = props.hidden === true;

  return (
    <LegacyHidden
      htmlAttributes={{
        ...restProps,
        ...testID(testid),
        className: stylex(styles.root, xstyle, isHidden && styles.hidden),
      }}
      mode={isHidden ? 'hidden' : 'visible'}
      ref={ref}
      suppressHydrationWarning={suppressHydrationWarning}
    >
      {children}
    </LegacyHidden>
  );
});

WebView.displayName = 'WebView';

export { WebView };
