import React, { useContext } from 'react';
import { BaseHeadingContext } from '@fb-contexts';

export const BaseHeadingContextWrapper = ({ children }) => {
  const currentValue = useContext(BaseHeadingContext);
  const newValue = currentValue + 1;
  return <BaseHeadingContext.Provider value={newValue}>{children}</BaseHeadingContext.Provider>;
};
