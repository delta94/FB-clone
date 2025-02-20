import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import { BaseEventEmitter } from './BaseEventEmitter';

let h;
let i;

if (ExecutionEnvironment.canUseDOM) {
  if (document.hidden) {
    h = 'hidden';
    i = 'visibilitychange';
  } else if (document.mozHidden) {
    h = 'mozHidden';
    i = 'mozvisibilitychange';
  } else if (document.msHidden) {
    h = 'msHidden';
    i = 'msvisibilitychange';
  } else if (document.webkitHidden) {
    h = 'webkitHidden';
    i = 'webkitvisibilitychange';
  }
}

class _Visibility extends BaseEventEmitter {
  constructor() {
    super();
    this.HIDDEN = 'hidden';
    this.VISIBLE = 'visible';
    this.hiddenKey = h;
    this.hiddenEvent = i;
  }

  isHidden() {
    return h ? document[h] : !1;
  }

  isSupported() {
    return ExecutionEnvironment.canUseDOM && document.addEventListener && i !== undefined;
  }
}

const visibility = new _Visibility();
visibility.isSupported() &&
  document.addEventListener(visibility.hiddenEvent, () => {
    /*
  c('TimeSlice').guard(function (a) {
    j.emit(j.isHidden() ? j.HIDDEN : j.VISIBLE, {
      changeTime: a.timeStamp,
    })
  }, 'visibility change')
*/
  });

export const Visibility = {
  visibility,
  Visibility: _Visibility,
};
