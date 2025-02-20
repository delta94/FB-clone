/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from 'react';
import { BaseLoadingStateElement } from '@fb-glimmer/BaseLoadingStateElement';
import { CometImageFromIXValue } from '@fb-image/CometImageFromIXValue';
import { useCurrentDisplayMode } from '@fb-hooks';
import stylex from '@stylexjs/stylex';

import { FDSProgressRingUtils } from './FDSProgressRingUtils';

const strokeWidth = 2;
const defaultClassName = 'always-enable-animations';

export function FDSProgressRingIndeterminate({ color, size, xstyle }) {
  const { foregroundColor } = FDSProgressRingUtils.getRingColor(color);
  const strokeDasharray = (size - strokeWidth) * Math.PI;
  const isDark = useCurrentDisplayMode() === 'dark';
  const source = FDSProgressRingUtils.getRingGifUrl(color, size.toString(), isDark ? 'dark' : 'light');

  return (
    <BaseLoadingStateElement xstyle={[styles.root, xstyle]}>
      {color === 'dark' ? (
        <svg
          className={stylex(defaultClassName, dummyStyles.dumm1)}
          height={size}
          viewBox={'0 0 ' + size + ' ' + size}
          width={size}
        >
          <circle
            className={[
              defaultClassName,
              stylex(
                styles.foregroundCircle,
                size === 12 && styles.foregroundCircle12,
                size === 16 && styles.foregroundCircle16,
                size === 20 && styles.foregroundCircle20,
                size === 24 && styles.foregroundCircle24,
                size === 32 && styles.foregroundCircle32,
                size === 48 && styles.foregroundCircle48,
                size === 60 && styles.foregroundCircle60,
                size === 72 && styles.foregroundCircle72,
              ),
            ].join(' ')}
            cx={size / 2}
            cy={size / 2}
            fill="none"
            r={(size - strokeWidth) / 2}
            stroke={foregroundColor}
            strokeDasharray={strokeDasharray}
            strokeWidth={strokeWidth}
          />
        </svg>
      ) : (
        <div
          style={{
            height: size,
            width: size,
          }}
        >
          <CometImageFromIXValue source={source} testid={undefined} />
        </div>
      )}
    </BaseLoadingStateElement>
  );
}

const aniFCircle12 = stylex.keyframes({
  '0%': {
    strokeDashoffset: '6.3px',
    transform: 'rotate(-90deg)',
  },

  '25%': {
    strokeDashoffset: '28.3px',
    transform: 'rotate(162deg)',
  },

  '50%': {
    strokeDashoffset: '14.1px',
    transform: 'rotate(72deg)',
  },

  '75%': {
    strokeDashoffset: '28.3px',
    transform: 'rotate(162deg)',
  },

  '100%': {
    strokeDashoffset: '6.3px',
    transform: 'rotate(-90deg)',
  },
});

const aniFC16 = stylex.keyframes({
  '0%': {
    strokeDashoffset: '8.8px',
    transform: 'rotate(-90deg)',
  },

  '25%': {
    strokeDashoffset: '39.6px',
    transform: 'rotate(162deg)',
  },

  '50%': {
    strokeDashoffset: '19.8px',
    transform: 'rotate(72deg)',
  },

  '75%': {
    strokeDashoffset: '39.6px',
    transform: 'rotate(162deg)',
  },

  '100%': {
    strokeDashoffset: '8.8px',
    transform: 'rotate(-90deg)',
  },
});

const aniFC20 = stylex.keyframes({
  '0%': {
    strokeDashoffset: '11.3px;',
    transform: 'rotate(-90deg)',
  },

  '25%': {
    strokeDashoffset: '50.9px',
    transform: 'rotate(162deg)',
  },

  '50%': {
    strokeDashoffset: '25.4px',
    transform: 'rotate(72deg)',
  },

  '75%': {
    strokeDashoffset: '50.9px',
    transform: 'rotate(162deg)',
  },

  '100%': {
    strokeDashoffset: '11.3px',
    transform: 'rotate(-90deg)',
  },
});

const aniFC24 = stylex.keyframes({
  '0%': {
    strokeDashoffset: '13.8px;',
    transform: 'rotate(-90deg)',
  },

  '25%': {
    strokeDashoffset: '62.2px',
    transform: 'rotate(162deg)',
  },

  '50%': {
    strokeDashoffset: '31.1px',
    transform: 'rotate(72deg)',
  },

  '75%': {
    strokeDashoffset: '62.2px',
    transform: 'rotate(162deg)',
  },

  '100%': {
    strokeDashoffset: '13.8px',
    transform: 'rotate(-90deg)',
  },
});

const aniFC32 = stylex.keyframes({
  '0%': {
    strokeDashoffset: '18.8px;',
    transform: 'rotate(-90deg)',
  },

  '25%': {
    strokeDashoffset: '84.8px',
    transform: 'rotate(162deg)',
  },

  '50%': {
    strokeDashoffset: '42.4px',
    transform: 'rotate(72deg)',
  },

  '75%': {
    strokeDashoffset: '84.8px',
    transform: 'rotate(162deg)',
  },

  '100%': {
    strokeDashoffset: '18.8px',
    transform: 'rotate(-90deg)',
  },
});

const aniFC48 = stylex.keyframes({
  '0%': {
    strokeDashoffset: '28.9px;',
    transform: 'rotate(-90deg)',
  },

  '25%': {
    strokeDashoffset: '130px',
    transform: 'rotate(162deg)',
  },

  '50%': {
    strokeDashoffset: '65px',
    transform: 'rotate(72deg)',
  },

  '75%': {
    strokeDashoffset: '130px',
    transform: 'rotate(162deg)',
  },

  '100%': {
    strokeDashoffset: '28.9px',
    transform: 'rotate(-90deg)',
  },
});

const aniFC60 = stylex.keyframes({
  '0%': {
    strokeDashoffset: '36.4px;',
    transform: 'rotate(-90deg)',
  },

  '25%': {
    strokeDashoffset: '164px',
    transform: 'rotate(162deg)',
  },

  '50%': {
    strokeDashoffset: '82px',
    transform: 'rotate(72deg)',
  },

  '75%': {
    strokeDashoffset: '164px',
    transform: 'rotate(162deg)',
  },

  '100%': {
    strokeDashoffset: '36.4px',
    transform: 'rotate(-90deg)',
  },
});

const aniFC72 = stylex.keyframes({
  '0%': {
    strokeDashoffset: '43.98px;',
    transform: 'rotate(-90deg)',
  },

  '25%': {
    strokeDashoffset: '197.9px',
    transform: 'rotate(162deg)',
  },

  '50%': {
    strokeDashoffset: '98.9px',
    transform: 'rotate(72deg)',
  },

  '75%': {
    strokeDashoffset: '197.9px',
    transform: 'rotate(162deg)',
  },

  '100%': {
    strokeDashoffset: '43.98px',
    transform: 'rotate(-90deg)',
  },
});

const aniRC = stylex.keyframes({
  '0%': {
    transform: 'rotate(-90deg)',
  },

  '25%': {
    transform: 'rotate(90deg)',
  },

  '50%': {
    transform: 'rotate(270deg)',
  },

  '75%': {
    transform: 'rotate(450deg)',
  },

  '100%': {
    transform: 'rotate(990deg)',
  },
});

const aniDummy1 = stylex.keyframes({
  '0%': {
    transform: 'rotate(-90deg)',
  },

  '25%': {
    transform: 'rotate(90deg)',
  },

  '50%': {
    transform: 'rotate(270deg)',
  },

  '75%': {
    transform: 'rotate(450deg)',
  },

  '100%': {
    transform: 'rotate(990deg)',
  },
});

const styles = stylex.create({
  foregroundCircle: {
    animationDuration: '2s',
    animationFillMode: 'both',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'cubic-bezier(.33,0,.67,1)',
    transformOrigin: '50% 50%',
  },

  animationFillModeAndTimingFn: {
    animationFillMode: 'both',
    animationTimingFunction: 'cubic-bezier(0,0,1,1)',
  },

  foregroundCircle12: {
    animationName: aniFCircle12,
  },
  foregroundCircle16: {
    animationName: aniFC16,
  },
  foregroundCircle20: {
    animationName: aniFC20,
  },
  foregroundCircle24: {
    animationName: aniFC24,
  },
  foregroundCircle32: {
    animationName: aniFC32,
  },
  foregroundCircle48: {
    animationName: aniFC48,
  },
  foregroundCircle60: {
    animationName: aniFC60,
  },
  foregroundCircle72: {
    animationName: aniFC72,
  },
  root: {
    display: 'flex',
  },
  rotationCircle: {
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: aniRC,
    animationTimingFunction: 'steps(10,end)',
    transformOrigin: '50% 50%',
  },
});

const dummyStyles = stylex.create({
  dumm1: {
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: aniDummy1,
    transformOrigin: '50% 50%',
    animationFillMode: 'both',
    animationTimingFunction: 'cubic-bezier(0,0,1,1)',
  },
});
