import { isStringNullOrEmpty } from '@fb-utils/isStringNullOrEmpty';

import { CometKeys } from './CometKeys';

const keyMap = {
  8: 'Backspace',
  13: 'Enter',
  27: 'Escape',
  32: ' ',
  33: 'PageUp',
  34: 'PageDown',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  46: 'Delete',
};

const validCometKeys = new Set(Object.values(CometKeys));

export function getCometKey(event) {
  let key = event.key;
  const keyCode = event.which || event.keyCode;

  if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90)) {
    key = String.fromCharCode(keyCode);
  }

  if (keyCode >= 96 && keyCode <= 105) {
    key = String.fromCharCode(keyCode - 48);
  }

  if (!isStringNullOrEmpty(key)) {
    key = key.toLowerCase();
    if (validCometKeys.has(key)) {
      return key;
    }
  }

  if (Object.prototype.hasOwnProperty.call(keyMap, keyCode)) {
    key = keyMap[keyCode].toLowerCase();
    if (validCometKeys.has(key)) {
      return key;
    }
  }

  return null;
}
