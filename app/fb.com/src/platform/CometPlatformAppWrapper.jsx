import React, { useCallback } from 'react';
import { CometErrorProjectContext, CometAccessibilityAlertProvider } from '@fb-contexts';
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
  function handleSuspenseCallback() {
    recoverableViolation(
      'Top level suspense boundary triggered, a component suspended outside of a CometPlaceholder, description: ' +
        description,
      'comet_infra',
    );
  }

  const fallback = useCallback(() => {
    return !UncaughtErrorFallback ? null : (
      <CometPlaceholder fallback={null}>
        <UncaughtErrorFallback />
      </CometPlaceholder>
    );
  }, [UncaughtErrorFallback]);

  const ProviderComponent = KeyboardSettingsStateProvider ?? Fragment;
  const keyCommandDialogs = <CometSetKeyCommandWrapperDialogs />;
  const accessibilityWrapper = <CometAccessibilityAlertProvider>{children}</CometAccessibilityAlertProvider>;

  const keyCommandContainer = (
    <TopLevelKeyCommandListener>
      <CometTransientDialogProvider>
        {accessibilityWrapper}
        {keyCommandDialogs}
      </CometTransientDialogProvider>
    </TopLevelKeyCommandListener>
  );

  const providerWrappedComponent = <ProviderComponent>{keyCommandContainer}</ProviderComponent>;
  const ssrMultipassWrapper = <CometSSRMultipassBoundary>{providerWrappedComponent}</CometSSRMultipassBoundary>;

  return (
    <CometErrorProjectContext.Provider value="comet_root">
      <React.Suspense fallback={null} suspenseCallback={handleSuspenseCallback}>
        <CometErrorBoundary
          context={{
            project: 'comet_platform_root_boundary',
          }}
          fallback={fallback}
          type="fatal"
        >
          {ssrMultipassWrapper}
        </CometErrorBoundary>
      </React.Suspense>
    </CometErrorProjectContext.Provider>
  );
};
