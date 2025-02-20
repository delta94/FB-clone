/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from "react";

const defaultConfig = {
  darkClassName: null,
  darkVariables: {},
  lightClassName: null,
  lightVariables: {},
};

const BaseThemeConfigContext = createContext(defaultConfig);

export default BaseThemeConfigContext;
