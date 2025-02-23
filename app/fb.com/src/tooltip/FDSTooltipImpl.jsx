/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from 'react';

import { CometPlaceholder } from '@fb-placeholder/CometPlaceholder';
// import deferredLoadComponent from "deferredLoadComponent";
// import requireDeferredForDisplay from "requireDeferredForDisplay";
import { FDSTooltipDeferredImpl } from './FDSTooltipDeferredImpl';

// const FDSTooltipDeferredImpl = deferredLoadComponent(
//   requireDeferredForDisplay("FDSTooltipDeferredImpl.react").__setRef(
//     "FDSTooltipImpl.react"
//   )
// );

export const FDSTooltipImpl = (props) => {
  return (
    <CometPlaceholder fallback={null}>
      <FDSTooltipDeferredImpl {...props} />
    </CometPlaceholder>
  );
};

FDSTooltipImpl.displayName = 'FDSTooltipImpl [from 98]';
