// import {
//   unstable__cancelCallback,
//   unstable__scheduleCallback,
//   unstable_forceFrameRate,
//   unstable_getCurrentPriorityLevel,
//   unstable_IdlePriority,
//   unstable_ImmediatePriority,
//   unstable_LowPriority,
//   unstable_NormalPriority,
//   unstable_Profiling,
//   unstable_runWithPriority,
//   unstable_shouldYield,
//   unstable_UserBlockingPriority,
// } from "./scheduler-fb-internals_DO_NOT_USE";

import scheduler from 'scheduler';

const priorities = {
  unstable_Idle: scheduler.unstable_IdlePriority,
  unstable_Immediate: scheduler.unstable_ImmediatePriority,
  unstable_Low: scheduler.unstable_LowPriority,
  unstable_Normal: scheduler.unstable_NormalPriority,
  unstable_UserBlocking: scheduler.unstable_UserBlockingPriority,
};

let h = !1;

export const JSScheduler = {
  cancelCallback: function (a) {
    scheduler.unstable_cancelCallback(a);
  },
  cancelDelayedCallback_DO_NOT_USE: function (a) {
    // a = a
    return scheduler.unstable_cancelCallback(a);
  },
  defer: function (a) {
    const b = JSScheduler.getCurrentPriorityLevel();
    return scheduler.unstable_scheduleCallback(b, a);
  },
  deferUserBlockingRunAtCurrentPri_DO_NOT_USE: function (a) {
    let c = JSScheduler.getCurrentPriorityLevel();
    return scheduler.unstable_scheduleCallback(priorities.unstable_UserBlocking, () => {
      scheduler.unstable_runWithPriority(c, a);
    });
  },
  getCallbackScheduler: function () {
    let a = JSScheduler.getCurrentPriorityLevel();
    return function (b) {
      return scheduler.unstable_scheduleCallback(a, b);
    };
  },
  getCurrentPriorityLevel: scheduler.unstable_getCurrentPriorityLevel,
  getUserBlockingRunAtCurrentPriCallbackScheduler_DO_NOT_USE: function () {
    let a = JSScheduler.getCurrentPriorityLevel();
    return function (c) {
      return scheduler.unstable_scheduleCallback(priorities.unstable_UserBlocking, () => {
        scheduler.unstable_runWithPriority(a, c);
      });
    };
  },
  makeSchedulerGlobalEntry: function (c, d) {
    // eslint-disable-next-line no-sequences
    c === void 0 && (c = null),
      d === void 0 && (d = !1),
      c !== null && c !== void 0 && scheduler.unstable_forceFrameRate(c),
      d && JSScheduler.startEventProfiling(),
      (window.ScheduleJSWork = function (a) {
        return function (...args) {
          // eslint-disable-next-line no-inner-declarations, no-var
          for (var b = args.length, c = new Array(b), d = 0; d < b; d++) c[d] = args[d];
          h
            ? a.apply(void 0, c)
            : JSScheduler.deferUserBlockingRunAtCurrentPri_DO_NOT_USE(() => {
                h = !0;
                try {
                  a.apply(void 0, c);
                } finally {
                  h = !1;
                }
              });
        };
      });
  },
  priorities,
  runWithPriority: scheduler.unstable_runWithPriority,
  runWithPriority_DO_NOT_USE: scheduler.unstable_runWithPriority,
  scheduleDelayedCallback_DO_NOT_USE: function (a, b, c) {
    a = scheduler.unstable_scheduleCallback(a, c, {
      delay: b,
    });
    return a;
  },
  scheduleImmediatePriCallback: function (a) {
    return scheduler.unstable_scheduleCallback(priorities.unstable_Immediate, a);
  },
  scheduleSpeculativeCallback: function (a) {
    return scheduler.unstable_scheduleCallback(priorities.unstable_Idle, a);
  },
  scheduleUserBlockingPriCallback: function (a) {
    return scheduler.unstable_scheduleCallback(priorities.unstable_UserBlocking, a);
  },
  shouldYield: scheduler.unstable_shouldYield,
  startEventProfiling: function () {
    let a;
    a = !(a = scheduler.unstable_Profiling) ? void 0 : a.startLoggingProfilingEvents;
    typeof a === 'function' && a();
  },

  stopEventProfiling: function () {
    let a;
    a = !(a = scheduler.unstable_Profiling) ? void 0 : a.stopLoggingProfilingEvents;
    return typeof a === 'function' ? a() : null;
  },
  scheduleNormalPriCallback: function (a) {
    return scheduler.unstable_scheduleCallback(priorities.unstable_Normal, a);
  },
  scheduleLoggingPriCallback: function (a) {
    return scheduler.unstable_scheduleCallback(priorities.unstable_Low, a);
  },
};
