/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, forwardRef, useContext } from 'react';
import { getLoadingStateAriaProps } from '@fb-utils/getLoadingStateAriaProps';
import stylex from '@stylexjs/stylex';

// type BaseLoadingStateElementProps = {
//   children?: ReactNode
//   disableLoadingStateTracker?: boolean
//   isFocusTarget?: boolean
//   progress?: any
//   style?: CSSProperties
//   className?: string
// }

const LoadingContext = createContext(false);

const styles = stylex.create({
  hideOutline: {
    outlineStyle: 'none',
  },
});

export const BaseLoadingStateElement = forwardRef(
  (
    {
      children,
      disableLoadingStateTracker = true,
      isDecorative = false,
      isFocusTarget,
      progress,
      style,
      testid,
      xstyle,
      'aria-label': al,
      'aria-labelledby': alb,
    },
    ref,
  ) => {
    const isLoading = useContext(LoadingContext);

    // const mergedRef = useMemo(() => {
    //   return disableLoadingStateTracker ? ref : mergeRefs(ref);
    // }, [disableLoadingStateTracker, ref]);

    if (isLoading) {
      return (
        <div className={stylex(xstyle)} data-testid={undefined} ref={ref} style={style}>
          {children}
        </div>
      );
    }

    const ariaProps = isDecorative
      ? {
          'aria-hidden': true,
        }
      : getLoadingStateAriaProps(progress, {
          max: 100,
          min: 0,
        });

    return (
      <LoadingContext.Provider value={true}>
        <div
          {...ariaProps}
          aria-label={al ?? ariaProps['aria-label']}
          aria-labelledby={alb}
          className={stylex(styles.hideOutline, xstyle)}
          data-focus-target={isFocusTarget}
          data-testid={undefined}
          ref={ref}
          style={style}
          tabIndex={-1}
        >
          {children}
        </div>
      </LoadingContext.Provider>
    );
  },
);

BaseLoadingStateElement.displayName = 'BaseLoadingStateElement.react';
