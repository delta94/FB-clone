/**
 * Changelog:
 * - 10/12/2024
 */

import React, { forwardRef, useContext, useMemo } from 'react';
import { CometColumnContext, CometRowContext } from '@fb-contexts';
import stylex from '@stylexjs/stylex';

import { BaseRow } from './BaseRow';
import { CometColumnItem } from './CometColumnItem';
import { CometRowItem } from './CometRowItem';

/**
 *
 * @type React.ForwardRefRenderFunction<?, import("./layout").CometRowPropTypes>
 * @returns {React.Element} The rendered component.
 */
const CometRow = forwardRef((props, ref) => {
  const columnContext = useContext(CometColumnContext);
  const rowContext = useContext(CometRowContext);

  const {
    children,
    // eslint-disable-next-line no-unused-vars
    paddingHorizontal,
    paddingVertical = 0,

    paddingTop,
    spacing = 12,
    spacingHorizontal = spacing,
    spacingVertical = spacing,
    xstyle,
    expanding,
    ...otherProps
  } = props;

  const defaultPaddingHorizontal = (!columnContext ? undefined : columnContext.paddingHorizontal) ? 0 : 12;
  const defaultSpacing = (!columnContext ? undefined : columnContext.spacing) ? 0 : 16;

  const _paddingHorizontal = defaultPaddingHorizontal;
  const _paddingTop =
    paddingTop === undefined ? (props.paddingVertical === undefined ? defaultSpacing : null) : paddingTop;

  const rowSpacingContext = useMemo(
    () => ({
      spacingHorizontal,
      spacingVertical,
    }),
    [spacingHorizontal, spacingVertical],
  );

  const combinedStyles = [
    horizontalPaddingStyles[_paddingHorizontal],
    verticalSpacingStyles[paddingVertical],
    _paddingTop !== null && verticalPaddingStyles[_paddingTop],
    horizontalSpacingStyles[spacingHorizontal],
    verticalMarginStyles[spacingVertical],
    xstyle,
  ];

  const baseRow = (
    <BaseRow {...otherProps} ref={ref} xstyle={combinedStyles}>
      <CometRowContext.Provider value={rowSpacingContext}>{children}</CometRowContext.Provider>
    </BaseRow>
  );

  if (rowContext) {
    return <CometRowItem expanding={expanding}>{baseRow}</CometRowItem>;
  }

  if (columnContext) {
    return <CometColumnItem expanding={expanding}>{baseRow}</CometColumnItem>;
  }

  return baseRow;
});

export { CometRow };

// l
const horizontalPaddingStyles = stylex.create({
  4: { paddingRight: '4px', paddingLeft: '4px' },
  8: { paddingRight: '8px', paddingLeft: '8px' },
  12: { paddingRight: '12px', paddingLeft: '12px' },
  16: { paddingRight: '16px', paddingLeft: '16px' },
});

// m
const verticalPaddingStyles = stylex.create({
  0: { paddingTop: '0' },
  4: { paddingTop: '4px' },
  8: { paddingTop: '8px' },
  12: { paddingTop: '12px' },
  16: { paddingTop: '16px' },
});

// n
const verticalSpacingStyles = stylex.create({
  4: { paddingBottom: '4px', paddingTop: '4px' },
  8: { paddingBottom: '8px', paddingTop: '8px' },
  12: { paddingBottom: '12px', paddingTop: '12px' },
  16: { paddingBottom: '16px', paddingTop: '16px' },
});

// o
const horizontalSpacingStyles = stylex.create({
  4: { marginRight: '-2px', marginLeft: '-2px' },
  8: { marginRight: '-4px', marginLeft: '-4px' },
  12: { marginRight: '-6px', marginLeft: '-6px' },
  16: { marginRight: '-8px', marginLeft: '-8px' },
  24: { marginRight: '-12px', marginLeft: '-12px' },
  32: { marginRight: '-16px', marginLeft: '-16px' },
});

// p
const verticalMarginStyles = stylex.create({
  4: { marginBottom: '-2px', marginTop: '-2px' },
  8: { marginBottom: '-4px', marginTop: '-4px' },
  12: { marginBottom: '-6px', marginTop: '-6px' },
  16: { marginBottom: '-8px', marginTop: '-8px' },
  24: { marginBottom: '-12px', marginTop: '-12px' },
  32: { marginBottom: '-16px', marginTop: '-16px' },
});
