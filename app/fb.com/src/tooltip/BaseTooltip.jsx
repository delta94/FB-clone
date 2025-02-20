/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useContext, useId, useRef } from 'react';
// import { gkx } from '@fb-utils/gkx';

import { useDelayedState } from '@fb-hooks';

import { Child as BaseTooltipGroupChild, Context as BaseTooltipGroupContext } from './BaseTooltipGroup';
import BaseTooltipTargetWrapper from './BaseTooltipTargetWrapper';

const HIDE_DELAY_MS = 50;
const DEFAULT_SHOW_DELAY_MS = 300;

const TooltipContent = ({
  delayTooltipMs = DEFAULT_SHOW_DELAY_MS,
  disabled = false,
  tooltipImpl: TooltipImpl,
  children,
  forceInlineDisplay,
  onVisibilityChange,
  ...rest
}) => {
  const [isVisible, setIsVisible] = useDelayedState(false);
  console.log('🚀 ~ isVisible:', isVisible);
  const contextRef = useRef(null);
  const tooltipId = useId();

  const handleShow = useCallback(() => {
    if (disabled) return;
    setIsVisible(true, delayTooltipMs, onVisibilityChange);
  }, [delayTooltipMs, disabled, onVisibilityChange, setIsVisible]);

  const handleHide = useCallback(() => {
    setIsVisible(false, 0, onVisibilityChange);
  }, [onVisibilityChange, setIsVisible]);

  const shouldUseNewRendering = true;

  const tooltipContent = (
    <TooltipImpl
      {...rest}
      contentKey={null}
      contextRef={contextRef}
      id={isVisible ? tooltipId : undefined}
      isVisible={isVisible}
    />
  );

  if (shouldUseNewRendering) {
    return (
      <BaseTooltipTargetWrapper
        forceInlineDisplay={forceInlineDisplay}
        onHide={handleHide}
        onShow={handleShow}
        ref={contextRef}
        tooltipIdentifier={isVisible ? tooltipId : undefined}
      >
        {children}
        {tooltipContent}
      </BaseTooltipTargetWrapper>
    );
  }

  return (
    <>
      <BaseTooltipTargetWrapper
        forceInlineDisplay={forceInlineDisplay}
        onHide={handleHide}
        onShow={handleShow}
        ref={contextRef}
        tooltipIdentifier={isVisible ? tooltipId : undefined}
      >
        {children}
      </BaseTooltipTargetWrapper>
      {tooltipContent}
    </>
  );
};

export const BaseTooltip = (props) => {
  const tooltipGroup = useContext(BaseTooltipGroupContext);

  // if (tooltipGroup !== null) {
  //   const {
  //     // tooltipImpl,
  //     delayTooltipMs = DEFAULT_SHOW_DELAY_MS,
  //     ...restProps
  //   } = props;
  //   return <BaseTooltipGroupChild {...restProps} hideDelayMs={HIDE_DELAY_MS} showDelayMs={delayTooltipMs} />;
  // }

  return <TooltipContent {...props} />;
};

BaseTooltip.displayName = `BaseTooltip [from ${__filename}]`;
