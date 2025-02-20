import { CometStyleXDarkTheme } from './CometStyleXDarkTheme';
import { CometStyleXDefaultTheme } from './CometStyleXDefaultTheme';
import { StyleXSheet } from './StyleXSheet';

class _CometStyleXSheet extends StyleXSheet {
  constructor() {
    super({
      rootDarkTheme: CometStyleXDarkTheme,
      rootTheme: CometStyleXDefaultTheme,
    });
  }
}

export const CometStyleXSheet = {
  rootStyleSheet: new _CometStyleXSheet(),
  CometStyleXSheet: _CometStyleXSheet,
  DARK_MODE_CLASS_NAME: StyleXSheet.DARK_MODE_CLASS_NAME,
  LIGHT_MODE_CLASS_NAME: StyleXSheet.DARK_MODE_CLASS_NAME,
};
