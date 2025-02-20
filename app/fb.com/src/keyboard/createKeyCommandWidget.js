import { createContext, useContext, useEffect } from 'react';
import { recoverableViolation } from '@fb-error/recoverableViolation';

import { createKeyCommandWrapper } from './createKeyCommandWrapper';

export function createKeyCommandWidget(isFocusCapture = true) {
  const Context = createContext();
  const Wrapper = createKeyCommandWrapper(isFocusCapture, Context);

  function useKeyCommands(commands, d = false, dependencies) {
    if (d === undefined) {
      d = false;
    }

    let contextValue = useContext(Context);
    useEffect(() => {
      if (!contextValue) {
        d ||
          recoverableViolation(
            "Attempting to register a key command outside of its widget scope. Calls to useKeyCommand must be within its widget's wrapper.",
            'comet_ax',
          );
        return;
      }
      if (commands) {
        return contextValue.addCommands(commands, dependencies);
      }
    }, [contextValue, commands, d, dependencies]);
  }

  return {
    Context,
    Wrapper,
    useKeyCommands,
  };
}
