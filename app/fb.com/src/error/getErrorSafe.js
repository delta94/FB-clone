/**
 * Changelog:
 * - 09/12/2024
 */

import { err } from './err';
import { TAALOpcode } from './TAALOpcode';

const reExnId = 'RE_EXN_ID';

export const getErrorSafe = (obj) => {
  let newErr = null;

  if (!obj || typeof obj !== 'object') {
    newErr = err('Non-object thrown: %s', String(obj));
  } else {
    if (Object.prototype.hasOwnProperty.call(obj, reExnId)) {
      newErr = err('Rescript exception thrown: %s', JSON.stringify(err));
    } else {
      if (typeof obj.message !== 'string') {
        newErr = err('Non-error thrown: %s, keys: %s', String(obj), JSON.stringify(Object.keys(obj).sort()));
      } else {
        if (Object.isExtensible && !Object.isExtensible(obj)) {
          newErr = err('Non-extensible thrown: %s', String(obj.message));
        }
      }
    }
  }

  if (newErr) {
    newErr.taalOpcodes = newErr.taalOpcodes || [];
    newErr.taalOpcodes.push(TAALOpcode.PREVIOUS_FRAME);
    return newErr;
  }
  return obj;
};
