import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { CometKeyCommandContext, CometKeyCommandSettingsContext, CometKeyCommandUtilsContext } from '@fb-contexts';
import { recoverableViolation } from '@fb-error/recoverableViolation';
import { useStable } from '@fb-hooks';
import stylex from '@stylexjs/stylex';

import { areKeyCombinationsEqual } from './areKeyCombinationsEqual';
import { createKeyCommand } from './createKeyCommand';
import { isSingleCharKey } from './isSingleCharKey';

const styles = stylex.create({
  wrapperFocusable: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':focus': {
      outline: 'none',
    },
  },
});

// n
function isFocusableElement(element) {
  if (element instanceof HTMLInputElement) {
    return element.type !== 'hidden' && element.type !== 'file' && !element.disabled;
  }
  return element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement
    ? !element.disabled
    : element instanceof HTMLElement && element.isContentEditable;
}

// o
function isListboxWithActiveAria(element) {
  return element instanceof HTMLElement && element.getAttribute('role') === 'listbox'
    ? !element.getAttribute('aria-disabled')
    : false;
}

// p
function findCommandInGroup(commandMap, targetGroupID, targetCommandID) {
  // Iterate over the entries in the commandMap
  for (
    // eslint-disable-next-line no-inner-declarations, no-var
    var entries = commandMap,
      isArray = Array.isArray(entries),
      index = 0,
      entries = isArray ? entries : entries[typeof Symbol === 'function' ? Symbol.iterator : '@@iterator']();
    ;

  ) {
    // eslint-disable-next-line no-inner-declarations, no-var
    var entry;

    if (isArray) {
      if (index >= entries.length) break;
      entry = entries[index++];
    } else {
      index = entries.next();
      if (index.done) break;
      entry = index.value;
    }

    // eslint-disable-next-line no-self-assign
    entry = entry; // Destructure the entry into key (h) and value (g)

    let key = entry[0];
    let value = entry[1]; // Check if the current entry matches the target groupID and commandID

    if (value.groupID === targetGroupID && value.commandID === targetCommandID) {
      // Return the corresponding value from the map
      return commandMap.get(key);
    }
  }
}

// function s(a, b) {
//   const c = false;
//   // eslint-disable-next-line no-return-assign
//   return (
//     c && //    c("gkx")("3598") &&
//     b.triggerFromInputs === true &&
//     isFocusableElement(a) &&
//     (!(a = b.command) ? void 0 : a.alt) === true
//   );
// }

// q
function shouldPreventDefault(element, command) {
  const condition = false;

  return (
    // condition && // c('gkx')('3598') && // false
    // command.triggerFromInputs === true &&
    // isFocusableElement(element) &&
    // (!(element = command.command) ? void 0 : element.alt) === !0
    condition && command.triggerFromInputs === true && isFocusableElement(element) && command.command?.alt === true
  );
}

// r
let ShowSingleCharacterKeyCommandWrapperDialogError = (a, b) => {
  recoverableViolation('Tried to call showSingleCharacterKeyCommandWrapperDialogRef, but it was never set', 'comet_ax');
};

// s
let ShowModifiedKeyCommandWrapperDialogError = (a, b) => {
  recoverableViolation('Tried to call showModifiedKeyCommandWrapperDialogRef, but it was never set', 'comet_ax');
};

/**
 * @typedef Props
 * @property {string} debugName
 * @property {React.ReactNode} children
 * @property {boolean} isWrapperFocusable
 * @property {*} xstyle
 * @property {string} elementType
 */

/**
 *
 * @param {boolean} isFocusCapture
 * @param {*} Context
 */
export const createKeyCommandWrapper = (isFocusCapture, Context) => {
  /**
   * @param {Props} props
   */
  return function (props) {
    const cometKeyCommandContextValue = useContext(CometKeyCommandContext);
    const cometKeyCommandUtilsContextValue = useContext(CometKeyCommandUtilsContext);
    const cometKeyCommandSettingsContextValue = useContext(CometKeyCommandSettingsContext);

    const setActiveWrapper = cometKeyCommandUtilsContextValue && cometKeyCommandUtilsContextValue.setActiveWrapper;

    const commandsMap = useStable(() => {
      return new Map();
    });

    const showSingleCharacterKeyCommandWrapperDialogRef = useRef(ShowSingleCharacterKeyCommandWrapperDialogError);
    const showModifiedKeyCommandWrapperDialogRef = useRef(ShowModifiedKeyCommandWrapperDialogError);

    const getKeyMapValue = useCallback(
      /**
       *
       * @param {string} keyName  "enter" "ctrl" "a" "b" "c" ...
       * @returns
       */
      (keyName) => {
        let keyMapValue = commandsMap.get(keyName);
        if ((!keyMapValue ? undefined : keyMapValue.groupID) && (!keyMapValue ? undefined : keyMapValue.commandID)) {
          const customKeyCombination = cometKeyCommandSettingsContextValue.getCustomKeyCombination(
            keyMapValue.groupID,
            keyMapValue.commandID,
          );
          if (
            !customKeyCombination ||
            areKeyCombinationsEqual(customKeyCombination, !keyMapValue ? undefined : keyMapValue.command)
          ) {
            return keyMapValue;
          } else {
            keyMapValue = null;
          }
        }
        const customKeyCommandValue = cometKeyCommandSettingsContextValue.getCustomCommandsMap().get(keyName);
        if (customKeyCommandValue && customKeyCommandValue.groupID && customKeyCommandValue.commandID) {
          const commandInGroupValue = findCommandInGroup(
            commandsMap,
            customKeyCommandValue.groupID,
            customKeyCommandValue.commandID,
          );
          commandInGroupValue && (keyMapValue = commandInGroupValue);
        }
        return keyMapValue;
      },
      [cometKeyCommandSettingsContextValue, commandsMap],
    );

    const activeWrapper = useMemo(() => {
      return {
        /**
         * 
         * 
commandArr=[{
  "command": {
    "key": "l"
  },
  "commandID": "likeStory",
  "description": "Like or unlike a post",
  "groupID": "newsfeed",
  "singleCharDescription": "like or unlike a post",
  "isHiddenCommand": underfined,
  "triggerFromInputs": undefined
}]
         * 
         * @param {*} commandArr 
         * @param {*} options 
         * @returns 
         */
        addCommands: (commandArr, options) => {
          commandArr.forEach((commandItem) => {
            // var command = commandItem.command;

            let { command } = commandItem;

            if (command) {
              // return "l"
              const commandKeyName = createKeyCommand(command);
              const exist = commandsMap.has(commandKeyName);

              let g;
              if (exist && options) {
                g = true;
              }

              g = g || !exist || options === undefined;

              if (g) {
                commandsMap.set(commandKeyName, commandItem);
                if (cometKeyCommandUtilsContextValue) {
                  cometKeyCommandUtilsContextValue.notifyCommandUpdate();
                }
              }

              //   g = e && b === !0;
              // g = g || !e || b === void 0;
              // g &&
              //   (commandMap.set(command, commandItem),
              //   cometKeyCommandUtilsContextValue &&
              //     cometKeyCommandUtilsContextValue.notifyCommandUpdate());
            }
          });
          return () => {
            commandArr.forEach((commandItem) => {
              const { command } = commandItem;
              const commandKeyName = createKeyCommand(command);
              const commandMapKey = commandsMap.get(commandKeyName);
              commandMapKey === commandItem && commandsMap['delete'](commandKeyName);
            });
            cometKeyCommandUtilsContextValue && cometKeyCommandUtilsContextValue.notifyCommandUpdate();
          };

          // commandArr.forEach((commandItem) => {
          //   const { command } = commandItem;
          //   if (command) {
          //     const commandKeyName = createKeyCommand(command);
          //     const exists = commandsMap.has(commandKeyName);
          //     if (!exists || options) {
          //       commandsMap.set(commandKeyName, commandItem);
          //       cometKeyCommandUtilsContextValue?.notifyCommandUpdate();
          //     }
          //   }
          // });
          // return () => {
          //   commandArr.forEach((commandItem) => {
          //     const commandKeyName = createKeyCommand(commandItem.command);
          //     if (commandsMap.get(commandKeyName) === commandItem) {
          //       commandsMap.delete(commandKeyName);
          //     }
          //   });
          //   cometKeyCommandUtilsContextValue?.notifyCommandUpdate();
          // };
        },

        /**
         *
         * @param {*} key
         * @param {*} event
         * @returns
         */
        // eslint-disable-next-line complexity
        applyCommand: (key, event) => {
          const keyMapValue = getKeyMapValue(key);
          if (!keyMapValue) {
            return false;
          }
          const singleCharRegex = /^[a-z0-9]$/;
          // if (
          //   c('gkx')('3598') && // false
          //   ((e = f.command) == null ? void 0 : e.alt) === !0 &&
          //   cometKeyCommandSettingsContextValue.getModifiedKeyboardShortcutsPreference() ===
          //     1
          // ) {
          //   return !0
          // }
          if (
            (!keyMapValue.triggerFromInputs && isFocusableElement(event.target)) ||
            (isListboxWithActiveAria(event.target) && singleCharRegex.test(key))
          ) {
            return false;
          }
          if (
            event.type === 'keyup' &&
            keyMapValue.triggerOnKeyUp !== true &&
            keyMapValue.triggerOnKeyUpAndKeyDown !== true
          ) {
            return false;
          }
          if (event.type === 'keydown' && keyMapValue.triggerOnKeyUp === true) {
            return false;
          }
          const { handler } = keyMapValue;
          if (keyMapValue.shouldPreventDefault !== false) {
            if (
              shouldPreventDefault(event.target, keyMapValue) &&
              cometKeyCommandSettingsContextValue.getModifiedKeyboardShortcutsPreference() === 3
            ) {
              return true;
            }
            handler && event.preventDefault();
          }
          if (keyMapValue.triggerOnRepeats === false && event.repeat === true) {
            return false;
          }
          if (handler) {
            if (
              keyMapValue.command &&
              shouldPreventDefault(event.target, keyMapValue) &&
              cometKeyCommandSettingsContextValue.getModifiedKeyboardShortcutsPreference() === 4
            ) {
              showModifiedKeyCommandWrapperDialogRef.current(keyMapValue.command, keyMapValue.singleCharDescription);
              return true;
            }
            const areSingleKeysDisabled =
              cometKeyCommandSettingsContextValue && cometKeyCommandSettingsContextValue.getAreSingleKeysDisabled();
            const _isSingleCharKey = isSingleCharKey(key);
            if (areSingleKeysDisabled === true && _isSingleCharKey) {
              return true;
            }
            if (!areSingleKeysDisabled && _isSingleCharKey) {
              showSingleCharacterKeyCommandWrapperDialogRef.current(key, keyMapValue.singleCharDescription);
              return true;
            }
            handler();
            // const { description } = f
            // c('CometKeyCommandsTypedLoggerLite').log({
            //   key_combo: key,
            //   key_context: props.debugName,
            //   key_description: description,
            // })
            return keyMapValue.shouldStopPropagation !== false;
          }
          return false;
        },

        debugName: props.debugName,

        getCommandMap: () => commandsMap,

        getParent: () => cometKeyCommandContextValue,

        removeCommand: (key) => {
          commandsMap['delete'](key);
          cometKeyCommandUtilsContextValue && cometKeyCommandUtilsContextValue.notifyCommandUpdate();
        },

        setShowModifiedKeyCommandWrapperDialogRef: (func) => {
          showModifiedKeyCommandWrapperDialogRef.current = func;
          return () => {
            showModifiedKeyCommandWrapperDialogRef.current = ShowModifiedKeyCommandWrapperDialogError;
          };
        },

        setShowSingleCharacterKeyCommandWrapperDialogRef: (func) => {
          showSingleCharacterKeyCommandWrapperDialogRef.current = func;
          return function () {
            showSingleCharacterKeyCommandWrapperDialogRef.current = ShowSingleCharacterKeyCommandWrapperDialogError;
          };
        },
      };
    }, [
      CometKeyCommandSettingsContext,
      CometKeyCommandUtilsContext,
      commandsMap,
      CometKeyCommandContext,
      props.debugName,
      showModifiedKeyCommandWrapperDialogRef,
      showSingleCharacterKeyCommandWrapperDialogRef,
      getKeyMapValue,
    ]);

    const onFocusCapture = useCallback(() => {
      if (!setActiveWrapper) {
        recoverableViolation('setActiveWrapper is undefined in ' + (props.debugName ?? 'unknown'), 'comet_ax');
        return;
      }
      setActiveWrapper(activeWrapper);
    }, [setActiveWrapper, activeWrapper, props.debugName]);

    let _children;

    if (isFocusCapture || props.elementType) {
      let ElementType = props.elementType;

      if (!props.elementType) {
        ElementType = 'div';
      }

      _children = (
        <ElementType
          className={stylex(props.isWrapperFocusable ? styles.wrapperFocusable : undefined, props.xstyle)}
          data-testid={undefined}
          onFocusCapture={isFocusCapture ? onFocusCapture : undefined}
          tabIndex={props.isWrapperFocusable ? -1 : undefined}
        >
          {props.children}
        </ElementType>
      );
    } else {
      _children = props.children;
    }

    if (Context) {
      _children = <Context.Provider value={activeWrapper}>{_children}</Context.Provider>;
    }

    return <CometKeyCommandContext.Provider value={activeWrapper}>{_children}</CometKeyCommandContext.Provider>;
  };
};
