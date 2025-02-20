/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, useCallback, useContext, useId, useMemo, useRef, useState } from 'react';
import { useDelayedState, useStable } from '@fb-hooks';

import BaseTooltipTargetWrapper from './BaseTooltipTargetWrapper';

const TooltipGroupContext = createContext(null);

const BaseTooltipGroupContainer = ({ children, tooltipImpl }) => {
  const [isVisible, setIsVisible] = useDelayedState(false);
  const [activeContentKey, setActiveContentKey] = useState(null);
  const tooltipIdentifier = useId();

  const contextValue = useMemo(
    () => ({
      activeContentKey,
      isVisible,
      onHide: (delay, callback) => setIsVisible(false, delay, callback),
      onShow: (key, delay, callback) => {
        setActiveContentKey(key);
        setIsVisible(true, delay, callback);
      },
      tooltipIdentifier,
      tooltipImpl,
    }),
    [activeContentKey, isVisible, tooltipIdentifier, tooltipImpl, setIsVisible],
  );

  return <TooltipGroupContext.Provider value={contextValue}>{children}</TooltipGroupContext.Provider>;
};

BaseTooltipGroupContainer.displayName = `BaseTooltipGroupContainer [from ${__filename}]`;

let tooltipCounter = 0;
const generateTooltipKey = () => `tooltip-${tooltipCounter++}`;

const BaseTooltipGroupChild = ({
  disabled = false,
  hideDelayMs,
  showDelayMs,
  children,
  forceInlineDisplay,
  onVisibilityChange,
  ...rest
}) => {
  const tooltipKey = useStable(generateTooltipKey);
  const contextRef = useRef(null);
  const context = useContext(TooltipGroupContext);
  const {
    activeContentKey,
    isVisible = false,
    onHide,
    onShow,
    tooltipIdentifier,
    tooltipImpl: TooltipImpl,
  } = context || {};

  const handleShow = useCallback(() => {
    if (!disabled && onShow) {
      onShow(tooltipKey, showDelayMs, onVisibilityChange);
    }
  }, [disabled, onShow, tooltipKey, showDelayMs, onVisibilityChange]);

  const handleHide = useCallback(() => {
    if (onHide) {
      onHide(hideDelayMs, onVisibilityChange);
    }
  }, [hideDelayMs, onHide, onVisibilityChange]);

  const shouldUseNewRendering = true;

  if (context === null) {
    console.log(
      'BaseTooltipGroup: Cannot render a BaseTooltipGroupChild component outside of a BaseTooltipGroup component. ',
      'comet_ui',
    );
  }

  const tooltipContent = TooltipImpl !== null && tooltipKey === activeContentKey && (
    <TooltipImpl
      contentKey={tooltipKey}
      contextRef={contextRef}
      {...rest}
      id={isVisible ? tooltipIdentifier : undefined}
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
        tooltipIdentifier={isVisible && activeContentKey === tooltipKey ? tooltipIdentifier : undefined}
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
        tooltipIdentifier={isVisible && activeContentKey === tooltipKey ? tooltipIdentifier : undefined}
      >
        {children}
      </BaseTooltipTargetWrapper>
      {tooltipContent}
    </>
  );
};

BaseTooltipGroupChild.displayName = `BaseTooltipGroupChild [from ${__filename}]`;

export { BaseTooltipGroupChild as Child, BaseTooltipGroupContainer as Container, TooltipGroupContext as Context };
