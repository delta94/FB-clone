import React, { useMemo } from 'react';
import stylex from '@stylexjs/stylex';

import { CometMainContentWrapper } from './CometMainContentWrapper';
import { CometMainRoute } from './CometMainRoute';

const styles = stylex.create({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'inherit',
    position: 'relative',
    zIndex: 0,
  },
  contentContainerHidden: {
    display: 'none',
  },
  contentContainerVisibilityHidden: {
    visibility: 'hidden',
  },
  contentContainerWithNegativeMarginBottom: {
    marginBottom: 'calc(-100vh + var(--headerr-height))',
  },
});

export const CometAppMainContentAreaRenderer = ({
  disableNavigationScrollReset = false,
  disableNegativeMarginBottom = false,
  headerHeight,
  scrollKeyPrefix = undefined,
  shouldRenderTopNav = true,
  shouldUseDvhMinHeight = false,
  children,
}) => {
  const o = useMemo(() => {
    return function (a, b) {
      // "CometVisualCompletion".setInitialScrollY(b);
    };
  }, []);

  return (
    <CometMainContentWrapper
      disableNavigationScrollReset={disableNavigationScrollReset}
      headerHeight={headerHeight}
      onInitialScroll={o}
      shouldRenderTopNav={shouldRenderTopNav}
      shouldUseDvhMinHeight={shouldUseDvhMinHeight}
    >
      <CometMainRoute
        contentXStyleProvider={({ isHidden, tabVisibilityHidden }) => {
          return [
            styles.contentContainer,
            !disableNegativeMarginBottom && styles.contentContainerWithNegativeMarginBottom,
            isHidden && tabVisibilityHidden !== !0 && styles.contentContainerHidden,
            isHidden && tabVisibilityHidden === !0 && styles.contentContainerVisibilityHidden,
          ];
        }}
      >
        {children}
      </CometMainRoute>
    </CometMainContentWrapper>
  );
};
