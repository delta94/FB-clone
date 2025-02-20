import { recoverableViolation } from '@fb-error/recoverableViolation';

export function mergeRefs(...refs) {
  return function (ref) {
    refs.forEach((singleRef) => {
      if (!singleRef) {
        return;
      }

      if (typeof singleRef === 'function') {
        singleRef(ref);
        return;
      }

      if (typeof singleRef === 'object') {
        singleRef.current = ref;
        return;
      }

      recoverableViolation(
        'mergeRefs cannot handle Refs of type boolean, number or string, received ref ' + String(singleRef),
        'comet_ui',
      );
    });
  };
}
