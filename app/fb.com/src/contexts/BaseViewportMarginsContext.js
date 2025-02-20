/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { createContext } from 'react';

/**
 * @typedef {Object} BaseButtonPopoverContextProps
 * @property {number} top - The top position of the button popover.
 * @property {number} right - The right position of the button popover.
 * @property {number} bottom - The bottom position of the button popover.
 * @property {number} left - The left position of the button popover.
 */

/**
 * @type {BaseButtonPopoverContextProps}
 */
const initial = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
};
/**
 * @type {import("react").Context<BaseButtonPopoverContextProps>}
 */
export const BaseViewportMarginsContext = createContext(initial);
