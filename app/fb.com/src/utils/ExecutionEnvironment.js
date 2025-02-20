export const isClient = () => typeof window !== 'undefined';

const canUseDOM =
  // isClient() &&
  !!(window !== undefined && window.document && window.document.createElement);

const canUseDOM2 = () =>
  // isClient() &&
  !!(window !== undefined && window.document && window.document.createElement);

// @ts-ignore
const isInWorker = typeof WorkerGlobalScope === 'function';

export const executionEnvironment = {
  canUseDOM,
  canUseDOM2,
  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
  canUseViewport: isClient() && window && !!window.screen,
  canUseWorkers: typeof Worker !== 'undefined',
  isInBrowser: (isClient() && window) || isInWorker,
  isInWorker,
};
