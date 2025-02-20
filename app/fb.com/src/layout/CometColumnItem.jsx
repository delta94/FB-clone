/**
 * Changelog:
 * - 10/12/2024
 */

import React, { forwardRef, useContext } from 'react';
import { CometColumnContext } from '@fb-contexts';
import { CometErrorBoundary } from '@fb-error/CometErrorBoundary';
import { CometPlaceholder } from '@fb-placeholder/CometPlaceholder';
import { XPlatReactEnvironment } from '@fb-utils/XPlatReactEnvironment';
import stylex from '@stylexjs/stylex';

import { BaseView } from './BaseView';

/**
 *
 * @type React.ForwardRefRenderFunction<?, import("./layout").CometColumnItemPropTypes>
 * @returns {React.Element} The rendered component.
 */
// eslint-disable-next-line complexity
const CometColumnItem = forwardRef((props, ref) => {
  const {
    align = 'stretch',
    children,
    expanding = false,
    fallback,
    paddingHorizontal = 0,
    paddingTop,
    paddingVertical = 0,
    placeholder,
    verticalAlign = 'top',
    xstyle,
    ...otherProps
  } = props;

  const columnContext = useContext(CometColumnContext) || {};
  const composedStyles = stylex.compose(xstyle);

  const content = (
    <>
      {columnContext.hasDividers && (
        <BaseView
          role="separator"
          xstyle={[
            styles.divider,
            XPlatReactEnvironment.isWeb() && additionalStyles.divider,
            paddingHorizontalStyles[columnContext.paddingHorizontal || 0],
            XPlatReactEnvironment.isWeb() && columnContext.spacing && additionalStyles.dividerMargin,
          ]}
        />
      )}
      <BaseView
        {...otherProps}
        ref={ref}
        xstyle={[
          styles.root,
          expanding && styles.expanding,
          align !== 'stretch' && alignmentStyles[align],
          verticalAlign !== 'top' && justifyContentStyles[verticalAlign],
          paddingHorizontalStyles[paddingHorizontal],
          paddingVerticalStyles[paddingVertical],
          paddingTop !== undefined && paddingTopStyles[paddingTop],
          columnContext.spacing && [
            marginVerticalStyles[columnContext.spacing],
            XPlatReactEnvironment.isWeb() && !composedStyles.marginBottom && additionalStyles.marginLastChild,
            XPlatReactEnvironment.isWeb() && !composedStyles.marginTop && additionalStyles.marginFirstChild,
          ],
          xstyle,
        ]}
      >
        <CometColumnContext.Provider value={null}>{children}</CometColumnContext.Provider>
      </BaseView>
    </>
  );

  if (fallback !== undefined) {
    return fallback === null ? (
      <CometErrorBoundary>{content}</CometErrorBoundary>
    ) : (
      <CometErrorBoundary
        fallback={(error, resetErrorBoundary) =>
          typeof fallback === 'function' ? fallback(error, resetErrorBoundary) : fallback
        }
      >
        {content}
      </CometErrorBoundary>
    );
  }

  if (placeholder) {
    return (
      <CometPlaceholder
        fallback={
          placeholder ? (
            <CometColumnItem {...props} ref={ref}>
              {placeholder}
            </CometColumnItem>
          ) : null
        }
      >
        {content}
      </CometPlaceholder>
    );
  }

  return content;
});

export { CometColumnItem };

const styles = stylex.create({
  divider: {
    borderTopColor: 'var(--divider)',
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
  },
  expanding: {
    flexBasis: '100%',
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    maxWidth: '100%',
  },
});

const additionalStyles = stylex.create({
  divider: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':first-child': {
      display: 'none',
    },
  },
  dividerMargin: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':first-child:empty + *': {
      marginTop: 0,
    },
  },
  marginFirstChild: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':first-child': {
      marginTop: 0,
    },
  },
  marginLastChild: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':last-child': {
      marginBottom: 0,
    },
  },
});

const alignmentStyles = stylex.create({
  center: { alignItems: 'center' },
  end: { alignItems: 'flex-end' },
  start: { alignItems: 'flex-start' },
});

const paddingHorizontalStyles = stylex.create({
  4: { paddingLeft: '4px', paddingRight: '4px' },
  8: { paddingLeft: '8px', paddingRight: '8px' },
  12: { paddingLeft: '12px', paddingRight: '12px' },
  16: { paddingLeft: '16px', paddingRight: '16px' },
  20: { paddingLeft: '20px', paddingRight: '20px' },
});

const paddingVerticalStyles = stylex.create({
  0: { paddingTop: '0px', paddingBottom: '0px' },
  4: { paddingTop: '4px', paddingBottom: '4px' },
  8: { paddingTop: '8px', paddingBottom: '8px' },
  12: { paddingTop: '12px', paddingBottom: '12px' },
  16: { paddingTop: '16px', paddingBottom: '16px' },
  20: { paddingTop: '20px', paddingBottom: '20px' },
  24: { paddingTop: '24px', paddingBottom: '24px' },
  40: { paddingTop: '40px', paddingBottom: '40px' },
});

const paddingTopStyles = stylex.create({
  0: { paddingTop: '0px' },
  4: { paddingTop: '4px' },
  8: { paddingTop: '8px' },
  12: { paddingTop: '12px' },
  16: { paddingTop: '16px' },
  20: { paddingTop: '20px' },
  24: { paddingTop: '24px' },
  40: { paddingTop: '40px' },
});

const marginVerticalStyles = stylex.create({
  4: { marginTop: '2px', marginBottom: '2px' },
  8: { marginTop: '4px', marginBottom: '4px' },
  12: { marginTop: '6px', marginBottom: '6px' },
  16: { marginTop: '8px', marginBottom: '8px' },
  20: { marginTop: '10px', marginBottom: '10px' },
  24: { marginTop: '12px', marginBottom: '12px' },
  32: { marginTop: '16px', marginBottom: '16px' },
  40: { marginTop: '20px', marginBottom: '20px' },
});

const justifyContentStyles = stylex.create({
  bottom: { justifyContent: 'flex-end' },
  center: { justifyContent: 'center' },
  'space-between': { justifyContent: 'space-between' },
});
