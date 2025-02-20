/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from 'react';
import { FDSIcon } from '@fb-image/FDSIcon';

import { FBNucleusEyeCrossFilled20Icon } from './FBNucleusEyeCrossFilled20Icon';
import { FBNucleusEyeFilled20Icon } from './FBNucleusEyeFilled20Icon';

/**
 * Changelog:
 * - 08/01/2025
 */

/**
 * FB_PKG_DELIM
 * @param {import("./types").CometFormInputPasswordStateIconProps} props
 */
export const FDSFormInputPasswordStateIcon = (props) => {
  const { isVisible } = props;

  return isVisible ? (
    <FDSIcon aria-label="Hide password" color="primary" icon={<FBNucleusEyeFilled20Icon />} testid={undefined} />
  ) : (
    <FDSIcon aria-label="Show password" color="primary" icon={<FBNucleusEyeCrossFilled20Icon />} testid={undefined} />
  );
};

FDSFormInputPasswordStateIcon.displayName = 'CometFormInputPasswordStateIcon.react';
