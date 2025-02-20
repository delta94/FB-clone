import { CometDarkMode } from './CometDarkMode';
import { makeCometDarkModeStateProvider } from './makeCometDarkModeStateProvider';

export const CometDarkModeStateProvider = makeCometDarkModeStateProvider({
  getDarkModeSetting: CometDarkMode.getDarkModeSetting,
  saveDarkModeSetting: CometDarkMode.saveDarkModeSetting,
});
