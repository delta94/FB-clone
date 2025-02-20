/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext } from "react";
import emptyFunction from "fbjs/lib/emptyFunction";

const defaultValue = {
  isDialogOpened: false,
  setFocused: emptyFunction,
  setIsDialogOpened: emptyFunction,
};

const MWV2MessageRowIsRowFocusedContext = createContext(defaultValue);

const MWV2MessageRowIsRowFocusedContextProvider = ({ children, value }) => {
  return (
    <MWV2MessageRowIsRowFocusedContext.Provider value={value}>
      {children}
    </MWV2MessageRowIsRowFocusedContext.Provider>
  );
};

MWV2MessageRowIsRowFocusedContextProvider.displayName = `${MWV2MessageRowIsRowFocusedContextProvider.name} [from ${module.id}]`;

export {
  MWV2MessageRowIsRowFocusedContext,
  MWV2MessageRowIsRowFocusedContextProvider,
};
