import React from 'react';

import { CometAppContent } from './CometAppContent';
// import { useCometDarkModeSystemSettingToast } from './useCometDarkModeSystemSettingToast';

export const CometAppWithTopNavContentComponent = ({ children }) => {
  // useCometDarkModeSystemSettingToast();

  return <CometAppContent appNavigation={undefined}>{children}</CometAppContent>;
};
