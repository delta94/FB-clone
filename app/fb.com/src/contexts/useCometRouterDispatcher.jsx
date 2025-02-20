/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useContext } from "react";

import CometRouterDispatcherContext from "./CometRouterDispatcherContext";

function useCometRouterDispatcher() {
  return useContext(CometRouterDispatcherContext);
}

export default useCometRouterDispatcher;
