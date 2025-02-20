const imageCollection = new Set();
const processedImages = new Set();

/**
 * Adds an image to the collection.
 *
 * @param {string} imageUrl - The URL of the image to add.
 */
function addImage(imageUrl) {
  imageCollection.add(imageUrl);
}

/**
 * Clears the image collection.
 */
function clearImageCollection() {
  imageCollection.clear();
}

/**
 * Converts images to an HTML link string for preloading.
 *
 * @returns {string} - The HTML link string for preloading images.
 */
function imagesToHTMLLinkString() {
  if (!imageCollection || imageCollection.size === 0) {
    return '';
  }

  const linkTags = [];
  imageCollection.forEach((imageUrl) => {
    if (!processedImages.has(imageUrl)) {
      linkTags.push('<link rel="preload" as="image" href="' + imageUrl + '" />');
      processedImages.add(imageUrl);
    }
  });

  return linkTags.join('\n');
}

export const CometSSRPreloadImageCollection = {
  addImage,
  clearImageCollection,
  imagesToHTMLLinkString,
};
