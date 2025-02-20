import { memoizeWithArgsWeak } from '@fb-utils/memoizeWithArgsWeak';

export const BUIPrivateSelectorFactory = (fn) => {
  return memoizeWithArgsWeak(fn);
};
