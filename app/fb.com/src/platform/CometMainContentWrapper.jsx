import React, { useMemo } from 'react';
import { BaseViewportMarginsContext } from '@fb-contexts/BaseViewportMarginsContext';
import { CometContextualLayerAnchorRoot } from '@fb-dialog/CometContextualLayerAnchorRoot';
import { BaseDocumentScrollView } from './BaseDocumentScrollView';
import { CometPlaceholder } from '@fb-placeholder/CometPlaceholder';
import { gkx } from '@fb-utils/gkx';
import stylex from '@stylexjs/stylex';

import { CometRootContainer } from './CometRootContainer';

const CometAppNavigationConstants = {
  HEADER_HEIGHT: 56,
  MAX_VIEWPORT_WIDTH_GLOBAL_PANEL_EXPANDED: 1099,
  GLOBAL_SERP_PAGE: 'global_serp',
};

export const CometMainContentWrapper = ({
  children,
  headerHeight = CometAppNavigationConstants.HEADER_HEIGHT,
  shouldRenderTopNav = true,
  shouldUseDvhMinHeight = false,
  ...rest
}) => {
  const baseViewportMarginsContextValue = useMemo(() => {
    return {
      bottom: 0,
      left: 0,
      right: 0,
      top: shouldRenderTopNav ? headerHeight : 0,
    };
  }, [headerHeight, shouldRenderTopNav]);

  const fallbackXstyle = gkx[22787]
    ? shouldRenderTopNav
      ? styles.innerWithTopNavWithFirstThatWorks
      : styles.innerHiddenTopNavWithFirstThatWorks
    : undefined;

  const xstyle = !gkx[22787]
    ? [
        shouldRenderTopNav ? styles.innerWithTopNav : styles.innerHiddenTopNav,
        shouldUseDvhMinHeight
          ? shouldRenderTopNav
            ? styles.innerWithTopNavDvh_LEGACY
            : styles.innerHiddenTopNavDvh_LEGACY
          : undefined,
      ]
    : undefined;

  //  var i = k(c("CometRouterUIComponentContext"));
  //  i = i.FallbackRoot;
  // const i = undefined;

  return (
    <BaseDocumentScrollView {...rest}>
      <CometRootContainer>
        <BaseViewportMarginsContext.Provider value={baseViewportMarginsContextValue}>
          <div className={stylex(styles.base, fallbackXstyle, xstyle)}>
            <CometContextualLayerAnchorRoot>
              <CometPlaceholder fallback={<div />}>{children}</CometPlaceholder>
            </CometContextualLayerAnchorRoot>
          </div>
        </BaseViewportMarginsContext.Provider>
      </CometRootContainer>
    </BaseDocumentScrollView>
  );
};

const styles = stylex.create({
  base: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  innerHiddenTopNav: {
    minHeight: '100vh',
    top: 0,
  },
  innerHiddenTopNavDvh: {
    minHeight: {
      default: null,
      '@supports (min-height: 100dvh)': '100dvh',
    },
  },
  innerHiddenTopNavWithFirstThatWorks: {
    minHeight: stylex.firstThatWorks('100vh', '100dvh'),
    top: 0,
  },
  innerWithTopNav: {
    minHeight: 'calc(100vh - var(--headerr-height))',
    top: 'var(--headerr-height)',
  },
  innerWithTopNavDvh: {
    minHeight: {
      default: null,
      '@supports (min-height: 100dvh)': 'calc(100dvh - var(--headerr-height))',
    },
  },
  innerWithTopNavWithFirstThatWorks: {
    minHeight: stylex.firstThatWorks('calc(100vh - var(--headerr-height))', 'calc(100dvh - var(--headerr-height))'),
    top: 'var(--headerr-height)',
  },

  // ==================================================================
  // ==================================================================

  innerWithTopNavDvh_LEGACY: {
    // eslint-disable-next-line @stylexjs/valid-styles
    '@supports (min-height: 100dvh)': {
      minHeight: 'calc(100dvh - var(--headerr-height))',
    },
  },

  innerHiddenTopNavDvh_LEGACY: {
    // eslint-disable-next-line @stylexjs/valid-styles
    '@supports (min-height: 100dvh)': {
      minHeight: '100dvh',
    },
  },
});
