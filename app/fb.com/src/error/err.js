/**
 * Changelog:
 * - 09/12/2024
 */

import { TAALOpcode } from './TAALOpcode';

// Utility function to create a new error with formatted message
export function err(message, ...params) {
  let error = new Error(message);
  if (!error.stack) {
    try {
      throw error;
    } catch (e) {}
  }
  error.messageFormat = message;
  error.messageParams = params.map((param) => String(param));
  error.taalOpcodes = [TAALOpcode.PREVIOUS_FRAME];
  return error;
}
