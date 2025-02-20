import React from 'react';

import { FocusRegion } from './FocusRegion';
import { headerOrTabbableScopeQuery } from './focusScopeQueries';

export function XPlatReactFocusRegion(props) {
  const { autoFocusQuery, autoRestoreFocus, recoverFocusQuery, children } = props;

  return (
    <FocusRegion
      autoFocusQuery={autoFocusQuery ?? headerOrTabbableScopeQuery}
      autoRestoreFocus={autoRestoreFocus}
      recoverFocusQuery={recoverFocusQuery}
    >
      {children}
    </FocusRegion>
  );
}
