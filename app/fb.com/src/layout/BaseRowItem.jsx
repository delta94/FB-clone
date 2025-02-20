/**
 * Changelog:
 * - 09/12/2024
 */

import React, { forwardRef, useContext } from 'react';
import { BaseRowContext } from '@fb-contexts';
import stylex from '@stylexjs/stylex';

import { BaseView } from './BaseView';

/**
 * @type React.ForwardRefRenderFunction<?, import("./layout").BaseRowItemPropType>
 * @returns {React.Element} The rendered component.
 */
const BaseRowItem = forwardRef((props, ref) => {
  const {
    expanding = false, // f
    useDeprecatedStyles = false, // g
    verticalAlign,
    xstyle,
    ...restProps
  } = props;

  // TODO see document
  // const { columns, wrap } = unstable_useContextWithBailout(BaseRowContext, selectBaseRowContextBailout);

  const { columns, wrap } = useContext(BaseRowContext, selectBaseRowContextBailout);

  const itemStyle = useDeprecatedStyles ? styles.item_DEPRECATED : styles.item;

  const expandingStyle = expanding && styles.expanding;
  const expandingWithWrapStyle = expanding && wrap !== 'none' && styles.expandingWithWrap;

  const columnStyle = columns > 0 && columnStyles[columns];
  const verticalAlignStyle = verticalAlign !== null && verticalAlignStyles[verticalAlign];

  const baseRowItemStyles = [
    itemStyle,
    expandingStyle,
    expandingWithWrapStyle,
    columnStyle,
    verticalAlignStyle,
    xstyle,
  ];

  return <BaseView {...restProps} ref={ref} xstyle={baseRowItemStyles} />;
});

const selectBaseRowContextBailout = (val) => [val.columns, val.wrap];

export { BaseRowItem };

const styles = stylex.create({
  expanding: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
  },
  expandingWithWrap: {
    flexBasis: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    maxWidth: '100%',
    minWidth: 0,
  },

  item_DEPRECATED: {
    maxWidth: '100%',
    minWidth: 0,
  },
});

const columnStyles = stylex.create({
  0: {
    flexBasis: 'auto',
  },
  1: {
    flexBasis: '100%',
  },
  2: {
    flexBasis: '50%',
  },
  3: {
    flexBasis: '(100 / 3)%',
  },
  4: {
    flexBasis: '25%',
  },
  5: {
    flexBasis: '20%',
  },
  6: {
    flexBasis: '(100 / 6)%',
  },
  7: {
    flexBasis: '(100 / 7)%(100 / 7)%',
  },
  8: {
    flexBasis: '12.5%',
  },
  9: {
    flexBasis: '(100 / 9)%',
  },
  10: {
    flexBasis: '10%',
  },
});

const verticalAlignStyles = stylex.create({
  bottom: {
    alignSelf: 'flex-end',
  },
  center: {
    alignSelf: 'center',
  },
  stretch: {
    alignSelf: 'stretch',
  },
  top: {
    alignSelf: 'flex-start',
  },
});
