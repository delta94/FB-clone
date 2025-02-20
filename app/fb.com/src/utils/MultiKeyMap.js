/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import invariant from 'fbjs/lib/invariant';

import lastx from './lastx';

const hasWeakMap = typeof WeakMap === 'function';

class MultiKeyMap {
  constructor() {
    this.root = this.createNode();
    this.keyLength = null;
  }

  set(keys, value) {
    this.validateKeys(keys);
    let node = this.root;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      let nextNode = this.getCache(node, key).get(key);
      if (nextNode === null) {
        nextNode = this.createNode();
        this.getCache(node, key).set(key, nextNode);
      }
      invariant(nextNode.type === 'map', 'Expected map node');
      node = nextNode;
    }

    const finalKey = keys[keys.length - 1];
    this.getCache(node, finalKey).set(finalKey, { type: 'value', value });
  }

  get(keys) {
    this.validateKeys(keys);
    const node = this.getNode(keys);
    const finalNode = node && node.get(lastx(keys));
    return finalNode === null || finalNode.type !== 'value' ? undefined : finalNode.value;
  }

  delete(keys) {
    this.validateKeys(keys);
    const node = this.getNode(keys);
    return node ? node.delete(lastx(keys)) : false;
  }

  getCache(node, key) {
    return isPrimitive(key) ? node.cache : node.weakCache;
  }

  getNode(keys) {
    let node = this.root;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      const nextNode = this.getCache(node, key).get(key);
      if (!nextNode) {
        return undefined;
      }
      node = nextNode;
    }

    return this.getCache(node, lastx(keys));
  }

  createNode() {
    return {
      type: 'map',
      cache: new Map(),
      weakCache: hasWeakMap ? new WeakMap() : new Map(),
    };
  }

  validateKeys(keys) {
    if (this.keyLength === null) {
      this.keyLength = keys.length;
    }

    if (this.keyLength !== keys.length) {
      throw new Error('MultiKeyMap called with different number of keys');
    }

    if (keys.length < 1) {
      throw new Error('MultiKeyMap called with empty array of keys');
    }
  }
}

function isPrimitive(value) {
  const type = typeof value;
  return type === 'number' || type === 'string' || type === 'boolean' || value === null;
}

export default MultiKeyMap;
