/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from 'react';

import { FocusWithinHandlerStrictMode } from './FocusWithinHandlerStrictMode';

// const gkx3696 = false;

/**
 *
 * @param {import("./types").FocusWithinHandlerNonStrictModeReactProps} props
 * @returns
 */
export const FocusWithinHandler = (props) => {
  // if (gkx3696) {
  //   return <FocusWithinHandlerStrictMode {...props} />;
  // } else {
  //   // eslint-disable-next-line react/jsx-pascal-case
  //   return <FocusWithinHandlerNonStrictMode_DEPRECATED {...props} />;
  // }

  return <FocusWithinHandlerStrictMode {...props} />;
};
