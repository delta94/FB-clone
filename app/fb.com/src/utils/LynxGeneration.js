import { LinkshimHandlerConfig } from './LinkshimHandlerConfig';
import URI from './URI';

const shimURI = new URI(LinkshimHandlerConfig.linkshim_path).setDomain(LinkshimHandlerConfig.linkshim_host);

const LynxGeneration = {
  getShimURI() {
    return new URI(shimURI);
  },
  getLynxURIProtocol(uri) {
    return LinkshimHandlerConfig.always_use_https ? 'https' : uri.getProtocol() === 'http' ? 'http' : 'https';
  },
  getShimmedHref(href, encParam, options = {}) {
    const uri = new URI(href);
    const protocol = this.getLynxURIProtocol(uri);
    let shimmedURI = this.getShimURI()
      .setQueryData({
        [LinkshimHandlerConfig.linkshim_url_param]: uri.toString(),
        [LinkshimHandlerConfig.linkshim_enc_param]: encParam,
      })
      .setProtocol(protocol);

    const { trackingNodes, callbacks } = options;

    if (trackingNodes && trackingNodes.length) {
      shimmedURI = shimmedURI.addQueryData('__tn__', trackingNodes.join(''));
    }

    if (callbacks && callbacks.length) {
      shimmedURI = shimmedURI.addQueryData('c', callbacks);
    }

    return shimmedURI;
  },
};

export default LynxGeneration;
