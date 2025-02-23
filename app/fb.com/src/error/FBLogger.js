import { fbError } from '@fb-error/fb-error';

export const {
  err: createError,
  ErrorBrowserConsole,
  ErrorDynamicData,
  ErrorFilter,
  ErrorGlobalEventHandler,
  ErrorGuard,
  ErrorGuardState,
  ErrorMetadata,
  ErrorNormalizeUtils,
  ErrorPoster,
  ErrorPubSub,
  ErrorSerializer,
  ErrorSetup,
  ErrorXFBDebug,
  FBLogger,
  getErrorSafe,
  getSimpleHash,
  TAAL,
  TAALOpcode,
  renameFunction,
} = fbError;
