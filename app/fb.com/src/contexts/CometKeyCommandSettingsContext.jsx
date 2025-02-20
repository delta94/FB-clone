/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from "react";

import { CometCustomKeyCommands } from "../faang/components/CometCustomKeyCommands";

const CometKeyCommandSettingsContext = React.createContext({
  addCustomCommand: function (command) {},
  checkForKeyCommandConflict: function (command) {
    return [];
  },
  disableCustomCommand: function (command) {},
  getAreSingleKeysDisabled: function () {
    return CometCustomKeyCommands.areSingleKeysDisabled;
  },
  getCustomCommandsMap: function () {
    return new Map();
  },
  getCustomKeyCombination: function (command) {},
  getModifiedKeyboardShortcutsPreference: function () {
    return 4;
  },
  isViewerShowing: false,
  resetAllCustomCommands: function () {},
  resetCustomCommand: function () {},
  setAreSingleKeysDisabled: function (disabled) {},
  setModifiedKeyboardShortcutsPreference: function (preference) {},
  setViewerInfo: function (info) {},
  viewerType: "see_all",
});

export default CometKeyCommandSettingsContext;
