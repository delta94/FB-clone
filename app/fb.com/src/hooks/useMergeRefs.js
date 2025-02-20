import { useMemo } from 'react';

import { mergeRefs } from '../utils/mergeRefs';

// export function useMergeRefs(...refs) {
//   return useMemo(() => {
//     mergeRefs(...refs);
//   }, [...refs]);
// }

export function useMergeRefs(...refs) {
  return useMemo(() => mergeRefs(...refs), [refs]);
}
