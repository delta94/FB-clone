import { invariant } from '@fb-error/invariant';

export class EventSubscriptionVendor {
  constructor() {
    // _currentSubscription
    this.$1 = {};
  }

  addSubscription(eventType, subscription) {
    subscription.subscriber === this || invariant(0, 2828);

    this.$1[eventType] || (this.$1[eventType] = []);

    const key = this.$1[eventType].length;
    this.$1[eventType].push(subscription);
    subscription.eventType = eventType;
    subscription.key = key;

    return subscription;
  }

  removeAllSubscriptions(eventType) {
    if (eventType === undefined) {
      this.$1 = {};
    } else {
      delete this.$1[eventType];
    }
  }

  removeSubscription(subscription) {
    const eventType = subscription.eventType;
    const key = subscription.key;

    const subscriptionsForType = this.$1[eventType];

    if (subscriptionsForType) {
      delete subscriptionsForType[key];
    }
  }

  getSubscriptionsForType(eventType) {
    return this.$1[eventType];
  }
}
