import { getReactComponentDisplayName } from './getReactComponentDisplayName';

export function getReactElementDisplayName(element) {
  if (!element) {
    return '#empty';
  }

  if (typeof element === 'string' || typeof element === 'number' || typeof element === 'boolean') {
    return '#text';
  }
  if (!element.type) {
    return 'ReactComponent';
  }

  return typeof element.type === 'string' ? element.type : getReactComponentDisplayName(element.type);
}
