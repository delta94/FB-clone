import memoizeStringOnly from 'fbjs/lib/memoizeStringOnly';

import { env } from './env';
import { ifRequired } from './ifRequired';
import { isFacebookURI } from './isFacebookURI';
import memoize from './memoize';
import PHPQuerySerializer from './PHPQuerySerializer';
import PHPQuerySerializerNoEncoding from './PHPQuerySerializerNoEncoding';
import ReloadPage from './ReloadPage';
import unexpectedUseInComet from './unexpectedUseInComet';
import unqualifyURI from './unqualifyURI';
import URIBase from './URIBase';
import { isUriNeedRawQuery } from './UriNeedRawQuerySVChecker';

const getPageTransitions = memoize(() =>
  ifRequired('PageTransitions', (PageTransitions) => (PageTransitions.isInitialized() ? PageTransitions : null)),
);
const getPHPQuerySerializer = memoize(() => PHPQuerySerializer);

class URI extends URIBase {
  constructor(url, options, forceQuerySerializer = false) {
    const querySerializer = isUriNeedRawQuery(url) ? PHPQuerySerializerNoEncoding : getPHPQuerySerializer();
    super(url, querySerializer, options, forceQuerySerializer);
  }

  setPath(path) {
    this.path = path;
    return super.setPath(path);
  }

  getPath() {
    const path = super.getPath();
    return path ? path.replace(/^\/+/, '/') : path;
  }

  setProtocol(protocol) {
    this.protocol = protocol;
    return super.setProtocol(protocol);
  }

  setDomain(domain) {
    this.domain = domain;
    return super.setDomain(domain);
  }

  setPort(port) {
    this.port = port;
    return super.setPort(port);
  }

  setFragment(fragment) {
    this.fragment = fragment;
    return super.setFragment(fragment);
  }

  stripTrailingSlash() {
    this.setPath(this.getPath().replace(/\/$/, ''));
    return this;
  }

  addTrailingSlash() {
    const path = this.getPath();
    if (path.length > 0 && path[path.length - 1] !== '/') {
      this.setPath(`${path}/`);
    }
    return this;
  }

  valueOf() {
    return this.toString();
  }

  getRegisteredDomain() {
    if (!this.getDomain()) return '';
    if (!isFacebookURI(this)) return null;
    const domainParts = this.getDomain().split('.');
    const fbIndex = domainParts.indexOf('facebook');
    if (fbIndex === -1) {
      const wpIndex = domainParts.indexOf('workplace');
      return domainParts.slice(wpIndex).join('.');
    }
    return domainParts.slice(fbIndex).join('.');
  }

  getUnqualifiedURI() {
    return unqualifyURI(new URI(this));
  }

  getQualifiedURI() {
    return new URI(this).qualify();
  }

  isSameOrigin(uri) {
    if (uri === null) uri = memoize(() => new URI(window.location.href))();
    if (!(uri instanceof URI)) {
      uri = new URI(uri.toString());
    }
    return super.isSameOrigin(uri);
  }

  static goURIOnNewWindow(url) {
    URI.goURIOnWindow(url, window.open('', '_blank'), true);
  }

  // eslint-disable-next-line max-params
  static goURIOnWindow(url, targetWindow, usePageTransitions = false, replaceState = false) {
    URI.goURIOnWindowWithReference(url, targetWindow, usePageTransitions, replaceState);
  }

  // eslint-disable-next-line max-params
  static goURIOnWindowWithReference(url, targetWindow, usePageTransitions = false, replaceState = false) {
    const uri = new URI(url);
    const isNewWindow = !targetWindow || targetWindow === window;
    if (env.isCQuick && isFacebookURI(uri) && isNewWindow) {
      const quickParams = {
        cquick: env.iframeKey,
        ctarget: env.iframeTarget,
        cquick_token: env.iframeToken,
      };
      uri.addQueryData(quickParams);
      usePageTransitions = false;
    }
    const newUrl = uri.toString();
    const useCurrentWindow = window.location.href === newUrl && targetWindow === window;
    if (!usePageTransitions && window.PageTransitions) {
      window.PageTransitions.go(newUrl, replaceState);
    } else if (useCurrentWindow) {
      ReloadPage.now();
    } else if (replaceState) {
      targetWindow.location.replace(newUrl);
    } else {
      targetWindow.location.href = newUrl;
    }
    return targetWindow;
  }

  go(targetWindow, usePageTransitions) {
    if (unexpectedUseInComet) {
      unexpectedUseInComet('uri.go');
    }
    URI.go(this, targetWindow, usePageTransitions);
  }

  static tryParseURI(url) {
    const parsed = URIBase.tryParse(url, getPHPQuerySerializer());
    return parsed ? new URI(parsed) : null;
  }

  static isValidURI(url) {
    return URIBase.isValid(url, getPHPQuerySerializer());
  }

  static getRequestURI(usePageTransitions = true, useMostRecent = false) {
    if (usePageTransitions) {
      const pageTransitions = getPageTransitions();
      if (pageTransitions) {
        return pageTransitions.getCurrentURI(!!useMostRecent).getQualifiedURI();
      }
    }
    return new URI(window.location.href);
  }

  static getMostRecentURI() {
    const pageTransitions = getPageTransitions();
    return pageTransitions ? pageTransitions.getMostRecentURI().getQualifiedURI() : new URI(window.location.href);
  }

  static getNextURI() {
    const pageTransitions = getPageTransitions();
    return pageTransitions ? pageTransitions.getNextURI().getQualifiedURI() : new URI(window.location.href);
  }

  static encodeComponent(component) {
    return encodeURIComponent(component).replace(/%5D/g, ']').replace(/%5B/g, '[');
  }

  static decodeComponent(component) {
    return decodeURIComponent(component.replace(/\+/g, ' '));
  }

  static normalize(input) {
    return input !== null && typeof input === 'string' ? URI.normalizeString(input) : new URI(input).toString();
  }
}

URI.go = (url, targetWindow, usePageTransitions) => {
  if (unexpectedUseInComet) {
    unexpectedUseInComet('URI.go');
  }
  URI.goURIOnWindow(url, window, targetWindow, usePageTransitions);
};

URI.normalizeString = memoizeStringOnly((url) => new URI(url).toString());

URI.expression = /(((\w+):\/\/)([^\/:]*)(:(\d+))?)?([^#?]*)(\?([^#]*))?(#(.*))?/;
URI.arrayQueryExpression = /^(\w+)((?:\[\w*\])+)=?(.*)/;

export default URI;
