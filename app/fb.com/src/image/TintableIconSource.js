import { IconSource } from './IconSource';

export class TintableIconSource extends IconSource {
  /**
   *
   * @param {string} domain
   * @param {import("../base-image/types").SpritedImage} src
   * @param {number} size
   */
  constructor(domain, src, size) {
    super(domain, src, size);
    this.$$typeof = 'fb.tintableiconsource';
  }
}
