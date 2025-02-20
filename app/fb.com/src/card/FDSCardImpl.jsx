/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef } from 'react';
import { html } from 'react-strict-dom';
import { BaseView } from '@fb-layout/BaseView';
import { testID } from '@fb-utils/testID';
import { XPlatReactEnvironment } from '@fb-utils/XPlatReactEnvironment';
import stylex from '@stylexjs/stylex';

import { FDSCardNewHighlightAnimation } from './FDSCardNewHighlightAnimation';

// eslint-disable-next-line complexity
export const FDSCardImpl = forwardRef((props, ref) => {
  const {
    allowOverflow = false,
    background = 'transparent',
    border = 'none',
    borderHighlight,
    children,
    dropShadow = 0,
    expanding = false,
    testid,
    xstyle,
    'aria-label': al,
    'aria-labelledby': all,
    focusable = false,
    scrollable = false,
  } = props;

  const scrollableProps =
    al && focusable
      ? {
          'aria-label': al,
          tabIndex: 0,
        }
      : all && focusable
      ? {
          'aria-labelledby': all,
          tabIndex: 0,
        }
      : {};

  const dropShadowStyle = dropShadowStyles[dropShadow];

  return (
    <html.div style={[borderStyles.container, expanding && borderStyles.expanding]} {...testID(testid)}>
      <BaseView
        ref={ref}
        style={{
          borderRadius: XPlatReactEnvironment.isWeb()
            ? 'max(0px, min(var(--card-corner-radius), calc((100vw - 4px - 100%) * 9999))) / var(--card-corner-radius)'
            : void 0,
        }}
        xstyle={[
          backgroundStyles[background],
          border === 'solid' && background !== 'default' && borderStyles.borderOnWash,
          border === 'solid' && background === 'default' && borderStyles.borderOnWhite,
          border === 'solid' && borderStyles.borderSolid,
          borderStyles.root,
          !allowOverflow && borderStyles.overflowHidden,
          dropShadowStyle,
          xstyle,
        ]}
      >
        {scrollable ? <CometScrollableArea {...scrollableProps}>{children}</CometScrollableArea> : children}
      </BaseView>
      {border === 'inset' && <html.div style={borderStyles.borderInset} />}
      {borderHighlight && XPlatReactEnvironment.isWeb() && borderHighlight === 'animated' ? (
        <FDSCardNewHighlightAnimation xstyle={borderStyles.borderHighlightOverlay} />
      ) : (
        <html.div style={[borderStyles.borderHighlightOverlay]} />
      )}
    </html.div>
  );
});

const backgroundStyles = stylex.create({
  'base-wash': {
    backgroundColor: 'var(--wash)',
  },
  'card-flat': {
    backgroundColor: 'var(--card-background-flat)',
  },
  'dark-wash': {
    backgroundColor: 'var(--shadow-5)',
  },
  default: {
    backgroundColor: 'var(--card-background)',
  },
  error: {
    backgroundColor: 'var(--negative)',
  },
  highlight: {
    backgroundColor: 'var(--accent)',
  },
  'light-wash': {
    backgroundColor: 'var(--web-wash)',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});

const borderStyles = stylex.create({
  borderHighlightOverlay: {
    borderTopColor: 'var(--accent)',
    borderRightColor: 'var(--accent)',
    borderBottomColor: 'var(--accent)',
    borderLeftColor: 'var(--accent)',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px',
    borderTopStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderTopWidth: '2px',
    borderRightWidth: '2px',
    borderBottomWidth: '2px',
    borderLeftWidth: '2px',
    bottom: '-2px',
    left: '-2px',
    pointerEvents: 'none',
    position: 'absolute',
    right: '-2px',
    // start: null,
    // end: null,
    top: '-2px',
    zIndex: 1,
  },
  borderInset: {
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',
    bottom: '0',
    boxShadow: 'inset 0 0 0 1px var(--media-inner-border)',
    boxSizing: 'border-box',
    left: '0',
    pointerEvents: 'none',
    position: 'absolute',
    right: '0',
    // start: null,
    // end: null,
    top: '0',
  },
  borderOnWash: {
    borderTopColor: 'var(--divider)',
    borderRightColor: 'var(--divider)',
    borderBottomColor: 'var(--divider)',
    borderLeftColor: 'var(--divider)',
  },
  borderOnWhite: {
    borderTopColor: 'var(--divider)',
    borderRightColor: 'var(--divider)',
    borderBottomColor: 'var(--divider)',
    borderLeftColor: 'var(--divider)',
  },
  borderSolid: {
    borderTopStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderTopWidth: '1px',
    borderRightWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
  },
  container: {
    display: 'flex',
    position: 'relative',
    width: '100%',
  },
  expanding: {
    flexGrow: 1,
  },
  overflowHidden: {
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  root: {
    borderTopLeftRadius: 'var(--card-corner-radius)',
    borderTopRightRadius: 'var(--card-corner-radius)',
    borderBottomRightRadius: 'var(--card-corner-radius)',
    borderBottomLeftRadius: 'var(--card-corner-radius)',
    boxSizing: 'border-box',
    width: '100%',
  },
});

const dropShadowStyles = stylex.create({
  0: {},
  1: {
    boxShadow: '0 1px 2px var(--shadow-2)',
  },
  2: {
    boxShadow: '0 2px 12px var(--shadow-2)',
  },
});
