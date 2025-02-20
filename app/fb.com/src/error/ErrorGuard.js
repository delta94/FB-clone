/**
 * Changelog:
 * - 09/12/2024
 */

import { ErrorGuardState } from './ErrorGuardState';
import { ErrorNormalizeUtils } from './ErrorNormalizeUtils';
import { ErrorPubSub } from './ErrorPubSub';
import { ErrorSerializer } from './ErrorSerializer';
import { getErrorSafe } from './getErrorSafe';

const ANONYMOUS_GUARD = '<anonymous guard>';
let isGuardGlobalEnabled = false;

/**
 * The ErrorGuard module in your code provides a mechanism for managing and handling errors
 * that occur during the execution of JavaScript functions. It is designed to help catch, handle,
 * and report errors in a controlled and consistent manner,
 * especially in scenarios where errors might occur but shouldn't break the entire application.
 * Here's a breakdown of what each part of the code does:
 */
// eslint-disable-next-line complexity, max-params
function applyWithGuard(func, context, args, options) {
  ErrorGuardState.pushGuard({
    // name:
    //   // eslint-disable-next-line no-eq-null
    //   ((options === null || options === void 0 ? void 0 : options.name) != null ? options.name : null) ||
    //   (func.name ? 'func_name:' + func.name : null) ||
    //   ANONYMOUS_GUARD,
    // deferredSource: options === null || options === void 0 ? void 0 : options.deferredSource,
    name: (options ? options.name ?? null : null) || (func.name ? 'func_name:' + func.name : null) || ANONYMOUS_GUARD,
    deferredSource: options?.deferredSource,
  });

  if (isGuardGlobalEnabled) {
    try {
      return func.apply(context, args);
    } finally {
      ErrorGuardState.popGuard();
    }
  }

  try {
    return Function.prototype.apply.call(func, context, args);
  } catch (error) {
    try {
      // options = options ?? {};
      // let deferredSource = options.deferredSource;
      // const onError = options.onError;
      // const onNormalizedError = options.onNormalizedError;
      // const safeError = getErrorSafe(error);
      // const errorInfo = {
      //   deferredSource: deferredSource,
      //   loggingSource: 'GUARDED',
      //   project: options?.project ?? 'ErrorGuard',
      //   type: options?.errorType,
      // };
      // ErrorSerializer.aggregateError(safeError, errorInfo);
      // const normalizedError = ErrorNormalizeUtils.normalizeError(safeError);
      // if (safeError === null && func) {
      //   normalizedError.extra[func.toString().substring(0, 100)] = 'function';
      //   if (args !== null && args.length) {
      //     normalizedError.extra[Array.from(args).toString().substring(0, 100)] = 'args';
      //   }
      // }
      // normalizedError.guardList = ErrorGuardState.cloneGuardList();
      // onError && onError(safeError);
      // onNormalizedError && onNormalizedError(normalizedError);
      // ErrorPubSub.reportNormalizedError(normalizedError);

      context = options !== null && options !== void 0 ? options : {};
      let e = context.deferredSource;
      const f = context.onError;
      context = context.onNormalizedError;
      const sError = getErrorSafe(error);
      e = {
        deferredSource: e,
        loggingSource: 'GUARDED',
        project:
          (e = options === null || options === void 0 ? void 0 : options.project) !== null && e !== void 0
            ? e
            : 'ErrorGuard',
        type: options === null || options === void 0 ? void 0 : options.errorType,
      };
      ErrorSerializer.aggregateError(sError, e);
      options = ErrorNormalizeUtils.normalizeError(sError);

      sError === null &&
        func &&
        ((options.extra[func.toString().substring(0, 100)] = 'function'),
        args !== null && args.length && (options.extra[Array.from(args).toString().substring(0, 100)] = 'args'));
      options.guardList = ErrorGuardState.cloneGuardList();
      f && f(sError);
      context && context(options);
      ErrorPubSub.reportNormalizedError(options);
      // eslint-disable-next-line no-unused-vars
    } catch (handlingError) {}
  } finally {
    ErrorGuardState.popGuard();
  }
}

function guard(func, options) {
  function guardedFunction(...args) {
    // eslint-disable-next-line no-invalid-this
    return applyWithGuard(func, this, args, options);
  }

  func.__SMmeta && (guardedFunction.__SMmeta = func.__SMmeta);

  return guardedFunction;
}

function inGuard() {
  return ErrorGuardState.inGuard();
}

function skipGuardGlobal(isEnabled) {
  isGuardGlobalEnabled = isEnabled;
}

export const ErrorGuard = {
  skipGuardGlobal,
  inGuard,
  guard,
  applyWithGuard,
};
