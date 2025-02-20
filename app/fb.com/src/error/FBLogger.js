/**
 * Changelog:
 * - 09/12/2024
 */

import { ErrorMetadata } from './ErrorMetadata';
import { FBLogMessage } from './FBLogMessage';

export function FBLogger(projectName, occurAt) {
  const fbLogMessage = new FBLogMessage(projectName);
  return occurAt ? fbLogMessage.event(projectName + '.' + occurAt) : fbLogMessage;
}

FBLogger.addGlobalMetadata = function (a, b, c) {
  ErrorMetadata.addGlobalMetadata(a, b, c);
};
