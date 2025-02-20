import { isBrowser } from 'fbjs/lib/UserAgent';

export const CSSUserAgentSupports = {
  webkitLineClamp: () => isBrowser('IE') || isBrowser('Edge < 17') || isBrowser('Firefox < 68'),
};
