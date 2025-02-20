/**
 * Changelog:
 * - 09/12/2024
 */

const guardStack = [];

// Error guard state management
export const ErrorGuardState = {
  pushGuard: function (guard) {
    guardStack.unshift(guard);
  },
  popGuard: function () {
    guardStack.shift();
  },
  inGuard: function () {
    return guardStack.length !== 0;
  },
  cloneGuardList: function () {
    return guardStack.map((guard) => guard.name);
  },
  findDeferredSource: function () {
    for (let i = 0; i < guardStack.length; i++) {
      let guard = guardStack[i];
      if (guard.deferredSource !== null) {
        return guard.deferredSource;
      }
    }
  },
};
