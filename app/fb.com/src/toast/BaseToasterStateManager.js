import { JSScheduler } from '@fb-dump/JSScheduler';

import { XPlatReactToasterStateManager } from './XPlatReactToasterStateManager';

function callbackScheduler(fn) {
  JSScheduler.scheduleNormalPriCallback(() => {
    fn();
  });
}

const CometMaxEnqueuedToastsSitevarConfig = {
  max: 2,
};

export const BaseToasterStateManager = {
  getInstance: () => {
    return XPlatReactToasterStateManager.getInstance({
      callbackScheduler,
      maxQueuedToasts: CometMaxEnqueuedToastsSitevarConfig.max,
    });
  },
  resetInstance_DO_NOT_USE: () => {
    XPlatReactToasterStateManager.resetInstance_DO_NOT_USE();
  },
};
