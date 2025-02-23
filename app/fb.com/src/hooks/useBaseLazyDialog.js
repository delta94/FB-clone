import { useContext } from 'react';
import CometDialogContext from 'CometDialogContext';
import CometSuspendedDialogImpl from 'CometSuspendedDialogImpl.react';
import lazyLoadComponent from 'lazyLoadComponent';

export default function useBaseLazyDialog(dialogResource, fallback, tracePolicy, options) {
  const dialogContext = useContext(CometDialogContext);
  const baseModalProps = options?.baseModalProps;

  const showDialog = (dialogProps, callback, replaceCurrentDialog) => {
    const DialogComponent = lazyLoadComponent(dialogResource);
    dialogContext(
      CometSuspendedDialogImpl,
      {
        dialog: DialogComponent,
        dialogProps,
        fallback,
      },
      { loadType: 'lazy', tracePolicy },
      callback,
      { baseModalProps, replaceCurrentDialog },
    );
  };

  const preload = () => {
    if (dialogResource && typeof dialogResource.preload === 'function') {
      dialogResource.preload();
    }
  };

  return [showDialog, preload];
}
