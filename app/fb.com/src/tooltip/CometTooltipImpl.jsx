import React from 'react';

import { CometPlaceholder } from '@fb-placeholder/CometPlaceholder';
import { CometTooltipDeferredImpl } from './CometTooltipDeferredImpl';
// import deferredLoadComponent from './deferredLoadComponent';
// import requireDeferredForDisplay from './requireDeferredForDisplay';

// const DeferredTooltipImpl = deferredLoadComponent(
//   requireDeferredForDisplay('CometTooltipDeferredImpl.react').__setRef('CometTooltipImpl.react'),
// );

export const CometTooltipImpl = (props) => {
  return (
    <CometPlaceholder fallback={null}>
      <CometTooltipDeferredImpl {...props} />
    </CometPlaceholder>
  );
};

CometTooltipImpl.displayName = `CometTooltipImpl [from ${__filename}]`;
