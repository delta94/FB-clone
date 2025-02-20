import { createContext } from 'react';

const defaultContextValue = {
  isMultiAssetSelectionEnabled: false,
  navLabel: null,
  prevIsMultiAssetSelectionEnabled: null,
  prevRouteName: null,
  routeName: null,
  setIsMultiAssetSelectionEnabled: (enabled) => {},
  setNavLabel: (label) => {},
  setRouteName: (name) => {},
};

const BizKitRouteContext = createContext(defaultContextValue);

export default BizKitRouteContext;
