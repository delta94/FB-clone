/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useRef } from 'react';
import { useStable } from '@fb-hooks';
import { gkx } from '@fb-utils/gkx';

import { checkForKeyCommandConflictUtil } from './checkForKeyCommandConflictUtil';
import { CometCustomKeyCommands } from './CometCustomKeyCommands';
import { CometDefaultKeyCommands } from './CometDefaultKeyCommands';
import { createKeyCommand } from './createKeyCommand';

const EMPTY_KEY_COMMAND = {
  alt: false,
  command: false,
  key: '',
  shift: false,
};

function initializeCustomCommands() {
  const commandsMap = new Map();
  const customCommands = CometCustomKeyCommands.customCommands;
  Object.keys(customCommands).forEach((groupID) => {
    const groupCommands = customCommands[groupID];
    if (groupCommands) {
      Object.keys(groupCommands).forEach((commandID) => {
        const command = groupCommands[commandID];
        if (command) {
          commandsMap.set(createKeyCommand(command), {
            command,
            commandID,
            description: '',
            groupID,
          });
        }
      });
    }
  });
  return commandsMap;
}

function useCustomCommandsState() {
  const relayEnvironment = null;
  const customCommandsRef = useRef(gkx[22801] ? CometCustomKeyCommands.customCommands : {});
  const customCommandsMap = useStable(initializeCustomCommands);

  const removeCustomCommand = (groupID, commandID) => {
    const groupCommands = customCommandsRef.current[groupID];
    const command = groupCommands ? groupCommands[commandID] : null;
    if (command) {
      customCommandsMap.delete(createKeyCommand(command));
    }
  };

  const checkForCommandConflict = (groupID, commandID, keyCommand) =>
    checkForKeyCommandConflictUtil(customCommandsRef.current, groupID, commandID, keyCommand);

  const disableCustomCommand = (groupID, commandID) => {
    if (!relayEnvironment) return;
    relayEnvironment({
      command_id: commandID,
      group_id: groupID,
      key_combination: EMPTY_KEY_COMMAND,
    });
    removeCustomCommand(groupID, commandID);
    customCommandsRef.current = {
      ...customCommandsRef.current,
      [groupID]: {
        ...customCommandsRef.current[groupID],
        [commandID]: EMPTY_KEY_COMMAND,
      },
    };
  };

  const addCustomCommand = (groupID, commandID, keyCommand) => {
    if (!relayEnvironment) return;
    checkForCommandConflict(groupID, commandID, keyCommand).forEach(({ commandID, groupID }) => {
      disableCustomCommand(groupID, commandID);
    });
    relayEnvironment({
      command_id: commandID,
      group_id: groupID,
      key_combination: keyCommand,
    });
    removeCustomCommand(groupID, commandID);
    customCommandsMap.set(createKeyCommand(keyCommand), {
      command: keyCommand,
      commandID,
      description: '',
      groupID,
    });
    customCommandsRef.current = {
      ...customCommandsRef.current,
      [groupID]: {
        ...customCommandsRef.current[groupID],
        [commandID]: keyCommand,
      },
    };
  };

  const getCustomCommandsMap = () => {
    return customCommandsMap;
  };

  const getCustomKeyCombination = (groupID, commandID) => {
    const groupCommands = customCommandsRef.current[groupID];
    return groupCommands ? groupCommands[commandID] : undefined;
  };

  const resetAllCustomCommands = () => {
    if (!relayEnvironment) return;
    relayEnvironment({}, relayEnvironment);
    customCommandsMap.clear();
    customCommandsRef.current = {};
  };

  const resetCustomCommand = (groupID, commandID) => {
    if (!relayEnvironment) return;
    const defaultCommand = CometDefaultKeyCommands?.[groupID]?.shortcuts?.[commandID]?.command;
    if (defaultCommand) {
      checkForCommandConflict(groupID, commandID, defaultCommand).forEach(({ commandID, groupID }) => {
        disableCustomCommand(groupID, commandID);
      });
      relayEnvironment(
        {
          command_id: commandID,
          group_id: groupID,
        },
        relayEnvironment,
      );
      removeCustomCommand(groupID, commandID);
      customCommandsRef.current = {
        ...customCommandsRef.current,
        [groupID]: {
          ...customCommandsRef.current[groupID],
          [commandID]: null,
        },
      };
    }
  };

  return {
    addCustomCommand,
    checkForCommandConflict,
    disableCustomCommand,
    getCustomCommandsMap,
    getCustomKeyCombination,
    resetAllCustomCommands,
    resetCustomCommand,
  };
}

export { useCustomCommandsState };
