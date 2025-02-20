/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, useContext, useMemo, useRef } from "react";
import emptyFunction from "fbjs/lib/emptyFunction";

const MWShowMessagePromptPopoverContext = createContext([
  { current: emptyFunction },
  emptyFunction,
]);

function useMWShowMessagePromptPopoverContext() {
  return useContext(MWShowMessagePromptPopoverContext);
}

function MWShowMessagePromptPopoverContextProvider({ children }) {
  const ref = useRef(emptyFunction);

  const value = useMemo(
    () => [
      ref,
      (newFunction) => {
        ref.current = newFunction;
      },
    ],
    []
  );

  return (
    <MWShowMessagePromptPopoverContext.Provider value={value}>
      {children}
    </MWShowMessagePromptPopoverContext.Provider>
  );
}

MWShowMessagePromptPopoverContextProvider.displayName = `MWShowMessagePromptPopoverContextProvider`;

export {
  MWShowMessagePromptPopoverContextProvider,
  useMWShowMessagePromptPopoverContext,
};
