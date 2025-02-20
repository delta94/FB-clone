import { unrecoverableViolation } from '@fb-error/unrecoverableViolation';
import removeFromArray from 'fbjs/lib/removeFromArray';

/* eslint-disable no-sequences */

let h = {};

function i(a) {
  let b = !1;
  return function () {
    b || (a(), (b = !0));
  };
}

export class XPlatReactToasterStateManager {
  constructor({ callbackScheduler, maxQueuedToasts }) {
    this.TOAST_ID_COUNT = 0;
    this.ACTIVE_TOAST_LIST = new Map();
    this.EVENT_LISTENERS = [];
    this.REGISTERED_VIEWS = [];
    this.HIGHEST_PRIORITY_VIEW = null;
    this.SCHEDULER = callbackScheduler;
    this.MAX_TOASTS = maxQueuedToasts;
  }

  push = function (val, duration) {
    const id = 'toast-' + this.TOAST_ID_COUNT++;

    const node = {
      duration,
      expired: false,
      id: id,
      shown: false,
      timer: null,
      value: val,
    };
    this.DISPATCH_ACTION_FUNC({
      node,
      type: 'PUSH',
    });

    return id;
  };

  replace = function (a, b) {
    this.DISPATCH_ACTION_FUNC({
      id: a,
      type: 'REPLACE',
      value: b,
    });
  };

  shown = function (a) {
    this.DISPATCH_ACTION_FUNC({
      id: a,
      type: 'SHOWN',
    });
  };

  delete = function (a) {
    this.DISPATCH_ACTION_FUNC({
      id: a,
      type: 'DELETE',
    });
  };

  expire = function (a) {
    this.DISPATCH_ACTION_FUNC({
      id: a,
      type: 'EXPIRE',
    });
  };

  hidden = function (a) {
    this.DISPATCH_ACTION_FUNC({
      id: a,
      type: 'HIDDEN',
    });
  };

  stopTimer = function (a) {
    this.DISPATCH_ACTION_FUNC({
      id: a,
      type: 'STOP_TIMER',
    });
  };

  resetTimer = function (a) {
    this.DISPATCH_ACTION_FUNC({
      id: a,
      type: 'RESET_TIMER',
    });
  };

  getState = function () {
    return Object.fromEntries(this.ACTIVE_TOAST_LIST);
  };

  getEmptyState = function () {
    return h;
  };

  addListener = function (a) {
    let b = this;
    this.EVENT_LISTENERS.push(a);
    return {
      remove: i(() => {
        removeFromArray(b.EVENT_LISTENERS, a);
      }),
    };
  };

  UPDATE_HIGHEST_PRIORITY_VIEW_FUNC = function (a) {
    (!this.HIGHEST_PRIORITY_VIEW || a.priority > this.HIGHEST_PRIORITY_VIEW.priority) &&
      (this.HIGHEST_PRIORITY_VIEW = a);
  };

  registerView = function (a, b) {
    let d = this;
    b === void 0 && (b = 1);
    let e = {
      handler: a,
      priority: b,
    };
    this.REGISTERED_VIEWS.push(e);
    this.UPDATE_HIGHEST_PRIORITY_VIEW_FUNC(e);
    this.NOTIFY_LISTENERS_FUNC();
    return {
      remove: i(() => {
        removeFromArray(d.REGISTERED_VIEWS, e),
          d.HIGHEST_PRIORITY_VIEW === e &&
            ((d.HIGHEST_PRIORITY_VIEW = null),
            d.REGISTERED_VIEWS.forEach((a) => {
              return d.UPDATE_HIGHEST_PRIORITY_VIEW_FUNC(a);
            }));
      }),
    };
  };

  // eslint-disable-next-line complexity
  DISPATCH_ACTION_FUNC = function (a) {
    let b = this.ACTIVE_TOAST_LIST;
    switch (a.type) {
      case 'PUSH':
        // eslint-disable-next-line no-inner-declarations, no-var
        var c = a.node;
        this.ACTIVE_TOAST_LIST = new Map([].concat(Array.from(this.ACTIVE_TOAST_LIST), [[c.id, c]]));
        if (this.MAX_TOASTS !== 0) {
          c = Array.from(this.ACTIVE_TOAST_LIST.values()).filter((a) => {
            return !a.shown && !a.expired;
          });
          if (c.length > this.MAX_TOASTS) {
            c = c[0];
            this['delete'](c.id);
          }
        }
        break;
      case 'SHOWN':
        if (this.ACTIVE_TOAST_LIST.has(a.id) && !this.GET_TOAST_BY_ID_FUNC(a.id).shown) {
          c = { ...this.GET_TOAST_BY_ID_FUNC(a.id), shown: !0 };
          this.ACTIVE_TOAST_LIST = new Map(
            [].concat(Array.from(this.ACTIVE_TOAST_LIST), [[a.id, this.START_TOAST_TIMER_FUNC(c)]]),
          );
        }
        break;
      case 'EXPIRE':
        if (this.ACTIVE_TOAST_LIST.has(a.id)) {
          c = { ...this.GET_TOAST_BY_ID_FUNC(a.id), expired: !0 };
          this.ACTIVE_TOAST_LIST = new Map(
            [].concat(Array.from(this.ACTIVE_TOAST_LIST), [[a.id, this.CLEAR_TOAST_TIMER_FUNC(c)]]),
          );
          this.AUTO_DELETE_TOAST_FUNC(c);
        }
        break;
      case 'HIDDEN':
        if (this.ACTIVE_TOAST_LIST.has(a.id)) {
          c = this.GET_TOAST_BY_ID_FUNC(a.id);
          (c.shown || c.expired) &&
            ((this.ACTIVE_TOAST_LIST = new Map(this.ACTIVE_TOAST_LIST)),
            this.ACTIVE_TOAST_LIST['delete'](a.id),
            this.CLEAR_TOAST_TIMER_FUNC(c));
        }
        break;
      case 'DELETE':
        if (this.ACTIVE_TOAST_LIST.has(a.id)) {
          c = this.GET_TOAST_BY_ID_FUNC(a.id);
          this.ACTIVE_TOAST_LIST = new Map(this.ACTIVE_TOAST_LIST);
          this.ACTIVE_TOAST_LIST['delete'](a.id);
          this.CLEAR_TOAST_TIMER_FUNC(c);
        }
        break;
      case 'REPLACE':
        if (this.ACTIVE_TOAST_LIST.has(a.id)) {
          c = this.GET_TOAST_BY_ID_FUNC(a.id);
          this.ACTIVE_TOAST_LIST = new Map(
            [].concat(Array.from(this.ACTIVE_TOAST_LIST), [[a.id, { ...c, value: a.value }]]),
          );
        }
        break;
      case 'STOP_TIMER':
        if (this.ACTIVE_TOAST_LIST.has(a.id) && this.IS_TIMER_RUNNING_FUNC(this.GET_TOAST_BY_ID_FUNC(a.id))) {
          c = { ...this.GET_TOAST_BY_ID_FUNC(a.id) };
          this.ACTIVE_TOAST_LIST = new Map(
            [].concat(Array.from(this.ACTIVE_TOAST_LIST), [[a.id, this.CLEAR_TOAST_TIMER_FUNC(c)]]),
          );
        }
        break;
      case 'RESET_TIMER':
        if (this.ACTIVE_TOAST_LIST.has(a.id) && !this.IS_TIMER_RUNNING_FUNC(this.GET_TOAST_BY_ID_FUNC(a.id))) {
          c = { ...this.GET_TOAST_BY_ID_FUNC(a.id) };
          this.ACTIVE_TOAST_LIST = new Map(
            [].concat(Array.from(this.ACTIVE_TOAST_LIST), [[a.id, this.START_TOAST_TIMER_FUNC(c)]]),
          );
        }
        break;
      default:
        a.type;
    }
    b !== this.ACTIVE_TOAST_LIST && this.NOTIFY_LISTENERS_FUNC();
  };
  NOTIFY_LISTENERS_FUNC = function () {
    let a = this;
    this.EVENT_LISTENERS.forEach((b) => {
      return a.SCHEDULER(() => {
        b();
      });
    });
    this.REGISTERED_VIEWS.forEach((b) => {
      return a.SCHEDULER(() => {
        b.handler(b === a.HIGHEST_PRIORITY_VIEW ? a.getState() : a.getEmptyState());
      });
    });
  };
  START_TOAST_TIMER_FUNC = function (a) {
    let b = this;
    a.duration &&
      (a.timer === null || a.timer === undefined) &&
      (a.timer = setTimeout(() => {
        b.expire(a.id);
      }, a.duration));
    return a;
  };
  CLEAR_TOAST_TIMER_FUNC = function (a) {
    a.timer !== null && a.timer !== undefined && (clearTimeout(a.timer), (a.timer = null));
    return a;
  };
  AUTO_DELETE_TOAST_FUNC = function (a) {
    let b = this;
    this.CLEAR_TOAST_TIMER_FUNC(a);
    let d = a.id;
    setTimeout(() => {
      b['delete'](d);
    }, 1e3);
  };
  IS_TIMER_RUNNING_FUNC = function (a) {
    return a.timer !== null && a.timer !== undefined;
  };
  GET_TOAST_BY_ID_FUNC = function (a) {
    a = this.ACTIVE_TOAST_LIST.get(a);
    if (!a) throw unrecoverableViolation('Toast with given identifier was not found', 'comet_ui');
    return a;
  };

  static instance = null;

  static getInstance(config) {
    if (!XPlatReactToasterStateManager.instance) {
      XPlatReactToasterStateManager.instance = new XPlatReactToasterStateManager(config);
    }

    return this.instance;
  }

  static resetInstance_DO_NOT_USE() {
    XPlatReactToasterStateManager.instance = null;
  }
}
