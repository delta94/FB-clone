import React from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

export const CometDarkModeContext = React.createContext({
  currentSetting: 'DISABLED',
  onDarkModeToggle: emptyFunction,
  setDarkModeSetting: emptyFunction,
});
