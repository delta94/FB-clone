import React, { useContext } from 'react';
import stylex from '@stylexjs/stylex';

// CHANGED
// @Becareful
export const BaseCometModal = ({
  backdropXStyle,
  blockKeyCommands = false,
  children,
  contextKey,
  disableGeoToCometModalsCompatibility_DO_NOT_USE = false,
  hidden = false,
  interactionDesc,
  interactionUUID,
  isOverlayTransparent = false,
  noPortal = false,
  // shouldUseDvhMinHeight = false,
  stackingBehavior = 'auto',
}) => {
  const { hidden: hiddenSubtree } = useContext(HiddenSubtreeContext);

  const interactionUUIDStable = useStable(() => {
    return interactionUUID;
  });

  const modalOverlay = (
    // <VoyageUserJourneyUILayerProvider name="modal">
    <>
      <div className={stylex(styles.mask, !isOverlayTransparent && styles.maskOverlay, backdropXStyle)} />
      <BaseContextualLayerAnchorRoot>
        <FocusRegion.FocusRegion
          autoFocusQuery={focusScopeQueries.headerFirstTabbableSecondScopeQuery}
          autoRestoreFocus
          containFocusQuery={focusScopeQueries.tabbableScopeQuery}
          recoverFocusQuery={focusScopeQueries.headerFirstTabbableSecondScopeQuery}
        >
          {blockKeyCommands ? (
            children
          ) : (
            <CometLayerKeyCommandWrapper debugName="modal layer">{children}</CometLayerKeyCommandWrapper>
          )}
        </FocusRegion.FocusRegion>
      </BaseContextualLayerAnchorRoot>
    </>
    // </VoyageUserJourneyUILayerProvider>
  );

  const stackingBehaviorMode = hiddenSubtree ? 'normal' : stackingBehavior;

  const modalClasses = [
    stackingBehaviorMode === 'auto' ? styles.rootStatic : styles.root,
    hidden && styles.hidden,
    stackingBehaviorMode !== 'auto' && behaviorStyles[stackingBehaviorMode],
  ];

  const modalContent = (
    <BaseDocumentScrollView contextKey={contextKey} hiddenWhenDetached={hidden}>
      <BaseHeadingContext.Provider value={1}>
        {interactionUUIDStable ? (
          <CometHeroInteractionContextPassthrough clear>
            <CometHeroInteractionWithDiv
              interactionDesc={interactionDesc}
              interactionUUID={interactionUUID}
              xstyle={[
                styles.content,
                // shouldUseDvhMinHeight && styles.contentDvh_LEGACY,
                // styles.contentDvhWhenNarrow_LEGACY,
              ]}
            >
              {modalOverlay}
            </CometHeroInteractionWithDiv>
          </CometHeroInteractionContextPassthrough>
        ) : (
          <div
            className={stylex(
              styles.content,
              // shouldUseDvhMinHeight && styles.contentDvh_LEGACY
            )}
          >
            {modalOverlay}
          </div>
        )}
      </BaseHeadingContext.Provider>
    </BaseDocumentScrollView>
  );

  return noPortal ? (
    <BaseThemeProvider
      children={(themeClass, themeVariable) => {
        return (
          <div className={stylex(themeClass, modalClasses)} style={themeVariable}>
            {modalContent}
          </div>
        );
      }}
    />
  ) : (
    <BasePortal hidden={hiddenSubtree} xstyle={modalClasses}>
      {modalContent}
    </BasePortal>
  );
};

const styles = stylex.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
    // eslint-disable-next-line @stylexjs/valid-styles
    '@supports (min-height: 100dvh)': {
      minHeight: '100dvh',
    },
  },
  contentDvh: {
    minHeight: {
      default: null,
      '@supports (min-height: 100dvh)': '100dvh',
    },
  },
  contentDvhWhenNarrow: {
    minHeight: {
      default: null,
      '@media (max-width: 679px)': stylex.firstThatWorks('100vh', '100dvh'),
    },
  },
  hidden: {
    visibility: 'hidden',
  },
  mask: {
    bottom: 0,
    right: 0,
    position: 'fixed',
    left: 0,
    top: 0,
  },
  maskOverlay: {
    backgroundColor: 'var(--overlay-alpha-80)',
  },
  root: {
    position: 'relative',
  },
  rootStatic: {
    position: 'static',
  },

  // ====================================================================
  // ====================================================================

  contentDvh_LEGACY: {
    // eslint-disable-next-line @stylexjs/valid-styles
    '@supports (min-height: 100dvh)': {
      minHeight: '100dvh',
    },
  },

  contentDvhWhenNarrow_LEGACY: {
    // eslint-disable-next-line @stylexjs/valid-styles
    '@media (max-width: 679px)': {
      minHeight: stylex.firstThatWorks('100vh', '100dvh'),
    },
  },

  r1: {
    // x78zum5 xdt5ytf xippug5 xg6iff7 x1n2onr6
    display: 'flex',
    flexDirection: 'column',
  },
});

const behaviorStyles = stylex.create({
  'above-everything': {
    zIndex: 1,
  },
  'above-nav': {
    zIndex: 3,
  },
  normal: {
    zIndex: 0,
  },
});
