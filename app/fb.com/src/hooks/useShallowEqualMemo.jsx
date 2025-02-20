import shallowEqual from 'fbjs/lib/shallowEqual';

import { useCustomEqualityMemo } from '@fb-hooks';

export function useShallowEqualMemo(value) {
  return useCustomEqualityMemo(value, shallowEqual);
}
