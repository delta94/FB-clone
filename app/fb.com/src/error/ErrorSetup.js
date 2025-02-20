/**
 * Changelog:
 * - 09/12/2024
 */

import { ErrorGlobalEventHandler } from './ErrorGlobalEventHandler';
import { ErrorPoster } from './ErrorPoster';
import { ErrorPubSub } from './ErrorPubSub';
import { ErrorUnhandledRejectionHandler } from './ErrorUnhandledRejectionHandler';

function preSetup(objSetup) {
  if (!objSetup || objSetup.ignoreOnError !== true) {
    ErrorGlobalEventHandler.setup(ErrorPubSub);
  }

  if (!objSetup || objSetup.ignoreOnUnahndledRejection !== true) {
    ErrorUnhandledRejectionHandler.setup(ErrorPubSub);
  }
}

function setup(props, logFunc, context) {
  ErrorPubSub.addListener((nError) => {
    let e = context && context !== undefined ? context() : {};
    // Combine props and context properties
    let _props = {
      ...props,
      ...(e || {}),
    };

    ErrorPoster.postError(nError, _props, logFunc);
  });
}

export const ErrorSetup = {
  setup,
  preSetup,
};
