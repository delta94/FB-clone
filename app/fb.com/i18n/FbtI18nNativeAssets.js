import source from './fbt/output/vi_VN.json';

const _translationsDictionary = source;

export default class FbtI18nNativeAssets {
  static getString = (hashKey) => {
    // if (englishIsActive) {
    //   return null;
    // }
    return _translationsDictionary[hashKey];
  };
}
