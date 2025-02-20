import performanceNow from 'fbjs/lib/performanceNow';

import { NetworkHeartbeat } from './NetworkHeartbeat';

let isOnline;
let changeListeners = [];
// eslint-disable-next-line no-restricted-globals
let globalObject = typeof window !== 'undefined' ? window : self;
let navigatorObject = !globalObject ? undefined : !(isOnline = globalObject.navigator) ? undefined : isOnline.onLine;
let errorThreshold = 2;
let heartbeatInterval = 5e3;
let offlineEvents = [];
let onlineEvents = [];
let lastReportedTime = 0;
let wasInitiallyOnline = !0;
let wasInitiallyOfflineValue = !1;
let shouldStartHeartbeat = !1;

let startHeartbeat = function () {
  handleStatusChange(wasInitiallyOnline, true);
};

let stopHeartbeat = function () {
  handleStatusChange(wasInitiallyOfflineValue, true);
};
function notifyChangeListeners() {
  let listenersCopy = changeListeners.slice();
  listenersCopy.forEach((listener) => {
    listener({
      online: navigatorObject,
    });
  });
}

function removeChangeListener(listener) {
  const index = changeListeners.indexOf(listener);
  index > -1 && changeListeners.splice(index, 1);
}

function handleStatusChange(isOnlineStatus, force = false) {
  // force === void 0 && (force = !1);
  let statusChanged = navigatorObject === isOnlineStatus;
  force = !force && isOnlineStatus === wasInitiallyOnline && NetworkHeartbeat.isHeartbeatPending();
  if (statusChanged || force) {
    return;
  }
  shouldStartHeartbeat = shouldStartHeartbeat || isOnlineStatus === wasInitiallyOfflineValue;
  navigatorObject = isOnlineStatus;
  navigatorObject || NetworkHeartbeat.maybeStartHeartbeat(startHeartbeat, stopHeartbeat);
  notifyChangeListeners();
}

function isThresholdNotReached() {
  let currentTime = performanceNow();
  offlineEvents = offlineEvents.filter((event) => {
    return isThresholdExceeded(event.startTime, currentTime);
  });
  onlineEvents = onlineEvents.filter((event) => {
    return isThresholdExceeded(event.startTime, currentTime);
  });
  return onlineEvents.length / offlineEvents.length < errorThreshold;
}

// eslint-disable-next-line no-var
var isThresholdExceeded = function (startTime, currentTime) {
  return startTime > currentTime - heartbeatInterval;
};

function checkOnlineStatus() {
  return navigatorObject;
}
function addChangeListener(listener) {
  changeListeners.push(listener);
  let listenerRemoved = false;
  return {
    remove: () => {
      if (!listenerRemoved) {
        listenerRemoved = true;
        removeChangeListener(listener);
      }

      // listenerRemoved || ((listenerRemoved = true), x(listener));
    },
  };
}

function reportError() {
  let currentTime = performanceNow();
  offlineEvents.push({
    startTime: currentTime,
  });
  NetworkHeartbeat.maybeStartHeartbeat(startHeartbeat, stopHeartbeat, isThresholdNotReached);
}

function reportSuccess() {
  let currentTime = performanceNow();
  onlineEvents.push({
    startTime: currentTime,
  });

  if (!isThresholdExceeded(lastReportedTime, currentTime)) {
    onlineEvents = onlineEvents.filter((b) => {
      return isThresholdExceeded(b.startTime, currentTime);
    });
    lastReportedTime = currentTime;
  }

  // isThresholdExceeded(lastReportedTime, currentTime) ||
  //   ((onlineEvents = onlineEvents.filter((b) => {
  //     return isThresholdExceeded(b.startTime, currentTime);
  //   })),
  //   (lastReportedTime = currentTime));
}

function wasInitiallyOffline() {
  return shouldStartHeartbeat;
}

globalObject.addEventListener('online', () => {
  handleStatusChange(wasInitiallyOnline);
});

globalObject.addEventListener('offline', () => {
  handleStatusChange(wasInitiallyOfflineValue);
});

export const NetworkStatusImpl = {
  isOnline: checkOnlineStatus,
  onChange: addChangeListener,
  reportError: reportError,
  reportSuccess: reportSuccess,
  wasOffline: wasInitiallyOffline,
};
