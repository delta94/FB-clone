/**
 * Changelog:
 * - 09/12/2024
 */

import { ErrorMetadata } from './ErrorMetadata';

// Severity levels
const Severity = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5,
};

// eslint-disable-next-line complexity
function aggregateError(targetError, sourceError) {
  if (Object.isFrozen(targetError)) return;

  if (sourceError.type && (!targetError.type || Severity[targetError.type] > Severity[sourceError.type])) {
    targetError.type = sourceError.type;
  }

  const sourceMetadata = sourceError.metadata;
  if (sourceMetadata) {
    const targetMetadata = targetError.metadata || new ErrorMetadata();
    sourceMetadata.addEntries(...sourceMetadata.getAll());
    targetError.metadata = targetMetadata;
  }

  if (sourceError.project) targetError.project = sourceError.project;
  if (sourceError.errorName) targetError.errorName = sourceError.errorName;
  if (sourceError.componentStack) targetError.componentStack = sourceError.componentStack;
  if (sourceError.deferredSource) targetError.deferredSource = sourceError.deferredSource;
  if (sourceError.blameModule) targetError.blameModule = sourceError.blameModule;
  if (sourceError.loggingSource) targetError.loggingSource = sourceError.loggingSource;

  let messageFormat = targetError.messageFormat || targetError.message;
  let messageParams = targetError.messageParams || [];
  if (messageFormat !== sourceError.messageFormat && sourceError.messageFormat) {
    messageFormat += ' [Caught in: ' + sourceError.messageFormat + ']';

    const params =
      sourceError.messageParams !== undefined && sourceError.messageParams !== null ? sourceError.messageParams : [];

    messageParams.push(params);
  }
  targetError.messageFormat = messageFormat;
  targetError.messageParams = messageParams;

  const forcedKey =
    sourceError.forcedKey && targetError.forcedKey
      ? sourceError.forcedKey + '_' + targetError.forcedKey
      : sourceError.forcedKey
      ? sourceError.forcedKey
      : targetError.forcedKey;
  targetError.forcedKey = forcedKey;
}

function formatMessage(message, params) {
  let index = 0;
  let formattedMessage = String(message).replace(/%s/g, () => {
    return index < params.length ? params[index++] : 'NOPARAM';
  });
  if (index < params.length) {
    return formattedMessage + ' PARAMS' + JSON.stringify(params.slice(index));
  }
  return formattedMessage;
}

// Utility to convert error to readable message
function toReadableMessage(error) {
  const message = error.messageFormat || error.message;
  return formatMessage(message, error.messageParams || []);
}

// Utility to convert params to string array
function toStringParams(params) {
  return (params || []).map((param) => String(param));
}

export const ErrorSerializer = {
  aggregateError,
  toReadableMessage,
  toStringParams,
};
