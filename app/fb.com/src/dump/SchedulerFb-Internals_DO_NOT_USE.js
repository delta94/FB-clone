import {
  unstable_cancelCallback,
  unstable_continueExecution,
  unstable_forceFrameRate,
  unstable_getCurrentPriorityLevel,
  unstable_IdlePriority,
  // @ts-ignore
  unstable_ImmediatePriority,
  unstable_LowPriority,
  unstable_NormalPriority,
  unstable_now,
  unstable_pauseExecution,
  unstable_Profiling,
  unstable_requestPaint,
  unstable_runWithPriority,
  unstable_scheduleCallback,
  //
  unstable_shouldYield,
  unstable_UserBlockingPriority,
  unstable_wrapCallback,
} from './scheduler.classic';
import { TimeSlice } from './TimeSlice';

export const unstable__scheduleCallback = function (a, c, d) {
  // var e = b('ifRequireable')(
  //   'TimeSlice',
  //   function (a) {
  //     return a.guard(c, 'unstable_scheduleCallback', {
  //       propagationType: a.PropagationType.CONTINUATION,
  //       registerCallStack: !0,
  //     })
  //   },
  //   function () {
  //     return c
  //   },
  // )

  const e = () =>
    TimeSlice.guard(c, 'unstable_scheduleCallback', {
      propagationType: TimeSlice.PropagationType.CONTINUATION,
      registerCallStack: !0,
    });

  return unstable_scheduleCallback(a, e, d);
};

export {
  unstable_continueExecution,
  unstable_forceFrameRate,
  unstable_getCurrentPriorityLevel,
  unstable_IdlePriority,
  unstable_ImmediatePriority,
  unstable_LowPriority,
  unstable_NormalPriority,
  unstable_now,
  unstable_pauseExecution,
  unstable_Profiling,
  unstable_requestPaint,
  unstable_runWithPriority,
  //
  unstable_shouldYield,
  unstable_UserBlockingPriority,
};

export const unstable__cancelCallback = function (a) {
  return unstable_cancelCallback(a);
};

export const unstable__wrapCallback = (a) => {
  // var c = b('ifRequireable')(
  //   'TimeSlice',
  //   function (b) {
  //     return b.guard(a, 'unstable_wrapCallback', {
  //       propagationType: b.PropagationType.CONTINUATION,
  //       registerCallStack: !0,
  //     })
  //   },
  //   function () {
  //     return a
  //   },
  // )

  const c = () =>
    TimeSlice.guard(a, 'unstable_wrapCallback', {
      propagationType: TimeSlice.PropagationType.CONTINUATION,
      registerCallStack: !0,
    });

  return unstable_wrapCallback(c);
};
