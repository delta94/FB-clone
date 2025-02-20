/**
 * Changelog:
 * - 10/12/2024
 */

import React, { forwardRef, useContext } from 'react';
import { CometColumnContext } from '@fb-contexts';
import stylex from '@stylexjs/stylex';

import { BaseView } from './BaseView';
import { CometColumnItem } from './CometColumnItem';

/**
 *
 * @type React.ForwardRefRenderFunction<?, import("./layout").CometColumnPropTypes>
 * @returns {React.Element} The rendered component.
 */
const CometColumn = forwardRef((props, ref) => {
  const {
    align = null,
    children,
    expanding = false,
    hasDividers = false,
    paddingHorizontal = null,
    paddingTop,
    paddingVertical = 0,
    spacing = null,
    verticalAlign = 'top',
    xstyle,
    ...rest
  } = props;

  const columnContext = useContext(CometColumnContext);

  const contextValues = {
    align,
    hasDividers,
    paddingHorizontal,
    spacing,
  };

  const renderColumn = (
    <BaseView
      {...rest}
      ref={ref}
      xstyle={[
        styles.root,
        expanding === true && styles.expanding,
        paddingStyles[paddingVertical],
        paddingTop && paddingVerticalStyles[paddingTop],
        xstyle,
      ]}
    >
      <BaseView xstyle={[styles.inner, verticalAlign !== 'top' && justifyContentStyles[verticalAlign]]}>
        <CometColumnContext.Provider value={contextValues}>{children}</CometColumnContext.Provider>
      </BaseView>
    </BaseView>
  );

  if (columnContext) {
    return <CometColumnItem expanding={expanding ?? undefined}>{renderColumn}</CometColumnItem>;
  }

  return renderColumn;
});

export { CometColumn };

const styles = stylex.create({
  expanding: {
    flexBasis: '100%',
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0,
  },
  expandingIE11: {
    flexBasis: 'auto',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: 0,
  },
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    maxWidth: '100%',
  },
});

const paddingVerticalStyles = stylex.create({
  0: {
    paddingTop: 0,
  },
  4: {
    paddingTop: '4px',
  },
  8: {
    paddingTop: '8px',
  },
  12: {
    paddingTop: '12px',
  },
  16: {
    paddingTop: '16px',
  },
  20: {
    paddingTop: '20px',
  },
});

const paddingStyles = stylex.create({
  4: {
    paddingTop: '4px',
    paddingBottom: '4px',
  },
  8: {
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  12: {
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  16: {
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  20: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
});

const justifyContentStyles = stylex.create({
  bottom: {
    justifyContent: 'flex-end',
  },
  center: {
    justifyContent: 'center',
  },
  'space-between': {
    justifyContent: 'space-between',
  },
});
