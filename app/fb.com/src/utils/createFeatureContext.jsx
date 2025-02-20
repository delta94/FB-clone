import React, { createContext, useCallback, useContext, useLayoutEffect, useMemo, useReducer, useRef } from 'react';
import { emptyFunction } from 'fbjs/lib/emptyFunction';

import { useUniqueID } from '@fb-hooks';

import { shallowArrayEqual } from './shallowArrayEqual';
import { uniqueID } from './uniqueID';

function createFeatureContext() {
  const FeatureContext = createContext({
    getFeature: () => [],
    pushFeatures: emptyFunction,
  });

  const reducer = (state, action) => {
    const { id, features, remove } = action;
    const newState = new Map(state);
    const entries = Object.entries(features);

    for (const [key, value] of entries) {
      const featureMap = new Map(newState.get(key));
      if (remove) {
        featureMap.delete(id);
      } else {
        featureMap.set(id, value);
      }
      newState.set(key, featureMap);
    }

    return newState;
  };

  const initializeState = (initialValue) => {
    return Object.entries(initialValue ?? {}).reduce((acc, [key, values]) => {
      acc.set(key, new Map(values.map((value) => [uniqueID(), value])));
      return acc;
    }, new Map());
  };

  const Provider = ({ initialValue, children }) => {
    console.log('🚀 ~ Provider ~ initialValue:', initialValue);
    const [state, dispatch] = useReducer(reducer, initializeState(initialValue));
    console.log('🚀 ~ Provider ~ state:', state);

    const getFeature = useCallback(
      (key) => {
        return Array.from(new Map(state.get(key)).values());
      },
      [state],
    );

    console.log('🚀 ~ Provider ~ getFeature:', getFeature);
    const pushFeatures = useCallback((id, features) => {
      dispatch({ id, features, remove: false });
      return () => {
        dispatch({ id, features, remove: true });
      };
    }, []);
    console.log('🚀 ~ pushFeatures ~ pushFeatures:', pushFeatures);

    const contextValue = useMemo(() => ({ getFeature, pushFeatures }), [getFeature, pushFeatures]);

    return <FeatureContext.Provider value={contextValue}>{children}</FeatureContext.Provider>;
  };

  Provider.displayName = 'FeatureContextProvider';

  const useFeatureContext = (features) => {
    const id = useUniqueID();
    const { getFeature, pushFeatures } = useContext(FeatureContext);
    console.log('🚀 ~ useFeatureContext ~ getFeature1:', getFeature);
    console.log('🚀 ~ useFeatureContext ~ pushFeatures1:', pushFeatures);
    const previousFeatures = useRef(features);

    const currentFeatures = useMemo(() => {
      return shallowArrayEqual(features, previousFeatures.current) ? previousFeatures.current : features;
    }, [features]);

    useLayoutEffect(() => {
      previousFeatures.current = currentFeatures;
    }, [currentFeatures]);

    useLayoutEffect(() => {
      console.log('🚀 ~ useLayoutEffect ~ currentFeatures:', currentFeatures);
      console.log('🚀 ~ useLayoutEffect ~ id:', id);
      // if (currentFeatures) return pushFeatures(id, currentFeatures);
    }, [id, currentFeatures, pushFeatures]);

    return getFeature;
  };

  const Consumer = ({ value, children }) => {
    const features = useFeatureContext(value);
    console.log('🚀 ~ Consumer ~ features:', features);
    return <>{children(features)}</>;
  };

  Consumer.displayName = 'FeatureContextConsumer';

  const Push = ({ value }) => {
    if (!value) return;
    console.log('🚀 ~ Push ~ value:', value);
    useFeatureContext(value);
    return null;
  };

  Push.displayName = 'FeatureContextPush';

  return { Consumer, Provider, Push, useFeatureContext };
}

export default createFeatureContext;
