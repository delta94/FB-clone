import { createContext } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

const AbstractSidebarNavigationActiveContext = createContext({
  onChange: emptyFunction,
  value: null,
});

export default AbstractSidebarNavigationActiveContext;
