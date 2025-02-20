import React from 'react';
import { CometErrorBoundary } from '@fb-error/CometErrorBoundary';
import { CometBackupPlaceholder } from '@fb-placeholder/CometBackupPlaceholder';
import { CometDensityModeStateProvider } from './CometDensityModeStateProvider';
import { CometPlatformAppWrapper } from './CometPlatformAppWrapper';
import { RouterProvider } from 'react-router-dom';
import { router } from '../routes/router';
import { CometDarkModeStateProvider } from '@fb-theme/CometDarkModeStateProvider';

const Component = {
  TopLevelWrapper: React.Fragment,
  // RelayEnvironmentFactoryProvider: RelayEnvironment,
  CometRouterStateProvider: React.Fragment,
  DarkModeStateProvider: CometDarkModeStateProvider,
  ChameleonThemeProvider: React.Fragment,
};

const KeyboardSettingsStateProvider = undefined;
const UncaughtErrorFallback = undefined;

const CookieConsentDialog = undefined;
const KeyCommandNub = undefined;

export const BuildCometRootComponent = () => {
  return (
    // <Component.RelayEnvironmentFactoryProvider>
    <Component.TopLevelWrapper>
      <CometPlatformAppWrapper
        KeyboardSettingsStateProvider={KeyboardSettingsStateProvider}
        UncaughtErrorFallback={UncaughtErrorFallback}
      >
        <Component.CometRouterStateProvider>
          <Component.DarkModeStateProvider>
            <Component.ChameleonThemeProvider>
              <CometDensityModeStateProvider>
                <CometBackupPlaceholder fallback={null}>
                  {/* <CometHeroInteractionWithDiv interactionDesc="initial load"> */}
                  <RouterProvider router={router} />
                  {CookieConsentDialog && (
                    <CometErrorBoundary>
                      <CookieConsentDialog />
                    </CometErrorBoundary>
                  )}
                  {KeyCommandNub && (
                    <CometErrorBoundary>
                      <KeyCommandNub />
                    </CometErrorBoundary>
                  )}
                  {/* </CometHeroInteractionWithDiv> */}
                </CometBackupPlaceholder>
                {/* CometDOMOnlyBoundary */}
              </CometDensityModeStateProvider>
            </Component.ChameleonThemeProvider>
          </Component.DarkModeStateProvider>
        </Component.CometRouterStateProvider>
      </CometPlatformAppWrapper>
    </Component.TopLevelWrapper>
    // </Component.RelayEnvironmentFactoryProvider>
  );
};
