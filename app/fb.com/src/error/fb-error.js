/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/* eslint-disable complexity */
import removeFromArray from 'fbjs/lib/removeFromArray';

import performanceNowSinceAppStart from './performanceNowSinceAppStart';

const TAALOpcode = {
  PREVIOUS_FILE: 1,
  PREVIOUS_FRAME: 2,
  PREVIOUS_DIR: 3,
  FORCED_KEY: 4,
};

const createError = (message, ...params) => {
  let error = new Error(message);
  if (error.stack === undefined) {
    try {
      throw error;
    } catch (e) {}
  }
  error.messageFormat = message;
  error.messageParams = params.map(String);
  error.taalOpcodes = [TAALOpcode.PREVIOUS_FRAME];
  return error;
};

let hasLoggedError = false;

const ErrorBrowserConsole = {
  errorListener: (error) => {
    const consoleMethod = console[error.type] ? error.type : 'error';
    if (error.type === 'fatal' || (consoleMethod === 'error' && !hasLoggedError)) {
      console.error(
        `ErrorUtils caught an error:\n\n${error.message}\n\nSubsequent non-fatal errors won't be logged; see https://fburl.com/debugjs.`,
      );
      hasLoggedError = true;
    }
  },
};

const ErrorDynamicData = { access_token: null };
const MAX_REPORT_COUNT = 6;
const REPORT_INTERVAL = 60000;
const BUFFER_DURATION = 10 * REPORT_INTERVAL;
const errorsSeen = new Map();
let lastCleanup = 0;

const resetErrorCounter = () => {
  const now = performanceNowSinceAppStart();
  if (now > lastCleanup + REPORT_INTERVAL) {
    const cutoff = now - BUFFER_DURATION;
    for (const [key, value] of errorsSeen) {
      if (value.lastAccessed < cutoff) {
        errorsSeen.delete(key);
      }
    }
    lastCleanup = now;
  }
};

const shouldLogError = (hash) => {
  resetErrorCounter();
  const now = performanceNowSinceAppStart();
  const logEntry = errorsSeen.get(hash);
  if (!logEntry) {
    errorsSeen.set(hash, { dropped: 0, logged: [now], lastAccessed: now });
    return 1;
  }
  const { dropped, logged } = logEntry;
  logEntry.lastAccessed = now;
  while (logged[0] < now - REPORT_INTERVAL) {
    logged.shift();
  }
  if (logged.length < MAX_REPORT_COUNT) {
    logEntry.dropped = 0;
    logged.push(now);
    return dropped + 1;
  } else {
    logEntry.dropped++;
    return null;
  }
};

const ErrorFilter = {
  shouldLog: (error) => shouldLogError(error.hash),
};

const RE_EXN_ID = 'RE_EXN_ID';

const getErrorSafe = (error) => {
  let safeError = null;
  if (error === null || typeof error !== 'object') {
    safeError = createError('Non-object thrown: %s', String(error));
  } else if (Object.prototype.hasOwnProperty.call(error, RE_EXN_ID)) {
    safeError = createError('Rescript exception thrown: %s', JSON.stringify(error));
  } else if (typeof error?.then === 'function') {
    safeError = createError('Promise thrown: %s', JSON.stringify(error));
  } else if (typeof error.message !== 'string') {
    safeError = createError('Non-error thrown: %s, keys: %s', String(error), JSON.stringify(Object.keys(error).sort()));
  } else if (error.messageFormat !== null && typeof error.messageFormat !== 'string') {
    safeError = createError(
      'Error with non-string messageFormat thrown: %s, %s, keys: %s',
      String(error.message),
      String(error),
      JSON.stringify(Object.keys(error).sort()),
    );
  } else if (Object.isExtensible && !Object.isExtensible(error)) {
    safeError = createError('Non-extensible thrown: %s', String(error.message));
  }
  if (safeError !== null) {
    safeError.taalOpcodes = safeError.taalOpcodes || [];
    safeError.taalOpcodes.push(TAALOpcode.PREVIOUS_FRAME);
    return safeError;
  }
  return error;
};

const globalOnErrorName = typeof window === 'undefined' ? '<self.onerror>' : '<window.onerror>';

let errorReporter;

const handleGlobalError = (event) => {
  const error = event.error !== null ? getErrorSafe(event.error) : createError(event.message || '');
  if (error.fileName === null && event.filename !== null) error.fileName = event.filename;
  if (error.line === null && event.lineno !== null) error.line = event.lineno;
  if (error.column === null && event.colno !== null) error.column = event.colno;
  error.guardList = [globalOnErrorName];
  error.loggingSource = 'ONERROR';
  errorReporter?.reportError(error);
};

const ErrorGlobalEventHandler = {
  setup: (reporter) => {
    if (typeof window.addEventListener !== 'function') return;
    if (errorReporter !== null) return;
    errorReporter = reporter;
    window.addEventListener('error', handleGlobalError);
  },
};

const guardStack = [];

const ErrorGuardState = {
  pushGuard: (guard) => guardStack.unshift(guard),
  popGuard: () => guardStack.shift(),
  inGuard: () => guardStack.length !== 0,
  cloneGuardList: () => guardStack.map((guard) => guard.name),
  findDeferredSource: () => {
    for (const guard of guardStack) {
      if (guard.deferredSource !== null) return guard.deferredSource;
    }
  },
};

const categorizeError = (error) => {
  if (error.type !== null) return error.type;
  if (error.loggingSource === 'GUARDED' || error.loggingSource === 'ERROR_BOUNDARY') return 'fatal';
  if (error.name === 'SyntaxError') return 'fatal';
  if (error.loggingSource === 'ONERROR' && error.message.includes('ResizeObserver loop')) return 'warn';
  return error.stack !== null && error.stack.includes('chrome-extension://') ? 'warn' : 'error';
};

let globalMetadata = [];

class ErrorMetadata {
  constructor() {
    this.metadata = [...globalMetadata];
  }

  addEntries(...entries) {
    this.metadata.push(...entries);
    return this;
  }

  addEntry(key, value, extra) {
    this.metadata.push([key, value, extra]);
    return this;
  }

  isEmpty() {
    return this.metadata.length === 0;
  }

  clearEntries() {
    this.metadata = [];
  }

  format() {
    return this.metadata.map((entry) =>
      entry.map((item) => (item !== null ? String(item).replace(/:/g, '_') : '')).join(':'),
    );
  }

  getAll() {
    return this.metadata;
  }

  static addGlobalMetadata(key, value, extra) {
    globalMetadata.push([key, value, extra]);
  }

  static getGlobalMetadata() {
    return globalMetadata;
  }

  static unsetGlobalMetadata(key, value) {
    globalMetadata = globalMetadata.filter(
      (entry) => !(Array.isArray(entry) && entry[0] === key && entry[1] === value),
    );
  }
}

const logLevels = { debug: 1, info: 2, warn: 3, error: 4, fatal: 5 };

function aggregateError(target, source) {
  if (Object.isFrozen(target)) return;

  if (source.type && (!target.type || logLevels[target.type] > logLevels[source.type])) {
    target.type = source.type;
  }

  let sourceMetadata = source.metadata;
  if (sourceMetadata !== null) {
    let targetMetadata = target.metadata !== null ? target.metadata : new ErrorMetadata();
    targetMetadata.addEntries(...sourceMetadata.getAll());
    target.metadata = targetMetadata;
  }

  if (source.project !== null) target.project = source.project;
  if (source.errorName !== null) target.errorName = source.errorName;
  if (source.componentStack !== null) target.componentStack = source.componentStack;
  if (source.deferredSource !== null) target.deferredSource = source.deferredSource;
  if (source.blameModule !== null) target.blameModule = source.blameModule;
  if (source.loggingSource !== null) target.loggingSource = source.loggingSource;

  let targetMessageFormat = target.messageFormat !== null ? target.messageFormat : target.message;
  let targetMessageParams = target.messageParams !== null ? target.messageParams : [];

  if (targetMessageFormat !== source.messageFormat && source.messageFormat !== null) {
    targetMessageFormat += ` [Caught in: ${source.messageFormat}]`;
    targetMessageParams.push(...(source.messageParams !== null ? source.messageParams : []));
  }

  target.messageFormat = targetMessageFormat;
  target.messageParams = targetMessageParams;

  const sourceForcedKey = source.forcedKey;
  const targetForcedKey = target.forcedKey;

  target.forcedKey =
    sourceForcedKey !== null && targetForcedKey !== null
      ? `${sourceForcedKey}_${targetForcedKey}`
      : sourceForcedKey !== null
      ? sourceForcedKey
      : targetForcedKey;
}

function toReadableMessage(error) {
  const message = error.messageFormat ?? error.message;
  return formatMessage(message, error.messageParams || []);
}

function formatMessage(message, params) {
  let paramIndex = 0;
  message = String(message).replace(/%s/g, () => (paramIndex < params.length ? params[paramIndex++] : 'NOPARAM'));
  if (paramIndex < params.length) {
    message += ' PARAMS' + JSON.stringify(params.slice(paramIndex));
  }
  return message;
}

function toStringParams(params) {
  return (params ?? []).map(String);
}

const ErrorSerializer = {
  aggregateError,
  toReadableMessage,
  toStringParams,
};

const maxDebugLogs = 5;
const debugLogs = [];

function addDebugLog(log) {
  debugLogs.push(log);
  if (debugLogs.length > maxDebugLogs) {
    debugLogs.shift();
  }
}

function addDebugLogFromXHR(xhr) {
  const headers = xhr.getAllResponseHeaders();
  if (headers && headers.includes('X-FB-Debug')) {
    const debugHeader = xhr.getResponseHeader('X-FB-Debug');
    if (debugHeader) {
      addDebugLog(debugHeader);
    }
  }
}

function getAllDebugLogs() {
  return debugLogs;
}

const ErrorXFBDebug = {
  add: addDebugLog,
  addFromXHR: addDebugLogFromXHR,
  getAll: getAllDebugLogs,
};

const simpleHashCharacters = 'abcdefghijklmnopqrstuvwxyz012345';

function getSimpleHash(...args) {
  let hash = 0;
  for (const arg of args) {
    if (arg !== null) {
      for (let i = 0; i < arg.length; i++) {
        hash = (hash << 5) - hash + arg.charCodeAt(i);
      }
    }
  }
  let hashString = '';
  for (let i = 0; i < 6; i++) {
    hashString = simpleHashCharacters.charAt(hash & 31) + hashString;
    hash >>= 5;
  }
  return hashString;
}

const stackFramePatterns = [
  /\(([^\s\)\()]+):(\d+):(\d+)\)$/,
  /@([^\s\)\()]+):(\d+):(\d+)$/,
  /^([^\s\)\()]+):(\d+):(\d+)$/,
  /^at ([^\s\)\()]+):(\d+):(\d+)$/,
];

const stackTraceHeaderPattern = /^\w+:\s.*?\n/g;

if (Error.stackTraceLimit !== null && Error.stackTraceLimit < 80) {
  Error.stackTraceLimit = 80;
}

function cleanStackTrace(error) {
  const { name, message, stack } = error;
  if (stack === null) return null;
  if (name !== null && message !== null && message !== '') {
    const header = `${name}: ${message}\n`;
    if (stack.startsWith(header)) return stack.substr(header.length);
    if (stack === `${name}: ${message}`) return null;
  }
  if (name !== null) {
    const header = `${name}\n`;
    if (stack.startsWith(header)) return stack.substr(header.length);
  }
  if (message !== null && message !== '') {
    const separator = `: ${message}\n`;
    const separatorIndex = stack.indexOf(separator);
    const prefix = stack.substring(0, separatorIndex);
    if (/^\w+$/.test(prefix)) return stack.substring(separatorIndex + separator.length);
  }
  return stack.replace(stackTraceHeaderPattern, '');
}

function parseStackFrame(frame) {
  frame = frame.trim();
  let identifier;
  let script;
  let line;
  let column;

  if (frame.includes('charset=utf-8;base64,')) {
    identifier = '<inlined-file>';
  } else {
    let match;
    for (const pattern of stackFramePatterns) {
      match = frame.match(pattern);
      if (match !== null) break;
    }
    if (match !== null && match.length === 4) {
      [script, line, column] = [match[1], parseInt(match[2], 10), parseInt(match[3], 10)];
      identifier = frame.substring(0, frame.length - match[0].length);
    } else {
      identifier = frame;
    }
    identifier = identifier.replace(/^at /, '').trim();
  }

  const stackFrame = { identifier, script, line, column };
  stackFrame.text = formatStackFrame(stackFrame);
  return stackFrame;
}

function parseStackFrames(stack) {
  if (stack === null || stack === '') return [];
  return stack.split(/\n\n/)[0].split('\n').map(parseStackFrame);
}

function extractAndParseStackFrames(error) {
  const cleanedStack = cleanStackTrace(error);
  return parseStackFrames(cleanedStack);
}

function parseComponentStack(stack) {
  if (stack === null || stack === '') return null;
  const lines = stack.split('\n');
  lines.splice(0, 1);
  return lines.map((line) => line.trim());
}

function formatStackFrame({ identifier, script, line, column }) {
  let formattedFrame = `    at ${identifier ?? '<unknown>'}`;
  if (script !== null && line !== null && column !== null) {
    formattedFrame += ` (${script}:${line}:${column})`;
  }
  return formattedFrame;
}

function normalizeError(error) {
  const stackFrames = extractAndParseStackFrames(error);
  const taalOpcodes = error.taalOpcodes ?? [];
  let framesToPop = error.framesToPop;

  if (framesToPop !== null) {
    framesToPop = Math.min(framesToPop, stackFrames.length);
    while (framesToPop-- > 0) {
      taalOpcodes.unshift(TAALOpcode.PREVIOUS_FRAME);
    }
  }

  const messageFormat = error.messageFormat ?? error.message;
  const messageParams = (error.messageParams ?? []).map(String);
  const reactComponentStack = parseComponentStack(error.componentStack);
  const componentStackFrames = reactComponentStack === null ? null : reactComponentStack.map(parseStackFrame);
  let metadata = error.metadata ? error.metadata.format() : new ErrorMetadata().format();
  if (metadata.length === 0) metadata = undefined;

  const stack = stackFrames.map((frame) => frame.text).join('\n');
  const errorName = error.errorName ?? error.name;
  const type = categorizeError(error);
  const loggingSource = error.loggingSource;
  const project = error.project;
  let line = error.lineNumber ?? error.line;
  let column = error.columnNumber ?? error.column;
  let script = error.fileName ?? error.sourceURL;
  const hasFrames = stackFrames.length > 0;

  if (hasFrames && line === null) line = stackFrames[0].line;
  if (hasFrames && column === null) column = stackFrames[0].column;
  if (hasFrames && script === null) script = stackFrames[0].script;

  const normalizedError = {
    blameModule: error.blameModule,
    column: column === null ? null : String(column),
    clientTime: Math.floor(Date.now() / 1000),
    componentStackFrames,
    deferredSource: error.deferredSource !== null ? normalizeError(error.deferredSource) : null,
    extra: error.extra ?? {},
    fbtrace_id: error.fbtrace_id,
    guardList: error.guardList ?? [],
    hash: getSimpleHash(errorName, stack, type, project, loggingSource),
    isNormalizedError: true,
    line: line === null ? null : String(line),
    loggingSource,
    message: ErrorSerializer.toReadableMessage(error),
    messageFormat,
    messageParams,
    metadata,
    name: errorName,
    page_time: Math.floor(performanceNowSinceAppStart()),
    project,
    reactComponentStack,
    script,
    serverHash: error.serverHash,
    stack,
    stackFrames,
    type,
    xFBDebug: ErrorXFBDebug.getAll(),
  };

  if (error.forcedKey !== null) normalizedError.forcedKey = error.forcedKey;
  if (taalOpcodes.length > 0) normalizedError.taalOpcodes = taalOpcodes;

  const location = window.location;
  if (location) normalizedError.windowLocationURL = location.href;

  for (const key in normalizedError) {
    if (normalizedError[key] === null) delete normalizedError[key];
  }

  return normalizedError;
}

function ifNormalizedError(error) {
  return error !== null && typeof error === 'object' && error.isNormalizedError === true ? error : null;
}

const ErrorNormalizeUtils = {
  formatStackFrame: formatStackFrame,
  normalizeError,
  ifNormalizedError,
};

const globalReactGuard = '<global.react>';
const errorHistory = [];
const listeners = [];
const maxErrorHistory = 50;
let inReportError = false;

const ErrorPubSub = {
  history: errorHistory,
  addListener(listener, emitHistory = false) {
    listeners.push(listener);
    if (!emitHistory) {
      errorHistory.forEach((error) => {
        const source = error.loggingSource ?? 'DEPRECATED';
        listener(error, source);
      });
    }
  },
  unshiftListener(listener) {
    listeners.unshift(listener);
  },
  removeListener(listener) {
    removeFromArray(listeners, listener);
  },
  reportError(error) {
    const normalizedError = ErrorNormalizeUtils.normalizeError(error);
    this.reportNormalizedError(normalizedError);
  },
  reportNormalizedError(normalizedError) {
    if (inReportError) return false;

    let guardList = ErrorGuardState.cloneGuardList();
    if (normalizedError.componentStackFrames) guardList.unshift(globalReactGuard);
    if (guardList.length > 0) normalizedError.guardList = guardList;
    if (normalizedError.deferredSource === null) {
      const deferredSource = ErrorGuardState.findDeferredSource();
      if (deferredSource !== null) {
        normalizedError.deferredSource = ErrorNormalizeUtils.normalizeError(deferredSource);
      }
    }

    if (errorHistory.length > maxErrorHistory) {
      errorHistory.splice(maxErrorHistory / 2, 1);
    }
    errorHistory.push(normalizedError);

    inReportError = true;
    for (const listener of listeners) {
      try {
        const source = normalizedError.loggingSource ?? 'DEPRECATED';
        listener(normalizedError, source);
      } catch (e) {}
    }
    inReportError = false;

    return true;
  },
};

ErrorPubSub.addListener(ErrorBrowserConsole.errorListener);

const anonymousGuard = '<anonymous guard>';
let skipGlobalGuard = false;

const ErrorGuard = {
  // eslint-disable-next-line max-params
  applyWithGuard(fn, context, args, options) {
    ErrorGuardState.pushGuard({
      name:
        (options?.name !== null ? options.name : null) || (fn.name ? `func_name:${fn.name}` : null) || anonymousGuard,
      deferredSource: options?.deferredSource,
    });

    if (skipGlobalGuard) {
      try {
        return fn.apply(context, args);
      } finally {
        ErrorGuardState.popGuard();
      }
    }

    try {
      return Function.prototype.apply.call(fn, context, args);
    } catch (error) {
      try {
        context = options !== null ? options : { ...null };
        const deferredSource = context.deferredSource;
        const onError = context.onError;
        const onNormalizedError = context.onNormalizedError;
        const safeError = getErrorSafe(error);
        const errorInfo = {
          deferredSource,
          loggingSource: 'GUARDED',
          project: options?.project ?? 'ErrorGuard',
          type: options?.errorType,
        };

        ErrorSerializer.aggregateError(safeError, errorInfo);
        const normalizedError = ErrorNormalizeUtils.normalizeError(safeError);

        if (safeError === null && fn) {
          normalizedError.extra[fn.toString().substring(0, 100)] = 'function';
          if (args !== null && args.length) {
            normalizedError.extra[Array.from(args).toString().substring(0, 100)] = 'args';
          }
        }

        normalizedError.guardList = ErrorGuardState.cloneGuardList();
        if (onError) onError(safeError);
        if (onNormalizedError) onNormalizedError(normalizedError);
        ErrorPubSub.reportNormalizedError(normalizedError);
      } catch (e) {}
    } finally {
      ErrorGuardState.popGuard();
    }
  },

  guard(fn, options) {
    const guardedFn = function (...args) {
      // eslint-disable-next-line no-invalid-this
      return ErrorGuard.applyWithGuard(fn, this, args, options);
    };
    if (fn.__SMmeta) guardedFn.__SMmeta = fn.__SMmeta;
    return guardedFn;
  },

  inGuard() {
    return ErrorGuardState.inGuard();
  },

  skipGuardGlobal(skip) {
    skipGlobalGuard = skip;
  },
};

const maxLength = 1024;
const ancestorHashes = [];
let pagePosition = 0;

const toString = (value) => String(value);

const nullableString = (value) => (value === null ? null : String(value));

const mergeExtras = (extra1, extra2) => {
  const result = {};
  if (extra2) {
    extra2.forEach((key) => {
      result[key] = true;
    });
  }
  Object.keys(extra1).forEach((key) => {
    if (extra1[key]) {
      result[key] = true;
    } else if (result[key]) {
      delete result[key];
    }
  });
  return Object.keys(result);
};

const serializeStackFrames = (frames) => {
  return (frames ?? []).map((frame) => ({
    column: nullableString(frame.column),
    identifier: frame.identifier,
    line: nullableString(frame.line),
    script: frame.script,
  }));
};

const truncateMessage = (message) => {
  const str = String(message);
  return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
};

const createErrorPayload = (error, context) => {
  const payload = {
    appId: nullableString(context.appId),
    cavalry_lid: context.cavalry_lid,
    access_token: ErrorDynamicData.access_token,
    ancestor_hash: error.hash,
    bundle_variant: nullableString(context.bundle_variant),
    clientTime: toString(error.clientTime),
    column: error.column,
    componentStackFrames: serializeStackFrames(error.componentStackFrames),
    events: error.events,
    extra: mergeExtras(error.extra, context.extra),
    forcedKey: error.forcedKey,
    frontend_env: nullableString(context.frontend_env),
    guardList: error.guardList,
    line: error.line,
    loggingFramework: context.loggingFramework,
    messageFormat: truncateMessage(error.messageFormat),
    messageParams: error.messageParams.map(truncateMessage),
    name: error.name,
    sample_weight: nullableString(context.sample_weight),
    script: error.script,
    site_category: context.site_category,
    stackFrames: serializeStackFrames(error.stackFrames),
    type: error.type,
    page_time: nullableString(error.page_time),
    project: error.project,
    push_phase: context.push_phase,
    report_source: context.report_source,
    report_source_ref: context.report_source_ref,
    rollout_hash: nullableString(context.rollout_hash),
    script_path: context.script_path,
    server_revision: nullableString(context.server_revision),
    spin: nullableString(context.spin),
    svn_rev: toString(context.client_revision),
    additional_client_revisions: Array.from(context.additional_client_revisions ?? []).map(toString),
    taalOpcodes: error.taalOpcodes ? error.taalOpcodes.map((opcode) => opcode) : null,
    web_session_id: context.web_session_id,
    version: '3',
    xFBDebug: error.xFBDebug,
  };

  if (error.blameModule !== null) payload.blameModule = String(error.blameModule);
  if (error.deferredSource?.stackFrames) {
    payload.deferredSource = {
      stackFrames: serializeStackFrames(error.deferredSource.stackFrames),
    };
  }
  if (error.metadata) payload.metadata = error.metadata;
  if (error.loadingUrls) payload.loadingUrls = error.loadingUrls;
  if (error.serverHash !== null) payload.serverHash = error.serverHash;
  if (error.windowLocationURL !== null) payload.windowLocationURL = error.windowLocationURL;
  if (error.loggingSource !== null) payload.loggingSource = error.loggingSource;

  return payload;
};

const postError = (error, context, callback) => {
  pagePosition++;
  if (context.sample_weight === 0) return false;

  const shouldLog = ErrorFilter.shouldLog(error);
  if (shouldLog === null) return false;

  if (context.projectBlocklist?.includes(error.project)) return false;

  const payload = createErrorPayload(error, context);
  Object.assign(payload, {
    ancestors: ancestorHashes.slice(),
    clientWeight: toString(shouldLog),
    page_position: toString(pagePosition),
  });

  if (ancestorHashes.length < 15) {
    ancestorHashes.push(error.hash);
  }

  callback(payload);
  return true;
};

const ErrorPoster = { createErrorPayload, postError };
let unhandledRejectionReporter = null;
let unhandledRejectionSetup = false;

const handleUnhandledRejection = (event) => {
  if (unhandledRejectionReporter === null) return;
  const reporter = unhandledRejectionReporter;
  let reason = event.reason;
  let customError;
  let normalizedError = getErrorSafe(reason);
  let customName = null;

  if (reason !== normalizedError && typeof reason === 'object' && reason !== null) {
    customError = Object.keys(reason).sort().slice(0, 3);
    if (typeof reason.message !== 'string' && typeof reason.messageFormat === 'string') {
      reason.message = reason.messageFormat;
      normalizedError = getErrorSafe(reason);
    }
    if (typeof reason.message !== 'string' && typeof reason.errorMsg === 'string') {
      if (/^\s*\<!doctype/i.test(reason.errorMsg)) {
        const match = /<title>([^<]+)<\/title>(?:(?:.|\n)*<h1>([^<]+)<\/h1>)?/im.exec(reason.errorMsg);
        if (match) {
          normalizedError = createError('HTML document with title="%s" and h1="%s"', match[1] ?? '', match[2] ?? '');
        } else {
          normalizedError = createError('HTML document sanitized');
        }
      } else if (/^\s*<\?xml/i.test(reason.errorMsg)) {
        normalizedError = createError('XML document sanitized');
      } else {
        reason.message = reason.errorMsg;
        normalizedError = getErrorSafe(reason);
      }
    }
    if (normalizedError !== reason && typeof reason.name === 'string') {
      customName = reason.name;
    }
    if (typeof reason.name !== 'string' && typeof reason.errorCode === 'string') {
      customName = `UnhandledRejectionWith_errorCode_${reason.errorCode}`;
    }
    if (typeof reason.name !== 'string' && typeof reason.error === 'number') {
      customName = `UnhandledRejectionWith_error_${String(reason.error)}`;
    }
  }
  normalizedError.loggingSource = 'ONUNHANDLEDREJECTION';
  try {
    normalizedError.name =
      normalizedError === reason && customName !== null && customName !== ''
        ? customName
        : typeof reason?.name === 'string' && reason.name !== ''
        ? reason.name
        : customError !== null && customError.length > 0
        ? `UnhandledRejectionWith_${customError.join('_')}`
        : `UnhandledRejection_${reason === null ? 'null' : typeof reason}`;
  } catch (e) {}

  try {
    let stack = reason?.stack ?? normalizedError.stack ?? createError('').stack;
    normalizedError.stack = `${normalizedError.name}: ${normalizedError.message}\n${stack
      .split('\n')
      .slice(1)
      .join('\n')}`;
  } catch (e) {}

  try {
    const promise = event.promise;
    normalizedError.stack +=
      (promise?.settledStack ? `\n    at <promise_settled_stack_below>\n${promise.settledStack}` : '') +
      (promise?.createdStack ? `\n    at <promise_created_stack_below>\n${promise.createdStack}` : '');
  } catch (e) {}

  reporter.reportError(normalizedError);
  event.preventDefault();
};

const setupUnhandledRejection = (reporter) => {
  unhandledRejectionReporter = reporter;
  if (typeof window.addEventListener === 'function' && !unhandledRejectionSetup) {
    unhandledRejectionSetup = true;
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
  }
};

const UnhandledRejectionHandler = {
  onunhandledrejection: handleUnhandledRejection,
  setup: setupUnhandledRejection,
};

const ErrorSetup = {
  preSetup(options) {
    if (options === null || options.ignoreOnError !== true) {
      ErrorGlobalEventHandler.setup(ErrorPubSub);
    }
    if (options === null || options.ignoreOnUnhandledRejection !== true) {
      UnhandledRejectionHandler.setup(ErrorPubSub);
    }
  },
  setup(defaultOptions, callback, contextProvider) {
    ErrorPubSub.addListener((error) => {
      const context = {
        ...defaultOptions,
        ...(contextProvider ? contextProvider() : {}),
      };
      ErrorPoster.postError(error, context, callback);
    });
  },
};

const maxEvents = 20;

class FBLogger {
  constructor(project) {
    this.project = project;
    this.events = [];
    this.metadata = new ErrorMetadata();
    this.taalOpcodes = [];
  }

  logError(level, format, ...params) {
    const message = String(format);
    const events = this.events;
    const project = this.project;
    const metadata = this.metadata;
    const blameModule = this.blameModule;
    const forcedKey = this.forcedKey;
    const error = this.error;
    let normalizedError;

    if (this.normalizedError) {
      normalizedError = {
        ...this.normalizedError,
        messageFormat: `${this.normalizedError.messageFormat} [Caught in: ${message}]`,
        messageParams: ErrorSerializer.toStringParams([...this.normalizedError.messageParams, ...params]),
        project,
        type: level,
        loggingSource: 'FBLOGGER',
      };
      normalizedError.message = ErrorSerializer.toReadableMessage(normalizedError);
      if (forcedKey !== null) {
        normalizedError.forcedKey =
          normalizedError.forcedKey !== null ? `${forcedKey}_${normalizedError.forcedKey}` : forcedKey;
      }
    } else if (error) {
      if (this.taalOpcodes.length > 0) {
        new FBLogger('fblogger')
          .blameToPreviousFrame()
          .blameToPreviousFrame()
          .warn('Blame helpers do not work with catching');
      }
      ErrorSerializer.aggregateError(error, {
        messageFormat: message,
        messageParams: ErrorSerializer.toStringParams(params),
        errorName: error.name,
        forcedKey,
        project,
        type: level,
        loggingSource: 'FBLOGGER',
      });
      normalizedError = ErrorNormalizeUtils.normalizeError(error);
    } else {
      const newError = new Error(message);
      if (newError.stack === undefined) {
        try {
          throw newError;
        } catch (e) {}
      }
      newError.messageFormat = message;
      newError.messageParams = ErrorSerializer.toStringParams(params);
      newError.blameModule = blameModule;
      newError.forcedKey = forcedKey;
      newError.project = project;
      newError.type = level;
      newError.loggingSource = 'FBLOGGER';
      newError.taalOpcodes = [TAALOpcode.PREVIOUS_FRAME, TAALOpcode.PREVIOUS_FRAME, ...this.taalOpcodes];
      normalizedError = ErrorNormalizeUtils.normalizeError(newError);
      normalizedError.name = 'FBLogger';
    }

    if (!metadata.isEmpty()) {
      if (normalizedError.metadata === null) {
        normalizedError.metadata = metadata.format();
      } else {
        const combinedMetadata = normalizedError.metadata.concat(metadata.format());
        normalizedError.metadata = Array.from(new Set(combinedMetadata));
      }
    }

    if (events.length > 0) {
      if (normalizedError.events !== null) {
        normalizedError.events.push(...events);
      } else {
        normalizedError.events = [...events];
      }
      if (normalizedError.events.length > maxEvents) {
        const excess = normalizedError.events.length - maxEvents;
        normalizedError.events.splice(0, excess + 1, `<first ${excess} events omitted>`);
      }
    }

    ErrorPubSub.reportNormalizedError(normalizedError);
    return new Error(message);
  }

  fatal(format, ...params) {
    this.logError('fatal', format, ...params);
  }

  mustfix(format, ...params) {
    this.logError('error', format, ...params);
  }

  warn(format, ...params) {
    this.logError('warn', format, ...params);
  }

  info(format, ...params) {
    this.logError('info', format, ...params);
  }

  debug(format, ...params) {
    // Do nothing for debug level
  }

  mustfixThrow(format, ...params) {
    const error = this.logError('error', format, ...params);
    if (!error) {
      const mustfixError = createError('mustfixThrow does not support catchingNormalizedError');
      mustfixError.taalOpcodes = mustfixError.taalOpcodes || [];
      mustfixError.taalOpcodes.push(TAALOpcode.PREVIOUS_FRAME);
      throw mustfixError;
    }
    error.message = ErrorSerializer.toReadableMessage(error);
    throw error;
  }

  catching(error) {
    if (!(error instanceof Error)) {
      new FBLogger('fblogger').blameToPreviousFrame().warn('Catching non-Error object is not supported');
    } else {
      this.error = error;
    }
    return this;
  }

  catchingNormalizedError(error) {
    this.normalizedError = error;
    return this;
  }

  event(event) {
    this.events.push(event);
    return this;
  }

  blameToModule(module) {
    this.blameModule = module;
    return this;
  }

  blameToPreviousFile() {
    this.taalOpcodes.push(TAALOpcode.PREVIOUS_FILE);
    return this;
  }

  blameToPreviousFrame() {
    this.taalOpcodes.push(TAALOpcode.PREVIOUS_FRAME);
    return this;
  }

  blameToPreviousDirectory() {
    this.taalOpcodes.push(TAALOpcode.PREVIOUS_DIR);
    return this;
  }

  addToCategoryKey(key) {
    this.forcedKey = key;
    return this;
  }

  addMetadata(key, value, extra) {
    this.metadata.addEntry(key, value, extra);
    return this;
  }

  // static addGlobalMetadata(key, value, extra) {
  //   ErrorMetadata.addGlobalMetadata(key, value, extra);
  // }
}

const createLogger = (project, event) => {
  const logger = new FBLogger(project);
  return event !== null ? logger.event(`${project}.${event}`) : logger;
};

createLogger.addGlobalMetadata = (key, value, extra) => {
  ErrorMetadata.addGlobalMetadata(key, value, extra);
};

const CUSTOM_NAME_PREFIX = '<CUSTOM_NAME:';
const CUSTOM_NAME_SUFFIX = '>';

const renameFunction = (fn, name) => {
  if (fn !== null && name !== null) {
    try {
      Object.defineProperty(fn, 'name', {
        value: `${CUSTOM_NAME_PREFIX} ${name} ${CUSTOM_NAME_SUFFIX}`,
      });
    } catch (e) {
      // Handle any errors silently
    }
  }
  return fn;
};

const TAAL = {
  blameToPreviousFile(error) {
    error.taalOpcodes = error.taalOpcodes ?? [];
    error.taalOpcodes.push(TAALOpcode.PREVIOUS_FILE);
    return error;
  },
  blameToPreviousFrame(error) {
    error.taalOpcodes = error.taalOpcodes ?? [];
    error.taalOpcodes.push(TAALOpcode.PREVIOUS_FRAME);
    return error;
  },
  blameToPreviousDirectory(error) {
    error.taalOpcodes = error.taalOpcodes ?? [];
    error.taalOpcodes.push(TAALOpcode.PREVIOUS_DIR);
    return error;
  },
};

export const fbError = {
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
  FBLogger: createLogger,
  getErrorSafe,
  getSimpleHash,
  TAAL,
  TAALOpcode,
  renameFunction,
};
