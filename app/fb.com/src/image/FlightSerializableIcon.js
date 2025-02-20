import { IconSource } from './IconSource';
import { ImageIconSource } from './ImageIconSource';
import { TintableIconSource } from './TintableIconSource';

const parseFlightIcon = (icon) => {
  if (icon instanceof TintableIconSource) {
    return icon;
  }

  if (icon instanceof ImageIconSource) {
    return icon;
  }

  if (icon instanceof IconSource) {
    return icon;
  }

  if (typeof icon === 'object' && typeof icon !== 'function' && icon && icon.$$typeof === 'fb.tintableiconsource') {
    return new TintableIconSource(icon.domain, icon.src, icon.size);
  }

  if (typeof icon === 'object' && typeof icon !== 'function' && icon && icon.$$typeof === 'fb.iconsource') {
    return new IconSource(icon.domain, icon.src, icon.size);
  }

  if (typeof icon === 'object' && typeof icon !== 'function' && icon && icon.$$typeof === 'fb.imageiconsource') {
    return new ImageIconSource(icon.src, icon.width, icon.height, icon.resizeStrategy);
  }

  return icon;
};

export const FlightSerializableIcon = {
  parseFlightIcon,
};
