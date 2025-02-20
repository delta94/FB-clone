/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

export const getBaseInputValidationStateDescription = ({ label, validationState }) => {
  switch (label) {
    case 'CORRECT':
      return 'Label of form input' + validationState;
    case 'ERROR':
      return 'Label of form input' + validationState;
    case 'LOADING':
      return 'Label of form input' + validationState;
    case 'WARN':
      return 'Label of form input' + validationState;
  }
};
