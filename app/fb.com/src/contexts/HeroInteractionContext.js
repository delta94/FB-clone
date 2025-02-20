/**
 * Changelog:
 * - 09/12/2024
 */

import { createContext } from 'react';

const fn = function (...a) {};

/**
 * @typedef {import("./types").HeroInteractionContextValue}
 */
const defaultContextValue = {
  consumeBootload: fn,
  hold: () => '',
  logHeroRender: fn,
  logMetadata: fn,
  logPageletVC: fn,
  logReactCommit: fn,
  logReactPostCommit: fn,
  logReactRender: fn,
  pageletStack: [],
  registerPlaceholder: fn,
  removePlaceholder: fn,
  suspenseCallback: fn,
  unhold: fn,
};

const heroInteractionContext = createContext(defaultContextValue);

export const HeroInteractionContext = {
  Context: heroInteractionContext,
  DEFAULT_CONTEXT_VALUE: defaultContextValue,
};
