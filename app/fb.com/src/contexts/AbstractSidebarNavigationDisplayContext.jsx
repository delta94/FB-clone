import { createContext } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

const defaultValue = {
  cancelExpandRequest: emptyFunction,
  freeze: emptyFunction,
  isCollapsed: false,
  isCollapsible: false,
  isExpandableOnHover: false,
  isExpansionPersistent: false,
  isHovered: false,
  isUniquelyExpandable: false,
  onCollapse: emptyFunction,
  onExpand: emptyFunction,
  requestExpand: emptyFunction,
  unfreeze: emptyFunction,
};

const AbstractSidebarNavigationDisplayContext = createContext(defaultValue);

export default AbstractSidebarNavigationDisplayContext;
