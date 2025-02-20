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

import { useMemo } from 'react';

import { useIsPristineValue } from './useIsPristineValue';
import { validateBaseInput } from './validateBaseInput';

export function useBaseInputValidators(props) {
  const { isInitialValuePristine = true, validator, value } = props;
  const isPristine = useIsPristineValue(value, isInitialValuePristine);

  return useMemo(() => validateBaseInput(isPristine, value, validator), [isPristine, validator, value]);
}
