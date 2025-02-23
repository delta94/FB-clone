import React from 'react';
import { FDSDialogHeader } from '@fb-dialog/FDSDialogHeader';
import { FDSDialogLoadingStateImpl } from '@fb-dialog/FDSDialogLoadingStateImpl';
import { FDSDialogPage } from '@fb-dialog/FDSDialogPage';

export function FDSDialogPageLoadingState({ onClose }) {
  const header = <FDSDialogHeader onClose={onClose} />;
  const loadingState = <FDSDialogLoadingStateImpl />;

  return (
    <FDSDialogPage footer={null} header={header}>
      {loadingState}
    </FDSDialogPage>
  );
}
