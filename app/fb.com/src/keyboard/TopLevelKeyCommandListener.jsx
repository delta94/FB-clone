import React from 'react';

import { BaseKeyCommandListener } from './BaseKeyCommandListener';
import { CometGlobalKeyCommandWidget } from './CometGlobalKeyCommandWidget';

export const TopLevelKeyCommandListener = ({ children }) => {
  return (
    <CometGlobalKeyCommandWidget.Wrapper debugName="global">
      <BaseKeyCommandListener observersEnabled>{children}</BaseKeyCommandListener>
    </CometGlobalKeyCommandWidget.Wrapper>
  );
};
