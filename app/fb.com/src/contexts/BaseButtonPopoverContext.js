import { createContext } from 'react';

/**
 * @typedef {Object} BaseButtonPopoverContextProps
 * @property {boolean} expanded - Indicates whether the popover is expanded or not.
 * @property {string} haspopup - A string indicating the presence of a popup related to the button.
 */

/**
 * @type {import("react").Context<BaseButtonPopoverContextProps | undefined>}
 */
export const BaseButtonPopoverContext = createContext(undefined);
