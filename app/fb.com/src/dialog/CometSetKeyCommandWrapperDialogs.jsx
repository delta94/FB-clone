import React, { useContext, useEffect } from 'react';
import { CometKeyCommandContext, CometKeyCommandSettingsContext } from '@fb-contexts';
import emptyFunction from 'fbjs/lib/emptyFunction';
import useCometLazyDialog from 'useCometLazyDialog';
import { CometModifiedKeyCommandWrapperDialog } from 'CometModifiedKeyCommandWrapperDialog';
import { CometKeyCommandWrapperDialog } from 'CometKeyCommandWrapperDialog';

export const CometSetKeyCommandWrapperDialogs = () => {
  // Retrieve settings and context for key commands.
  const keyCommandSettings = useContext(CometKeyCommandSettingsContext);
  const keyCommandContext = useContext(CometKeyCommandContext) || {};
  const { setShowModifiedKeyCommandWrapperDialogRef, setShowSingleCharacterKeyCommandWrapperDialogRef } =
    keyCommandContext;

  // Get the lazy dialog components.
  const [modifiedDialog] = useCometLazyDialog(CometModifiedKeyCommandWrapperDialog);
  const [singleCharDialog] = useCometLazyDialog(CometKeyCommandWrapperDialog);

  // Effect for the modified key command dialog.
  useEffect(() => {
    const emptyFn = emptyFunction;
    let cleanup = emptyFn;
    if (setShowModifiedKeyCommandWrapperDialogRef) {
      cleanup = setShowModifiedKeyCommandWrapperDialogRef((command, singleCharDescription) => {
        modifiedDialog(
          {
            command,
            setModifiedKeyboardShortcutsPreference: keyCommandSettings.setModifiedKeyboardShortcutsPreference,
            singleCharDescription,
          },
          emptyFunction,
        );
      });
    }
    return cleanup;
  }, [
    keyCommandSettings.setModifiedKeyboardShortcutsPreference,
    setShowModifiedKeyCommandWrapperDialogRef,
    modifiedDialog,
  ]);

  // Effect for the single-character key command dialog.
  useEffect(() => {
    const emptyFn = emptyFunction;
    let cleanup = emptyFn;
    if (setShowSingleCharacterKeyCommandWrapperDialogRef) {
      cleanup = setShowSingleCharacterKeyCommandWrapperDialogRef((command, singleCharDescription) => {
        singleCharDialog(
          {
            command,
            setAreSingleKeysDisabled: keyCommandSettings.setAreSingleKeysDisabled,
            singleCharDescription,
          },
          emptyFunction,
        );
      });
    }
    return cleanup;
  }, [keyCommandSettings.setAreSingleKeysDisabled, setShowSingleCharacterKeyCommandWrapperDialogRef, singleCharDialog]);

  return null;
};
