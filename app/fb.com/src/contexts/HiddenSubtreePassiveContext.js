import { createContext } from 'react';

// type HiddenSubtreePassiveContextProps = {
//   getCurrentState: () => any
//   subscribeToChanges: (props?: any) => any
// }

/**
 * @typedef HiddenSubtreePassiveContextProps
 * @property {()=>any} getCurrentState
 * @property {(props?: any) => any} subscribeToChanges
 */

/**
 * @type {HiddenSubtreePassiveContextProps}
 */
export const HiddenSubtreePassiveContext = createContext({
  getCurrentState: function () {
    return {
      backgrounded: false,
      hidden: false,
      hiddenOrBackgrounded: false,
      hiddenOrBackgrounded_FIXME: false,
    };
  },
  subscribeToChanges: (a) => {
    return {
      remove: () => {},
    };
  },
});
