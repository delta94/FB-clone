import { createContext } from 'react';

/**
 * @typedef {Object} BaseContextualLayerAnchorRootContextProps
 * @property {HTMLElement} current - The current HTML element serving as the anchor for the contextual layer.
 */

/**
 * @type {import("react").Context<BaseContextualLayerAnchorRootContextProps>}
 */
export const BaseContextualLayerAnchorRootContext = createContext({
  current: document.body,
});
