import React, { createContext, useContext, useId } from 'react';
import { HiddenSubtreeContext } from '@fb-contexts';

export const BaseDialogLabelIDContext = createContext(undefined);

export function BaseDialogLabelIDProvider({ children, disable = false }) {
  const id = useId();
  const value = disable ? undefined : id;
  return <BaseDialogLabelIDContext.Provider value={value}>{children}</BaseDialogLabelIDContext.Provider>;
}

export function useDialogHeaderID() {
  const labelID = useContext(BaseDialogLabelIDContext);
  const hiddenContext = useContext(HiddenSubtreeContext);
  return hiddenContext.hidden ? undefined : labelID;
}

export function useDialogLabelID() {
  return useContext(BaseDialogLabelIDContext);
}
