import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import { CometSSRPreloadImageCollection } from './CometSSRPreloadImageCollection';

/**
 *
 * @param {import("./types").SpritedImage} spriteImage
 */
const processSpritedImagesForSSRPreload = (spriteImage) => {
  if (!spriteImage || ExecutionEnvironment.canUseDOM) {
    return;
  }

  const imageSrc = spriteImage.spi ?? spriteImage._spi ?? spriteImage.uri;

  if (!imageSrc) {
    return;
  }
  CometSSRPreloadImageCollection.addImage(imageSrc);
};

export const CometSSRBackgroundImageUtils = {
  processSpritedImagesForSSRPreload,
};
