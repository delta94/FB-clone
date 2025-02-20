import { ErrorPubSub } from '@fb-error/ErrorPubSub';

import { CircularBuffer } from './CircularBuffer';

export class IntervalTrackingBoundedBuffer {
  constructor(size) {
    this.$6 = 0;
    if (size !== null) {
      if (size <= 0) {
        throw new Error('Size for a buffer must be greater than zero.');
      }
    } else {
      size = 5000; // Default size
    }
    this.$4 = size;
    this.$1 = new CircularBuffer(size);
    this.$1.onEvict(() => {
      this.$6++;
    });
    this.$2 = [];
    this.$3 = 1;
    this.$5 = 0;
  }

  open() {
    const b = this.$3++;
    let c = false;
    let d = null;
    const e = this.$5;
    const f = {
      id: b,
      startIdx: e,
      hasOverflown: () => {
        return f.getOverflowSize() > 0;
      },
      getOverflowSize: () => {
        return d !== null ? d : Math.max(this.$6 - e, 0);
      },
      close: () => {
        if (c) {
          return [];
        } else {
          c = true;
          d = this.$6 - e;
          return this.$7(b);
        }
      },
    };
    this.$2.push(f);
    return f;
  }

  pushElement(a) {
    if (this.$2.length > 0) {
      this.$1.write(a);
      this.$5++;
    }
    return this;
  }

  isActive() {
    return this.$2.length > 0;
  }

  $8(a) {
    return Math.max(a - this.$6, 0);
  }

  $7(a) {
    let b = null;
    let d = null;
    let e = null;
    let f = null;
    for (let g = 0; g < this.$2.length; g++) {
      const i = this.$2[g];
      const j = i.startIdx;
      const id = i.id;
      if (id === a) {
        e = g;
        f = j;
      } else if (!d || j < d) {
        d = j;
      }
      if (!b || j < b) {
        b = j;
      }
    }
    if (!e || !b || !f) {
      // Handle the error case.
      ErrorPubSub.reportError(new Error('messed up state inside IntervalTrackingBoundedBuffer'));
      return [];
    }

    this.$2.splice(e, 1);
    const i = this.$8(f);
    const j = this.$1.read().slice(i);
    const g = this.$8(!d ? this.$5 : d) - this.$8(b);
    if (g > 0) {
      this.$1.dropFirst(g);
      this.$6 += g;
    }
    return j;
  }
}
