export class EventSubscription {
  constructor(subscriber) {
    this.subscriber = subscriber;
  }

  remove() {
    if (this.subscriber) {
      this.subscriber.removeSubscription(this);
      this.subscriber = null;
    }
  }
}
