/**
 * Changelog:
 * - 10/12/2024
 */

import React, { forwardRef, useContext } from 'react';
import { CometRowContext } from '@fb-contexts';
import { CometErrorBoundary } from '@fb-error/CometErrorBoundary';
import { CometPlaceholder } from '@fb-placeholder/CometPlaceholder';
import stylex from '@stylexjs/stylex';

import { BaseRowItem } from './BaseRowItem';

/**
 *
 * @type React.ForwardRefRenderFunction<?, import("./layout").CometRowItemPropTypes>
 * @returns {React.Element} The rendered component.
 */
const CometRowItem = forwardRef((props, ref) => {
  const { fallback, placeholder, children, useDeprecatedStyles, xstyle, ...otherProps } = props;

  const rowContext = useContext(CometRowContext) || {};
  const { spacingHorizontal, spacingVertical } = rowContext;

  if (placeholder !== undefined) {
    const placeholderElement = placeholder ? (
      <CometRowItem {...otherProps} ref={ref}>
        {placeholder}
      </CometRowItem>
    ) : null;

    const childElement = <CometRowItem {...otherProps} ref={ref} />;

    return <CometPlaceholder fallback={placeholderElement}>{childElement}</CometPlaceholder>;
  }

  if (fallback !== undefined) {
    if (!fallback) {
      return (
        <CometErrorBoundary>
          <CometRowItem {...otherProps} ref={ref} />
        </CometErrorBoundary>
      );
    }

    const fallbackRenderer = (error, resetErrorBoundary) =>
      typeof fallback === 'function' ? fallback(error, resetErrorBoundary) : fallback;

    const childElement = <CometRowItem {...otherProps} ref={ref} />;

    return <CometErrorBoundary fallback={fallbackRenderer}>{childElement}</CometErrorBoundary>;
  }

  const horizontalStyles = horizontalSpacingStyles[spacingHorizontal];
  const verticalStyles = verticalSpacingStyles[spacingVertical];
  const combinedStyles = [horizontalStyles, verticalStyles, xstyle];

  return (
    <BaseRowItem {...otherProps} ref={ref} useDeprecatedStyles={useDeprecatedStyles} xstyle={combinedStyles}>
      <CometRowContext.Provider value={null}>{children}</CometRowContext.Provider>
    </BaseRowItem>
  );
});

export { CometRowItem };

const horizontalSpacingStyles = stylex.create({
  4: {
    paddingLeft: '2px',
    paddingRight: '2px',
  },
  8: {
    paddingLeft: '4px',
    paddingRight: '4px',
  },
  12: {
    paddingLeft: '6px',
    paddingRight: '6px',
  },
  16: {
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  24: {
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  32: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
});

const verticalSpacingStyles = stylex.create({
  4: {
    paddingBottom: '2px',
    paddingTop: '2px',
  },
  8: {
    paddingBottom: '4px',
    paddingTop: '4px',
  },
  12: {
    paddingBottom: '6px',
    paddingTop: '6px',
  },
  16: {
    paddingBottom: '8px',
    paddingTop: '8px',
  },
  24: {
    paddingBottom: '12px',
    paddingTop: '12px',
  },
  32: {
    paddingBottom: '16px',
    paddingTop: '16px',
  },
});
