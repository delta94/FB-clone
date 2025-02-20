import { unrecoverableViolation } from '@fb-error/unrecoverableViolation';

export class CircularBuffer {
  constructor(size) {
    if (size <= 0) {
      throw unrecoverableViolation('Buffer size should be a positive integer', 'comet_infra');
    }
    this.size = size;
    this.buffer = [];
    this.evictCallbacks = [];
  }

  write(element) {
    if (this.buffer.length < this.size) {
      this.buffer.push(element);
    } else {
      this.evictCallbacks.forEach((callback) => {
        callback(this.buffer[0]);
      });
      this.buffer.shift();
      this.buffer.push(element);
    }
    return this;
  }

  onEvict(callback) {
    this.evictCallbacks.push(callback);
    return this;
  }

  read() {
    return this.buffer;
  }

  expand(newSize) {
    if (newSize > this.size) {
      const currentBuffer = this.read();
      this.size = newSize;
      this.buffer = currentBuffer;
    }
    return this;
  }

  dropFirst(count) {
    if (count <= this.size) {
      const currentBuffer = this.read();
      currentBuffer.splice(0, count);
      this.buffer = currentBuffer;
    }
    return this;
  }

  clear() {
    this.buffer = [];
    return this;
  }

  currentSize() {
    return this.buffer.length;
  }
}
