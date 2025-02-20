import React from 'react';

const CometCustomKeyCommands = {
  customCommands: {},
  areSingleKeysDisabled: null,
  modifiedKeyboardShortcutsPreference: 4,
};

// TODO
export const CometKeyCommandSettingsContext = React.createContext({
  addCustomCommand: function (a) {},
  checkForKeyCommandConflict: function (a) {
    return [];
  },
  disableCustomCommand: function (a) {},
  getAreSingleKeysDisabled: function () {
    return CometCustomKeyCommands.areSingleKeysDisabled;
  },
  getCustomCommandsMap: function () {
    return new Map();
  },
  getCustomKeyCombination: function (a) {},
  getModifiedKeyboardShortcutsPreference: function (a) {
    return 4;
  },
  isViewerShowing: false,
  resetAllCustomCommands: function (a) {},
  resetCustomCommand: function (a) {},
  setAreSingleKeysDisabled: function (a) {},
  setModifiedKeyboardShortcutsPreference: function (a) {},
  setViewerInfo: function (a) {},
  viewerType: 'see_all',
});
