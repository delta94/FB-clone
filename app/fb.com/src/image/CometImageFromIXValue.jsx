/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from 'react';
import { RecoverableViolationWithComponentStack } from '@fb-error/RecoverableViolationWithComponentStack';
import { CometVisualCompletionAttributes } from '@fb-utils/CometVisualCompletionAttributes';
import { testID } from '@fb-utils/testID';
import { xplatToDOMRef } from '@fb-utils/‎xplatToInputRef';
import stylex from '@stylexjs/stylex';

import { BaseImage } from './BaseImage';
import { coerceImageishSprited } from './coerceImageishSprited';
import { coerceImageishURL } from './coerceImageishURL';
import { CometSSRBackgroundImageUtils } from './CometSSRBackgroundImageUtils';

// 080125
const _CometImageFromIXValue = (props, ref) => {
  const { alt = '', isDecorative, objectFit, source, testid, xstyle } = props;

  CometSSRBackgroundImageUtils.processSpritedImagesForSSRPreload(source);

  const spriteImageish = coerceImageishSprited(source);

  if (spriteImageish) {
    const classes = stylex(xstyle);

    return (
      <i
        {...CometVisualCompletionAttributes.CSS_IMG}
        {...testID(testid)}
        aria-label={alt === '' ? null : alt}
        aria-hidden={isDecorative}
        className={
          spriteImageish.type === 'css'
            ? classes !== ''
              ? String(spriteImageish.className) + classes
              : spriteImageish.className
            : classes
        }
        ref={ref}
        role={alt === '' ? null : 'img'}
        style={spriteImageish.type === 'cssless' ? spriteImageish.style : undefined}
      />
    );
  }

  const imageOption = coerceImageishURL(source);

  if (imageOption) {
    const { height, width, uri } = imageOption;

    return (
      <BaseImage
        alt={alt}
        draggable={false}
        height={objectFit === 'cover' ? '100%' : height}
        isDecorative={isDecorative}
        objectFit={objectFit}
        ref={xplatToDOMRef.xplatToDOMRef(ref)}
        src={uri}
        testid={undefined}
        width={objectFit === 'cover' ? '100%' : width}
        xstyle={xstyle}
      />
    );
  }

  return (
    <RecoverableViolationWithComponentStack
      errorMessage="asset provided to CometImageFromIXValue cannot be transformed by Haste"
      projectName="comet_ui"
    />
  );
};

export const CometImageFromIXValue = forwardRef(_CometImageFromIXValue);

CometImageFromIXValue.displayName = 'CometImageFromIXValue.react';
