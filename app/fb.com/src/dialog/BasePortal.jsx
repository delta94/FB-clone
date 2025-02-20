import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { BaseChameleonThemeContext, BasePortalTargetContext } from '@fb-contexts';
import { suspendOrThrowIfUsedInSSR } from '@fb-dump/suspendOrThrowIfUsedInSSR';
import { useStable } from '@fb-hooks';
import { BaseThemeProvider } from '@fb-theme/BaseThemeProvider';
import stylex from '@stylexjs/stylex';
import executionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import { BaseDOMContainer } from './BaseDOMContainer';

export const BasePortal = (props) => {
  const { children, xstyle, hidden = false, target } = props;

  const basePortalTargetContext = useContext(BasePortalTargetContext);

  let chameleon = useContext(BaseChameleonThemeContext);

  const domNode = target || basePortalTargetContext;
  const providerValue = useStable(() => {
    executionEnvironment.canUseDOM ? document.createElement('div') : null;
  });

  suspendOrThrowIfUsedInSSR('BasePortal: Portals are not currently supported by the server renderer.');

  return domNode
    ? createPortal(
        <BaseThemeProvider>
          {(themeClasses, themeStyle) => (
            <div
              {...(hidden && { hidden: true })}
              className={stylex(themeClasses, chameleon.classNames, xstyle)}
              style={themeStyle}
            >
              <BasePortalTargetContext.Provider value={providerValue}>{children}</BasePortalTargetContext.Provider>
              <BaseDOMContainer node={providerValue} />
            </div>
          )}
        </BaseThemeProvider>,
        domNode,
      )
    : undefined;
};
