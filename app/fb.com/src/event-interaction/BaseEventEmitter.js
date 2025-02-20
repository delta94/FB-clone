import { ErrorGuard } from '@fb-error/ErrorGuard';
import { unrecoverableViolation } from '@fb-error/unrecoverableViolation';
import emptyFunction from 'fbjs/lib/emptyFunction';

import { EmitterSubscription } from './EmitterSubscription';
import { EventSubscriptionVendor } from './EventSubscriptionVendor';

export class BaseEventEmitter {
  constructor() {
    this.$2 = new EventSubscriptionVendor();
    this.$1 = null;
  }

  addListener = function (a, c, d) {
    // return this.$2.addSubscription(a, new EmitterSubscription(this.$2, c, d))
    return this.$2.addSubscription(a, new EmitterSubscription(this.$2, c, d));
  };

  removeListener = function (a) {
    this.$2.removeSubscription(a);
  };

  once = function (eventType, listener, context) {
    let emitter = this;
    return this.addListener(eventType, function () {
      emitter.removeCurrentListener();
      listener.apply(context, arguments);
    });
  };

  removeAllListeners = function (eventType) {
    this.$2.removeAllSubscriptions(eventType);
  };

  removeCurrentListener = function () {
    if (!this.$1) {
      // throw b('unrecoverableViolation')(
      //   'Not in an emitting cycle; there is no current subscription',
      //   'emitter',
      // )
      throw unrecoverableViolation('Not in an emitting cycle; there is no current subscription', 'emitter');
    }
    this.$2.removeSubscription(this.$1);
  };

  listeners = function (eventType) {
    const subscriptions = this.$2.getSubscriptionsForType(eventType);
    return subscriptions
      ? subscriptions.filter(emptyFunction.thatReturnsTrue).map((subscription) => {
          return subscription.listener;
        })
      : [];
  };

  emit = function (eventType) {
    let b = this.$2.getSubscriptionsForType(eventType);
    if (b) {
      let c = Object.keys(b);
      let d;
      for (let e = 0; e < c.length; e++) {
        let f = c[e];
        let g = b[f];
        if (g) {
          this.$1 = g;
          if (!d) {
            d = [g, eventType];
            for (let h = 0, i = arguments.length <= 1 ? 0 : arguments.length - 1; h < i; h++)
              d[h + 2] = h + 1 < 1 || arguments.length <= h + 1 ? void 0 : arguments[h + 1];
          } else d[0] = g;
          this.__emitToSubscription.apply(this, d);
        }
      }
      this.$1 = null;
    }

    // let subscriptions = this.$2.getSubscriptionsForType(eventType);
    // if (subscriptions) {
    //   let keys = Object.keys(subscriptions);
    //   for (let ii = 0; ii < keys.length; ii++) {
    //     let key = keys[ii];
    //     let subscription = subscriptions[key];
    //     // The subscription may have been removed during this event loop.
    //     if (subscription) {
    //       this._currentSubscription = subscription;
    //       this.__emitToSubscription.apply(
    //         this,
    //         [subscription].concat(Array.prototype.slice.call(arguments))
    //       );
    //     }
    //   }
    //   this.$1 = null;
    // }
  };

  __emitToSubscription = function (a, c) {
    for (
      // eslint-disable-next-line no-inner-declarations, no-var
      var d = arguments.length, e = new Array(d > 2 ? d - 2 : 0), f = 2;
      f < d;
      f++
    ) {
      e[f - 2] = arguments[f];
    }
    ErrorGuard.applyWithGuard(a.listener, a.context, e, {
      name: 'EventEmitter ' + c + ' event',
    });
  };
}
