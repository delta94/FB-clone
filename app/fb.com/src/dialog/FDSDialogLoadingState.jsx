import fbt from 'fbt';
import { CometDialogLoadingStateContext } from '@fb-contexts';
import { FDSDialog } from '@fb-dialog/FDSDialog';
import { FDSDialogLoadingStateHeader } from '@fb-dialog/FDSDialogLoadingStateHeader';
import { FDSDialogLoadingStateImpl } from '@fb-dialog/FDSDialogLoadingStateImpl';
import React from 'react';

export const FDSDialogLoadingState = (props) => {
  const { 'aria-label': ariaLabel, onClose, withCloseButton } = props;

  // Use the provided aria-label or fall back to a default translated value.
  const effectiveAriaLabel = ariaLabel != null ? ariaLabel : fbt._('__JHASH__6lD-XyRyuHe__JHASH__');

  // Render the header for the loading state.
  const header = <FDSDialogLoadingStateHeader onClose={onClose} withCloseButton={withCloseButton} />;

  // Render the actual loading state implementation.
  const dialogBody = <FDSDialogLoadingStateImpl />;

  return (
    <CometDialogLoadingStateContext.Provider value={true}>
      <FDSDialog aria-label={effectiveAriaLabel} footer={null} header={header} onClose={onClose}>
        {dialogBody}
      </FDSDialog>
    </CometDialogLoadingStateContext.Provider>
  );
};
