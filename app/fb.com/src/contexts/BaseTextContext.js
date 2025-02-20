import React, { createContext, useContext, useMemo } from 'react';

export const Context = createContext(undefined);

function BaseTextContextProvider({ nested, children }) {
  const value = useMemo(() => ({ nested }), [nested]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

const useBaseTextContext = () => {
  const context = useContext(Context);

  return context;
};

export const BaseTextContext = {
  BaseTextContextProvider,
  useBaseTextContext,
};
