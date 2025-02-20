import { createContext } from 'react';

/**
 * @typedef {Object} ActiveFocusRegion
 * @property {*} lastFocused - The last focused item in the active focus region.
 * @property {*} scope - The scope of the active focus region.
 * @property {*} restorationFocusRegionItem - The item for restoration in the active focus region.
 * @property {*} triggeredFocusRegionItems - Items triggered within the active focus region.
 */

/**
 * @typedef {Object} ActiveFocusRegionUtilsContextProps
 * @property {function(): *} getActiveFocusRegion - A function to retrieve the active focus region.
 * @property {function(ActiveFocusRegion): void} setActiveFocusRegion - A function to set the active focus region.
 */

/**
 * @type {import("react").Context<ActiveFocusRegionUtilsContextProps | undefined>}
 */
export const ActiveFocusRegionUtilsContext = createContext(undefined);
