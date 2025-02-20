import { areKeyCombinationsEqual } from './areKeyCombinationsEqual';
import { CometDefaultKeyCommands } from './CometDefaultKeyCommands';

// import { fbt } from "fbt";

/**
 * Generates a conflict description message.
 *
 * @param {string} groupID - The ID of the command group.
 * @param {string} commandID - The ID of the command.
 * @returns {string} - The conflict description message.
 */
// function getConflictDescription(groupID, commandID) {
//   const group = CometDefaultKeyCommands[groupID];
//   const command = group?.shortcuts?.[commandID];
//   return fbt('" ()"', [
//     fbt._param("command_key_description", command?.description),
//     fbt._param("command_key_group", group?.label),
//   ]);
// }

/**
 * Gets the groups to check for command conflicts.
 *
 * @param {string} groupID - The ID of the command group.
 * @returns {string[]} - An array of group IDs.
 */
function getGroupsToCheck(groupID) {
  return groupID === 'global' ? Object.keys(CometDefaultKeyCommands) : [groupID, 'global'];
}

/**
 * Checks for key command conflicts within the given command groups.
 *
 * @param {Object} customCommands - The custom commands configuration.
 * @param {string} currentGroupID - The ID of the current command group.
 * @param {string} currentCommandID - The ID of the current command.
 * @param {Object} newKeyCombination - The new key combination to check.
 * @returns {Array} - An array of conflicting commands.
 */
// eslint-disable-next-line max-params
export function checkForKeyCommandConflictUtil(customCommands, currentGroupID, currentCommandID, newKeyCombination) {
  const conflicts = [];

  const groupsToCheck = getGroupsToCheck(currentGroupID);

  groupsToCheck.forEach((groupID) => {
    const groupCommands = CometDefaultKeyCommands[groupID]?.shortcuts || {};
    const commandKeys = Object.keys(groupCommands);

    commandKeys.forEach((commandID) => {
      if (commandID === currentCommandID) return;

      const existingCommand = customCommands[groupID]?.[commandID] || groupCommands[commandID]?.command;

      if (existingCommand && areKeyCombinationsEqual(existingCommand, newKeyCombination)) {
        conflicts.push({
          commandID,
          description: '', // getConflictDescription(groupID, commandID),
          groupID,
        });
      }
    });
  });

  return conflicts;
}
