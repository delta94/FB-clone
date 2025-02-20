/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from "react";

const BaseViewportMarginsContext = createContext({
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
});

export default BaseViewportMarginsContext;
