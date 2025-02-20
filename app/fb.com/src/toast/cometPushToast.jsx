import React from 'react';
import { FBNucleusCautionTriangleFilled20 } from '@fb-icons/FBNucleusCautionTriangleFilled20';
import { FDSIcon } from '@fb-image/FDSIcon';

import { BaseToasterStateManager } from './BaseToasterStateManager';
import { CometToast } from './CometToast';

const defaultInstance = BaseToasterStateManager.getInstance();

let toast;

function _cometPushToast(props, duration = 2750, externalInstance) {
  const store = externalInstance ?? defaultInstance;

  toast = store.push(
    <CometToast
      {...props}
      // loadImmediately
      onDismiss={() => {
        return store.expire(toast);
      }}
    />,
    duration,
  );
  return toast;
}

function cometPushSimpleToast(message, duration) {
  return _cometPushToast(
    {
      message: message,
    },
    duration,
  );
}

function cometPushErrorToast(props, duration = 2750, externalInstance) {
  return _cometPushToast(
    {
      ...props,
      icon: <FDSIcon color="warning" icon={FBNucleusCautionTriangleFilled20} size={20} />,
    },
    duration,
    externalInstance,
  );
}

export const cometPushToast = {
  cometPushToast: _cometPushToast,
  cometPushSimpleToast,
  cometPushErrorToast,
};
