/**
 * Changelog:
 * - 09/12/2024
 */

import { err } from './err';
import { ErrorMetadata } from './ErrorMetadata';
import { ErrorNormalizeUtils } from './ErrorNormalizeUtils';
import { ErrorPubSub } from './ErrorPubSub';
import { ErrorSerializer } from './ErrorSerializer';
import { TAALOpcode } from './TAALOpcode';

export class FBLogMessage {
  constructor(projectName) {
    this.project = projectName;
    this.events = [];
    this.metadata = new ErrorMetadata();
    this.taalOpcodes = [];
  }

  $1(type, msgFormat, ...params) {
    const messageFormat = String(msgFormat);
    const { events, project, metadata, blameModule, forcedKey } = this;
    let error = this.error;
    let normalizeErrorObj;

    if (this.normalizedError) {
      const obj = {
        message: this.normalizedError.messageFormat + ' [Caught in: ' + messageFormat + ']',
        params: [].concat(this.normalizedError.messageParams, params),
        forcedKey,
      };

      normalizeErrorObj = Object.assign(this.normalizedError, {
        message: obj.message,
        messageFormat: obj.message,
        messageParams: ErrorSerializer.toStringParams(obj.params),
        project,
        type,
        loggingSource: 'FBLOGGER',
      });

      // this.normalizedError.message = obj.message;
      // this.normalizedError.messageFormat = obj.message;
      // this.normalizedError.messageParams = ErrorSerializer.toStringParams(
      //   obj.params
      // );
      // this.normalizedError.project = project;
      // this.normalizedError.type = type;
      // this.normalizedError.loggingSource = "FBLOGGER";
    } else if (error !== null && error !== undefined) {
      this.taalOpcodes.length > 0 &&
        new FBLogMessage('fblogger')
          .blameToPreviousFrame()
          .blameToPreviousFrame()
          .warn('Blame helpers do not work with catching');

      ErrorSerializer.aggregateError(error, {
        messageFormat: messageFormat,
        messageParams: ErrorSerializer.toStringParams(params),
        errorName: error.name,
        forcedKey,
        project,
        type,
        loggingSource: 'FBLOGGER',
      });
      normalizeErrorObj = ErrorNormalizeUtils.normalizeError(error);
    } else {
      error = new Error(messageFormat);
      if (error.stack === undefined) {
        try {
          throw error;
        } catch (error) {}
      }
      error.messageFormat = messageFormat;
      error.messageParams = ErrorSerializer.toStringParams(params);
      error.blameModule = blameModule;
      error.forcedKey = forcedKey;
      error.project = project;
      error.type = type;
      error.loggingSource = 'FBLOGGER';
      error.taalOpcodes = [TAALOpcode.PREVIOUS_FRAME, TAALOpcode.PREVIOUS_FRAME].concat(this.taalOpcodes);
      normalizeErrorObj = ErrorNormalizeUtils.normalizeError(error);
      normalizeErrorObj.name = 'FBLogger';
    }
    metadata.isEmpty() || (normalizeErrorObj.metadata = metadata.format());
    if (events.length > 0) {
      if (normalizeErrorObj?.events !== undefined) {
        let q;
        (q = normalizeErrorObj.events).push.apply(q, events);
      } else normalizeErrorObj.events = events;
    }
    ErrorPubSub.reportNormalizedError(normalizeErrorObj);
    return error;
  }

  fatal = (msg, ...params) => {
    this.$1('fatal', msg, ...params);
  };

  mustfix = (msg, ...params) => {
    this.$1('error', msg, ...params);
  };

  warn = (msg, ...params) => {
    this.$1('warn', msg, ...params);
  };

  info = (msg, ...params) => {
    this.$1('info', msg, ...params);
  };

  debug(msg) {
    /** */
  }

  mustfixThrow(msg, ...params) {
    let error = this.$1('error', msg, params);
    // eslint-disable-next-line no-unused-expressions
    error ||
      ((error = err('mustfixThrow does not support catchingNormalizedError')),
      (error.taalOpcodes = error.taalOpcodes || []),
      error.taalOpcodes.push(TAALOpcode.PREVIOUS_FRAME));
    throw error;
  }

  // !
  catching(err) {
    if (!(err instanceof Error)) {
      new FBLogMessage('fblogger').blameToPreviousFrame().warn('Catching non-Error object is not supported');
    } else {
      this.error = err;
    }
    return this;
  }

  catchingNormalizedError(normalErr) {
    this.normalizedError = normalErr;
    return this;
  }

  event(event) {
    this.events.push(event);
    return this;
  }

  blameToModule(msg) {
    this.blameModule = msg;
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

  addToCategoryKey(forcedKey) {
    this.forcedKey = forcedKey;
    return this;
  }

  addMetadata(a, b, c) {
    this.metadata.addEntry(a, b, c);
    return this;
  }
}
