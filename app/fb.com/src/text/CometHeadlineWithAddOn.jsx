/**
 * Changelog:
 * - 11/12/2024
 */

import React, { forwardRef } from 'react';
import { BaseRow } from '@fb-layout/BaseRow';
import { BaseRowItem } from '@fb-layout/BaseRowItem';
import stylex from '@stylexjs/stylex';
import Locale from 'fbjs/lib/Locale';

/**
 *
 * @type React.ForwardRefRenderFunction<?, import("./text").CometHeadlineWithAddOnPropTypes>
 * @returns {React.Element} The rendered component.
 */
const CometHeadlineWithAddOn = forwardRef((props, ref) => {
  const {
    headlineRef,
    addOn,
    children,
    color,
    id,
    isPrimaryHeading,
    isSemanticHeading,
    numberOfLines,
    truncationTooltip,
    type,
  } = props;

  const headlineItem = (
    <BaseRowItem expanding>
      <FDSText
        color={color}
        id={id}
        isPrimaryHeading={isPrimaryHeading}
        isSemanticHeading={isSemanticHeading}
        numberOfLines={numberOfLines}
        ref={headlineRef}
        truncationTooltip={truncationTooltip}
        type={type}
      >
        {children}
      </FDSText>
    </BaseRowItem>
  );

  const spacer = <BaseRowItem xstyle={styles.nonBreakingSpace} children={'\xa0'} />;

  const addOnItem = (
    <BaseRowItem verticalAlign="top" xstyle={styles.addOn}>
      <BaseRow verticalAlign="center">
        {spacer}
        <BaseRowItem>
          <BaseRow>{addOn}</BaseRow>
        </BaseRowItem>
      </BaseRow>
    </BaseRowItem>
  );

  const content = (
    <BaseRow verticalAlign="center" xstyle={Locale.isRTL() ? directionStyles.rtl : directionStyles.ltr}>
      {headlineItem}
      {addOnItem}
    </BaseRow>
  );

  const renderedComponent = (
    <FDSText isSemanticHeading={false} ref={ref} type={type}>
      {content}
    </FDSText>
  );

  return renderedComponent;
});

export { CometHeadlineWithAddOn };

const directionStyles = stylex.create({
  ltr: {
    direction: 'ltr',
  },
  rtl: {
    direction: 'rtl',
  },
});

const styles = stylex.create({
  addOn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '8px',
  },
  nonBreakingSpace: {
    visibility: 'hidden',
    width: '0',
  },
});
