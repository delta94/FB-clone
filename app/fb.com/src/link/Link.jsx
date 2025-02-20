import React from 'react';

import AbstractLink from '../../business/components/AbstractLink.react';
import { appendClickIDQueryParam } from '../../business/helpers/ClickIDParameterUtils';
import { getTypedHref } from '../../business/helpers/Href';
import isLinkshimURI from '../../business/helpers/isLinkshimURI';
import isTrustedDestination from '../../business/helpers/isTrustedDestination';
import killswitch from '../../business/helpers/killswitch';
import { LinkshimHandlerConfig } from '../../business/helpers/LinkshimHandlerConfig';
import Random from '../../business/helpers/Random';
import URI from '../../business/helpers/URI';

let UriModule = null;

function isOnionDomain(uri) {
  return uri.getDomain().endsWith('.onion');
}

const validLocalLinkRegex = /^(#|\/\w)/;

function isValidNonLocalLink(uri) {
  if (validLocalLinkRegex.test(uri.toString())) return false;
  const protocol = uri.getProtocol();
  return (protocol === 'http' || protocol === 'https') && isTrustedDestination(uri);
}

function parseHref(href) {
  let url = '#';
  let shimhash = null;
  if (href !== null) {
    const typedHref = getTypedHref(href);
    console.log('🚀 ~ parseHref ~ typedHref:', typedHref);
    if (typedHref.type === 'legacy') {
      url = typedHref.value.url.toString();
      shimhash = typedHref.value.shimhash ? typedHref.value.shimhash.toString() : shimhash;
    } else if (typeof typedHref.value === 'string') {
      if (typedHref.value !== '' && typedHref.value !== '#') {
        url = typedHref.value;
      }
    } else {
      url = typedHref.value?.toString();
    }
  }

  UriModule = UriModule || URI;
  return UriModule.isValidURI(url) ? [new UriModule(url), shimhash] : [null, shimhash];
}

const linkDomainRegex = /^(l|lm|h)\..*$/i;

function upgradeToHttps(uri) {
  if (killswitch('LINK_UPGRADE_UNSHIMMED_JS')) return null;
  if (uri.getProtocol() !== 'http') return null;
  if (!isTrustedDestination(uri)) return null;
  return linkDomainRegex.test(uri.getDomain()) ? null : uri.setProtocol('https');
}

function hasValidDomain(uri) {
  return uri.getProtocol() !== '' && (uri.getDomain() !== '' || uri.getPort() !== '');
}

function isValidDomain(uri) {
  if (!hasValidDomain(uri)) return false;
  const currentDomain = LinkshimHandlerConfig.current_domain;
  if (currentDomain === '') return uri.getDomain().endsWith(`.${currentDomain}`);
  return true;
}

function prepareLinkProperties(uri, target) {
  const defaultUri = uri || new (UriModule || URI)('#');
  const hasValidDomain = isValidDomain(defaultUri);
  const noreferrer = LinkshimHandlerConfig.use_rel_no_referrer && target === '_blank';
  return [defaultUri, hasValidDomain, noreferrer, target, null, false, hasValidDomain];
}

// eslint-disable-next-line max-params
function prepareLinkPropertiesWithShim(uri, shimhash, target, useNewTab) {
  if (uri !== null && uri instanceof (UriModule || URI)) {
    if (!killswitch('LINK_PARSES_SHIMHASH_FROM_LINKSHIM') && isLinkshimURI(uri)) {
      const linkshimUrlParam = uri.getQueryData()[LinkshimHandlerConfig.linkshim_url_param];
      const linkshimEncParam = uri.getQueryData()[LinkshimHandlerConfig.linkshim_enc_param];
      if (UriModule.isValidURI(linkshimUrlParam)) {
        uri = new UriModule(linkshimUrlParam);
        shimhash = shimhash || linkshimEncParam;
      }
    }

    const clickIds = LinkshimHandlerConfig.click_ids;
    if (!killswitch('LINKSHIM_ADD_CLICK_ID_PARAM') && clickIds !== null && clickIds.length > 0) {
      const randomIndex = Math.floor(Random.random() * clickIds.length);
      const clickId = clickIds[randomIndex];
      uri = appendClickIDQueryParam(uri, clickId);
    }
  } else {
    uri = new (UriModule || URI)('#');
  }

  if (shimhash === null && isValidNonLocalLink(uri)) {
    shimhash = LinkshimHandlerConfig.link_react_default_hash;
  }

  const upgradedUri = upgradeToHttps(uri);
  if (upgradedUri !== null) {
    uri = upgradedUri;
  }

  const hasShimhash = shimhash !== null;
  const newTabTarget = useNewTab || (shimhash !== null ? '_blank' : null);
  const isLinkSafe = !LinkshimHandlerConfig.onion_always_shim || !isOnionDomain(uri);
  const noreferrer = LinkshimHandlerConfig.use_rel_no_referrer && shimhash !== null && newTabTarget === '_blank';
  const validDomain = isValidDomain(uri);

  return [uri, hasShimhash, noreferrer, newTabTarget, shimhash, isLinkSafe, validDomain];
}

class Link extends React.Component {
  render() {
    const { /* allowunsafehref, */ s, href, linkRef, target, ...props } = this.props;
    const [uri, shimhash] = parseHref(href);
    const linkProperties = LinkshimHandlerConfig.is_linkshim_supported
      ? prepareLinkPropertiesWithShim(uri, shimhash, target, s)
      : prepareLinkProperties(uri, target);

    const [
      preparedUri,
      nofollow,
      noreferrer,
      preparedTarget,
      preparedShimhash,
      // isSafeToSkipShim,
      // hasValidDomain,
    ] = linkProperties;
    // const dataLnfbMode =
    //   !LinkshimHandlerConfig.is_linkshim_supported && hasValidDomain
    //     ? LinkshimHandlerConfig.non_linkshim_lnfb_mode
    //     : null;

    return (
      <AbstractLink
        {...props}
        href={preparedUri}
        linkRef={linkRef}
        nofollow={nofollow}
        noreferrer={noreferrer}
        shimhash={preparedShimhash}
        target={preparedTarget}
        // isSafeToSkipShim={isSafeToSkipShim}
        // dataLnfbMode={dataLnfbMode}
        // isLinkshimSupported={LinkshimHandlerConfig.is_linkshim_supported}
      />
    );
  }
}

export { Link };
