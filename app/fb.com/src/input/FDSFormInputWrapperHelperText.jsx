/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from 'react';
import { FDSTextPairing } from '@fb-text/FDSTextPairing';
import { gkx } from '@fb-utils/gkx';

export function FDSFormInputWrapperHelperText(props) {
  const { validationState, value } = props;

  const metaColor = validationState === 'ERROR' && !gkx[6275] ? 'negative' : 'secondary';

  return <FDSTextPairing level={4} meta={value} metaColor={metaColor} />;
}
