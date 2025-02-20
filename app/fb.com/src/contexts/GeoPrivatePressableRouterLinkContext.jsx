/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import GeoPrivatePressableDefaultRouterLink from "../contexts/GeoPrivatePressableDefaultRouterLink";

const GeoPrivatePressableRouterLinkContext = React.createContext(
  GeoPrivatePressableDefaultRouterLink
);

export default GeoPrivatePressableRouterLinkContext;
