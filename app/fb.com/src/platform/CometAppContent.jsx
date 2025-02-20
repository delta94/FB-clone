import React from 'react';
import { CometSSRMultipassBoundary } from '@fb-dump/CometSSRMultipassBoundary';
import { CometBackupPlaceholder } from '@fb-placeholder/CometBackupPlaceholder';
import { CometPlaceholder } from '@fb-placeholder/CometPlaceholder';

import { CometAppMainContentAreaRenderer } from './CometAppMainContentAreaRenderer';
import { CometAppViewStack } from './CometAppViewStack';

export const CometAppContent = ({
  appNavigation,
  appFooter,
  disableNegativeMarginBottom,
  shouldRenderTopNav = true,
  children,
}) => {
  return (
    <CometAppViewStack
      baseView={
        <CometPlaceholder fallback={null}>
          <CometBackupPlaceholder fallback={null}>
            <CometSSRMultipassBoundary id="top_nav">{shouldRenderTopNav && appNavigation}</CometSSRMultipassBoundary>
          </CometBackupPlaceholder>
          <CometAppMainContentAreaRenderer
            disableNegativeMarginBottom={disableNegativeMarginBottom}
            shouldRenderTopNav={shouldRenderTopNav}
          >
            {children}
            {/* <GroupsCometEntityMenuEmbeddedHomeLayoutRenderer>
              <CometContentArea>
                <Outlet />
              </CometContentArea>
            </GroupsCometEntityMenuEmbeddedHomeLayoutRenderer> */}
          </CometAppMainContentAreaRenderer>
          {appFooter}
        </CometPlaceholder>
      }
    />
  );
};
