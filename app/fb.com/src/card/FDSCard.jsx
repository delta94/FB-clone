/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef } from 'react';
import { XPlatReactEnvironment } from '@fb-utils/XPlatReactEnvironment';

export const FDSCard = forwardRef(({ background, ...rest }, ref) => {
  if (background === 'dark-wash' && XPlatReactEnvironment.isWeb()) {
    background = 'base-wash';
  }

  return <FDSCardImpl background={background} {...rest} ref={ref} />;
});
