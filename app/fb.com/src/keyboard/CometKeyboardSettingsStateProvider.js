/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React, { useRef, useState } from 'react';
import { CometKeyCommandSettingsContext } from '@fb-contexts';
import { cr } from '@fb-utils/cr';

import { CometCustomKeyCommands } from './CometCustomKeyCommands';
import { useCustomCommandsState } from './useCustomCommandsState';

export const CometKeyboardSettingsStateProvider = ({ children }) => {
  const singleKeysDisabledRef = useRef(CometCustomKeyCommands.areSingleKeysDisabled);
  const keyboardShortcutsPreferenceRef = useRef(CometCustomKeyCommands.modifiedKeyboardShortcutsPreference);
  const [isViewerShowing, setIsViewerShowing] = useState(false);
  const [viewerType, setViewerType] = useState('see_all');
  const customCommandsState = useCustomCommandsState();

  const CometKeyCommandSettingsContextValue = {
    getAreSingleKeysDisabled: () => {
      return singleKeysDisabledRef.current;
    },
    getModifiedKeyboardShortcutsPreference: () => {
      return keyboardShortcutsPreferenceRef.current;
    },
    isViewerShowing: isViewerShowing,
    setAreSingleKeysDisabled: (a) => {
      if (a === singleKeysDisabledRef.current) return;
      // SetAreSingleKeysDisabledSetting({
      //   environment: c("CometRelayEnvironment"),
      //   input: {
      //     input: {
      //       disabled: a,
      //     },
      //   },
      // });
      singleKeysDisabledRef.current = a;
      // c("SingleKeyShortcutsDisabledFalcoEvent").log(function () {
      //   return {
      //     setting_disabled: a,
      //   };
      // });
    },

    setModifiedKeyboardShortcutsPreference: (a) => {
      if (!cr[2039] || !cr[2034] || a === keyboardShortcutsPreferenceRef.current) return;
      // let d = b("cr:2039").fromJSEnum(a);
      // d &&
      //   (b("cr:2034")({
      //     environment: c("CometRelayEnvironment"),
      //     input: {
      //       input: {
      //         preference: d,
      //       },
      //     },
      //   }),
      //   (e.current = a));
    },

    setViewerInfo: (a, b) => {
      setIsViewerShowing(a);
      setViewerType(b);
      // m({
      //   shown: a,
      //   viewer_type: b,
      // });
    },
    viewerType: viewerType,
    ...customCommandsState,
  };

  return (
    <CometKeyCommandSettingsContext.Provider value={CometKeyCommandSettingsContextValue}>
      {children}
    </CometKeyCommandSettingsContext.Provider>
  );
};
