import React from 'react';
import { CometComponentWithKeyCommands } from '@fb-keyboard/CometComponentWithKeyCommands';
import { CometKeys } from '@fb-keyboard/CometKeys';
import fbt from 'fbt';

export const CometHideLayerOnEscape = ({ children, debugName = 'ModalLayer', onHide }) => {
  const commandConfig = [
    {
      command: { key: CometKeys.ESCAPE },
      description: fbt._('__JHASH__coz4yRiHZKL__JHASH__'),
      handler: onHide,
      triggerFromInputs: true,
      triggerOnRepeats: false,
    },
  ];

  return (
    <CometComponentWithKeyCommands commandConfigs={commandConfig} debugName={debugName} isWrapperFocusable={true}>
      {children}
    </CometComponentWithKeyCommands>
  );
};
