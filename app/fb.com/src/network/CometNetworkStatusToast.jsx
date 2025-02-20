import React from 'react';
import { CometIconWirelessSlashFilled } from '@fb-icons/CometIconWirelessSlashFilled';
import { fbicon } from '@fb-image/fbicon';
import { FDSIcon } from '@fb-image/FDSIcon';
import { ix } from '@fb-image/ix';
import { SVGIcon } from '@fb-image/SVGIcon';
import { NetworkStatus } from '@fb-network/NetworkStatus';
import { BaseToasterStateManager } from '@fb-toast/BaseToasterStateManager';
import { cometPushToast } from '@fb-toast/cometPushToast';

let Component;
let networkRef = null;

const onNetworkChange = ({ online }) => {
  let instance = BaseToasterStateManager.getInstance();

  if (Component !== null && Component !== undefined) {
    instance.expire(Component);
    Component = null;
  }

  if (online) {
    Component = cometPushToast.cometPushToast(
      {
        icon: <FDSIcon color="positive" icon={fbicon._(ix(485124), 24)} />,
        message: 'Your internet connection was restored.',
      },
      4e3,
      instance,
    );
  } else {
    Component = cometPushToast.cometPushToast(
      {
        action: {
          label: 'Refresh',
          onPress: () => {
            window.location.reload();
          },
        },

        icon: <FDSIcon color="disabled" icon={SVGIcon.legacySVGIcon(CometIconWirelessSlashFilled)} size={24} />,

        message: 'You are currently offline.',
      },
      Infinity, // Infinity,
      instance,
    );
  }
};

const subscribe = () => {
  networkRef = NetworkStatus.onChange(onNetworkChange);
};

const unsubscribe = () => {
  let temp;
  (temp = networkRef) === null ? undefined : temp.remove();
  networkRef = null;
};

// cr:1402
export const CometNetworkStatusToast = {
  subscribe,
  unsubscribe,
};
