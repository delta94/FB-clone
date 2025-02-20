/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from 'react';
import stylex from '@stylexjs/stylex';

import useCurrentDisplayMode from '../../hooks/useCurrentDisplayMode';

import BaseLoadingStateElement from './BaseLoadingStateElement';
import CometImageFromIXValue from './CometImageFromIXValue';
import { getRingColor, getRingGifUrl } from './CometProgressRingUtils';

const styles = {
  foregroundCircle: {
    animationDuration: 'x1c74tu6',
    animationFillMode: 'x1u6ievf',
    animationIterationCount: 'xa4qsjk',
    animationTimingFunction: 'xuxiujg',
    transformOrigin: 'x1bndym7',
  },
  foregroundCircle12: { animationName: 'x1iqdq0d' },
  foregroundCircle16: { animationName: 'x1koaglw' },
  foregroundCircle20: { animationName: 'x16tkgvi' },
  foregroundCircle24: { animationName: 'xiepp7r' },
  foregroundCircle32: { animationName: 'x1pb3rhs' },
  foregroundCircle48: { animationName: 'x1w90wak' },
  foregroundCircle60: { animationName: 'x1jrcm85' },
  foregroundCircle72: { animationName: 'xnw30k' },
  root: { display: 'x78zum5' },
};

const strokeWidth = 2;
const animationClassName = 'always-enable-animations';

function CometProgressRingIndeterminate({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  color,
  isDecorative = false,
  size,
  testid,
  xstyle,
}) {
  const { foregroundColor } = getRingColor(color);
  const circumference = (size - strokeWidth) * Math.PI;
  const displayMode = useCurrentDisplayMode();
  const isDarkMode = displayMode === 'dark';
  const gifUrl = getRingGifUrl(color, size.toString(), isDarkMode ? 'dark' : 'light');

  return (
    <BaseLoadingStateElement
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      isDecorative={isDecorative}
      testid={undefined}
      xstyle={[styles.root, xstyle]}
    >
      {color === 'dark' ? (
        <svg
          className={[animationClassName, 'x1c74tu6 xa4qsjk x1kfoseq x1bndym7 x1u6ievf x1wnkzza'].join(' ')}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          width={size}
        >
          <circle
            className={[
              animationClassName,
              stylex([
                styles.foregroundCircle,
                size === 12 && styles.foregroundCircle12,
                size === 16 && styles.foregroundCircle16,
                size === 20 && styles.foregroundCircle20,
                size === 24 && styles.foregroundCircle24,
                size === 32 && styles.foregroundCircle32,
                size === 48 && styles.foregroundCircle48,
                size === 60 && styles.foregroundCircle60,
                size === 72 && styles.foregroundCircle72,
              ]),
            ].join(' ')}
            cx={size / 2}
            cy={size / 2}
            fill="none"
            r={(size - strokeWidth) / 2}
            stroke={foregroundColor}
            strokeDasharray={circumference}
            strokeWidth={strokeWidth}
          />
        </svg>
      ) : (
        <div style={{ height: size, width: size }}>
          <CometImageFromIXValue source={gifUrl} testid={undefined} />
        </div>
      )}
    </BaseLoadingStateElement>
  );
}

CometProgressRingIndeterminate.displayName = `${CometProgressRingIndeterminate.name}`;

export default CometProgressRingIndeterminate;
