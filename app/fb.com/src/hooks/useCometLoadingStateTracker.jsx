/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useEffect, useRef } from "react";
import { getPendingInteractions } from "InteractionTracing";

import { LOADING_STATE } from "../../helpers/CometVisualCompletionConstants";

const useCometLoadingStateTracker = () => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    let cleanupCallbacks = [];

    if (element !== null) {
      cleanupCallbacks = trackLoadingState(element);
    }

    return () => {
      cleanupCallbacks.forEach((cleanup) => cleanup());
    };
  }, []);

  return [LOADING_STATE, ref];
};

const trackLoadingState = (element) => {
  const cleanupCallbacks = [];
  getPendingInteractions().forEach((interaction) => {
    const trace = interaction.getTrace();
    if (trace && trace.vcTracker) {
      cleanupCallbacks.push(trace.vcTracker.waitLoadingState(element));
    }
  });
  return cleanupCallbacks;
};

export default useCometLoadingStateTracker;
