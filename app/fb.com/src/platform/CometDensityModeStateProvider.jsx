import React, { useCallback, useMemo, useState } from 'react';
import { CometDensityModeContext } from '@fb-contexts/CometDensityModeContext';

const CometDenseModeSetting = {
  initialSetting: 'COMPACT',
};

export const CometDensityModeStateProvider = ({ children }) => {
  const [isCompactMode, setIsCompactMode] = useState(CometDenseModeSetting.initialSetting === 'COMPACT');

  const toggleDensityMode = useCallback(
    (isCompact, options) => {
      // eslint-disable-next-line no-unused-vars
      const onRevert = options.onRevert;
      const newSetting = isCompact ? 'COMPACT' : 'DEFAULT';
      setIsCompactMode(newSetting === 'COMPACT');

      // eslint-disable-next-line no-unused-vars
      function updateDenseModeSetting(viewer) {
        const viewerRecord = viewer.getRoot().getLinkedRecord('viewer');
        if (!viewerRecord) {
          return;
        }
        const currentSetting = viewerRecord.getValue('dense_mode_setting');
        if (currentSetting === newSetting) {
          return;
        }
        viewerRecord.setValue('dense_mode_setting', newSetting);
      }

      // TODO later
      // d("CometRelay").commitMutation(c("CometRelayEnvironment"), {
      //   mutation: c("CometSetDenseModeMutation"),
      //   onError: function () {
      //     f(d("CometDenseModeSetting").initialSetting === "COMPACT"), g(e);
      //   },
      //   optimisticUpdater: i,
      //   variables: {
      //     input: {
      //       density_mode: h,
      //     },
      //   },
      // });
    },
    [isCompactMode],
  );

  const handleDensityModeChange = useCallback(
    (isCompact) => {
      toggleDensityMode(isCompact, {
        onRevert: (previousMode) => {
          setIsCompactMode(previousMode);
        },
      });
    },
    [toggleDensityMode],
  );

  const contextValue = useMemo(
    () => [isCompactMode, handleDensityModeChange],
    [isCompactMode, handleDensityModeChange],
  );

  return <CometDensityModeContext.Provider value={contextValue}>{children}</CometDensityModeContext.Provider>;
};
