/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import CometTooltip_DEPRECATED from "./CometTooltip_DEPRECATED";

const MWXTooltip = (props) => {
  if (CometTooltip_DEPRECATED !== null) {
    // eslint-disable-next-line react/jsx-pascal-case
    return <CometTooltip_DEPRECATED {...props} />;
  }

  return null;
};

MWXTooltip.displayName = `MWXTooltip [from ${__filename}]`;

export default MWXTooltip;
