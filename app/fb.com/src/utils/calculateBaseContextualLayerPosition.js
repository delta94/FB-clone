import { isRTL } from 'fbjs/lib/Locale';

const IS_RTL = isRTL();

export const calculateBaseContextualLayerPosition = ({
  align,
  contextRect,
  contextualLayerSize,
  fixed,
  offsetRect,
  position,
  screenRect,
}) => {
  const style = {
    position: fixed ? 'fixed' : undefined,
    transform: '',
  };

  let translateX = 0;
  let translateY = 0;
  let translatePercentX = 0;
  let translatePercentY = 0;
  const middleY = (contextRect.bottom + contextRect.top) / 2;
  const middleX = (contextRect.left + contextRect.right) / 2;
  const end = IS_RTL ? 'start' : 'end';
  const start = IS_RTL ? 'end' : 'start';

  switch (position) {
    case 'above':
      translateY = contextRect.top - offsetRect.top;
      translatePercentY = '-100%';
      break;
    case 'below':
      translateY = contextRect.bottom - offsetRect.top;
      break;
    case start:
      translateX = contextRect.left - offsetRect.left;
      translatePercentX = '-100%';
      break;
    case end:
      translateX = contextRect.right - offsetRect.left;
      break;
  }

  if (position === 'start' || position === 'end') {
    switch (align) {
      case 'start':
        translateY = contextRect.top - offsetRect.top;
        break;
      case 'middle':
        translateY = middleY - offsetRect.top;
        translatePercentY = '-50%';
        break;
      case 'end':
        translateY = contextRect.bottom - offsetRect.top;
        translatePercentY = '-100%';
        break;
      case 'stretch':
        translateY = contextRect.top - offsetRect.top;
        style.height = `${contextRect.bottom - contextRect.top}px`;
        break;
    }
  } else if (position === 'above' || position === 'below') {
    switch (align) {
      case start:
        translateX = contextRect.left - offsetRect.left;
        break;
      case 'middle':
        translateX = middleX - offsetRect.left;
        translatePercentX = '-50%';
        break;
      case end:
        translateX = contextRect.right - offsetRect.left;
        translatePercentX = '-100%';
        break;
      case 'stretch':
        translateX = contextRect.left - offsetRect.left;
        style.width = `${contextRect.right - contextRect.left}px`;
        break;
    }
  }

  let adjustment = 0;
  if (contextualLayerSize !== null) {
    if (position === 'start' || position === 'end') {
      let verticalPosition = null;
      switch (align) {
        case 'start':
          verticalPosition = contextRect.top;
          break;
        case 'middle':
          verticalPosition = middleY - contextualLayerSize.height / 2;
          break;
        case 'end':
          verticalPosition = contextRect.bottom - contextualLayerSize.height;
          break;
      }
      if (verticalPosition !== null) {
        if (verticalPosition < screenRect.top) {
          adjustment = screenRect.top - verticalPosition;
        } else if (verticalPosition + contextualLayerSize.height > screenRect.bottom) {
          adjustment = screenRect.bottom - verticalPosition - contextualLayerSize.height;
        }
      }
      translateY += adjustment;
    } else if (position === 'above' || position === 'below') {
      let horizontalPosition = null;
      switch (align) {
        case start:
          horizontalPosition = contextRect.left;
          break;
        case 'middle':
          horizontalPosition = middleX - contextualLayerSize.width / 2;
          break;
        case end:
          horizontalPosition = contextRect.right - contextualLayerSize.width;
          break;
      }
      if (horizontalPosition !== null) {
        if (horizontalPosition < screenRect.left) {
          adjustment = screenRect.left - horizontalPosition;
        } else if (horizontalPosition + contextualLayerSize.width > screenRect.right) {
          adjustment = screenRect.right - horizontalPosition - contextualLayerSize.width;
        }
      }
      translateX += adjustment;
    }
  }

  let transform = '';
  if (translateX !== 0 || translateY !== 0) {
    transform += `translate(${Math.round(translateX)}px, ${Math.round(translateY)}px) `;
  }
  if (translatePercentX !== 0 || translatePercentY !== 0) {
    transform += `translate(${translatePercentX}, ${translatePercentY}) `;
  }
  style.transform = transform;

  return {
    adjustment,
    style,
    translatePositionY: Math.round(translateY),
  };
};
