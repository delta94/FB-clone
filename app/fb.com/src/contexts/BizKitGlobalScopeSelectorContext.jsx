import { createContext } from 'react';
import emptyFunction from 'emptyFunction';

const defaultValue = {
  isOpen: false,
  isScopeSelectorSticky: false,
  isSeeAllAssetsOpen: false,
  isSeeAllCollectionsOpen: false,
  selectedAssetCollectionID: null,
  setIsOpen: emptyFunction,
  setIsScopeSelectorSticky: emptyFunction,
  setIsSeeAllAssetsOpen: emptyFunction,
  setIsSeeAllCollectionsOpen: emptyFunction,
  setSelectedAssetCollectionID: emptyFunction,
  setTempGlobalScope: emptyFunction,
  setTempSelectedAssets: emptyFunction,
  tempGlobalScope: null,
  tempSelectedAssets: [],
};

const BizKitGlobalScopeSelectorContext = createContext(defaultValue);

export default BizKitGlobalScopeSelectorContext;
