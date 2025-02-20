import { unrecoverableViolation } from '@fb-error/unrecoverableViolation';
import { memoizeWithArgs } from '@fb-utils/memoizeWithArgs';

import { coerceImageishSprited } from './coerceImageishSprited';
import { TintableIconSource } from './TintableIconSource';

function filled(a, b) {
  throw unrecoverableViolation(
    `fbicon.filled(${JSON.stringify(a)}, ${b}): Unexpected fbicon.filled reference.`,
    'comet_ui',
  );
}

function outline(a, b) {
  throw unrecoverableViolation(
    `fbicon.outline(${JSON.stringify(a)}, ${b}): Unexpected fbicon.outline reference.`,
    'comet_ui',
  );
}

const _fbicon = memoizeWithArgs(
  /**
   *
   * @param {import("@/faang/base-image/types").SpritedImage} src
   * @param {number} size
   */
  (src, size) => {
    return new TintableIconSource('FB', src, size);
  },

  /**
   *
   * @param {import("@/faang/base-image/types").SpritedImage} src
   * @param {number} size
   */
  (src, size) => {
    if (typeof src === 'object') {
      const coercedImageObject = coerceImageishSprited(src);
      if (coercedImageObject) {
        return coercedImageObject.identifier + ':' + size;
      } else if (typeof src.uri === 'string') {
        return src.uri + ':' + size;
      }
    } else if (typeof src === 'string') {
      return src + ':' + size;
    }

    throw unrecoverableViolation('fbicon._: Invalid icon provided.', 'comet_ui');
  },
);

export const fbicon = {
  _: _fbicon,
  filled,
  outline,
};
