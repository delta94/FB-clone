import React from 'react';
import { CometKeyCommandWidget } from '@fb-keyboard/CometKeyCommandWidget';

export const CometKeyCommandWrapper = ({ children, ...rest }) => {
  const { Wrapper } = CometKeyCommandWidget;

  return <Wrapper {...rest}>{children}</Wrapper>;
};
