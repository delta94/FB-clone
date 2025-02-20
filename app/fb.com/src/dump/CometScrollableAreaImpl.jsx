/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { forwardRef } from 'react';

import { BaseScrollableArea } from './BaseScrollableArea';

export const CometScrollableAreaImpl = forwardRef((props, ref) => {
  const { horizontal = true, id, vertical = true, ...rest } = props;

  return <BaseScrollableArea {...rest} horizontal={horizontal} id={id} ref={ref} vertical={vertical} />;
});
