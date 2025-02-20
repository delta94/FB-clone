/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { unstable_Scope as UnstableScope, useInsertionEffect, useMemo, useRef, useState } from 'react';
import { ReactFocusEvent } from '@fb-event-interaction/ReactFocusEvent';

/**
 *
 * @param {import("./types").FocusWithinHandlerStrictModeProps} props
 */
export function FocusWithinHandlerStrictMode({
  onBlurWithin,
  onFocusChange,
  onFocusVisibleChange,
  onFocusWithin,
  children,
  testOnly,
}) {
  const ref = useRef(null);

  const [isFocus, setFocus] = useState(testOnly?.focus ?? false);
  console.log('🚀 ~ isFocus:', isFocus);
  const [isFocusVisible, setFocusVisible] = useState(testOnly?.focusVisible ?? false);

  const focusWithinStrictMode = ReactFocusEvent.useFocusWithinStrictMode(
    useMemo(() => {
      return {
        onBlurWithin: (e) => {
          console.log('🚀 ~ onBlurWithin ~ e:', e);
          if (onBlurWithin && isFocus) {
            onBlurWithin(e);
          }
        },
        onFocusWithin: (e) => {
          console.log('🚀 ~ onFocusWithin ~ e:', e);
          if (onFocusWithin && !isFocus) {
            onFocusWithin(e);
          }
        },
        onFocusWithinChange: onFocusChange
          ? (e) => {
              console.log('🚀 ~ onFocusWithinChange ~ e:', e);
              setFocus(e);
              onFocusChange(e);
            }
          : setFocus,
        onFocusWithinVisibleChange: onFocusVisibleChange
          ? (e) => {
              console.log('🚀 ~ onFocusWithinVisibleChange ~ e:', e);
              setFocusVisible(e);
              onFocusVisibleChange(e);
            }
          : setFocusVisible,
      };
    }, [isFocus, onBlurWithin, onFocusChange, onFocusVisibleChange, onFocusWithin]),
  );

  useInsertionEffect(() => {
    focusWithinStrictMode(ref.current);
    return () => {
      focusWithinStrictMode(null);
    };
  }, [ref, focusWithinStrictMode]);

  return (
    <UnstableScope ref={ref}>
      {typeof children === 'function' ? children(isFocus, isFocusVisible) : children}
    </UnstableScope>
  );
}
