import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { useStable } from '@fb-hooks';
import executionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import { CometSSRHydrationMarkerUtils } from './CometSSRHydrationMarkerUtils';
import { CometSuspenseHUD } from './CometSuspenseHUD';
import { HeroPlaceholder } from './HeroPlaceholder';

const UseLayoutEffectCallback = ({ cb }) => {
  const hasCallbackBeenCalled = useRef(false);
  useLayoutEffect(() => {
    if (!hasCallbackBeenCalled.current) {
      cb();
      hasCallbackBeenCalled.current = true;
    }
  });
  return null;
};

// eslint-disable-next-line no-unused-vars
const _1863055 = false;

const useCometPlaceholderImpl = (props) => {
  const { children, fallback, name, unstable_avoidThisFallback, unstable_onSuspense } = props;

  let element = useStable(() => {
    return CometSuspenseHUD && executionEnvironment.canUseDOM ? window.document.createElement('div') : null;
  });

  const fallbackCounter = useRef(0);
  const currentContent = useRef(null);
  const isPlaceholderActive = useRef(false);

  let _children = children;
  let _fallback = fallback;

  if (CometSSRHydrationMarkerUtils.addMarkersToChildren && CometSSRHydrationMarkerUtils.addMarkersToFallback) {
    _children = CometSSRHydrationMarkerUtils.addMarkersToChildren(_children);
    _fallback = CometSSRHydrationMarkerUtils.addMarkersToFallback(_fallback);
  }

  const onSuspense = useCallback(
    (content) => {
      if (element) {
        // eslint-disable-next-line react-compiler/react-compiler
        element.textContent = content;
      }
      currentContent.current = content;
      unstable_onSuspense && unstable_onSuspense(content);
    },
    [element, unstable_onSuspense],
  );

  let CometSuspenseHUDComponent = null;

  if (element && CometSuspenseHUD) {
    CometSuspenseHUDComponent = <CometSuspenseHUD desc={element} />;
  }

  let fallbackCallback = useCallback(() => {
    fallbackCounter.current += 1;
    // _1863055 &&
    //   t.current &&
    //   r.current <= o &&
    //   n.onReady(function (a) {
    //     a.log(function () {
    //       return {
    //         event: 'unexpected_suspense',
    //         is_backup_placeholder: i === !0,
    //         placeholder_name: g,
    //         promise_name: s.current,
    //         suspense_count: String(r.current),
    //       }
    //     })
    //   })
  }, [name, unstable_avoidThisFallback]);
  const placeholderCallback = useCallback(() => {
    isPlaceholderActive.current = true;
  }, []);

  return (
    <HeroPlaceholder
      fallback={
        <>
          {_fallback}
          <UseLayoutEffectCallback cb={fallbackCallback} />
          {CometSuspenseHUDComponent}
        </>
      }
      name={name}
      unstable_avoidThisFallback={unstable_avoidThisFallback}
      unstable_onSuspense={onSuspense}
    >
      <UseLayoutEffectCallback cb={placeholderCallback} />
      {_children}
    </HeroPlaceholder>
  );

  // return jsxs(HeroPlaceholder, {
  //   children: [
  //     jsx(useLayoutEffectCallback, {
  //       cb: placeholderCallback,
  //     }),
  //     _children,
  //   ],
  //   fallback: jsxs(React.Fragment, {
  //     children: [
  //       _fallback,
  //       jsx(useLayoutEffectCallback, {
  //         cb: fallbackCallback,
  //       }),
  //       CometSuspenseHUDComponent,
  //     ],
  //   }),
  //   name,
  //   unstable_avoidThisFallback,
  //   unstable_onSuspense: onSuspense,
  // });
};

export { useCometPlaceholderImpl };
