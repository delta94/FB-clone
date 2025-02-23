/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { ix } from '@fb-image/ix';

// eslint-disable-next-line max-params
export function getCubicBezierPercentageFunc(a, b, c, d) {
  function calculateA(a, b) {
    return 1 - 3 * b + 3 * a;
  }

  function calculateB(a, b) {
    return 3 * b - 6 * a;
  }

  function calculateC(a) {
    return 3 * a;
  }

  function calculateProgress(t, a, b) {
    return ((calculateA(a, b) * t + calculateB(a, b)) * t + calculateC(a)) * t;
  }

  function calculateDerivative(t, a, b) {
    return 3 * calculateA(a, b) * t * t + 2 * calculateB(a, b) * t + calculateC(a);
  }

  function solveCurveX(x) {
    let t = x;
    for (let i = 0; i < 4; ++i) {
      const derivative = calculateDerivative(t, a, c);
      if (derivative === 0) return t;
      const xError = calculateProgress(t, a, c) - x;
      t -= xError / derivative;
    }
    return t;
  }

  return function (t) {
    return a === b && c === d ? t : calculateProgress(solveCurveX(t), b, d);
  };
}

export function getRingGifUrl(color, size, theme) {
  const idMapping = {
    12: {
      dark: {
        blue: '1876411',
        disabled: '1876443',
        dark: '1876427',
        light: '1876427',
      },
      light: {
        blue: '1876419',
        disabled: '1876451',
        dark: '1876435',
        light: '1876427',
      },
      default: '1876435',
    },
    16: {
      dark: {
        blue: '1876412',
        disabled: '1876444',
        dark: '1876428',
        light: '1876428',
      },
      light: {
        blue: '1876420',
        disabled: '1876452',
        dark: '1876436',
        light: '1876428',
      },
      default: '1876436',
    },
    20: {
      dark: {
        blue: '1876413',
        disabled: '1876445',
        dark: '1876429',
        light: '1876429',
      },
      light: {
        blue: '1876421',
        disabled: '1876453',
        dark: '1876437',
        light: '1876429',
      },
      default: '1876437',
    },
    24: {
      dark: {
        blue: '1876414',
        disabled: '1876446',
        dark: '1876430',
        light: '1876430',
      },
      light: {
        blue: '1876422',
        disabled: '1876454',
        dark: '1876438',
        light: '1876430',
      },
      default: '1876438',
    },
    32: {
      dark: {
        blue: '1876415',
        disabled: '1876447',
        dark: '1876431',
        light: '1876431',
      },
      light: {
        blue: '1876423',
        disabled: '1876455',
        dark: '1876439',
        light: '1876431',
      },
      default: '1876439',
    },
    48: {
      dark: {
        blue: '1876416',
        disabled: '1876448',
        dark: '1876432',
        light: '1876432',
      },
      light: {
        blue: '1876424',
        disabled: '1876456',
        dark: '1876440',
        light: '1876432',
      },
      default: '1876440',
    },
    60: {
      dark: {
        blue: '1940508',
        disabled: '1940512',
        dark: '1940510',
        light: '1940510',
      },
      light: {
        blue: '1940509',
        disabled: '1940513',
        dark: '1940511',
        light: '1940510',
      },
      default: '1940511',
    },
    72: {
      dark: {
        blue: '1876418',
        disabled: '1876450',
        dark: '1876434',
        light: '1876434',
      },
      light: {
        blue: '1876426',
        disabled: '1876458',
        dark: '1876442',
        light: '1876434',
      },
      default: '1876442',
    },
    default: '1876439',
  };

  const themeMapping = idMapping[size] || idMapping.default;
  const colorMapping = themeMapping[theme] || themeMapping.default;
  return ix(colorMapping[color] || colorMapping.default);
}

export function getRingColor(color) {
  const colorMapping = {
    dark: {
      backgroundColor: 'var(--progress-ring-neutral-background)',
      foregroundColor: 'var(--progress-ring-neutral-foreground)',
    },
    light: {
      backgroundColor: 'var(--progress-ring-on-media-background)',
      foregroundColor: 'var(--progress-ring-on-media-foreground)',
    },
    blue: {
      backgroundColor: 'var(--progress-ring-blue-background)',
      foregroundColor: 'var(--progress-ring-blue-foreground)',
    },
    disabled: {
      backgroundColor: 'var(--progress-ring-disabled-background)',
      foregroundColor: 'var(--progress-ring-disabled-foreground)',
    },
  };

  return colorMapping[color] || colorMapping.dark;
}
