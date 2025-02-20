import { getSameOriginTransport } from './getSameOriginTransport';
import { killswitch } from './killswitch';

const HEARTBEAT_URL = '/healthz/';
const MAX_INTERVAL = 6400;
const INITIAL_INTERVAL = 100;
const KILLSWITCH_KEY = 'DISABLE_HEARTBEAT_POLLING';

let currentTransport = null;
let interval = INITIAL_INTERVAL;
let attempts = 0;
let timeoutId = null;
let heartbeatDisabled = killswitch(KILLSWITCH_KEY);

function handleSuccess(callback) {
  resetState();
  callback();
}

function handleError(callback, errorCallback) {
  timeoutId = setTimeout(() => {
    maybeStartHeartbeat(callback, errorCallback, undefined, true);
  }, interval);

  attempts++;
  if (interval < MAX_INTERVAL) {
    interval = Math.min(interval * Math.pow(2, attempts), MAX_INTERVAL);
  }

  errorCallback();
}

function resetState() {
  currentTransport = null;
  interval = INITIAL_INTERVAL;
  attempts = 0;
  clearTimeout(timeoutId);
}

function startHeartbeat(callback, errorCallback) {
  currentTransport = getSameOriginTransport();
  currentTransport.open('GET', HEARTBEAT_URL, true);

  currentTransport.onload = () => {
    if (currentTransport && currentTransport.status === 204) {
      heartbeatDisabled = true;
    }
    handleSuccess(callback);
  };

  currentTransport.onerror = () => {
    handleError(callback, errorCallback);
  };

  currentTransport.ontimeout = () => {
    handleError(callback, errorCallback);
  };

  currentTransport.send();
}

// eslint-disable-next-line max-params
function maybeStartHeartbeat(callback, errorCallback, condition = () => true, force = false) {
  if (!heartbeatDisabled && (force || (!currentTransport && condition()))) {
    startHeartbeat(callback, errorCallback);
  }
}

function isHeartbeatPending() {
  return currentTransport;
}

export const NetworkHeartbeat = {
  maybeStartHeartbeat,
  isHeartbeatPending,
};
