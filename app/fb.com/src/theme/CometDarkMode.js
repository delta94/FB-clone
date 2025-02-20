import { gkx } from '@fb-utils/gkx';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import { CometDarkModeRootClass } from './CometDarkModeRootClass';
import { CometDarkModeSetting } from './CometDarkModeSetting';

// eslint-disable-next-line no-unused-vars
const DARK_MODE_QUERY = '(prefers-color-scheme: dark)';

// eslint-disable-next-line no-unused-vars
const CONTEXT = {
  product: 'COMET',
};
let currentSetting = CometDarkModeSetting.initialSetting;
const listeners = new Set();

function getDarkModeSetting() {
  return !gkx[22823] ? 'DISABLED' : currentSetting;
}

function saveDarkModeSetting(newSetting, { onRevert }) {
  if (!ExecutionEnvironment.canUseDOM) {
    return;
  }

  let previousSetting = currentSetting;
  if (previousSetting === newSetting) {
    return;
  }

  updateSetting(newSetting);

  // function g(b) {
  //   b = b.getRoot().getLinkedRecord("viewer");
  //   if (!b) return;
  //   let c = b.getValue("dark_mode_setting", m);
  //   if (c === a) return;
  //   b.setValue("dark_mode_setting", a, m);
  // }

  // d("CometRelay").commitMutation(c("CometRelayEnvironment"), {
  //   mutation: c("CometSetDarkModeSettingMutation.graphql"),
  //   onError: function () {
  //     p(f), e(f);
  //   },
  //   optimisticUpdater: g,
  //   variables: {
  //     input: m,
  //     setting: a,
  //   },
  // });
}

function updateSetting(newSetting) {
  currentSetting = newSetting;
  let updatedSetting = getDarkModeSetting();

  listeners.forEach((callback) => {
    return callback(updatedSetting);
  });

  if (gkx[22823]) {
    CometDarkModeRootClass.updateDarkModeRootClass(updatedSetting);
  }
}

function initDarkMode() {
  CometDarkModeRootClass.updateDarkModeRootClass(getDarkModeSetting());
  if (window.matchMedia) {
    // let a = "comet.dark_mode_audit";
    // let b = window.matchMedia(l).matches;
    // (h || (h = d("ODS"))).bumpFraction(
    //   4929,
    //   a,
    //   "system_setting_is_dark_mode",
    //   b ? 1 : 0,
    //   1
    // );
    // h.bumpFraction(
    //   4929,
    //   a,
    //   "initial_setting_is_use_system",
    //   d("CometDarkModeSetting").initialSetting === "USE_SYSTEM" ? 1 : 0,
    //   1
    // );
    // b = b !== d("CometDarkModeSetting").initialGuessForDarkModeOnClient;
    // h.bumpFraction(4929, a, "server_guess_is_incorrect", b ? 1 : 0, 1);
    // window.__invalidateSSR != null &&
    //   d("CometDarkModeSetting").initialSetting === "USE_SYSTEM" &&
    //   b &&
    //   window.__invalidateSSR("Incorrect guess for client dark mode state");
  }
}

function onDarkModeChange(callback) {
  listeners.add(callback);
  return function () {
    listeners['delete'](callback);
  };
}

function getDarkModePreference() {
  return getDarkModeSetting() === 'ENABLED';
}

export const CometDarkMode = {
  toggleDarkModeRootClass: CometDarkModeRootClass.toggleDarkModeRootClass,
  updateDarkModeRootClass: CometDarkModeRootClass.updateDarkModeRootClass,
  onDarkModeChange,
  getDarkModeSetting,
  getDarkModePreference,
  saveDarkModeSetting,
  initDarkMode,
};
