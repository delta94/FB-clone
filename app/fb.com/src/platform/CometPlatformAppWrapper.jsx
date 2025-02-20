import React, { useCallback } from 'react';
import { CometErrorProjectContext } from '@fb-contexts';
import { CometSSRMultipassBoundary } from '@fb-dump/CometSSRMultipassBoundary';
import { CometErrorBoundary } from '@fb-error/CometErrorBoundary';
import { recoverableViolation } from '@fb-error/recoverableViolation';
import { TopLevelKeyCommandListener } from '@fb-keyboard/TopLevelKeyCommandListener';
import { CometPlaceholder } from '@fb-placeholder/CometPlaceholder';
import { CometTransientDialogProvider } from '@fb-dialog/CometTransientDialogProvider';
export const CometPlatformAppWrapper = ({
  KeyboardSettingsStateProvider = React.Fragment,
  UncaughtErrorFallback,
  children,
  disableTimeSpentLogging = !1,
}) => {
  const fallback = useCallback(() => {
    return !UncaughtErrorFallback ? null : (
      <CometPlaceholder fallback={null}>
        <UncaughtErrorFallback />
      </CometPlaceholder>
    );
  }, [UncaughtErrorFallback]);

  return (
    <CometErrorProjectContext.Provider value="comet_root">
      <React.Suspense
        fallback={null}
        suspenseCallback={() => {
          recoverableViolation(
            'Top level suspense boundary triggered, a component suspended outside of a CometPlaceholder, description: ' +
              'a',
            'comet_infra',
          );
        }}
      >
        <CometErrorBoundary
          context={{
            project: 'comet_platform_root_boundary',
          }}
          fallback={fallback}
          type="fatal"
        >
          <CometSSRMultipassBoundary fallback={null} id="_root">
            <KeyboardSettingsStateProvider>
              <TopLevelKeyCommandListener>
                <CometTransientDialogProvider>
                  {/* <CometAccessibilityAlertProvider> */}
                  {children}
                  {/* </CometAccessibilityAlertProvider> */}
                  {/* <CometSetKeyCommandWrapperDialogs /> */}
                </CometTransientDialogProvider>
              </TopLevelKeyCommandListener>
            </KeyboardSettingsStateProvider>
          </CometSSRMultipassBoundary>
        </CometErrorBoundary>
      </React.Suspense>
    </CometErrorProjectContext.Provider>
  );
};
