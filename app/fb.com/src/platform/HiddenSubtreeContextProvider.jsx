/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import removeFromArray from 'fbjs/lib/removeFromArray';

import { HiddenSubtreeContext, HiddenSubtreePassiveContext } from '@fb-contexts';
import { useUnsafeRef_DEPRECATED } from '@fb-hooks';

function compareStates(a, b) {
  return a.backgrounded === b.backgrounded && a.hidden === b.hidden;
}

function mergeStates(a, b) {
  const backgrounded = a.backgrounded || b.backgrounded;
  const hidden = a.hidden || b.hidden;
  return {
    backgrounded,
    hidden,
    hiddenOrBackgrounded: backgrounded || hidden,
    hiddenOrBackgrounded_FIXME: backgrounded || hidden,
  };
}

export const HiddenSubtreeContextProvider = ({ children, ignoreParent, isBackgrounded = false, isHidden }) => {
  const parentContext = useContext(HiddenSubtreeContext);
  const passiveParentContext = useContext(HiddenSubtreePassiveContext);

  const currentState = useMemo(
    () => ({
      backgrounded: isBackgrounded,
      hidden: isHidden,
      hiddenOrBackgrounded: isBackgrounded || isHidden,
      hiddenOrBackgrounded_FIXME: isBackgrounded || isHidden,
    }),
    [isBackgrounded, isHidden],
  );

  const stateRef = useUnsafeRef_DEPRECATED(currentState);
  const latestMergedState = useRef(null);
  const subscribers = useRef([]);

  const notifySubscribers = useCallback(() => {
    const stateToNotify = ignoreParent
      ? stateRef.current
      : mergeStates(stateRef.current, passiveParentContext.getCurrentState());

    if (latestMergedState.current === null || !compareStates(stateToNotify, latestMergedState.current)) {
      latestMergedState.current = stateToNotify;
      const currentSubscribers = Array.from(subscribers.current);
      currentSubscribers.forEach((subscriber) => subscriber(stateToNotify));
    }
  }, [ignoreParent, passiveParentContext]);

  useLayoutEffect(() => {
    stateRef.current = currentState;
    notifySubscribers();
  }, [currentState, notifySubscribers]);

  useEffect(() => {
    if (ignoreParent !== true) {
      const unsubscribe = passiveParentContext.subscribeToChanges(notifySubscribers);
      return () => unsubscribe.remove();
    }
  }, [ignoreParent, notifySubscribers, passiveParentContext]);

  const contextValue = useMemo(
    () => ({
      getCurrentState: () =>
        ignoreParent ? stateRef.current : mergeStates(stateRef.current, passiveParentContext.getCurrentState()),
      subscribeToChanges: (subscriber) => {
        subscribers.current.push(subscriber);
        return {
          remove: () => removeFromArray(subscribers.current, subscriber),
        };
      },
    }),
    [passiveParentContext, ignoreParent],
  );

  const mergedState = ignoreParent ? currentState : mergeStates(currentState, parentContext);

  const providerValue = useMemo(
    () => ({
      backgrounded: mergedState.backgrounded,
      hidden: mergedState.hidden,
      hiddenOrBackgrounded: mergedState.backgrounded || mergedState.hidden,
      hiddenOrBackgrounded_FIXME: mergedState.backgrounded || mergedState.hidden,
    }),
    [mergedState.backgrounded, mergedState.hidden],
  );

  return (
    <HiddenSubtreeContext.Provider value={providerValue}>
      <HiddenSubtreePassiveContext.Provider value={contextValue}>{children}</HiddenSubtreePassiveContext.Provider>
    </HiddenSubtreeContext.Provider>
  );
};

HiddenSubtreeContextProvider.displayName = `${HiddenSubtreeContextProvider.name} [from ${module.id}]`;
