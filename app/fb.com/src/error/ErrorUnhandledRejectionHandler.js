/**
 * Changelog:
 * - 09/12/2024
 */

import { err } from './err';
import { getErrorSafe } from './getErrorSafe';

// Global variables to store the error reporter and a flag for setup status
let errorReporter = null;
let isSetup = false;

/**
 * Handles unhandled promise rejections.
 * @param {Object} event - The unhandledrejection event.
 */
// eslint-disable-next-line complexity
function handleUnhandledRejection(event) {
  // Exit if the error reporter is not set
  if (!errorReporter) return;

  let reporter = errorReporter;
  let errorReason = event.reason;
  let normalizedError = getErrorSafe(errorReason);
  let errorName = null;

  // Further process if the original error is an object and different from the normalized error
  if (errorReason !== normalizedError && typeof errorReason === 'object' && errorReason) {
    // eslint-disable-next-line no-inner-declarations, no-var
    var keys = Object.keys(errorReason).sort().slice(0, 3);

    // Normalize the error message
    if (typeof errorReason.message !== 'string' && typeof errorReason.messageFormat === 'string') {
      errorReason.message = errorReason.messageFormat;
      normalizedError = getErrorSafe(errorReason);
    }

    // Handle different types of error messages
    if (typeof errorReason.message !== 'string' && typeof errorReason.errorMsg === 'string') {
      if (/^\s*\<!doctype/i.test(errorReason.errorMsg)) {
        let match = /<title>([^<]+)<\/title>(?:(?:.|\n)*<h1>([^<]+)<\/h1>)?/im.exec(errorReason.errorMsg);
        if (match) {
          normalizedError = err('HTML document with title="%s" and h1="%s"', match[1] || '', match[2] || '');
        } else {
          normalizedError = err('HTML document sanitized');
        }
      } else if (/^\s*<\?xml/i.test(errorReason.errorMsg)) {
        normalizedError = err('XML document sanitized');
      } else {
        errorReason.message = errorReason.errorMsg;
        normalizedError = getErrorSafe(errorReason);
      }
    }

    // Determine the error name based on available properties
    if (normalizedError !== errorReason && typeof errorReason.name === 'string') {
      errorName = errorReason.name;
    } else if (typeof errorReason.name !== 'string') {
      if (typeof errorReason.errorCode === 'string') {
        errorName = 'UnhandledRejectionWith_errorCode_' + errorReason.errorCode;
      } else if (typeof errorReason.error === 'number') {
        errorName = 'UnhandledRejectionWith_error_' + String(errorReason.error);
      }
    }
  }

  // Set logging source and error name
  normalizedError.loggingSource = 'ONUNHANDLEDREJECTION';
  try {
    errorName =
      normalizedError === errorReason && errorName
        ? errorName
        : errorReason.name ||
          (keys.length
            ? 'UnhandledRejectionWith_' + keys.join('_')
            : 'UnhandledRejection_' + (errorReason ? typeof errorReason : 'null'));
    normalizedError.name = errorName;
  } catch (e) {}

  // Enhance the stack trace with additional information
  try {
    let stack = errorReason ? errorReason.stack : '';
    if (!stack) stack = normalizedError.stack;
    if (!stack) stack = err('').stack;
    normalizedError.stack = `${normalizedError.name}: ${normalizedError.message}\n${stack
      .split('\n')
      .slice(1)
      .join('\n')}`;
  } catch (e) {}

  // Include promise-specific stack traces if available
  try {
    let promise = event.promise;
    normalizedError.stack +=
      promise && typeof promise.settledStack === 'string'
        ? `\n    at <promise_settled_stack_below>\n${promise.settledStack}`
        : '';
    normalizedError.stack +=
      promise && typeof promise.createdStack === 'string'
        ? `\n    at <promise_created_stack_below>\n${promise.createdStack}`
        : '';
  } catch (e) {}

  // Report the error and prevent the default handling
  reporter.reportError(normalizedError);
  event.preventDefault();
}

/**
 * Sets up the unhandledrejection event listener.
 * @param {Object} reporter - The global error reporter object.
 */
function setupUnhandledRejectionListener(reporter) {
  errorReporter = reporter;
  if (typeof window.addEventListener === 'function' && !isSetup) {
    isSetup = true;
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
  }
}

// Object to handle unhandled promise rejections
export const ErrorUnhandledRejectionHandler = {
  onunhandledrejection: handleUnhandledRejection,
  setup: setupUnhandledRejectionListener,
};
