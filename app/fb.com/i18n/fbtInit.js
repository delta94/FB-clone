import { init } from 'fbt';

import { getTranslatedInput } from './getTranslatedInput';

init({
  // translations: require("./fbt/translatedFbts.json"),
  hooks: { getTranslatedInput },
});

export default {};
