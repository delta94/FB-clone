import { err } from '@fb-error/err';
import { unrecoverableViolation } from '@fb-error/unrecoverableViolation';
import { executionEnvironment } from '@fb-utils/ExecutionEnvironment';

export function getSameOriginTransport() {
  if (!executionEnvironment.canUseDOM && !executionEnvironment.isInWorker)
    throw unrecoverableViolation(
      'getSameOriginTransport: Same origin transport unavailable in the server environment.',
      'comet_infra',
      {},
      {
        blameToPreviousFrame: 1,
      },
    );
  try {
    return new window.XMLHttpRequest();
  } catch (e) {
    throw err('getSameOriginTransport: %s', e.message);
  }
}
