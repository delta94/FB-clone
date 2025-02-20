/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

const defaultContextValue = {
  waitTimeAreaName: undefined,
  waitTimeAreaOwner: undefined,
};

const WaitTimeContext = React.createContext(defaultContextValue);

export default WaitTimeContext;
