/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, useMemo, useRef } from 'react';
import { mergeRefs } from '@fb-utils/mergeRefs';
import { xplatToDOMRef } from '@fb-utils/‎xplatToInputRef';

import { BaseImage } from './BaseImage';
import { CometImageFromIXValue } from './CometImageFromIXValue';

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").CometImageProps>
 */
const _CometImage = (props, ref) => {
  const {
    alt,
    objectFit,
    onError,
    onLoad,
    sizes,
    src,
    srcSet,
    // eslint-disable-next-line no-unused-vars
    testid,
    xstyle,
    ...rest
  } = props;

  const f = useRef(null);
  const g = useMemo(() => {
    return mergeRefs(f, ref);
  }, [f, ref]);

  const t = undefined;

  if (typeof src === 'string') {
    return (
      <BaseImage
        {...rest}
        alt={alt}
        elementtiming={t}
        objectFit={objectFit}
        onError={onError}
        onLoad={onLoad}
        ref={xplatToDOMRef.xplatToDOMRef(g)}
        sizes={sizes}
        src={src}
        srcSet={srcSet}
        testid={undefined}
        xstyle={xstyle}
      />
    );
  }

  return (
    <CometImageFromIXValue alt={alt} objectFit={objectFit} ref={g} source={src} testid={undefined} xstyle={xstyle} />
  );
};

export const CometImage = forwardRef(_CometImage);

CometImage.displayName = 'CometImage';
