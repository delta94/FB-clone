import { createContext } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

const AbstractSidebarSectionContext = createContext({
  onChange: emptyFunction,
  expandedValues: new Set(),
  isActivated: false,
});

export default AbstractSidebarSectionContext;
