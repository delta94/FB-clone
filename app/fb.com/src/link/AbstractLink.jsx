/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from 'react';

import { isTruthy } from '@fb-utils/isTruthy';

// import { /* getMode, */ setupDelegation } from "./AbstractLinkLynxMode";
import LynxGeneration from './LynxGeneration';
// import NonFBLinkReferrerProtector from "./NonFBLinkReferrerProtector";

class AbstractLink extends React.Component {
  // componentDidMount() {
  //   if (this.props.dataLnfbMode !== null) {
  //     NonFBLinkReferrerProtector.setupDelegation();
  //   } else if (this.props.isLinkshimSupported) {
  //     setupDelegation();
  //   }
  // }

  render() {
    const {
      href,
      linkRef,
      shimhash,
      nofollow,
      noreferrer,
      rel,
      // isSafeToSkipShim,
      // dataLnfbMode,
      // isLinkshimSupported,
      ...otherProps
    } = this.props;

    let linkHref = href;
    let linkRel = rel;
    // let dataSigil = null;
    // let dataLynxMode = null;
    // let dataLnfbModeAttr = null;

    if (shimhash !== null) {
      linkHref = LynxGeneration.getShimmedHref(href, shimhash || '');
      // const mode = getMode(isSafeToSkipShim);
      // dataLynxMode = mode[0];
      // dataSigil = mode[1];
    }

    if (nofollow) {
      linkRel = isTruthy(linkRel) ? `${linkRel} nofollow` : 'nofollow';
    }

    if (noreferrer) {
      linkRel = isTruthy(linkRel) ? `${linkRel} noreferrer` : 'noreferrer';
    }

    // if (isTruthy(dataLnfbMode)) {
    //   dataLnfbModeAttr = dataLnfbMode;
    // }

    return (
      <a
        {...otherProps}
        href={linkHref.toString() || null}
        rel={linkRel}
        ref={linkRef}
        // data-sigil={dataSigil}
        // data-lynx-mode={dataLynxMode}
        // data-lnfb-mode={dataLnfbModeAttr}
      />
    );
  }
}

export default AbstractLink;
