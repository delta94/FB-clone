import React from 'react';
import { FBLogger } from '@fb-error/FBLogger';

function CometTransientDialogProvider() {
  FBLogger('comet_ui')
    .blameToPreviousFrame()
    .mustfix(
      'Attempted to imperatively render a dialog without CometTransientDialogProvider in the tree. This is not allowed. Please add a CometTransientDialogProvider to render a dialog (https://fburl.com/dialog-provider).',
    );
}

export const CometDialogContext = React.createContext(CometTransientDialogProvider);
