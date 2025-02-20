/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, useContext } from 'react';
import { jsx } from 'react/jsx-runtime';
import { FBLogger } from '@fb-error/FBLogger';
import { unrecoverableViolation } from '@fb-error/unrecoverableViolation';
import { CometBackupPlaceholder } from '@fb-placeholder/CometBackupPlaceholder';
import { CometPlaceholder } from '@fb-placeholder/CometPlaceholder';
import { executionEnvironment } from '@fb-utils/ExecutionEnvironment';

import { CometSSRMultipassBoundaryUtils } from './CometSSRMultipassBoundaryUtils';

// Main component for SSR Multipass Boundary
export function CometSSRMultipassBoundary(props) {
  const { children, fallback = null, id, useCometPlaceholder } = props;

  // Decide whether to use CometPlaceholder or React.Fragment for SSR handling
  const PlaceholderComponent = useCometPlaceholder ? CometPlaceholder : CometBackupPlaceholder;

  return jsx(BoundaryWrapper, {
    boundaryId: id,
    children: jsx(PlaceholderComponent, {
      fallback: jsx(SSRBoundaryFallback, {
        id,
        children: fallback,
      }),
      children: jsx(SSRBoundaryContent, {
        id,
        children: jsx(React.Fragment, {
          children,
        }),
      }),
    }),
  });
}

// Component that handles SSR boundary content rendering
function SSRBoundaryContent(props) {
  const { children, id } = props;

  if (executionEnvironment.canUseDOM) {
    return children;
  }

  // If the boundary is not enabled, attempt to retrieve a pending boundary promise
  if (!CometSSRMultipassBoundaryUtils.isEnabledBoundary(id)) {
    let boundaryPromise = CometSSRMultipassBoundaryUtils.tryGetBoundaryPromise(id);

    if (boundaryPromise) throw boundaryPromise;

    // Create a new promise and resolve function
    boundaryPromise = new Promise((resolve) => {
      // Resolve the boundary when appropriate
      const resolveBoundary = () => resolve();

      // Store the promise and resolution function in the boundary map
      CometSSRMultipassBoundaryUtils.updateDisabledBoundariesMap(id, {
        promise: boundaryPromise,
        resolveFunc: resolveBoundary,
      });
    });

    throw boundaryPromise;
  }

  return children;
}

// Component that handles the fallback content in SSR
function SSRBoundaryFallback(props) {
  const { children, id } = props;

  if (CometSSRMultipassBoundaryUtils.isEnabledBoundary(id)) {
    FBLogger('comet_ssr').mustfix(`SSR boundary suspended unexpectedly: ${id}`);
  }

  return children;
}

// Context to store boundary IDs for SSR
const SSRBoundaryContext = createContext(undefined);

// Wrapper component to handle the boundary context and prevent nested boundaries
function BoundaryWrapper(props) {
  const { boundaryId, children } = props;
  const currentBoundary = useContext(SSRBoundaryContext);

  // In the DOM environment, render the children directly
  if (executionEnvironment.canUseDOM) {
    return children;
  }

  // Ensure nested SSR boundaries are not allowed
  if (currentBoundary && currentBoundary !== 'root') {
    throw unrecoverableViolation(
      `Nested SSR boundaries are unsupported. Found boundary '${boundaryId}' nested underneath boundary '${currentBoundary}'.`,
      'comet_ssr',
    );
  }

  // Provide the boundary ID context for child components
  return <SSRBoundaryContext.Provider value={boundaryId}>{children}</SSRBoundaryContext.Provider>;
}
