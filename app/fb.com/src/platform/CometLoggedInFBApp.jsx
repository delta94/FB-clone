import React, { memo } from 'react';
import { CometToasterRoot } from '@fb-toast/CometToasterRoot';

import { CometAppShell } from './CometAppShell';
import { CometAppContentComponent } from './CometAppContentComponent';
import { BaseToasterStateManagerProvider } from '@fb-toast/BaseToasterStateManagerProvider';

export const CometLoggedInFBApp = memo(({ children }) => {
  return (
    <React.Profiler id="CometApp">
      <CometAppShell ToasterStateManagerProvider={BaseToasterStateManagerProvider} toaster={<CometToasterRoot />}>
        <CometAppContentComponent>{children}</CometAppContentComponent>
      </CometAppShell>
    </React.Profiler>
  );
});

// import React, { Fragment, memo } from 'react';
// import CastingProvider from 'CastingProvider';
// import { CometActorGatewayHandler } from 'CometActorGatewayHandler';
// import CometAppContentComponent from 'CometAppContentComponent.react';
// import CometAppShell from 'CometAppShell.react';
// import CometBackupPlaceholder from 'CometBackupPlaceholder.react';
// import CometBlinkingTitleMessageProvider from 'CometBlinkingTitleMessageProvider.react';
// import CometCastingMiniplayerRootDeferred from 'CometCastingMiniplayerRootDeferred.react';
// import CometErrorBoundary from 'CometErrorBoundary.react';
// import CometHovercardSettingsProvider from 'CometHovercardSettingsProvider.react';
// import CometMediaViewerFullscreenProvider from 'CometMediaViewerFullscreenProvider.react';
// import CometPlaceholder from 'CometPlaceholder.react';
// import CometProfileSwitcherProvider from 'CometProfileSwitcherProvider.react';
// import CometProfiler from 'CometProfiler.react';
// import CometQuickPromotionInterstitial from 'CometQuickPromotionInterstitial.react';
// import CometSearchEventEmitterProvider from 'CometSearchEventEmitterProvider';
// import CometToasterRoot from 'CometToasterRoot.react';
// import CometTransientDialogProvider from 'CometTransientDialogProvider.react';
// import CometWatchAndScrollDeferred from 'CometWatchAndScrollDeferred.react';
// import CometWatchAndScrollProvider from 'CometWatchAndScrollProvider.react';
// import FBFamilyCenterScreenTimeTrackingAndEnforcement from 'FBFamilyCenterScreenTimeTrackingAndEnforcement.react';
// import FBPresenceUnifiedContextProvider from 'FBPresenceUnifiedContextProvider.react';
// import HeroInteractionIgnoreWithDiv from 'HeroInteractionIgnoreWithDiv.react';
// import MAWCondWrapperDeferred from 'MAWCondWrapperDeferred.react';
// import MWChatBadgeUpdater from 'MWChatBadgeUpdater.react';
// import MWChatEncryptedBackupsUpsellChatTabVisibilityContextProvider from 'MWChatEncryptedBackupsUpsellChatTabVisibilityContext';
// import MWChatStateV2Provider from 'MWChatStateV2.react';
// import MWChatVideoAutoplaySettingContextProvider from 'MWChatVideoAutoplaySettingContext';
// import MWChatVisibilityOverrideContextProvider from 'MWChatVisibilityOverrideContext';
// import MWV2ChatDeferred from 'MWV2ChatDeferred.react';
// import RTWebPreCallProvider from 'RTWebPreCallProvider.react';
// import deferredLoadComponent from 'deferredLoadComponent';
// import requireDeferred from 'requireDeferred';
// import gkx from 'gkx';
// import recoverableViolation from 'recoverableViolation';
// import suspendOrThrowIfUsedInSSR from 'suspendOrThrowIfUsedInSSR';
// import { CometLogoutProvider } from 'useCometLogout';
// import useCometOutdatedBrowserBanner from 'useCometOutdatedBrowserBanner';

// // Deferred/lazy loaded components.
// const CometStaleSessionReturnToFeedManagerDeferred = deferredLoadComponent(
//   requireDeferred('CometStaleSessionReturnToFeedManager.react').__setRef('CometLoggedInFBApp.react'),
// );
// const RTWebCometCallInviteControllerDeferred = deferredLoadComponent(
//   requireDeferred('RTWebCometCallInviteController.react').__setRef('CometLoggedInFBApp.react'),
// );

// // Some “cr:” modules may be provided via dependency injection.
// import CR10302 from 'cr:10302';
// import CR1599331 from 'cr:1599331';
// import CR5546 from 'cr:5546';
// import CR6784 from 'cr:6784';
// import CR7669 from 'cr:7669';

// // Fallback for a component that may be absent.
// const ChatTabComponent = CR10302 || Fragment;

// function handleError(error) {
//   recoverableViolation('CometLoggedInApp level component did not catch own error', 'CometLoggedInApp', { error });
// }

// // MWChat content (used inside the MWChat section).
// function MWChatContent() {
//   if (gkx('5777')) {
//     suspendOrThrowIfUsedInSSR('Messenger is not enabled for SSR');
//   }
//   return (
//     <CometPlaceholder fallback={null} name="MWChatWrapper">
//       <MAWCondWrapperDeferred>
//         <CometPlaceholder fallback={null} name="MWV2Chat">
//           <MWChatVideoAutoplaySettingContextProvider>
//             <MWV2ChatDeferred />
//           </MWChatVideoAutoplaySettingContextProvider>
//         </CometPlaceholder>
//       </MAWCondWrapperDeferred>
//     </CometPlaceholder>
//   );
// }

// function CometLoggedInFBApp({ displayQueries }) {
//   // Invoke outdated browser banner hook.
//   useCometOutdatedBrowserBanner("/help/210310575676558");

//   // Render toaster and chat tab.
//   const toasterRoot = <CometToasterRoot />;
//   const chatTab = <ChatTabComponent />;

//   // App content component.
//   const appContent = (
//     <CometAppContentComponent
//       profileSwitcherConfigQuery={displayQueries.profileSwitcherConfigQueryRef}
//     />
//   );

//   // Watch-and-scroll section.
//   const watchAndScrollSection = (
//     <CometErrorBoundary onError={handleError}>
//       {CometWatchAndScrollDeferred ? (
//         <CometPlaceholder fallback={null} name="CometWatchAndScrollDeferred">
//           <CometTransientDialogProvider>
//             <CometWatchAndScrollDeferred />
//           </CometTransientDialogProvider>
//         </CometPlaceholder>
//       ) : null}
//     </CometErrorBoundary>
//   );

//   // Casting miniplayer section.
//   const castingMiniplayer = (
//     <CometErrorBoundary onError={handleError}>
//       <CometPlaceholder fallback={null} name="CometCastingMiniplayerRootDeferred">
//         <CometCastingMiniplayerRootDeferred />
//       </CometPlaceholder>
//     </CometErrorBoundary>
//   );

//   // Stale session return-to-feed section.
//   const staleSessionReturnToFeed = (
//     <CometErrorBoundary onError={handleError}>
//       <CometPlaceholder fallback={null} name="CometStaleSessionReturnToFeedManagerDeferred">
//         <CometStaleSessionReturnToFeedManagerDeferred />
//       </CometPlaceholder>
//     </CometErrorBoundary>
//   );

//   // Wrap content with watch-and-scroll and other providers.
//   const appShellContent = (
//     <CometWatchAndScrollProvider>
//       <CastingProvider>
//         <CometMediaViewerFullscreenProvider>
//           <CometProfileSwitcherProvider>
//             {appContent}
//             {watchAndScrollSection}
//             {castingMiniplayer}
//             {staleSessionReturnToFeed}
//           </CometProfileSwitcherProvider>
//         </CometMediaViewerFullscreenProvider>
//       </CastingProvider>
//     </CometWatchAndScrollProvider>
//   );

//   // MWChat section.
//   const chatBadgeUpdater = (
//     <CometPlaceholder fallback={null} name="MWChatBadgeUpdater">
//       <MWChatBadgeUpdater />
//     </CometPlaceholder>
//   );
//   const mwChatSection = (
//     <HeroInteractionIgnoreWithDiv>
//       {chatBadgeUpdater}
//       <CometProfiler id="MWChatTab">
//         <CometErrorBoundary onError={handleError}>
//           <MWChatContent />
//         </CometErrorBoundary>
//       </CometProfiler>
//     </HeroInteractionIgnoreWithDiv>
//   );

//   // Chat tab wrapper with deferred call invite and optional call events.
//   const chatTabWrapper = (
//     <CometBackupPlaceholder fallback={null} name="CometMWChatTabWrapper">
//       {mwChatSection}
//       <CometErrorBoundary onError={handleError}>
//         <CometPlaceholder fallback={null} name="RTWebCometCallInviteControllerDeferred">
//           <RTWebCometCallInviteControllerDeferred />
//         </CometPlaceholder>
//       </CometErrorBoundary>
//       {CR5546 != null ? (
//         <CometErrorBoundary onError={handleError}>
//           <CometPlaceholder fallback={null} name="RTWebCallEventsDeferred">
//             <CR5546 />
//           </CometPlaceholder>
//         </CometErrorBoundary>
//       ) : null}
//     </CometBackupPlaceholder>
//   );

//   // Wrap the main app content and chat tab in several providers.
//   const mainApp = (
//     <CometSearchEventEmitterProvider>
//       <FBFamilyCenterScreenTimeTrackingAndEnforcement>
//         <MWChatStateV2Provider>
//           <MWChatVisibilityOverrideContextProvider>
//             <MWChatEncryptedBackupsUpsellChatTabVisibilityContextProvider>
//               <RTWebPreCallProvider>
//                 <FBPresenceUnifiedContextProvider>
//                   <CometBlinkingTitleMessageProvider>
//                     <CometHovercardSettingsProvider>
//                       <CometLogoutProvider>
//                         {appShellContent}
//                         {chatTabWrapper}
//                       </CometLogoutProvider>
//                     </CometHovercardSettingsProvider>
//                   </CometBlinkingTitleMessageProvider>
//                 </FBPresenceUnifiedContextProvider>
//               </RTWebPreCallProvider>
//             </MWChatEncryptedBackupsUpsellChatTabVisibilityContextProvider>
//           </MWChatVisibilityOverrideContextProvider>
//         </MWChatStateV2Provider>
//       </FBFamilyCenterScreenTimeTrackingAndEnforcement>
//     </CometSearchEventEmitterProvider>
//   );

//   // Browser push root section.
//   const browserPushRoot = CR1599331 ? (
//     <CometErrorBoundary onError={handleError}>
//       <CometPlaceholder fallback={null} name="CometBrowserPushRoot">
//         <CR1599331 />
//       </CometPlaceholder>
//     </CometErrorBoundary>
//   ) : null;

//   // Quick promotion interstitial.
//   const quickPromotionInterstitial = (
//     <CometErrorBoundary onError={handleError}>
//       <CometPlaceholder fallback={null} name="CometQuickPromotionInterstitial">
//         <CometQuickPromotionInterstitial />
//       </CometPlaceholder>
//     </CometErrorBoundary>
//   );

//   // Actor gateway handler section.
//   const actorGatewayHandler = (
//     <CometErrorBoundary onError={handleError}>
//       <CometBackupPlaceholder fallback={null} name="CometActorGatewayHandler">
//         <CometActorGatewayHandler />
//       </CometBackupPlaceholder>
//     </CometErrorBoundary>
//   );
//   const cr7669Component = CR7669 ? <CR7669 /> : null;

//   // Final app shell wrapped in profiler.
//   return (
//     <CometProfiler id="CometApp" logDurationToQPL={true}>
//       <CometAppShell ToasterStateManagerProvider={CR6784} toaster={toasterRoot}>
//         {chatTab}
//         {mainApp}
//         {browserPushRoot}
//         {quickPromotionInterstitial}
//         {actorGatewayHandler}
//         {cr7669Component}
//       </CometAppShell>
//     </CometProfiler>
//   );
// }

// export default memo(CometLoggedInFBApp);
