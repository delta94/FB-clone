/**
 * Changelog:
 * - 09/12/2024
 */

// Flag to track if an error has been logged
let hasLoggedError = false;

// Error listener to log errors to console
export const ErrorBrowserConsole = {
  errorListener: (errorEvent) => {
    const { console } = window;
    const logType = console[errorEvent.type] ? errorEvent.type : 'error';
    if (errorEvent.type === 'fatal' || (logType === 'error' && !hasLoggedError)) {
      console.error(
        'ErrorUtils caught an error:\n\n' +
          errorEvent.message +
          "\n\nSubsequent non-fatal errors won't be logged; see https://fburl.com/debugjs.",
      );
      hasLoggedError = true;
    }
  },
};
