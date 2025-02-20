import { createContext } from 'react';

const defaultContextValue = {
  bizKitIsIgLogin: false,
};

const BizKitIsIgLoginContext = createContext(defaultContextValue);

export default BizKitIsIgLoginContext;
