/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from "react";

const BaseRowContext = createContext({
  columns: 1,
  wrap: "none",
});

export default BaseRowContext;
