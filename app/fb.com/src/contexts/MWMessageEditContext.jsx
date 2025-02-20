/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, useContext, useMemo, useState } from "react";

const defaultContextValue = {
  setShowEdits: () => {},
  showEdits: false,
};

const MWMessageEditContext = createContext(defaultContextValue);

function MWMessageEditContextProvider({ children, value }) {
  const [showEdits, setShowEdits] = useState(value?.showEdits ?? false);

  const contextValue = useMemo(
    () => ({ setShowEdits, showEdits }),
    [showEdits]
  );

  return (
    <MWMessageEditContext.Provider value={contextValue}>
      {children}
    </MWMessageEditContext.Provider>
  );
}

MWMessageEditContextProvider.displayName = `${MWMessageEditContextProvider.name} [from ${module.id}]`;

function useMWMessageEditContext() {
  return useContext(MWMessageEditContext);
}

export { MWMessageEditContextProvider, useMWMessageEditContext };
