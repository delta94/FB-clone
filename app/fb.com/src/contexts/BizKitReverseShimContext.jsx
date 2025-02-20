import { createContext } from 'react';

const defaultContext = {
  isBizKitReverseShimActive: false,
  reverseShimLabel: '',
  reverseShimName: null,
};

const BizKitReverseShimContext = createContext(defaultContext);

export default BizKitReverseShimContext;
