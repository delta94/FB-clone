import { PromiseAnnotate } from '@fb-utils/PromiseAnnotate';

let simpleUUIDCounter = 0;

/**
 * Generates a simple UUID.
 *
 * @returns {string} - The generated simple UUID.
 */
const getSimpleUUID = () => {
  return String(simpleUUIDCounter++);
};

/**
 * Creates a thenable description based on a set of promises.
 *
 * @param {Set<Promise>} promises - The set of promises.
 * @returns {string | null} - The thenable description or null if the set is empty.
 */
const createThenableDescription = (promises) => {
  if (promises && promises.size > 0) {
    return Array.from(promises)
      .map((promise) => {
        const displayName = PromiseAnnotate.getDisplayName(promise);
        return displayName ? displayName : 'Promise';
      })
      .join(',');
  } else {
    return null;
  }
};

export const HeroPlaceholderUtils = {
  createThenableDescription,
  getSimpleUUID,
};
