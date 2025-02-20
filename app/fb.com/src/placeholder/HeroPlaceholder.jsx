import React, { Suspense, useContext, useLayoutEffect, useRef } from 'react';
import { HeroInteractionContext, HeroInteractionIDContext } from '@fb-contexts';
import { useStable } from '@fb-hooks';

import { HeroFallbackTracker } from './HeroFallbackTracker';
import { HeroPlaceholderUtils } from './HeroPlaceholderUtils';

/**
 * Component lifecycle callback for performing an action once during layout effect.
 *
 * @param {object} props - The component props.
 * @param {Function} props.cb - The callback function to be executed once.
 * @returns {null} - Returns null.
 */
function PerformLayoutEffectOnce({ cb }) {
  const hasBeenCalled = useRef(false);

  useLayoutEffect(() => {
    if (!hasBeenCalled.current) {
      cb();
      hasBeenCalled.current = true;
    }
  });

  return null;
}

export const HeroPlaceholder = (props) => {
  const { children, fallback, name, unstable_avoidThisFallback, unstable_onSuspense } = props;

  const heroInteractionContextValue = useContext(HeroInteractionContext.Context);
  const heroInteractionIDContextValue = useContext(HeroInteractionIDContext);

  const simpleUUID1 = useStable(HeroPlaceholderUtils.getSimpleUUID);
  const simpleUUID2 = useStable(HeroPlaceholderUtils.getSimpleUUID);

  const ref = useRef(false);

  const childrenClone = children;

  const suspenseCallback = (cbProps) => {
    if (heroInteractionIDContextValue) {
      heroInteractionContextValue.suspenseCallback(
        heroInteractionIDContextValue,
        simpleUUID1,
        heroInteractionContextValue.pageletStack,
        cbProps,
        name ? name : 'Unnamed Suspense',
      );
    }

    if (unstable_onSuspense) {
      const thenableDescription = HeroPlaceholderUtils.createThenableDescription(cbProps);

      unstable_onSuspense(thenableDescription ? thenableDescription : '');
    }
  };

  useLayoutEffect(() => {
    if (ref.current === false && heroInteractionIDContextValue && heroInteractionIDContextValue) {
      heroInteractionContextValue.hold(
        heroInteractionIDContextValue,
        heroInteractionContextValue.pageletStack,
        'Hydration',
        simpleUUID2,
        name,
      );

      return () => {
        return heroInteractionContextValue.unhold(heroInteractionIDContextValue, simpleUUID2);
      };
    }
  }, [heroInteractionContextValue, heroInteractionIDContextValue, name, simpleUUID2]);

  const onHydrationComplete = function () {
    ref.current = true;

    if (heroInteractionIDContextValue) {
      heroInteractionContextValue.unhold(heroInteractionIDContextValue, simpleUUID2);
    }
  };

  return (
    <Suspense
      fallback={
        <>
          {fallback}
          <PerformLayoutEffectOnce cb={onHydrationComplete} />
          <HeroFallbackTracker uuid={simpleUUID1} />
        </>
      }
      suspenseCallback={suspenseCallback}
      unstable_avoidThisFallback={unstable_avoidThisFallback}
    >
      <PerformLayoutEffectOnce cb={onHydrationComplete} />
      {childrenClone}
    </Suspense>
  );
};

HeroPlaceholder.displayName = 'HeroPlaceholder';
