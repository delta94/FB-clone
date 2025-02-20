import React, { Fragment, useLayoutEffect, useRef } from 'react';

import { gkx } from '@fb-utils/gkx';
import { useCometDisplayTimingTrackerForInteraction, useFadeEffect, useTooltipDelayedContent } from '@fb-hooks';

import { BaseContextualLayer } from '@fb-dialog/BaseContextualLayer';
import { BaseTooltipContainer } from './BaseTooltipContainer';
import { CometHeroInteractionContextPassthrough } from '@fb-placeholder/CometHeroInteractionContextPassthrough';
import { CometPlaceholder } from '@fb-placeholder/CometPlaceholder';
import { html } from 'react-strict-dom';

const contextualLayerStyle = {
  pointerEvents: 'x47corl',
  contextualLayer: {},
  loadingState: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export function ContextualLayerRepositioner({ contextualLayerRef }) {
  useLayoutEffect(() => {
    const layer = contextualLayerRef.current;
    console.log('🚀 ~ useLayoutEffect ~ layer:', layer);
    if (layer) {
      layer.reposition({ autoflip: true });
    }
  }, [contextualLayerRef]);

  return null;
}

ContextualLayerRepositioner.displayName = 'ContextualLayerRepositioner [from 98]';

export const BaseTooltipImpl = ({
  loadingState,
  contentKey,
  delayContentMs = 0,
  headline,
  id,
  isVisible,
  themeWrapper: ThemeWrapper = Fragment,
  tooltip,
  tooltipTheme,
  xstyle,
  ...rest
}) => {
  const contextualLayerRef = useRef(null);
  const [shouldRender, shouldFadeIn, ref] = useFadeEffect(isVisible);
  console.log('🚀 ~ shouldRender:', shouldRender);
  const timingTrackerRef = useCometDisplayTimingTrackerForInteraction('ToolTip');
  const { isPending } = useTooltipDelayedContent({
    delayContentMs,
    isVisible,
  });
  console.log('🚀 ~ isPending:', isPending);
  const isFeatureEnabled = false;

  if (!tooltip || !shouldRender) return null;

  return (
    <CometHeroInteractionContextPassthrough clear>
      <BaseContextualLayer
        align="middle"
        imperativeRef={contextualLayerRef}
        ref={timingTrackerRef}
        xstyle={!isFeatureEnabled && contextualLayerStyle.contextualLayer}
        {...rest}
      >
        <ThemeWrapper>
          <BaseTooltipContainer id={id} ref={ref} shouldFadeIn={shouldFadeIn} xstyle={xstyle}>
            {isPending ? (
              <html.div style={contextualLayerStyle.loadingState}>{loadingState}</html.div>
            ) : (
              <CometPlaceholder fallback={loadingState}>
                <ContextualLayerRepositioner contextualLayerRef={contextualLayerRef} />
                {typeof tooltip === 'string' ? <html.span>{tooltip}</html.span> : tooltip}
              </CometPlaceholder>
            )}
          </BaseTooltipContainer>
        </ThemeWrapper>
      </BaseContextualLayer>
    </CometHeroInteractionContextPassthrough>
  );
};

BaseTooltipImpl.displayName = 'BaseTooltipImpl [from 98]';
