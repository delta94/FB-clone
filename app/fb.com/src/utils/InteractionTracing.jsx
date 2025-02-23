/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import Env from "Env";
import HeroBootloadPerfStore from "HeroBootloadPerfStore";
import {
  getTraceStatus,
  InteractionTracingCore,
  NavigationTracing,
} from "interaction-tracing";
import InteractionTracingConfigDefault from "InteractionTracingConfigDefault";
import InteractionTracingMetrics from "InteractionTracingMetrics";
import JSSelfProfilerLoomProvider from "JSSelfProfilerLoomProvider";
import { interactions as JSSelfProfilerTrackedInteractions } from "JSSelfProfilerTrackedInteractions";
import WebSession from "WebSession";

let envCache;

function transformStartMetadata({ cfg, ...rest }) {
  if (!envCache) envCache = Env;

  const { jssp_header_sent, jssp_targeting_enabled } = envCache;

  if (jssp_header_sent && jssp_targeting_enabled) {
    const { interactions } = JSSelfProfilerTrackedInteractions;

    if (interactions) {
      const shouldAddProvider = !!interactions.find(
        ({ tracePolicy, action }) =>
          (tracePolicy === "*" || tracePolicy === cfg.tracePolicy) &&
          (action === "*" || action === cfg.traceType)
      );

      if (shouldAddProvider && JSSelfProfilerLoomProvider) {
        HeroBootloadPerfStore?.addProvider(JSSelfProfilerLoomProvider);
      }
    }
  }

  return {
    ...rest,
    cfg: {
      ...InteractionTracingConfigDefault.DEFAULT_TRACING_CONFIG,
      ...cfg,
    },
    deps: HeroBootloadPerfStore,
  };
}

const InteractionTracing = {
  ...InteractionTracingCore,
  transformStartMetadata,
  startInteraction: (config, callback) =>
    InteractionTracingCore.startInteraction(
      transformStartMetadata(config),
      callback
    ),
  trace: (
    (originalTrace) =>
    (config, ...rest) => {
      const traceConfig = {
        ...InteractionTracingConfigDefault.DEFAULT_TRACING_CONFIG,
        ...config,
      };

      const traceResult = originalTrace(
        traceConfig,
        HeroBootloadPerfStore,
        ...rest
      );

      const sessionId = WebSession.getSessionId();
      if (sessionId) {
        InteractionTracingMetrics.addMetadata(
          traceResult,
          "websession_id",
          sessionId
        );
      }

      if (!envCache) envCache = Env;
      const { brsid } = envCache;

      if (brsid) {
        InteractionTracingMetrics.addAnnotation(
          traceResult,
          "brsid",
          `${brsid}`
        );
      }

      return traceResult;
    }
  )(InteractionTracingCore.trace),
  navigation: NavigationTracing,
  getTraceStatus,
};

export default InteractionTracing;
