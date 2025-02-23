import React, { forwardRef, useContext } from 'react';
import { BaseDialog } from '@fb-dialog/BaseDialog';
import { BaseMultiPageView } from '@fb-dialog/BaseMultiPageView';
import { CometDialogLoadingStateContext, useDialogLabelID } from '@fb-contexts';
import { FDSDialogPageLoadingState } from '@fb-dialog/FDSDialogPageLoadingState';
import emptyFunction from 'fbjs/lib/emptyFunction';

const MEDIA_QUERY_MOBILE = '@media (max-width: 679px)';
// Base styles for the dialog container.
const styles = {
  anchor: {
    alignItems: 'stretch',
    maxHeight: '100vh',
    paddingTop: 'var(--dialog-anchor-vertical-padding)',
    paddingBottom: 'var(--dialog-anchor-vertical-padding)',
    paddingStart: '4px',
    paddingEnd: '4px',
    paddingLeft: null,
    paddingRight: null,
    paddingBottom: {
      '@supports (padding: env(safe-area-inset-bottom, 0))':
        'calc(var(--dialog-anchor-vertical-padding) + env(safe-area-inset-bottom,0))',
    },
    paddingTop: {
      '@supports (padding: env(safe-area-inset-bottom, 0))':
        'calc(var(--dialog-anchor-vertical-padding) + env(safe-area-inset-top,0))',
    },
  },
  card: {
    backgroundColor: 'var(--card-background)',
    borderTopStartRadius: 'var(--dialog-corner-radius)',
    borderTopEndRadius: 'var(--dialog-corner-radius)',
    borderBottomEndRadius: 'var(--dialog-corner-radius)',
    borderBottomStartRadius: 'var(--dialog-corner-radius)',
    clipPath: {
      default: 'none',
      [MEDIA_QUERY_MOBILE]: 'inset(0px 0px 0px 0px round var(--dialog-corner-radius))',
    },
    flexGrow: 1,
    overflowX: {
      default: 'hidden',
      [MEDIA_QUERY_MOBILE]: 'visible',
    },
    overflowY: {
      default: 'hidden',
      [MEDIA_QUERY_MOBILE]: 'visible',
    },
    boxShadow: {
      default: '0 12px 28px 0 var(--shadow-2),0 2px 4px 0 var(--shadow-1),inset 0 0 0 1px var(--shadow-inset)',
      [MEDIA_QUERY_MOBILE]: 'none',
    },
  },
  dialog: {
    alignItems: 'stretch',
    borderTopStartRadius: 'var(--dialog-corner-radius)',
    borderTopEndRadius: 'var(--dialog-corner-radius)',
    borderBottomEndRadius: 'var(--dialog-corner-radius)',
    borderBottomStartRadius: 'var(--dialog-corner-radius)',
    display: 'flex',
    overflowX: 'visible',
    boxShadow: {
      default: null,
      [MEDIA_QUERY_MOBILE]:
        '0 12px 28px 0 var(--shadow-2),0 2px 4px 0 var(--shadow-1),inset 0 0 0 1px var(--shadow-inset)',
    },
    overflowY: 'visible',
  },
  root: {
    justifyContent: {
      default: null,
      [MEDIA_QUERY_MOBILE]: 'center',
    },
  },
};

// Size variants for the dialog.
const sizeStyles = {
  medium: { maxWidth: 'xrgej4m', width: 'xh8yej3', $$css: true },
  small: { maxWidth: 'x1n7qst7', width: 'xh8yej3', $$css: true },
  xsmall: { maxWidth: 'xdusixz', width: 'xh8yej3', $$css: true },
};

export const FDSDialogContainer = forwardRef(function FDSDialogContainer(props, ref) {
  const {
    anchorXStyle,
    'aria-label': ariaLabel,
    children,
    disableClosingWithMask = false,
    onClose = emptyFunction,
    size = 'small',
    testid,
    ...rest
  } = props;

  // Use the provided onClose or fallback to an empty function.

  // Create a fallback loading state for the dialog page.
  const loadingState = <FDSDialogPageLoadingState onClose={onClose} />;

  // Subscribe to dialog loading state context (for side effects, if any).
  const dialogLoadingState = useContext(CometDialogLoadingStateContext);

  // Retrieve a dialog label ID.
  const dialogLabelID = useDialogLabelID();

  // If no aria-label is provided, use the dialog label ID for aria-labelledby.
  const effectiveAriaLabel = ariaLabel == null ? dialogLabelID : undefined;

  // Compose the anchor style.
  const composedAnchorStyle = [styles.anchor, anchorXStyle];

  // Get the size style based on the provided size prop.
  const sizeStyle = sizeStyles[size];

  // Compose the dialog style.
  const dialogXStyle = [styles.dialog, sizeStyle];

  // Create the dialog body using BaseMultiPageView.
  const dialogBody = (
    <BaseMultiPageView disableAutoRestoreFocus={dialogLoadingState} fallback={loadingState} xstyle={styles.card}>
      {children}
    </BaseMultiPageView>
  );

  return (
    <BaseDialog
      anchorXStyle={composedAnchorStyle}
      aria-label={ariaLabel}
      aria-labelledby={effectiveAriaLabel}
      disableClosingWithMask={disableClosingWithMask}
      onClose={onClose}
      ref={ref}
      rootXStyle={styles.root}
      testid={undefined}
      xstyle={dialogXStyle}
      {...rest}
    >
      {dialogBody}
    </BaseDialog>
  );
});
