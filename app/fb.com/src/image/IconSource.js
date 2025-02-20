export class IconSource {
  /**
   *
   * @param {string} $$typeof
   * @param {import("../base-image/types").SpritedImage} src
   * @param {number} size
   */
  constructor($$typeof, src, size) {
    this.$$typeof = 'fb.iconsource';
    this.src = src;
    this.size = size;
  }
}
