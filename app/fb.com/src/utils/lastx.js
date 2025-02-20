/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import invariant from "fbjs/lib/invariant";

function lastx(iterable) {
  let result = null;

  if (Array.isArray(iterable)) {
    if (iterable.length) {
      result = { value: iterable[iterable.length - 1] };
    }
  } else {
    const iterator =
      iterable[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
    let step;
    while (!(step = iterator.next()).done) {
      result = result || {};
      result.value = step.value;
    }
  }

  if (result) {
    return result.value;
  }

  invariant(false, "Expected non-empty iterable");
}

export default lastx;
