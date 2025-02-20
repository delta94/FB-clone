import { getComputedStyle } from './getComputedStyle';

export const isElementFixedOrSticky = (element) => {
  let currentElement = element;

  while (currentElement !== null && currentElement !== element.ownerDocument) {
    const computedStyle = getComputedStyle(currentElement);
    if (computedStyle === null) return false;

    const positionValue = computedStyle.getPropertyValue('position');
    if (positionValue === 'fixed' || positionValue === 'sticky') return true;

    currentElement = currentElement.parentElement;
  }

  return false;
};
