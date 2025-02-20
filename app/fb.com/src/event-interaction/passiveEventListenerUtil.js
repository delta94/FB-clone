let isPassiveSupported = false;

try {
  // Attempt to create a property descriptor for the 'passive' property
  const descriptor = Object.defineProperty({}, 'passive', {
    // eslint-disable-next-line getter-return
    get: () => {
      isPassiveSupported = true;
    },
  });

  // Test if the browser supports passive event listeners by adding a dummy event listener
  window.addEventListener('test', null, descriptor);
  // eslint-disable-next-line no-unused-vars
} catch (error) {
  // Catch any exceptions that might occur (e.g., in environments that don't support Object.defineProperty)
}

// Variable to store whether passive event listeners are supported
const makeEventOptions = function (options) {
  // Return the appropriate value based on whether passive event listeners are supported
  return isPassiveSupported ? options : typeof options === 'boolean' ? options : options.capture || false;
};

export const passiveEventListenerUtil = {
  isPassiveEventListenerSupported: isPassiveSupported,
  makeEventOptions,
};
