/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { bx } from "bx";
import emptyFunction from "fbjs/lib/emptyFunction";
import fbt from "fbt";

import { ReQL } from "../faang/components/ReQL";
import { useFirst } from "../faang/components/ReQLSuspense";
import $InternalEnum from "../helpers/$InternalEnum";
import { equal, zero } from "../helpers/I64";
import { useEffectInt64, useMemoInt64 } from "../hooks/Int64Hooks";
import useReStore from "../hooks/useReStore";

import { useMWPAudioPlaybackThreadKey } from "./MWPAudioPlaybackThreadContext.react";

const playbackRates = $InternalEnum({
  SLOW: 0.5,
  NORMAL: 1,
  FAST: 1.5,
  DOUBLE: 2,
});

function createAudioElement(url) {
  const audio = new Audio();
  audio.preload = "auto";
  audio.src = url;
  audio.load();
  return audio;
}

function getPlaceholderAudio() {
  return createAudioElement(bx.getURL(bx("577")));
}

function getNextPlaybackRate(currentRate) {
  const rates = Array.from(playbackRates.members());
  const index = rates.findIndex((rate) => rate === currentRate);
  return rates[(index + 1) % rates.length];
}

function getPlaybackRateLabel(rate) {
  return fbt._("__JHASH__T0e3ZJkGlxz__JHASH__", [
    fbt._param("playback rate", rate, [0]),
  ]);
}

const defaultAudioContext = {
  activeAudio: null,
  activeThreadKey: zero,
  addMessageId: emptyFunction,
  addNextPlayableUrl: emptyFunction,
  clearActiveAudio: emptyFunction,
  clearNextPlayableUrl: emptyFunction,
  getMessageId: emptyFunction,
  getNewOrExistingAudio: createAudioElement,
  getNextPlayableUrl: emptyFunction,
  onChangePlaybackRate: emptyFunction,
  playbackRateLabel: getPlaybackRateLabel(playbackRates.NORMAL),
  setUseOutOfChatPlayback: emptyFunction,
};

const AudioContext = createContext(defaultAudioContext);

// eslint-disable-next-line max-params
export function useMWPAudioPlaybackElement(
  url,
  nextUrl,
  messageId,
  nextMessageId,
  useOutOfChatPlayback
) {
  const context = useContext(AudioContext);
  const {
    activeAudio,
    activeThreadKey,
    addMessageId,
    addNextPlayableUrl,
    clearNextPlayableUrl,
    getNewOrExistingAudio,
    setUseOutOfChatPlayback,
  } = context;
  const threadKey = useMWPAudioPlaybackThreadKey();

  useEffectInt64(() => {
    if (!useOutOfChatPlayback || is_zero(activeThreadKey) || is_zero(threadKey))
      return;

    setUseOutOfChatPlayback(!equal(activeThreadKey, threadKey));
    return () => {
      setUseOutOfChatPlayback(equal(activeThreadKey, threadKey));
    };
  }, [
    activeAudio,
    activeThreadKey,
    setUseOutOfChatPlayback,
    useOutOfChatPlayback,
    threadKey,
  ]);

  return useMemoInt64(() => {
    if (url) {
      if (messageId) addMessageId(url, messageId);
      if (!useOutOfChatPlayback) return createAudioElement(url);

      if (nextUrl) {
        addNextPlayableUrl(url, nextUrl);
        if (nextMessageId) addMessageId(nextUrl, nextMessageId);
      } else {
        clearNextPlayableUrl(url);
      }
      return getNewOrExistingAudio(url, threadKey);
    }
  }, [
    addMessageId,
    addNextPlayableUrl,
    clearNextPlayableUrl,
    getNewOrExistingAudio,
    messageId,
    nextMessageId,
    nextUrl,
    url,
    useOutOfChatPlayback,
    threadKey,
  ]);
}

export function useMWPAudioPlaybackRate() {
  const context = useContext(AudioContext);
  const { onChangePlaybackRate, playbackRateLabel } = context;
  return [playbackRateLabel, onChangePlaybackRate];
}

export function useMWPAudioOutOfChatPlayback() {
  const context = useContext(AudioContext);
  const {
    activeAudio,
    activeThreadKey,
    clearActiveAudio,
    clearNextPlayableUrl,
    getMessageId,
    getNextPlayableUrl,
  } = context;
  const reStore = useReStore();
  const thread = useFirst(
    () =>
      ReQL.fromTableDescending(reStore.tables.threads).getKeyRange(
        activeThreadKey
      ),
    [reStore, activeThreadKey],
    `${__filename}:202`
  );

  const audioSrc = activeAudio?.src ?? null;
  const nextPlayableUrl = audioSrc ? getNextPlayableUrl(audioSrc) : null;
  const message = useFirst(
    () => {
      const id = nextPlayableUrl ? getMessageId(nextPlayableUrl) : null;
      return id
        ? ReQL.fromTableAscending(reStore.tables.messages.index("messageId"), [
            "isUnsent",
          ])
            .getKeyRange(id)
            .filter((msg) => !msg.isUnsent)
        : ReQL.empty();
    },
    [reStore, getMessageId, nextPlayableUrl],
    `${__filename}:211`
  );

  if (audioSrc && nextPlayableUrl && !message) {
    clearNextPlayableUrl(audioSrc);
  }

  return [activeAudio, clearActiveAudio, thread];
}

export const MWPAudioPlaybackContextProvider = ({ children }) => {
  const audioElementsRef = useRef(new Map());
  const nextPlayableUrlsRef = useRef(new Map());
  const eventListenersRef = useRef([]);
  const messageIdsRef = useRef(new Map());

  useEffect(() => {
    return () => {
      const eventListeners = eventListenersRef.current;
      while (eventListeners.length > 0) {
        const [audio, event, listener] = eventListeners.pop();
        audio.removeEventListener(event, listener);
        audio.pause();
      }
    };
  }, []);

  const [playbackRate, setPlaybackRate] = useState(playbackRates.NORMAL);
  const playbackRateLabel = useMemo(
    () => getPlaybackRateLabel(playbackRate),
    [playbackRate]
  );

  const [activeThreadKey, setActiveThreadKey] = useState(zero);
  const [activeAudio, setActiveAudio] = useState(null);
  const [useOutOfChatPlayback, setUseOutOfChatPlayback] = useState(false);
  const isPlaying = (activeAudio?.paused ?? true) === false;
  const currentActiveAudio = useMemo(
    () => (useOutOfChatPlayback && isPlaying ? activeAudio : null),
    [activeAudio, isPlaying, useOutOfChatPlayback]
  );

  const addMessageId = useCallback((url, id) => {
    messageIdsRef.current.set(url, id);
  }, []);

  const getMessageId = useCallback((url) => {
    return messageIdsRef.current.get(url);
  }, []);

  const clearActiveAudio = useCallback(() => {
    setActiveAudio((audio) => {
      audio?.pause();
      return null;
    });
  }, []);

  const clearNextPlayableUrl = useCallback((url) => {
    nextPlayableUrlsRef.current.delete(url);
  }, []);

  const getNextPlayableUrl = useCallback((url) => {
    return nextPlayableUrlsRef.current.get(url);
  }, []);

  const getNewOrExistingAudio = useCallback(
    (url, threadKey) => {
      const existingAudio =
        audioElementsRef.current.get(url) ?? createAudioElement(url);
      existingAudio.playbackRate = playbackRate;

      const addListener = (event, listener) => {
        existingAudio.addEventListener(event, listener);
        eventListenersRef.current.push([existingAudio, event, listener]);
      };

      const onEnded = () => {
        const nextUrl = nextPlayableUrlsRef.current.get(url);
        if (nextUrl) {
          const nextAudio = audioElementsRef.current.get(nextUrl);
          if (nextAudio && nextAudio.paused) {
            getPlaceholderAudio()
              .play()
              .then(() => {
                setActiveAudio(nextAudio);
                return nextAudio.play().catch(() => setActiveAudio(null));
              });
          }
        } else {
          setActiveAudio(null);
        }
      };

      const onPlaying = () => {
        for (const audio of audioElementsRef.current.values()) {
          if (audio !== existingAudio) audio.pause();
        }
        setActiveAudio(existingAudio);
        setActiveThreadKey(threadKey);
      };

      addListener("ended", onEnded);
      addListener("playing", onPlaying);

      audioElementsRef.current.set(url, existingAudio);
      return existingAudio;
    },
    [playbackRate]
  );

  const addNextPlayableUrl = useCallback((url, nextUrl) => {
    nextPlayableUrlsRef.current.set(url, nextUrl);
  }, []);

  const onChangePlaybackRate = useCallback(() => {
    setPlaybackRate((rate) => {
      const nextRate = getNextPlaybackRate(rate);
      for (const audio of audioElementsRef.current.values()) {
        audio.playbackRate = nextRate;
      }
      return nextRate;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      activeAudio: currentActiveAudio,
      activeThreadKey,
      addMessageId,
      addNextPlayableUrl,
      clearActiveAudio,
      clearNextPlayableUrl,
      getMessageId,
      getNewOrExistingAudio,
      getNextPlayableUrl,
      onChangePlaybackRate,
      playbackRateLabel,
      setUseOutOfChatPlayback,
    }),
    [
      currentActiveAudio,
      activeThreadKey,
      addMessageId,
      addNextPlayableUrl,
      clearActiveAudio,
      clearNextPlayableUrl,
      getMessageId,
      getNewOrExistingAudio,
      getNextPlayableUrl,
      onChangePlaybackRate,
      playbackRateLabel,
      setUseOutOfChatPlayback,
    ]
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};
