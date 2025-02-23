/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useState } from 'react';

import { useVisibilityObserver } from '@fb-hooks';

import { BaseLoadingStateElement } from './BaseLoadingStateElement';

const styles = {
  paused: { animationPlayState: 'paused' },
  root: {
    animationDirection: 'var(--glimmer-animation-direction)',
    animationDuration: 'var(--glimmer-animation-duration)',
    animationIterationCount: 'infinite',
    animationName: 'xvfaeil-B',
    animationTimingFunction: 'var(--glimmer-animation-timing-function)',
    opacity: 'var(--glimmer-opacity-min)',
  },
};

export const BaseGlimmer = ({ children, index, xstyle }) => {
  const [isPaused, setIsPaused] = useState(true);

  const handleHidden = useCallback((event) => {
    if (event.hiddenReason !== 'COMPONENT_UNMOUNTED') {
      setIsPaused(true);
    }
  }, []);

  const handleVisible = useCallback(() => {
    setIsPaused(false);
  }, []);

  const observerRef = useVisibilityObserver({
    onHidden: handleHidden,
    onVisible: handleVisible,
  });

  const animationDelay = `calc(${index % 10} * var(--glimmer-stagger-time, 200ms))`;

  return (
    <BaseLoadingStateElement
      ref={observerRef}
      style={{ animationDelay }}
      xstyle={[styles.root, isPaused && styles.paused, xstyle]}
    >
      {children}
    </BaseLoadingStateElement>
  );
};

BaseGlimmer.displayName = `${BaseGlimmer.name} [from ${module.id}]`;
