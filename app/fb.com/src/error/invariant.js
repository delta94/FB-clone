/**
 * Changelog:
 * - 09/12/2024
 */

import { env } from '@fb-utils/env';

import { fbErrorLite } from './fbErrorLite';

/**
 * Throws an error if the given condition is falsy.
 * @param {boolean} condition - The condition to check.
 * @param {string|number|undefined} message - The error message or error code.
 * @param {...any} params - Additional parameters to be included in the error message.
 */
export function invariant(condition, message, ...params) {
  if (!condition) {
    let errorMessage = message;

    if (typeof errorMessage === 'number') {
      // If message is a number, retrieve the corresponding error message and decoder link
      const { message: decodedMessage, decoderLink } = decodeInvariantMessage(errorMessage, params);
      errorMessage = decodedMessage;
      params.unshift(decoderLink);
    } else if (errorMessage === undefined) {
      // If message is undefined, create a default message with placeholders for parameters
      errorMessage = 'Invariant: '; // + params.map(() => "%s").join(",");

      for (let i = 0; i < params.length; i++) {
        errorMessage += '%s,';
      }
    }

    const error = new Error(errorMessage);
    error.name = 'Invariant Violation';
    error.messageFormat = errorMessage;
    error.messageParams = params.map((param) => String(param));
    error.taalOpcodes = [fbErrorLite.TAALOpcode.PREVIOUS_FRAME];

    throw error;
  }
}

/**
 * Decodes the minified invariant message and generates a decoder link.
 * @param {number} code - The minified error code.
 * @param {Array} params - Additional parameters to be included in the decoder link.
 * @returns {Object} - Decoded message and decoder link.
 */
function decodeInvariantMessage(code, params) {
  let message = 'Minified invariant #' + code + '; %s';

  if (params.length > 0) {
    message += ' Params: ' + params.map(() => '%s').join(', ');
  }

  const decoderLink =
    env.show_invariant_decoder === true
      ? 'visit ' + generateDecoderLink(code, params) + ' to see the full message.'
      : '';

  return {
    message,
    decoderLink,
  };
}

/**
 * Generates a decoder link for the given error code and parameters.
 * @param {number} code - The minified error code.
 * @param {Array} params - Additional parameters to be included in the decoder link.
 * @returns {string} - Decoder link.
 */
function generateDecoderLink(code, params) {
  // TODO replace this with my internal
  let link = 'https://www.internalfb.com/intern/invariant/' + code + '/';

  if (params.length > 0) {
    link += '?' + params.map((param, index) => 'args[' + index + ']=' + encodeURIComponent(String(param))).join('&');
  }

  return link;
}
