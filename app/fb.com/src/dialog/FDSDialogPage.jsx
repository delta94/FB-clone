import React from 'react';
import { BaseHeadingContextWrapper } from '@fb-contexts';
import { BaseScrollableArea } from '@fb-dump/BaseScrollableArea';
import { FDSGradientBorderContainer } from '@fb-dump/FDSGradientBorderContainer';
import { FocusInertRegion } from '@fb-focus/FocusInertRegion';
import { tabbableScopeQuery } from '@fb-focus/focusScopeQueries';
import { useFDSDialogPageHeightStyle } from '@fb-hooks';
import { html } from 'react-strict-dom';

const MOBILE_MEDIA_QUERY = '@media (max-width: 679px)';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: '50px',
  },
  inert: {
    pointerEvents: 'none',
    userSelect: 'none',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    maxHeight: {
      default: 'max-height: calc(100vh - (2 * var(--dialog-anchor-vertical-padding)))',
      [MOBILE_MEDIA_QUERY]: 'none',
    },
    position: 'relative',
  },
  rootFullAndMinHeight: {
    minHeight: {
      default: 'calc(100vh - (2 * var(--dialog-anchor-vertical-padding)))',
      [MOBILE_MEDIA_QUERY]: '100vh',
    },
  },
  rootFullHeight: {
    minHeight: 'calc(100vh - (2 * var(--dialog-anchor-vertical-padding)))',
  },
  rootMinHeight: {
    minHeight: '100vh',
  },
  scrollableArea: {
    flexGrow: 1,
    overscrollBehaviorY: 'auto',
  },
};

export const FDSDialogPage = (props) => {
  const {
    children,
    disablePageScroll = false,
    footer,
    header,
    isContentInert = false,
    isFullHeightByDefault = false,
    mobileFullHeight = true,
    pageXStyle,
    scrollAreaRef,
  } = props;

  // Get a hook-based style for page height.
  const pageHeightStyle = useFDSDialogPageHeightStyle();

  // Combine the base container style with inert styling (if content is inert).
  const containerStyle = [styles.container, isContentInert ? styles.inert : null];

  // Wrap the children in a div using the combined container style.
  const contentDiv = <html.div style={containerStyle}>{children}</html.div>;

  // Wrap the content in a FocusInertRegion.
  // When content is not inert, disable the inert behavior.
  const focusRegion = (
    <FocusInertRegion disabled={!isContentInert} focusQuery={tabbableScopeQuery}>
      {contentDiv}
    </FocusInertRegion>
  );

  // Compute additional root styling based on full-height settings.
  const rootFull = isFullHeightByDefault ? styles.rootFullHeight : undefined;
  const rootMin = mobileFullHeight && children != null ? styles.rootMinHeight : undefined;
  const rootFullAndMin =
    isFullHeightByDefault && mobileFullHeight && children != null ? styles.rootFullAndMinHeight : undefined;

  // Combine all style pieces for the outer container.
  const outerStyle = [styles.root, rootFull, rootMin, rootFullAndMin, pageHeightStyle, pageXStyle];

  // If children exist, wrap focusRegion in a scrollable area unless page scrolling is disabled.
  const bodyContent =
    children != null ? (
      disablePageScroll ? (
        <BaseHeadingContextWrapper>{focusRegion}</BaseHeadingContextWrapper>
      ) : (
        <BaseScrollableArea
          horizontal={false}
          ref={scrollAreaRef}
          vertical={true}
          withBottomShadow={true}
          withTopShadow={true}
          xstyle={styles.scrollableArea}
        >
          {focusRegion}
        </BaseScrollableArea>
      )
    ) : null;

  return (
    <FDSGradientBorderContainer>
      <html.div style={outerStyle}>
        {header}
        {bodyContent}
        {footer}
      </html.div>
    </FDSGradientBorderContainer>
  );
};
