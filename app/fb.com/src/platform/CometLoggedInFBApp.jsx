import React, { memo } from 'react';
import { CometToasterRoot } from '@fb-toast/CometToasterRoot';

import { CometAppShell } from './CometAppShell';
import { CometAppContentComponent } from './CometAppContentComponent';
import { BaseToasterStateManagerProvider } from '@fb-toast/BaseToasterStateManagerProvider';

export const CometLoggedInFBApp = memo(({ children }) => {
  return (
    <React.Profiler id="CometApp">
      <CometAppShell ToasterStateManagerProvider={BaseToasterStateManagerProvider} toaster={<CometToasterRoot />}>
        <CometAppContentComponent>{children}</CometAppContentComponent>
      </CometAppShell>
    </React.Profiler>
  );
});
