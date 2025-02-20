/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import stylex from '@stylexjs/stylex';

import { FocusWithinHandler } from '@fb-focus/FocusWithinHandler';

const styles = {
  inheritAll: {
    alignContent: 'inherit',
    alignItems: 'inherit',
    alignSelf: 'inherit',
    display: 'inherit',
    flexBasis: 'inherit',
    flexDirection: 'inherit',
    flexGrow: 'inherit',
    flexShrink: 'inherit',
    height: 'inherit',
    justifyContent: 'inherit',
    maxHeight: 'inherit',
    maxWidth: 'inherit',
    minHeight: 'inherit',
    minWidth: 'inherit',
    width: 'inherit',
  },
  wrapperInline: {
    display: 'inline-flex',
  },
};

const BaseTooltipTargetWrapper = React.forwardRef(
  ({ children, forceInlineDisplay, onHide, onShow, tooltipIdentifier }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusVisible, setIsFocusVisible] = useState(false);
    const shouldShowTooltip = isFocused && isFocusVisible;
    const prevShouldShowTooltipRef = useRef(shouldShowTooltip);

    useEffect(() => {
      if (prevShouldShowTooltipRef.current !== shouldShowTooltip) {
        if (shouldShowTooltip) {
          onShow();
        } else {
          onHide();
        }
        prevShouldShowTooltipRef.current = shouldShowTooltip;
      }
    }, [onHide, onShow, shouldShowTooltip]);

    const handleKeyDown = useCallback(
      (event) => {
        if (event.key === 'Escape' && tooltipIdentifier !== null) {
          onHide();
          event.stopPropagation();
        }
      },
      [onHide, tooltipIdentifier],
    );

    return (
      <span
        aria-describedby={tooltipIdentifier}
        className={stylex(styles.inheritAll, forceInlineDisplay === true && styles.wrapperInline)}
        data-testid={undefined}
        onKeyDown={handleKeyDown}
        onPointerEnter={onShow}
        onPointerLeave={onHide}
        onPointerUp={onHide}
        ref={ref}
      >
        <FocusWithinHandler onFocusChange={setIsFocused} onFocusVisibleChange={setIsFocusVisible}>
          {children}
        </FocusWithinHandler>
      </span>
    );
  },
);

BaseTooltipTargetWrapper.displayName = `BaseTooltipTargetWrapper [from ${__filename}]`;

export default BaseTooltipTargetWrapper;
