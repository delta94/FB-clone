/**
 * Changelog:
 * - 09/12/2024
 */

import React, { forwardRef } from 'react';
import { BaseRowContext } from '@fb-contexts';
import { useBaseRowA11yWrap } from '@fb-hooks';
import { useMergeRefs } from '@fb-hooks';
import stylex from '@stylexjs/stylex';

import { BaseView } from './BaseView';

const reverseDirection = {
  end: 'start',
  start: 'end',
};

/**
 *
 * @type React.ForwardRefRenderFunction<?, import("./layout").BaseRowPropType>
 * @returns {React.Element} The rendered component.
 */
// eslint-disable-next-line complexity
const BaseRow = forwardRef((props, ref) => {
  const {
    align = 'justify', // a
    children, //
    columns = 0, // p
    direction = 'forward', // q
    expanding = false, // r
    role, //
    verticalAlign = 'stretch', // s
    wrap = 'none', // t
    xstyle, // v
    ...restProps //
  } = props;

  const baseRowContextValue = {
    columns,
    wrap,
  };

  const [isWrapped, a11yWrapRef] = useBaseRowA11yWrap(direction === 'forward' && wrap === 'backward');

  const combineRef = useMergeRefs(ref, a11yWrapRef);

  let renderedChildren = children;

  if (direction === 'forward' && wrap === 'backward' && isWrapped && Array.isArray(children) && children.length === 2) {
    renderedChildren = [children[1], children[0]];
  }

  const expandingStyle = expanding && styles.expanding;
  const justifyStyle =
    justifyStyles[direction === 'backward' && (align === 'start' || align === 'end') ? reverseDirection[align] : align];

  const verticalAlignStyle = verticalAlignStyles[verticalAlign];
  const wrapStyle = wrapStyles[wrap];
  const reversedWrapStyle =
    isWrapped &&
    direction === 'forward' &&
    wrap === 'backward' &&
    Array.isArray(children) &&
    children.length === 2 &&
    wrapStyles.forward;

  const directionStyle = directionStyles[direction];
  const rowStyles = [
    styles.row,
    expandingStyle,
    justifyStyle,
    verticalAlignStyle,
    wrapStyle,
    reversedWrapStyle,
    directionStyle,
    xstyle,
  ];

  const content = <BaseRowContext.Provider value={baseRowContextValue}>{renderedChildren}</BaseRowContext.Provider>;

  return (
    <BaseView {...restProps} ref={combineRef} role={role} xstyle={rowStyles}>
      {content}
    </BaseView>
  );
});

BaseRow.displayName = 'BaseRow';

const styles = stylex.create({
  expanding: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  row: {
    display: 'flex',
    flexShrink: 0,
    position: 'relative',
  },
});

const justifyStyles = stylex.create({
  center: {
    justifyContent: 'center',
  },
  end: {
    justifyContent: 'flex-end',
  },
  justify: {
    justifyContent: 'space-between',
  },
  start: {
    justifyContent: 'flex-start',
  },
});

const verticalAlignStyles = stylex.create({
  bottom: {
    alignItems: 'flex-end',
  },
  center: {
    alignItems: 'center',
  },
  stretch: {
    alignItems: 'stretch',
  },
  top: {
    alignItems: 'flex-start',
  },
});

const wrapStyles = stylex.create({
  backward: {
    flexWrap: 'wrap-reverse',
  },
  forward: {
    flexWrap: 'wrap',
  },
  none: {
    flexWrap: 'nowrap',
  },
});

const directionStyles = stylex.create({
  backward: {
    flexDirection: 'row-reverse',
  },
  forward: {
    flexDirection: 'row',
  },
});

export { BaseRow };
