/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/**
 * Changelog:
 * - 08/01/2025
 */

import { processBaseInputValidators } from './processBaseInputValidators';

export function validateBaseInput(isPristine, value, validator) {
  const allResults = validator && !isPristine ? processBaseInputValidators(value, validator) : [];
  if (allResults.length === 0)
    return {
      allResults: allResults,
      topResultReason: null,
      topResultType: 'CORRECT',
    };
  const hasError = allResults.some((result) => {
    return result.type === 'ERROR';
  });
  const topResultType =
    // eslint-disable-next-line no-cond-assign
    (value = allResults.find((result) => {
      return result.type === (hasError ? 'ERROR' : 'WARN');
    }))
      ? value
      : null;
  return {
    allResults,
    topResultReason: topResultType && topResultType.reason ? topResultType.reason : null,
    topResultType: topResultType ? topResultType.type : 'CORRECT',
  };
}
