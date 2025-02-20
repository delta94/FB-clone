import React from 'react';
import { BaseToasterStateManagerProvider } from '@fb-toast/BaseToasterStateManagerProvider';

export const CometAppShell = ({ ToasterStateManagerProvider = BaseToasterStateManagerProvider, children, toaster }) => {
  return (
    <ToasterStateManagerProvider>
      {/* <FDSCalloutManager>{children}</FDSCalloutManager> */}
      {children}
      {toaster}
    </ToasterStateManagerProvider>
  );
};
