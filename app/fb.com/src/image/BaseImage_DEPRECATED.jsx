import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import { RecoverableViolationWithComponentStack } from '@fb-error/RecoverableViolationWithComponentStack';
import { CometVisualCompletionAttributes } from '@fb-utils/CometVisualCompletionAttributes';
import { mergeRefs } from '@fb-utils/mergeRefs';
import joinClasses from 'fbjs/lib/joinClasses';

import { coerceImageishSprited } from './coerceImageishSprited';
import { coerceImageishURL } from './coerceImageishURL';
import { CometSSRBackgroundImageUtils } from './CometSSRBackgroundImageUtils';

/**
 * Checks if the provided value is a non-empty string and not equal to '[object Object]'.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is a valid string, false otherwise.
 */
function isValidStringValue(value) {
  return value && typeof value === 'string' && value !== '' && value !== '[object Object]';
}

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").BaseImage_DEPRECATEDProps>
 */
export const BaseImage_DEPRECATED = forwardRef((props, ref) => {
  // eslint-disable-next-line no-unused-vars
  const { alt, testid, ...rest } = props;

  const onLoad = rest.onLoad;

  const src = rest.src;

  const imageRef = useRef(null);

  const internalRef = useMemo(() => {
    // eslint-disable-next-line react-compiler/react-compiler
    return mergeRefs(imageRef, ref);
  }, [imageRef, ref]);

  CometSSRBackgroundImageUtils.processSpritedImagesForSSRPreload(src);

  const imageType = coerceImageishSprited(src);

  const imageOption = coerceImageishURL(src);

  useEffect(() => {
    if (
      onLoad &&
      imageRef.current instanceof HTMLImageElement &&
      (!imageRef.current ? undefined : imageRef.current.complete)
    ) {
      onLoad();
    }

    //   var a;
    // onLoad &&
    //   p.current instanceof HTMLImageElement &&
    //   ((a = p.current) == null ? undefined : a.complete) &&
    //   onLoad();
  }, [onLoad, src]);

  if (imageOption && imageOption.uri) {
    if (!isValidStringValue(imageOption.uri)) {
      return (
        <RecoverableViolationWithComponentStack
          errorMessage="Invalid src provided as imageish uri"
          projectName="comet_ui"
        />
      );
    } else {
      return (
        <img
          {...rest}
          alt={alt ? src : ''}
          data-testid={undefined}
          height={rest.height ?? imageOption.height}
          ref={internalRef}
          src={imageOption.uri}
          width={rest.width ?? imageOption.width}
        />
      );
    }
  } else if (imageType) {
    // eslint-disable-next-line no-unused-vars
    const { height, src, style, width, ...restImageTypeProps } = rest;

    return (
      <i
        {...CometVisualCompletionAttributes.CSS_IMG}
        {...restImageTypeProps}
        aria-label={alt === '' ? null : alt}
        className={joinClasses(rest.className, imageType.type === 'css' ? imageType.className : undefined)}
        data-testid={undefined}
        ref={internalRef}
        role={alt === '' ? null : 'img'}
        style={imageType.type === 'cssless' ? { ...style, ...imageType.style } : style}
      />
    );
  }

  if (!isValidStringValue(src)) {
    return (
      <RecoverableViolationWithComponentStack errorMessage="Invalid src provided to image" projectName="comet_ui" />
    );
  }

  return (
    <img
      {...rest}
      alt={alt ? imageType : ''}
      data-testid={undefined}
      // eslint-disable-next-line react/no-unknown-property
      elementtiming={undefined}
      onLoad={onLoad}
      ref={internalRef}
      src={src}
    />
  );
});
