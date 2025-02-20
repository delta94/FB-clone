import { createContext } from 'react';

export const HiddenSubtreeContext = createContext({
  backgrounded: false,
  hidden: false,
  hiddenOrBackgrounded: false,
  hiddenOrBackgrounded_FIXME: false,
});
