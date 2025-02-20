/**
 * Changelog:
 * - 09/12/2024
 */

import performanceNowSinceAppStart from 'fbjs/lib/performanceNow';

import { ErrorMetadata } from './ErrorMetadata';
import { ErrorSerializer } from './ErrorSerializer';
import { ErrorXFBDebug } from './ErrorXFBDebug';
import { getSimpleHash } from './getSimpleHash';
import { TAALOpcode } from './TAALOpcode';

// Error stack trace parsing regex patterns
const stackTracePatterns = [
  /\(([^\s\)\()]+):(\d+):(\d+)\)$/,
  /@([^\s\)\()]+):(\d+):(\d+)$/,
  /^([^\s\)\()]+):(\d+):(\d+)$/,
  /^at ([^\s\)\()]+):(\d+):(\d+)$/,
];

// Remove charset and base64 from error stack
const errorStackCleanPattern = /^\w+:\s.*?\n/g;

function formatStackFrame(props) {
  const { identifier, script, line, column } = props;
  let text = '    at ' + (identifier !== undefined && identifier !== null ? identifier : '<unknown>');

  if (script !== undefined && line !== undefined && column !== undefined) {
    // text += " (" + script + ":" + line + ":" + column + ")";
    text += ` (${script}:${line}:${column})`;
  }

  return text;
}

function splitStackLine(str) {
  str = str.trim();
  const stackItemProps = {};
  // let atFunc: string, scriptAt: string, line: number, col: number;

  if (str.includes('charset=utf-8;base64,')) stackItemProps.identifier = '<inlined-file>';
  else {
    let itemList = null;
    for (let i = 0; i < stackTracePatterns.length; i++) {
      const regex = stackTracePatterns[i];
      itemList = str.match(regex);
      if (itemList) break;
    }

    if (itemList && itemList.length === 4) {
      stackItemProps.script = itemList[1];
      stackItemProps.line = parseInt(itemList[2], 10);
      stackItemProps.column = parseInt(itemList[3], 10);
      stackItemProps.identifier = str.substring(0, str.length - itemList[0].length);
    } else {
      stackItemProps.identifier = str;
    }

    stackItemProps.identifier = stackItemProps.identifier.replace(/^at /, '').trim();
  }

  stackItemProps.text = formatStackFrame(stackItemProps);

  return stackItemProps;
}

function componentStackUtils(componentStack) {
  if (!componentStack || !componentStack || componentStack === '') return null;

  const items = componentStack.split('\n');
  items.splice(0, 1);
  return items.map((item) => item.trim());
}

/**
 * @example 
 * Error: Catching non-Error object is not supported
    at a.b.$1 (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:56:15475)
    at a.b.warn (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:56:16336)
    at a.b.catching (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:56:16922)
    at https://static.xx.fbcdn.net/rsrc.php/v3inrF4/y5/l/en_US/Cz5Cj65yEXYFAQsq7JgwAr2bvZLUnZFfMBlIYuoQOCG0JRMLKIe27TaeAcjmfJEv35WWlxpgwHBZoqNOja6HO4Rw0R4PaC62pZG7rw0iT7Guk_DS_LJQllwD8KJgiDj7Ey4c68r-XgMgiTu66lsP4_0qGd0bAtIkwQyPMu8_EK9X8TkTqIgCcDAU2lUMi1j25Xs5ffaKwKNWZDXcMzVpn64wsICSSF514xdraehoPlENa1xvT6SDjolMiFFZqlva4Z14pEJU.js?_nc_x=DDk_Zn6H8tc:380:12801
    at a (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:219:827)
    at m (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:147:335)
    at https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:147:1179
    at Object.applyWithGuard (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:56:10113)
    at c (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:56:10817)
    at g.<computed> (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:143:526)
    at r (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:143:655)
    at MessagePort.a.port1.onmessage (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:143:1442)
 */
function removeFirstMessageStack(error) {
  const { name, message, stack } = error;

  if (stack === undefined) return null;

  if (name !== undefined && message !== undefined && message !== '') {
    const errorNameMessage = name + ': ' + message + '\n';
    if (stack.startsWith(errorNameMessage)) {
      return stack.substr(errorNameMessage.length);
    }

    if (stack === name + ': ' + message) return null;
  }

  if (name !== undefined) {
    const errorName = name + '\n';
    if (stack.startsWith(errorName)) {
      return stack.substr(errorName.length);
    }
  }

  if (message !== undefined && message !== '') {
    const errorMessage = ': ' + message + '\n';
    const index = stack.indexOf(errorMessage);
    const remainStack = stack.substring(0, index);
    if (/^\w+$/.test(remainStack)) {
      return stack.substring(index + errorMessage.length);
    }
  }

  return stack.replace(errorStackCleanPattern, '');
}

function splitStack(stack) {
  return !stack || stack === '' ? [] : stack.split(/\n\n/)[0].split('\n').map(splitStackLine);
}

function stackUtils(error) {
  const newStack = removeFirstMessageStack(error);
  return splitStack(newStack);
}

function errorTypeUtils(error) {
  if (error.type) return error.type;
  if (error.loggingSource === 'GUARDED' || error.loggingSource === 'ERROR_BOUNDARY') return 'fatal';
  if (error.name === 'SyntaxError') return 'fatal';
  if (error.loggingSource === 'ONERROR' && error.message.indexOf('ResizeObserver loop') >= 0) return 'warn';
  return error.stack && error.stack.indexOf('chrome-extension://') >= 0 ? 'warn' : 'error';
}

// eslint-disable-next-line complexity
function normalizeError(error) {
  const stackItemList = stackUtils(error);

  const taalOpcodes = error.taalOpcodes !== undefined && error.taalOpcodes !== null ? error.taalOpcodes : [];

  let { framesToPop } = error;

  if (framesToPop) {
    let minFrame = Math.min(framesToPop, stackItemList.length);
    while (minFrame-- > 0) taalOpcodes.unshift(TAALOpcode.PREVIOUS_FRAME);
  }

  const messageFormat =
    error.messageFormat !== null && error.messageFormat !== undefined ? error.messageFormat : error.message;

  const messageParams = (
    error.messageParams !== null && error.messageParams !== undefined ? error.messageParams : []
  ).map((param) => String(param));

  const componentStackItem = componentStackUtils(error.componentStack);

  const componentStackFrames = !componentStackItem ? null : componentStackItem.map(splitStackLine);

  let format = error.metadata ? error.metadata.format() : new ErrorMetadata().format();

  if (format.length === 0) {
    format = undefined;
  }

  const stack = stackItemList.map((item) => item.text).join('\n');

  const errorName = error.errorName !== null && error.errorName !== undefined ? error.errorName : error.name;

  const type = errorTypeUtils(error);

  const loggingSource = error.loggingSource;

  const project = error.project;

  let lineNumber = error.lineNumber !== null && error.lineNumber !== undefined ? error.lineNumber : error.line;
  let columnNumber =
    error.columnNumber !== null && error.columnNumber !== undefined ? error.columnNumber : error.column;
  let fileName = error.fileName !== null && error.fileName !== undefined ? error.fileName : error.sourceURL;

  const check = stackItemList.length > 0;

  if (check) {
    lineNumber === undefined && (lineNumber = stackItemList[0].line);
    columnNumber === undefined && (columnNumber = stackItemList[0].column);
    fileName === undefined && (fileName = stackItemList[0].script);
  }

  const obj = {
    blameModule: error.blameModule,
    column: !columnNumber ? null : String(columnNumber),
    clientTime: Math.floor(Date.now() / 1e3),
    componentStackFrames,
    deferredSource: error.deferredSource ? normalizeError(error.deferredSource) : null,
    extra: error.extra !== null && error.extra !== undefined ? error.extra : {},
    fbtrace_id: error.fbtrace_id,
    guardList: error.guardList !== null && error.guardList !== undefined ? error.guardList : [],

    hash: getSimpleHash(errorName, stack, type, project, loggingSource),
    isNormalizedError: true,
    line: !lineNumber ? null : String(lineNumber),
    loggingSource,
    message: ErrorSerializer.toReadableMessage(error),
    messageFormat,
    messageParams,
    metadata: format,
    name: errorName,
    page_time: Math.floor(performanceNowSinceAppStart()),
    project,
    reactComponentStack: componentStackItem,
    script: fileName,
    serverHash: error.serverHash,
    stack,
    stackFrames: stackItemList,
    type,
    xFBDebug: ErrorXFBDebug.getAll(),
  };

  if (error.forcedKey) {
    obj.forcedKey = error.forcedKey;
  }

  if (taalOpcodes.length > 0) {
    obj.taalOpcodes = taalOpcodes;
  }

  if (window.location) {
    obj.windowLocationURL = window.location.href;
  }

  // eslint-disable-next-line guard-for-in
  for (const i in obj) (obj[i] === null || obj[i] === undefined) && delete obj[i];

  return obj;
}

function ifNormalizedError(obj) {
  return obj && typeof obj === 'object' && obj.isNormalizedError === true ? obj : null;
}

export const ErrorNormalizeUtils = {
  formatStackFrame,
  normalizeError,
  ifNormalizedError,
};
