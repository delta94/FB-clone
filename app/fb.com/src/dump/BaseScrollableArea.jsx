import React, { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { BasePopoverReflowSheetContext } from '@fb-contexts/BasePopoverReflowSheetContext';
import { BaseScrollableAreaContext } from '@fb-contexts/BaseScrollableAreaContext';
import { useVisibilityObserver } from '@fb-hooks/useVisibilityObserver';
import { CometDebounce } from '@fb-utils/CometDebounce';
import { CometVisualCompletionAttributes } from '@fb-utils/CometVisualCompletionAttributes';
import stylex from '@stylexjs/stylex';
import joinClasses from 'fbjs/lib/joinClasses';
import Locale from 'fbjs/lib/Locale';
import UserAgent from 'fbjs/lib/UserAgent';
import ResizeObserverDeprecated from 'resize-observer-polyfill';

const isRTL = Locale.isRTL();
const isIE11 = false;

export const BaseScrollableArea = forwardRef(
  // eslint-disable-next-line complexity
  (
    {
      children,
      contentRef,
      expanding = false,
      forceBrowserDefault = false,
      hideScrollbar = false,
      horizontal,
      id,
      onScroll,
      onScrollBottom,
      onScrollEnd,
      onScrollTop,
      scrollTracePolicy,
      style,
      tabIndex,
      testid,
      vertical,
      withBottomShadow = false,
      withTopShadow = false,
      xstyle,
      role,
      ...rest
    },
    ref,
  ) => {
    const { isReflowSheet } = useContext(BasePopoverReflowSheetContext);

    const shouldUseDefaultScrolling = useMemo(() => {
      return forceBrowserDefault || !vertical || hideScrollbar || horizontal || shouldUseCustomScrolling();
    }, [forceBrowserDefault, vertical, hideScrollbar, horizontal]);

    const [mouseEnter, setMouseEnter] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [hasScrollTimeout, setHasScrollTimeout] = useState(false);

    const scrollableAreaContext = useContext(BaseScrollableAreaContext);

    const containerRef = useRef(null);
    const scrollerRef = useRef(null);
    const topShadowRef = useRef(null);
    const bottomShadowRef = useRef(null);
    const thumbRef = useRef(null);
    const thumbPositionRef = useRef(0);

    useEffect(() => {
      if (shouldUseDefaultScrolling) {
        return;
      }

      const scrollerElement = scrollerRef.current; // b
      const containerElement = containerRef.current;
      const contentElement = contentRef?.current || containerElement;

      const topShadowRefVal = topShadowRef.current;
      const bottomShadowRefVal = bottomShadowRef.current;

      if (!containerElement || !contentElement || !scrollerElement || !topShadowRefVal || !bottomShadowRefVal) {
        return;
      }

      let thumbHeight = 0; // i
      let containerTopOffset = 0; // j

      // updateShadowsAndThumb
      const updateShadowsAndThumb = () => {
        bottomShadowRefVal.style.display = 'none';
        topShadowRefVal.style.display = 'none';

        const scrollerRect = scrollerElement.getBoundingClientRect(); // a
        const contentRect = contentElement.getBoundingClientRect(); // c

        const scrollerHeight = scrollerElement.scrollHeight; // e
        const containerHeight = containerElement.scrollHeight; // k
        const contentHeight = contentElement.scrollHeight; // l

        const scrollableHeight = containerHeight - contentHeight; // k
        const hasScrollableContent = scrollableHeight !== 0; // m
        let visibleAreaHeight = Math.ceil(scrollerRect.height - scrollableHeight); // k
        containerTopOffset = scrollerRect.top;

        thumbPositionRef.current = hasScrollableContent ? contentHeight : scrollerHeight;

        let thumbPositionRefTemp = thumbPositionRef.current;
        thumbHeight = Math.pow(visibleAreaHeight, 2) / thumbPositionRefTemp; // i
        topShadowRefVal.style.height = thumbPositionRefTemp <= visibleAreaHeight ? '0px' : `${thumbHeight}px`;
        bottomShadowRefVal.style.height = `${thumbPositionRefTemp}px`;

        if (isRTL) {
          topShadowRefVal.style.left = '0px';
          bottomShadowRefVal.style.left = '0px';
        } else {
          topShadowRefVal.style.right = '0px';
          bottomShadowRefVal.style.right = '0px';
        }

        const _scrollTop = scrollerRect.scrollTop;
        const _contentOffsetTop = contentRect.top - scrollerRect.top + _scrollTop;
        let _offsetTopAdjustment = 0;

        if (hasScrollableContent) {
          _offsetTopAdjustment = _contentOffsetTop * -1;
          bottomShadowRefVal.style.top = _contentOffsetTop + 'px';
          topShadowRefVal.style.top = _contentOffsetTop + 'px';
        }

        const scalingFactor = (visibleAreaHeight - thumbHeight) / (thumbPositionRefTemp - visibleAreaHeight);

        topShadowRefVal.style.transform = [
          'matrix3d(\n          1,0,0,0,\n          0,1,0,0,\n          0,' +
            _offsetTopAdjustment +
            ',1,0,\n          0,0,0,-1)',
          'scale(' + 1 / scalingFactor + ')',
          'translateZ(' + (1 - 1 / scalingFactor) + 'px)',
          'translateZ(-2px)',
        ].join(' ');

        topShadowRefVal.style.display = 'block';
        bottomShadowRefVal.style.display = thumbPositionRefTemp <= visibleAreaHeight ? 'none' : 'block';
      };

      // handleThumbDrag
      const handleThumbDrag = (event) => {
        preventDefaultAndStopPropagation(event);

        const initialMouseY = event.clientY; // c
        const scrollerHeight = scrollerElement.clientHeight; // a
        const initialScrollTop = scrollerElement.scrollTop; // d
        setHasScrollTimeout(true);
        const scrollRatio = thumbPositionRef.current / scrollerHeight; // e
        const thumbOffset = initialScrollTop / scrollRatio;

        if (
          initialMouseY < containerTopOffset + thumbOffset ||
          initialMouseY > containerTopOffset + thumbOffset + thumbHeight
        ) {
          const scrollDirection = initialMouseY < containerTopOffset + thumbOffset ? -20 : 20;
          let isScrolling = true;
          const scrollInterval = window.setInterval(() => {
            if (isScrolling) {
              scrollerRef.current.scrollTo({
                top: scrollerRef.current.scrollTop + scrollDirection,
              });
            }
          }, 16);

          const stopScrolling = (event) => {
            preventDefaultAndStopPropagation(event);
            scrollInterval && window.clearInterval(scrollInterval);
            window.removeEventListener('mouseup', stopScrolling, true);
            bottomShadowRefVal.removeEventListener('mouseenter', enableScrolling);
            bottomShadowRefVal.removeEventListener('mouseleave', disableScrolling);
          };

          const enableScrolling = (event) => {
            preventDefaultAndStopPropagation(event);
            isScrolling = true;
          };

          const disableScrolling = (event) => {
            preventDefaultAndStopPropagation(event);
            isScrolling = false;
          };

          window.addEventListener('mouseup', stopScrolling, true);
          bottomShadowRefVal.addEventListener('mouseenter', enableScrolling);
          bottomShadowRefVal.addEventListener('mouseleave', disableScrolling);
          return;
        }

        const handleMouseMove = (moveEvent) => {
          preventDefaultAndStopPropagation(moveEvent);
          const deltaY = moveEvent.clientY - initialMouseY;
          scrollerElement.scrollTo({
            top: initialScrollTop + deltaY * scrollRatio,
          });
        };

        const handleMouseUp = (upEvent) => {
          preventDefaultAndStopPropagation(upEvent);
          setHasScrollTimeout(false);
          window.removeEventListener('mousemove', handleMouseMove, true);
          window.removeEventListener('mouseup', handleMouseUp, true);
        };

        setHasScrollTimeout(true);
        window.addEventListener('mousemove', handleMouseMove, true);
        window.addEventListener('mouseup', handleMouseUp, true);
      };

      const debouncedUpdateShadows = CometDebounce(updateShadowsAndThumb, { wait: 100 });

      window.addEventListener('resize', debouncedUpdateShadows);

      bottomShadowRefVal.addEventListener('mousedown', handleThumbDrag);

      const resizeObserver = new ResizeObserverDeprecated(debouncedUpdateShadows);
      resizeObserver.observe(containerElement);
      resizeObserver.observe(scrollerElement);

      return () => {
        window.removeEventListener('resize', debouncedUpdateShadows);
        bottomShadowRefVal.removeEventListener('mousedown', handleThumbDrag);
        resizeObserver.disconnect();
        debouncedUpdateShadows.reset();
      };
    }, [contentRef, scrollerRef, shouldUseDefaultScrolling]);

    const onMouseEnter = function () {
      setMouseEnter(true);
    };

    const onMouseLeave = function () {
      return setMouseEnter(false);
    };

    const onScrollHandler = (a) => {
      if (onScroll) {
        onScroll(a);
      }

      setIsScrolling(true);
      thumbRef.current && window.clearTimeout(thumbRef.current);
      thumbRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 1e3);
    };

    useEffect(() => {
      return function () {
        window.clearTimeout(thumbRef.current);
      };
    }, []);

    const positionMarkerProps = useMemo(() => {
      return {
        getDOMNode: function () {
          return scrollerRef.current;
        },
      };
    }, []);

    useImperativeHandle(
      ref,
      // @ts-ignore
      () => {
        return positionMarkerProps;
      },
      [positionMarkerProps],
    );

    const contextProviders = useMemo(() => {
      // @ts-ignore
      // eslint-disable-next-line react-compiler/react-compiler
      return [].concat(scrollableAreaContext, [positionMarkerProps]);
    }, [positionMarkerProps, scrollableAreaContext]);

    const TopShadowComp = (
      <div className={stylex(dummyStyles.dummy1)}>
        <div className={stylex(dummyStyles.dummy2)} />
      </div>
    );

    const BottomShadowComp = (
      <div className={stylex(dummyStyles.dummy3)}>
        <div className={stylex(dummyStyles.dummy4)} />
      </div>
    );

    if (shouldUseDefaultScrolling) {
      return (
        <BaseScrollableAreaContext.Provider value={contextProviders}>
          <div
            className={joinClasses(
              stylex(
                containerStyles.default,
                expanding && (isIE11 ? containerStyles.expandingIE11 : containerStyles.expanding),
                containerStyles.hideScrollbar,
                horizontal && containerStyles.horizontalAuto,
                horizontal && isReflowSheet && containerStyles.horizontalOverScrollBehaviorAuto,
                vertical && containerStyles.verticalAuto,
                vertical && isReflowSheet && containerStyles.verticalOverScrollBehaviorAuto,
                xstyle,
              ),
              hideScrollbar && 'baseScrollableArea_hideScrollbar',
            )}
            data-testid={undefined}
            id={id}
            onScroll={onScrollHandler}
            // eslint-disable-next-line react/no-unknown-property
            onScrollEnd={onScrollEnd}
            ref={scrollerRef}
            role={role ? role : tabIndex === 0 ? 'region' : undefined}
            style={style}
            tabIndex={tabIndex}
          >
            {withTopShadow && TopShadowComp}
            <div
              {...stylex.props(
                containerStyles.baseScroller,
                horizontal && !vertical && containerStyles.baseScrollerHorizontal,
                withTopShadow && containerStyles.baseScrollerWithTopShadow,
                withBottomShadow && containerStyles.baseScrollerWithBottomShadow,
              )}
            >
              {onScrollTop && <OnScrollTopComp onVisible={onScrollTop} scrollerRef={scrollerRef} />}
              {children}
              {onScrollBottom && <OnScrollBottomComp onVisible={onScrollBottom} scrollerRef={scrollerRef} />}
            </div>
            {withBottomShadow && BottomShadowComp}
          </div>
        </BaseScrollableAreaContext.Provider>
      );
    }

    return (
      <BaseScrollableAreaContext.Provider value={contextProviders}>
        <div
          {...rest}
          className={joinClasses(
            stylex(
              containerStyles.default,
              containerStyles.hideScrollbar,
              expanding && (isIE11 ? containerStyles.expandingIE11 : containerStyles.expanding),
              containerStyles.perspective,
              isRTL && containerStyles.perspectiveRTL,
              horizontal && containerStyles.horizontalAuto,
              horizontal && isReflowSheet && containerStyles.horizontalOverScrollBehaviorAuto,
              vertical && containerStyles.verticalAuto,
              vertical && isReflowSheet && containerStyles.verticalOverScrollBehaviorAuto,
              xstyle,
            ),
            'baseScrollableArea_hideScrollbar',
          )}
          data-scrolltracepolicy={scrollTracePolicy}
          data-testid={undefined}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onScroll={onScrollHandler}
          // eslint-disable-next-line react/no-unknown-property
          onScrollEnd={onScrollEnd}
          ref={scrollerRef}
          role={role ? role : tabIndex === 0 ? 'region' : undefined}
          style={style}
          tabIndex={tabIndex}
        >
          {/* F */}
          {withTopShadow && TopShadowComp}
          {/* X */}
          <div
            {...stylex.props(
              containerStyles.baseScroller,
              horizontal && !vertical && containerStyles.baseScrollerHorizontal,
              withTopShadow && containerStyles.baseScrollerWithTopShadow,
              withBottomShadow && containerStyles.baseScrollerWithBottomShadow,
            )}
            ref={containerRef}
          >
            {onScrollTop && <OnScrollTopComp onVisible={onScrollTop} scrollerRef={scrollerRef} />}
            {children}
            {onScrollBottom && <OnScrollBottomComp onVisible={onScrollBottom} scrollerRef={scrollerRef} />}
          </div>
          {/* z */}
          {withBottomShadow && BottomShadowComp}
          {/* $ */}
          <div
            className={stylex(dummyStyles.dummy5)}
            {...CometVisualCompletionAttributes.IGNORE}
            data-thumb={1}
            ref={bottomShadowRef}
          />
          {/* b */}
          <div
            className={stylex(
              scrollThumbStyles.base,
              isRTL && scrollThumbStyles.rtl,
              (mouseEnter || isScrolling || hasScrollTimeout) && scrollThumbStyles.hovered,
            )}
            data-thumb={1}
            ref={topShadowRef}
          >
            <div className={stylex(dummyStyles.dummy6)} />
          </div>
        </div>
      </BaseScrollableAreaContext.Provider>
    );
  },
);

function shouldUseCustomScrolling() {
  return (
    UserAgent.isPlatform('iOS') ||
    UserAgent.isPlatform('Android') ||
    UserAgent.isBrowser('Edge') ||
    UserAgent.isBrowser('IE') ||
    UserAgent.isBrowser('Firefox < 64')
  );
}

/**
 * Utility function to prevent default behavior and stop event propagation.
 * @param {Event} event - The event to prevent and stop.
 */
const preventDefaultAndStopPropagation = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};

function CreatePositionMarkerComp({ onVisible, scrollerRef, xstyle }) {
  const getScrollerNode = useMemo(() => {
    return () => scrollerRef.current;
  }, [scrollerRef]);

  const observerRef = useVisibilityObserver({
    onVisible,
    options: {
      root: getScrollerNode,
      rootMargin: 0,
    },
  });

  return <div className={stylex(positionStyles.main, xstyle)} ref={observerRef} />;
}

function OnScrollTopComp({ onVisible, scrollerRef }) {
  return <CreatePositionMarkerComp onVisible={onVisible} scrollerRef={scrollerRef} xstyle={positionStyles.top} />;
}

function OnScrollBottomComp({ onVisible, scrollerRef }) {
  return <CreatePositionMarkerComp onVisible={onVisible} scrollerRef={scrollerRef} xstyle={positionStyles.bottom} />;
}

const containerStyles = stylex.create({
  baseScroller: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    position: 'relative',
  },
  baseScrollerHorizontal: {
    flexDirection: 'row',
  },
  baseScrollerWithBottomShadow: {
    marginBottom: '-66px',
  },
  baseScrollerWithTopShadow: {
    marginTop: '-50px',
  },
  default: {
    WebkitOverflowScrolling: 'touch',
    //

    // MsOverflowStyle: "x2atdfe",

    // MsScrollChaining: "xb57i2i",

    // MsScrollRails: "x1q594ok",
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'relative',
    zIndex: 0,
  },
  expanding: {
    flexBasis: '100%',
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0,
  },
  expandingIE11: {
    flexBasis: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0,
  },
  hideScrollbar: {
    // TODO
    // MsOverflowStyle: "x1pq812k",
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
      height: 0,
      width: 0,
    },
  },
  horizontalAuto: {
    overflowX: 'auto',
    overscrollBehaviorX: 'contain',
  },
  //
  horizontalOverScrollBehaviorAuto: {
    overscrollBehaviorX: null,
  },
  perspective: {
    perspective: '1px',
    perspectiveOrigin: 'right top',
    position: 'relative',
    transformStyle: 'preserve-3d',
  },
  perspectiveRTL: {
    perspectiveOrigin: 'left top',
  },
  verticalAuto: {
    overflowY: 'auto',
    overscrollBehaviorY: 'contain',
  },
  verticalOverScrollBehaviorAuto: {
    overscrollBehaviorY: null,
  },
});

const scrollThumbStyles = stylex.create({
  base: {
    boxSizing: 'border-box',
    display: 'none',
    right: 0,
    opacity: 0,
    paddingTop: 0,
    paddingRight: '4px',
    paddingBottom: 0,
    paddingLeft: '4px',
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    transformOrigin: 'right top',
    transitionDuration: '.3s',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'ease',
    width: '16px',
  },
  hovered: {
    opacity: 1,
    transitionDuration: '0',
  },
  inner: {
    backgroundColor: 'var(--scroll-thumb)',
    borderRadius: '4px',
    height: '100%',
    width: '100%',
  },
  rtl: {
    transformOrigin: 'left top',
  },
});

const positionStyles = stylex.create({
  bottom: {
    bottom: '0',
  },
  main: {
    height: '1px',
    opacity: 0,
    pointerEvents: 'none',
    position: 'absolute',
    width: '1px',
  },
  top: {
    top: 0,
  },
});

const dummyStyles = stylex.create({
  dummy1: {
    // x78zum5 xdt5ytf x2lah0s x10wjd1d xds687c x17qophe x47corl x7wzq59 x1vjfegm x7itwyc x1nhvcw1 xepu288
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    height: '50px',
    right: 0,
    left: 0,
    pointerEvents: 'none',
    // eslint-disable-next-line @stylexjs/valid-styles
    position: stylex.firstThatWorks('-webkit-sticky', 'sticky'),
    zIndex: 1,
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitClipPath: 'inset(16px 0 0 0)',
    clipPath: 'inset(16px 0 0 0)',
    justifyContent: 'flex-start',
    top: '-34px',
  },

  dummy2: {
    // x2lah0s xlup9mm x7wzq59 x7r5tp8 x1s928wv x1a5uphr x1j6awrg x1s71c9q x4eaejv x13vifvy
    flexShrink: 0,
    height: '16px',
    // eslint-disable-next-line @stylexjs/valid-styles
    position: stylex.firstThatWorks('-webkit-sticky', 'sticky'),
    top: 0,

    '::after': {
      boxShadow: 'var(--scroll-shadow)',
      content: '""',
      height: '16px',
      position: 'absolute',
      top: '-16px',
      width: '100%',
    },
  },

  dummy3: {
    // x78zum5 xdt5ytf x2lah0s x10wjd1d xds687c x17qophe x47corl x7wzq59 x1vjfegm x1l3hj4d x3m8hty x13a6bvl x1yztbdb
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    height: '50px',
    right: 0,
    left: 0,
    pointerEvents: 'none',
    // eslint-disable-next-line @stylexjs/valid-styles
    position: stylex.firstThatWorks('-webkit-sticky', 'sticky'),
    zIndex: 1,
    bottom: '-34px',
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitClipPath: 'inset(0 0 16px 0)',
    clipPath: 'inset(0 0 16px 0)',
    justifyContent: 'flex-end',
    marginBottom: '16px',
  },

  dummy4: {
    // x2lah0s xlup9mm x7wzq59 x7r5tp8 x1s928wv x1a5uphr x1j6awrg x1s71c9q x4eaejv x1ey2m1c xtjevij
    flexShrink: 0,
    // height: "16px",

    // position: stylex.firstThatWorks("-webkit-sticky", "sticky"),
    bottom: 0,

    // "::after": {
    //   boxShadow: "var(--scroll-shadow)",
    //   content: '""',
    //   height: "16px",
    //   position: "absolute",
    //   top: "-16px",
    //   width: "100%",
    //   transform: "scaleY(-1)",
    // },

    boxShadow: {
      default: null,
      '::after': 'var(--scroll-shadow)',
    },

    content: {
      default: null,
      '::after': "''",
    },

    height: {
      default: '16px',
      '::after': '16px',
    },

    position: {
      // eslint-disable-next-line @stylexjs/valid-styles
      default: stylex.firstThatWorks('-webkit-sticky', 'sticky'),
      '::after': 'absolute',
    },

    top: {
      default: null,
      '::after': '-16px',
    },

    width: {
      default: null,
      '::after': '100%',
    },

    transform: 'scaleY(-1)',
  },

  dummy5: {
    backgroundColor: 'var(--divider)',
    display: 'none',
    height: '100%',
    right: 0,

    opacity: {
      default: 0,
      ':hover': 0.3,
    },
    // opacity: {
    //   default: 0,
    //   ":hover": 0.3,
    // },
    position: 'absolute',
    top: 0,
    transitionDuration: '.5s',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'ease',
    width: '16px',
  },

  dummy6: {
    backgroundColor: 'var(--scroll-thumb)',
    borderRadius: '4px',
    height: '100%',
    width: '100%',
  },

  //
  t0: {
    backgroundColor: 'var(--divider)',
    display: 'none',
    height: '100%',
    right: 0,
    top: 0,
    position: 'absolute',
    transitionDuration: '.5s',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'ease',
    width: '16px',

    opacity: {
      default: 0,
      ':hover': 0.3,
    },
  },
});
