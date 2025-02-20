/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

const CometTrackingCodeContext = React.createContext({
  click_tracking_linkshim_cb: [],
  encrypted_click_tracking: [],
  encrypted_tracking: [],
});

export default CometTrackingCodeContext;
