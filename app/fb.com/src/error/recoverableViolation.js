/**
 * Changelog:
 * - 09/12/2024
 */

import { FBLogger } from './FBLogger';

// eslint-disable-next-line max-params
export function recoverableViolation(errorMessage, loggerIdentifier, options = {}, e) {
  let error = options.error;

  let logger = FBLogger(loggerIdentifier);

  if (error) {
    logger = logger.catching(error);
  } else {
    logger = logger.blameToPreviousFrame();
  }

  if (e && e.categoryKey) {
    logger = logger.addToCategoryKey(error);
  }

  let temp;

  // eslint-disable-next-line no-cond-assign
  e = (temp = !e ? undefined : e.trackOnly) ? temp : false;

  if (e) {
    logger.debug(errorMessage);
  } else {
    logger.mustfix(errorMessage);
  }

  return null;
}
