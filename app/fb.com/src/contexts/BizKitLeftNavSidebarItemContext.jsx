import React from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

const defaultContextValue = {
  onSelectLink: emptyFunction,
  position: -1,
  shouldShowAsDisable: false,
};

const BizKitLeftNavSidebarItemContext = React.createContext(defaultContextValue);

export default BizKitLeftNavSidebarItemContext;
