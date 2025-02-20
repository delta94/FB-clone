import { executionEnvironment } from '@fb-utils/ExecutionEnvironment';

import { CometSSRClientRender } from './CometSSRClientRender';

export function suspendOrThrowIfUsedInSSR(a) {
  if (!executionEnvironment.isInBrowser) {
    throw CometSSRClientRender(a);
  }
}
