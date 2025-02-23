import React from 'react';
import { CometKeyCommandWrapper } from '@fb-keyboard/CometKeyCommandWrapper';
import { useKeyCommands } from '@fb-hooks';

const defaultStyles = {
  displayInherit: {
    display: 'inherit',
  },
  inherit: {
    alignContent: 'inherit',
    alignItems: 'inherit',
    flexDirection: 'inherit',
    flexGrow: 'inherit',
    flexShrink: 'inherit',
    height: 'inherit',
    justifyContent: 'inherit',
    maxHeight: 'inherit',
    maxWidth: 'inherit',
    minHeight: 'inherit',
    minWidth: 'inherit',
    position: 'inherit',
    width: 'inherit',
  },
};

const KeyCommandsHandler = ({ commandConfigs }) => {
  useKeyCommands(commandConfigs);
  return null;
};

export const CometComponentWithKeyCommands = (props) => {
  const { children, commandConfigs, elementType, xstyle, ...rest } = props;

  // Compute the default style based on the element type.
  const computedStyle =
    elementType === 'span' ? defaultStyles.inherit : [defaultStyles.inherit, defaultStyles.displayInherit];

  // Use the provided xstyle prop if available; otherwise fall back to the computed style.
  const effectiveXstyle = xstyle != null ? xstyle : computedStyle;

  return (
    <CometKeyCommandWrapper elementType={elementType} xstyle={effectiveXstyle} {...rest}>
      <KeyCommandsHandler commandConfigs={commandConfigs} />
      {children}
    </CometKeyCommandWrapper>
  );
};
