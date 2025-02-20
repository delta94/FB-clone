import React, { useLayoutEffect, useState } from 'react';
import {
  BaseThemeConfigContext,
  BaseThemeDisplayModeContext,
  CometDarkModeContext,
  DSPDisplayModeContext,
} from '@fb-contexts';
import { UseCometSetDarkModeMetaContent, UseSystemPrefersDarkMode, useGlobalKeyCommands } from '@fb-hooks';
import { cometGetKeyCommandConfig } from '@fb-keyboard/cometGetKeyCommandConfig';
import { cometPushToast } from '@fb-toast/cometPushToast';
import { gkx } from '@fb-utils/gkx';

import { CometDarkModeRootClass } from './CometDarkModeRootClass';
import { CometStyleXSheet } from './CometStyleXSheet';

const defaultClass = {
  darkClassName: CometStyleXSheet.DARK_MODE_CLASS_NAME,
  darkVariables: {},
  lightClassName: CometStyleXSheet.LIGHT_MODE_CLASS_NAME,
  lightVariables: {},
};

const isDarkModeEnabledGlobally = false;

export const makeCometDarkModeStateProvider = (props) => {
  const { getDarkModeSetting, saveDarkModeSetting } = props;

  // useSystemPrefersDarkMode();

  function DarkMode({ children }) {
    let prefersDarkMode = UseSystemPrefersDarkMode.useSystemPrefersDarkMode(getDarkModeSetting);

    const [darkModeSetting, setDarkModeSetting] = useState(getDarkModeSetting);

    const isDarkModeEnabled = darkModeSetting === 'ENABLED' || (darkModeSetting === 'USE_SYSTEM' && prefersDarkMode);

    UseCometSetDarkModeMetaContent.useCometSetDarkModeMetaContent(isDarkModeEnabled);

    const themeDisplayMode = isDarkModeEnabledGlobally
      ? 'dark'
      : darkModeSetting === 'USE_SYSTEM'
      ? 'auto'
      : darkModeSetting === 'ENABLED'
      ? 'dark'
      : 'light';

    const updateDarkModeSetting = (newSetting) => {
      localStorage.setItem('isDarkMode', newSetting);
      setDarkModeSetting(newSetting);
      saveDarkModeSetting(newSetting, {
        onRevert: setDarkModeSetting,
      });
    };

    useLayoutEffect(() => {
      if (isDarkModeEnabledGlobally) {
        CometDarkModeRootClass.updateDarkModeRootClass('ENABLED');
        return () => {
          CometDarkModeRootClass.updateDarkModeRootClass(darkModeSetting);
        };
      }
    }, [isDarkModeEnabledGlobally, darkModeSetting]);

    const toggleDarkMode = () => {
      updateDarkModeSetting(isDarkModeEnabled ? 'DISABLED' : 'ENABLED');
    };

    const contextValue = {
      currentSetting: darkModeSetting,
      onDarkModeToggle: toggleDarkMode,
      setDarkModeSetting: updateDarkModeSetting,
    };

    const displayMode = isDarkModeEnabled || isDarkModeEnabledGlobally ? 'dark' : 'light';

    let handleDarkModeToggle = () => {
      toggleDarkMode();
      let message = isDarkModeEnabled ? 'Dark mode is turned off.' : 'Dark mode is turned on.';
      // cometPushToast.onReady((b) => {
      //   b = b.cometPushToast;
      //   cometPushToast({
      //     message: a,
      //   });
      // });

      // TODO
      cometPushToast.cometPushToast({
        message,
      });
    };

    const globalKeyCommands = !gkx[22802]
      ? []
      : [cometGetKeyCommandConfig.getCometKeyCommandConfig('global', 'toggleDarkMode', handleDarkModeToggle)];

    useGlobalKeyCommands(globalKeyCommands);

    return (
      <BaseThemeConfigContext.Provider value={defaultClass}>
        <BaseThemeDisplayModeContext.Provider value={displayMode}>
          <CometDarkModeContext.Provider value={contextValue}>
            <DSPDisplayModeContext.Provider value={themeDisplayMode}>{children}</DSPDisplayModeContext.Provider>
          </CometDarkModeContext.Provider>
        </BaseThemeDisplayModeContext.Provider>
      </BaseThemeConfigContext.Provider>
    );
  }

  return DarkMode;
};
