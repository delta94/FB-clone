/* eslint-disable no-dupe-else-if */

/* eslint-disable no-labels */
/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable max-depth */
/* eslint-disable no-unreachable */
/* eslint-disable no-sequences */

// require('SchedulerFeatureFlags')
function push(heap, node) {
  let index = heap.length;
  heap.push(node);
  a: for (; 0 < index; ) {
    let parentIndex = (index - 1) >>> 1;
    let parent = heap[parentIndex];
    if (0 < compare(parent, node)) (heap[parentIndex] = node), (heap[index] = parent), (index = parentIndex);
    else break a;
  }
}
function peek(heap) {
  return heap.length === 0 ? null : heap[0];
}
function pop(heap) {
  if (heap.length === 0) return null;
  let first = heap[0];
  let last = heap.pop();
  if (last !== first) {
    heap[0] = last;
    a: for (let index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength; ) {
      let leftIndex = 2 * (index + 1) - 1;
      let left = heap[leftIndex];
      let rightIndex = leftIndex + 1;
      let right = heap[rightIndex];
      if (0 > compare(left, last))
        rightIndex < length && 0 > compare(right, left)
          ? ((heap[index] = right), (heap[rightIndex] = last), (index = rightIndex))
          : ((heap[index] = left), (heap[leftIndex] = last), (index = leftIndex));
      else if (rightIndex < length && 0 > compare(right, last))
        (heap[index] = right), (heap[rightIndex] = last), (index = rightIndex);
      else break a;
    }
  }
  return first;
}
function compare(a, b) {
  let diff = a.sortIndex - b.sortIndex;
  return 0 !== diff ? diff : a.id - b.id;
}
exports.unstable_now = void 0;
if (typeof performance === 'object' && typeof performance.now === 'function') {
  let localPerformance = performance;
  exports.unstable_now = function () {
    return localPerformance.now();
  };
} else {
  let localDate = Date;
  let initialTime = localDate.now();
  exports.unstable_now = function () {
    return localDate.now() - initialTime;
  };
}
let taskQueue = [];
let timerQueue = [];
let taskIdCounter = 1;
let isSchedulerPaused = !1;
let currentTask = null;
let currentPriorityLevel = 3;
let isPerformingWork = !1;
let isHostCallbackScheduled = !1;
let isHostTimeoutScheduled = !1;
let localSetTimeout = typeof setTimeout === 'function' ? setTimeout : null;
let localClearTimeout = typeof clearTimeout === 'function' ? clearTimeout : null;
let localSetImmediate = 'undefined' !== typeof setImmediate ? setImmediate : null;
let isInputPending =
  'undefined' !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending
    ? navigator.scheduling.isInputPending.bind(navigator.scheduling)
    : null;
let continuousOptions = { includeContinuous: !0 };
function advanceTimers(currentTime) {
  for (let timer = peek(timerQueue); null !== timer; ) {
    if (!timer.callback) pop(timerQueue);
    else if (timer.startTime <= currentTime)
      pop(timerQueue), (timer.sortIndex = timer.expirationTime), push(taskQueue, timer);
    else break;
    timer = peek(timerQueue);
  }
}
function handleTimeout(currentTime) {
  isHostTimeoutScheduled = !1;
  advanceTimers(currentTime);
  if (!isHostCallbackScheduled)
    if (null !== peek(taskQueue)) (isHostCallbackScheduled = !0), requestHostCallback();
    else {
      let firstTimer = peek(timerQueue);
      null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
    }
}
let isMessageLoopRunning = !1;
let taskTimeoutID = -1;
let frameInterval = 5;
let startTime = -1;
let needsPaint = !1;
function shouldYieldToHost() {
  let timeElapsed = exports.unstable_now() - startTime;
  if (timeElapsed < frameInterval) return !1;
  if (needsPaint) return !0;
  if (10 > timeElapsed) {
    if (null !== isInputPending) return isInputPending();
  } else if (10 > timeElapsed && null !== isInputPending) return isInputPending(continuousOptions);
  return !0;
}
function performWorkUntilDeadline() {
  if (isMessageLoopRunning) {
    let currentTime = exports.unstable_now();
    startTime = currentTime;
    let hasMoreWork = !0;
    try {
      a: {
        isHostCallbackScheduled = !1;
        isHostTimeoutScheduled &&
          ((isHostTimeoutScheduled = !1), localClearTimeout(taskTimeoutID), (taskTimeoutID = -1));
        isPerformingWork = !0;
        let previousPriorityLevel = currentPriorityLevel;
        try {
          b: {
            advanceTimers(currentTime);
            for (
              currentTask = peek(taskQueue);
              !(!currentTask || isSchedulerPaused || (currentTask.expirationTime > currentTime && shouldYieldToHost()));

            ) {
              let callback = currentTask.callback;
              if (typeof callback === 'function') {
                currentTask.callback = null;
                currentPriorityLevel = currentTask.priorityLevel;
                let continuationCallback = callback(currentTask.expirationTime <= currentTime);
                currentTime = exports.unstable_now();
                if (typeof continuationCallback === 'function') {
                  currentTask.callback = continuationCallback;
                  advanceTimers(currentTime);
                  hasMoreWork = !0;
                  break b;
                }
                currentTask === peek(taskQueue) && pop(taskQueue);
                advanceTimers(currentTime);
              } else pop(taskQueue);
              currentTask = peek(taskQueue);
            }
            if (null !== currentTask) hasMoreWork = !0;
            else {
              let firstTimer = peek(timerQueue);
              null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
              hasMoreWork = !1;
            }
          }
          break a;
        } finally {
          (currentTask = null), (currentPriorityLevel = previousPriorityLevel), (isPerformingWork = !1);
        }
        hasMoreWork = void 0;
      }
    } finally {
      hasMoreWork ? schedulePerformWorkUntilDeadline() : (isMessageLoopRunning = !1);
    }
  }
  needsPaint = !1;
}
let schedulePerformWorkUntilDeadline;
if (typeof localSetImmediate === 'function')
  schedulePerformWorkUntilDeadline = function () {
    localSetImmediate(performWorkUntilDeadline);
  };
else if ('undefined' !== typeof MessageChannel) {
  let channel = new MessageChannel();
  let port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;
  schedulePerformWorkUntilDeadline = function () {
    port.postMessage(null);
  };
} else
  schedulePerformWorkUntilDeadline = function () {
    localSetTimeout(performWorkUntilDeadline, 0);
  };
function requestHostCallback() {
  isMessageLoopRunning || ((isMessageLoopRunning = !0), schedulePerformWorkUntilDeadline());
}
function requestHostTimeout(callback, ms) {
  taskTimeoutID = localSetTimeout(() => {
    callback(exports.unstable_now());
  }, ms);
}
exports.unstable_IdlePriority = 5;
exports.unstable_ImmediatePriority = 1;
exports.unstable_LowPriority = 4;
exports.unstable_NormalPriority = 3;
exports.unstable_Profiling = null;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_cancelCallback = function (task) {
  task.callback = null;
};
exports.unstable_continueExecution = function () {
  isSchedulerPaused = !1;
  isHostCallbackScheduled || isPerformingWork || ((isHostCallbackScheduled = !0), requestHostCallback());
};
exports.unstable_forceFrameRate = function (fps) {
  0 > fps || 125 < fps
    ? console.error(
        'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
      )
    : (frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5);
};
exports.unstable_getCurrentPriorityLevel = function () {
  return currentPriorityLevel;
};
exports.unstable_getFirstCallbackNode = function () {
  return peek(taskQueue);
};
exports.unstable_next = function (eventHandler) {
  switch (currentPriorityLevel) {
    case 1:
    case 2:
    case 3:
      // eslint-disable-next-line no-inner-declarations, no-var
      var priorityLevel = 3;
      break;
    default:
      priorityLevel = currentPriorityLevel;
  }
  let previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
};
exports.unstable_pauseExecution = function () {
  isSchedulerPaused = !0;
};
exports.unstable_requestPaint = function () {
  void 0 !== navigator &&
    void 0 !== navigator.scheduling &&
    void 0 !== navigator.scheduling.isInputPending &&
    (needsPaint = !0);
};
exports.unstable_runWithPriority = function (priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;
    default:
      priorityLevel = 3;
  }
  let previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;
  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
};
exports.unstable_scheduleCallback = function (priorityLevel, callback, options) {
  let currentTime = exports.unstable_now();
  typeof options === 'object' && null !== options
    ? ((options = options.delay),
      (options = typeof options === 'number' && 0 < options ? currentTime + options : currentTime))
    : (options = currentTime);
  switch (priorityLevel) {
    case 1:
      // eslint-disable-next-line no-inner-declarations, no-var
      var timeout = -1;
      break;
    case 2:
      timeout = 250;
      break;
    case 5:
      timeout = 1073741823;
      break;
    case 4:
      timeout = 1e4;
      break;
    default:
      timeout = 5e3;
  }
  timeout = options + timeout;
  priorityLevel = {
    id: taskIdCounter++,
    callback: callback,
    priorityLevel: priorityLevel,
    startTime: options,
    expirationTime: timeout,
    sortIndex: -1,
  };
  options > currentTime
    ? ((priorityLevel.sortIndex = options),
      push(timerQueue, priorityLevel),
      !peek(taskQueue) &&
        priorityLevel === peek(timerQueue) &&
        (isHostTimeoutScheduled
          ? (localClearTimeout(taskTimeoutID), (taskTimeoutID = -1))
          : (isHostTimeoutScheduled = !0),
        requestHostTimeout(handleTimeout, options - currentTime)))
    : ((priorityLevel.sortIndex = timeout),
      push(taskQueue, priorityLevel),
      isHostCallbackScheduled || isPerformingWork || ((isHostCallbackScheduled = !0), requestHostCallback()));
  return priorityLevel;
};
exports.unstable_shouldYield = shouldYieldToHost;
exports.unstable_wrapCallback = function (callback) {
  let parentPriorityLevel = currentPriorityLevel;
  return function () {
    let previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = parentPriorityLevel;
    try {
      // eslint-disable-next-line no-invalid-this
      return callback.apply(this, arguments);
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
};
