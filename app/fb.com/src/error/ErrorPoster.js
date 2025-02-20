/**
 * Changelog:
 * - 09/12/2024
 */

import { ErrorDynamicData } from './ErrorDynamicData';
import { ErrorFilter } from './ErrorFilter';

let U = 1024;
let position = 0;
let ancestors = [];

function toString(val) {
  return String(val);
}

function toStringNotNull(val) {
  return !val ? undefined : String(val);
}

function eventsDiff(nErrorExtra, propsExtra) {
  const c = {};
  propsExtra &&
    propsExtra.forEach((a) => {
      c[a] = true;
    });
  Object.keys(nErrorExtra).forEach((b) => {
    nErrorExtra[b] ? (c[b] = true) : c[b] && delete c[b];
  });
  return Object.keys(c);
}

function splitMsgFormat(a) {
  a = String(a);
  return a.length > U ? a.substring(0, U - 3) + '...' : a;
}

function createStackItem(a) {
  return (a !== null && a !== void 0 ? a : []).map((a) => {
    return {
      column: toStringNotNull(a.column),
      identifier: a.identifier,
      line: toStringNotNull(a.line),
      script: a.script,
    };
  });
}

function createErrorPayload(nError, props) {
  const obj = {
    appId: toStringNotNull(props.appId), //
    cavalry_lid: props.cavalry_lid,
    access_token: ErrorDynamicData.access_token, //
    ancestor_hash: nError.hash, //
    bundle_variant: props.bundle_variant !== null && props.bundle_variant !== undefined ? props.bundle_variant : null,
    clientTime: toString(nError.clientTime), //
    column: nError.column, //
    componentStackFrames: createStackItem(nError.componentStackFrames), //
    events: nError.events, //
    extra: eventsDiff(nError.extra, props.extra), //
    forcedKey: nError.forcedKey, //
    frontend_env: props.frontend_env !== null && props.frontend_env !== undefined ? props.frontend_env : undefined, //
    guardList: nError.guardList, //
    line: nError.line, //
    loggingFramework: props.loggingFramework, //
    messageFormat: splitMsgFormat(nError.messageFormat), //
    messageParams: nError.messageParams.map(splitMsgFormat), //
    name: nError.name, //
    sample_weight: toStringNotNull(props.sample_weight),
    script: nError.script, //
    site_category: props.site_category, //
    stackFrames: createStackItem(nError.stackFrames), //
    type: nError.type, //
    page_time: toStringNotNull(nError.page_time),
    project: nError.project, //
    push_phase: props.push_phase,
    script_path: props.script_path, //
    taalOpcodes: !nError.taalOpcodes
      ? undefined
      : nError.taalOpcodes.map((a) => {
          return a;
        }),
    report_source: props.report_source,
    report_source_ref: props.report_source_ref,
    rollout_hash: props.rollout_hash !== null && props.rollout_hash !== undefined ? props.rollout_hash : null,
    server_revision: toStringNotNull(props.server_revision),
    spin: toStringNotNull(props.spin),
    svn_rev: String(props.client_revision),
    additional_client_revisions: Array.from(
      props.additional_client_revisions !== null && props.additional_client_revisions !== void 0
        ? props.additional_client_revisions
        : [],
    ).map(toString),
    web_session_id: props.web_session_id,
    version: '3',
    xFBDebug: nError.xFBDebug,
  };

  const d = nError.deferredSource;
  nError.blameModule !== null && (obj.blameModule = String(nError.blameModule));
  nError.deferredSource &&
    nError.deferredSource.stackFrames &&
    (nError.deferredSource.deferredSource = {
      stackFrames: createStackItem(d.stackFrames),
    });
  nError.metadata && (obj.metadata = nError.metadata);
  nError.loadingUrls && (obj.loadingUrls = nError.loadingUrls);
  nError.serverHash && (obj.serverHash = nError.serverHash);
  nError.windowLocationURL && (obj.windowLocationURL = nError.windowLocationURL);
  nError.loggingSource && (obj.loggingSource = nError.loggingSource);
  return obj;
}

// Post here
function postError(nError, props, logFunc) {
  position++;

  if (props.sample_weight === 0) {
    return false;
  }

  const shouldLog = ErrorFilter.shouldLog(nError);
  if (!shouldLog) {
    return false;
  }

  if (
    props.projectBlocklist !== null &&
    props.projectBlocklist !== undefined &&
    props.projectBlocklist.includes(nError.project)
  ) {
    return false;
  }

  const payload = createErrorPayload(nError, props);

  Object.assign(payload, {
    ancestors: ancestors.slice(),
    clientWeight: toString(shouldLog),
    page_position: toString(position),
  });

  ancestors.length < 15 && ancestors.push(nError.hash);

  logFunc(payload);
  return true;
}

export const ErrorPoster = {
  createErrorPayload,
  postError,
};
