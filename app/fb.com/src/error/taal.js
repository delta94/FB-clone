/**
 * Changelog:
 * - 09/12/2024
 */

import { TAALOpcode } from './TAALOpcode';

export const TAAL = {
  blameToPreviousFile: function (error) {
    error.taalOpcodes = error.taalOpcodes ?? [];
    error.taalOpcodes.push(TAALOpcode.PREVIOUS_FILE);
    return error;
  },
  blameToPreviousFrame: function (error) {
    error.taalOpcodes = error.taalOpcodes ?? [];
    error.taalOpcodes.push(TAALOpcode.PREVIOUS_FRAME);
    return error;
  },
  blameToPreviousDirectory: function (error) {
    error.taalOpcodes = error.taalOpcodes ?? [];
    error.taalOpcodes.push(TAALOpcode.PREVIOUS_DIR);
    return error;
  },
};
