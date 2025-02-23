import { executionEnvironment } from '@fb-utils/ExecutionEnvironment';

import { CometSSRClientRender } from '@fb-dump/CometSSRClientRender';

export const suspendOrThrowIfUsedInSSR = (a) => {
  if (!executionEnvironment.isInBrowser) {
    throw CometSSRClientRender(a);
  }
};
