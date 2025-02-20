/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from "react";

const GeoPrivateLayerPositionContext = React.createContext({
  disableAutoFlip: undefined,
  position: undefined,
});

export default GeoPrivateLayerPositionContext;
