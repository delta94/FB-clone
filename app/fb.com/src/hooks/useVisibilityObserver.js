// const b = 0
// const d = [0, 0.25, 0.5, 0.75, 1]
// const e = [
//   0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65,
//   0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,

import { useViewportDuration } from './useViewportDuration';

// ]
let thresholdArr = {
  EXPENSIVE: [
    0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
  ],
  LITE: 0,
  MODERATE: [0, 0.25, 0.5, 0.75, 1],
};

export function useVisibilityObserver(props) {
  const { onHidden, onIntersection, onVisibilityDurationUpdated, onVisible, options } = props;

  let b;
  props = props.options;
  // eslint-disable-next-line no-return-assign
  return useViewportDuration({
    onHidden,
    onIntersection,
    onVisibilityDurationUpdated,
    onVisible,
    options,
    threshold:
      // @ts-ignore
      thresholdArr[(b = !options ? undefined : options.thresholdOverride) !== null ? b : 'LITE'],
  });
}
