let facebookRegex = null;
const allowedProtocols = ['http', 'https'];

export const isFacebookURI = (uri) => {
  if (!facebookRegex) {
    facebookRegex = /(^|\.)facebook\.com$/i;
  }
  if (uri.isEmpty() && uri.toString() !== '#') {
    return false;
  }
  if (!uri.getDomain() && !uri.getProtocol()) {
    return true;
  }
  return allowedProtocols.includes(uri.getProtocol()) && facebookRegex.test(uri.getDomain());
};

isFacebookURI.setRegex = (regex) => {
  facebookRegex = regex;
};
