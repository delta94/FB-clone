/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import UserAgent from 'fbjs/lib/UserAgent';

const getFontFamily = () => {
  let fontFamily = 'Arial, sans-serif';

  if (
    UserAgent.isPlatform('iOS >= 9') ||
    (UserAgent.isPlatform('Mac OS X >= 10.11') && !UserAgent.isBrowser('Firefox < 55'))
  ) {
    fontFamily = UserAgent.isBrowser('Chrome 81 - 82')
      ? '"SF Pro Text", "SF UI Text", -apple-system, Arial, sans-serif'
      : '-apple-system, system-ui, BlinkMacSystemFont, Arial, sans-serif';
  } else if (UserAgent.isPlatform('Chrome OS')) {
    fontFamily = 'Roboto, Arial, sans-serif';
  }

  return fontFamily;
};

const FONT_FAMILY = getFontFamily();
const LETTER_SPACING = 'normal';

export { FONT_FAMILY, LETTER_SPACING };
