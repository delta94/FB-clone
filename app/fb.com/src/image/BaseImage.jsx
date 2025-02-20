/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/**
 * Changelog:
 * - 08/01/2025
 */

import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import { RecoverableViolationWithComponentStack } from '@fb-error/RecoverableViolationWithComponentStack';
import { mergeRefs } from '@fb-utils/mergeRefs';
import stylex from '@stylexjs/stylex';
import executionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import { CometSSRPreloadImageCollection } from './CometSSRPreloadImageCollection';

const styles = stylex({
  contain: {
    objectFit: 'contain',
  },
  cover: {
    objectFit: 'cover',
  },
  fill: {
    objectFit: 'fill',
  },
});

// 080125
/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").BaseImageProps>
 */
const _BaseImage = (props, ref) => {
  const {
    alt = '',
    'aria-labelledby': al,
    elementtiming,
    objectFit = 'fill',
    onLoad,
    referrerPolicy = 'origin-when-cross-origin',
    sizes,
    src,
    srcSet,
    // eslint-disable-next-line no-unused-vars
    testid,
    xstyle,
    ...rest
  } = props;

  const imageRef = useRef(null);
  const combinedRef = useMemo(() => {
    return mergeRefs(imageRef, ref);
  }, [imageRef, ref]);

  // Add image to SSR preload collection if in a server environment
  if (!executionEnvironment.canUseDOM && src) {
    CometSSRPreloadImageCollection.addImage(src);
  }

  useEffect(() => {
    if (onLoad && imageRef.current?.complete) {
      onLoad();
    }
  }, [onLoad]);

  // Handle case of missing or empty src
  if (!src) {
    return (
      <RecoverableViolationWithComponentStack errorMessage="Invalid src provided to image" projectName="comet_ui" />
    );
  }

  return (
    <img
      {...rest}
      alt={alt}
      aria-labelledby={al}
      className={stylex(styles[objectFit], xstyle)}
      // eslint-disable-next-line react/no-unknown-property
      elementtiming={elementtiming}
      onLoad={onLoad}
      ref={combinedRef}
      referrerPolicy={referrerPolicy}
      sizes={sizes}
      src={src}
      srcSet={srcSet}
    />
  );
};

export const BaseImage = forwardRef(_BaseImage);

BaseImage.displayName = 'BaseImage.react';
