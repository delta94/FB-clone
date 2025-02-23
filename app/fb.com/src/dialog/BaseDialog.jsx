import React, { forwardRef, useEffect, useRef } from 'react';
import { BaseThemeProvider } from '@fb-theme/BaseThemeProvider';
import { BaseView } from '@fb-layout/BaseView';
import { CometHideLayerOnEscape } from '@fb-keyboard/CometHideLayerOnEscape';
import { isWithinThreshold } from '@fb-utils/pointerEventDistance';
import stylex from '@stylexjs/stylex';
import { useMergeRefs } from '@fb-hooks';
import { testID } from '@fb-utils/testID';

const styles = {
  anchor: {
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 0,
    minWidth: 0,
    pointerEvents: 'none',
  },
  anchorBottomSheet: {
    overscrollBehaviorY: 'contain',
  },
  dialog: {
    boxSizing: 'content-box',
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    overflowX: 'hidden',
    overflowY: 'hidden',
    pointerEvents: 'all',
  },
  dialogBottomSheet: {
    touchAction: 'none',
  },
  root: {
    alignItems: 'stretch',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
  },
  rootWithDeprecatedStyles: {
    flexGrow: 0,
    minHeight: '100vh',
  },
};

export const BaseDialog = forwardRef(function BaseDialog(props, ref) {
  const {
    anchorXStyle,
    'aria-label': ariaLabel,
    children,
    disableClosingWithEscape = false,
    disableClosingWithMask = false,
    enableBottomSheetBehavior = false,
    onAnimationEnd,
    onClose,
    rootXStyle,
    testid, // Provided but we'll pass it to testID helper below
    themeConfig,
    withDeprecatedStyles = false,
    xstyle,
    ...rest
  } = props;

  // Ref for the dialog container
  const containerRef = useRef(null);
  // Ref to hold the merged onClose (updated on prop changes)
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Handle closing when clicking outside (mask click), if not disabled.
  useEffect(() => {
    const container = containerRef.current;
    if (!disableClosingWithMask && container) {
      const handleClick = (event) => {
        // Close if click occurred outside the container.
        if (container && !container.contains(event.target)) {
          onCloseRef.current();
        }
      };
      // Prefer pointer events if available (and not Oculus)
      if ('PointerEvent' in window && !window.navigator.userAgent.includes('Oculus')) {
        container.addEventListener('pointerdown', handleClick);
        return () => container.removeEventListener('pointerdown', handleClick);
      } else {
        container.addEventListener('click', handleClick);
        return () => container.removeEventListener('click', handleClick);
      }
    }
  }, [disableClosingWithMask]);

  // Handle bottom sheet touch events if enabled.
  useEffect(() => {
    if (enableBottomSheetBehavior && containerRef.current) {
      const container = containerRef.current;
      let touchStartEvent = null;
      const handleTouchStart = (e) => {
        if (e.isPrimary) {
          touchStartEvent = e;
        }
      };
      const handleTouchEnd = (e) => {
        if (touchStartEvent && e.isPrimary) {
          if (isWithinThreshold(touchStartEvent, e) < 10) {
            onCloseRef.current();
          }
          touchStartEvent = null;
        }
      };
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchend', handleTouchEnd);
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [enableBottomSheetBehavior]);

  const mergedRef = useMergeRefs(containerRef, ref);

  // Render the dialog content.
  const dialogContent = (
    <div
      className={stylex(styles.dialog, enableBottomSheetBehavior && styles.dialogBottomSheet, xstyle)}
      onAnimationEnd={onAnimationEnd}
    >
      <BaseView
        {...rest}
        aria-label={ariaLabel}
        ref={mergedRef}
        role="dialog"
        testid={testid}
        xstyle={[styles.anchor, anchorXStyle]}
      >
        {children}
      </BaseView>
    </div>
  );

  // Optionally wrap with a theme provider.
  const themedDialog = themeConfig ? (
    <BaseThemeProvider config={themeConfig}>{dialogContent}</BaseThemeProvider>
  ) : (
    dialogContent
  );

  // Optionally wrap with an escape-layer to hide on Escape key press.
  const finalDialog = disableClosingWithEscape ? (
    themedDialog
  ) : (
    <CometHideLayerOnEscape onHide={onClose}>{themedDialog}</CometHideLayerOnEscape>
  );

  // Compute the root container classes.
  const rootClasses = stylex(styles.root, withDeprecatedStyles && styles.rootWithDeprecatedStyles, rootXStyle);

  return (
    <div className={rootClasses} ref={mergedRef} {...testID('BaseDialog')}>
      {finalDialog}
    </div>
  );
});
