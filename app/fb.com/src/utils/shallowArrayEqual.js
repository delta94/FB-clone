import { isNullish } from './isNullish';

export function shallowArrayEqual(array1, array2) {
  if (array1 === array2) return true;
  if (isNullish(array1) || isNullish(array2) || array1.length !== array2.length) return false;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}
