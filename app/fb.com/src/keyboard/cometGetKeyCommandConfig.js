import { recoverableViolation } from '@fb-error/recoverableViolation';
import { gkx } from '@fb-utils/gkx';

const defaultShortcut = {
  command: null,
  description: 'Missing shortcut',
  handler: () => undefined,
  isHiddenCommand: true,
};

/**
 * Retrieves the key command configuration for a specific group and command.
 *
 * @param {string} groupID - The group identifier.
 * @param {string} commandID - The command identifier.
 * @param {Function} handler - The handler function for the command.
 * @param {object} configuration - The configuration object.
 * @param {string} errorMessage - The error message to display if the command is missing.
 * @returns {object} - The command configuration.
 */
// eslint-disable-next-line max-params
function getKeyCommandConfig(groupID, commandID, handler, configuration, errorMessage) {
  if (!configuration) {
    recoverableViolation(errorMessage, 'comet_ax');
    return defaultShortcut;
  }
  if (
    !Object.prototype.hasOwnProperty.call(configuration, groupID) ||
    !Object.prototype.hasOwnProperty.call(configuration[groupID].shortcuts, commandID)
  ) {
    recoverableViolation(`Missing default key command config for ${groupID} and ${commandID}`, 'comet_ax');
    return defaultShortcut;
  }
  const shortcutConfig = configuration[groupID].shortcuts[commandID];
  const command = shortcutConfig.command;
  const description = shortcutConfig.description;
  return command && description
    ? {
        command,
        commandID,
        description,
        groupID,
        handler,
        isHiddenCommand: shortcutConfig.isHiddenCommand,
        singleCharDescription: shortcutConfig.singleCharDescription,
        triggerFromInputs: shortcutConfig.triggerFromInputs,
      }
    : defaultShortcut;
}

/**
 * Retrieves the Comet key command configuration for a specific group and command.
 *
 * @param {string} groupID - The group identifier.
 * @param {string} commandID - The command identifier.
 * @param {Function} handler - The handler function for the command.
 * @returns {object} - The Comet key command configuration.
 */
function getCometKeyCommandConfig(groupID, commandID, handler) {
  return getKeyCommandConfig(
    groupID,
    commandID,
    handler,
    config,
    'getCometKeyCommandConfig should only be used in Comet',
  );
}

/**
 * Retrieves the Comet and Gemini key command configuration for a specific group and command.
 *
 * @param {string} groupID - The group identifier.
 * @param {string} commandID - The command identifier.
 * @param {Function} handler - The handler function for the command.
 * @returns {object} - The Comet and Gemini key command configuration.
 */
function getCometAndGeminiKeyCommandConfig(groupID, commandID, handler) {
  const configuration = gkx[20836] ? undefined : config;
  return getKeyCommandConfig(groupID, commandID, handler, configuration, 'Reached unreachable code');
}

export const cometGetKeyCommandConfig = {
  getKeyCommandConfig,
  getCometKeyCommandConfig,
  getCometAndGeminiKeyCommandConfig,
};

const config = {
  global: {
    label: 'Global',
    shortcuts: {
      bugReporting: {
        command: { alt: true, key: 'b', shift: true },
        description: 'Report a problem',
        isHiddenCommand: true,
      },
      search: {
        command: { key: '/' },
        description: 'Search Facebook',
        singleCharDescription: 'search Facebook',
      },
      toggleDarkMode: {
        command: { alt: true, key: 'm' },
        description: 'Turn dark mode on or off',
        isHiddenCommand: true,
      },
      toggleNub: {
        command: { key: '?', shift: true },
        description: 'Show shortcuts',
      },
      toggleNubFunctionKey: {
        command: { key: 'f1' },
        description: 'Show shortcuts',
      },
    },
  },
  groups: {
    label: 'Communities',
    shortcuts: {
      groupSearch: {
        command: { command: true, key: '/' },
        description: 'Search Communities',
        order: 6,
      },
      newGroupEvent: {
        command: { key: 'e' },
        description: 'Create an event',
        order: 1,
        singleCharDescription: 'create an event',
      },
      viewNextPinnedGroup: {
        command: { alt: true, key: 'arrowdown' },
        description: 'Next pinned group',
        order: 5,
      },
      viewNextVideo: {
        command: { alt: true, key: 'arrowright' },
        description: 'Next video',
        order: 3,
      },
      viewPreviousPinnedGroup: {
        command: { alt: true, key: 'arrowup' },
        description: 'Previous pinned group',
        order: 4,
      },
      viewPreviousVideo: {
        command: { alt: true, key: 'arrowleft' },
        description: 'Previous video',
        order: 2,
      },
    },
  },
  newsfeed: {
    label: 'News Feed',
    shortcuts: {
      commentStory: {
        command: { key: 'c' },
        description: 'Leave a comment',
        singleCharDescription: 'leave a comment',
      },
      likeStory: {
        command: { key: 'l' },
        description: 'Like or unlike a post',
        singleCharDescription: 'like or unlike a post',
      },
      newPost: {
        command: { key: 'p' },
        description: 'Create a post',
        singleCharDescription: 'create a post',
      },
      openAttachment: {
        command: { key: 'o' },
        description: 'Open attachment of post',
        shouldStopPropagation: false,
        singleCharDescription: "view a post's photo or link",
      },
      scrollNext: {
        command: { key: 'j' },
        description: 'Jump to the next post',
        singleCharDescription: 'go to the next post',
      },
      scrollPrevious: {
        command: { key: 'k' },
        description: 'Previous post',
        singleCharDescription: 'go back to the previous post',
      },
      searchContacts: {
        command: { key: 'q' },
        description: 'Search Messenger contacts',
        singleCharDescription: 'search Messenger contacts',
      },
      seeMore: {
        command: { key: 'enter' },
        description: 'See more',
        singleCharDescription: 'see more of a post',
      },
      shareStory: {
        command: { key: 's' },
        description: 'Share post',
        singleCharDescription: 'share a post',
      },
    },
  },
  photoViewer: {
    label: 'Photo albums',
    shortcuts: {
      fullscreen: {
        command: { key: 'f' },
        description: 'Enter or exit fullscreen',
        singleCharDescription: 'enter or exit fullscreen',
      },
      like: {
        command: { key: 'l' },
        description: 'Like photo',
        singleCharDescription: 'like a photo',
      },
      viewNext: {
        command: { key: 'k' },
        description: 'Next photo',
        singleCharDescription: 'see the next photo',
      },
      viewPrevious: {
        command: { key: 'j' },
        description: 'Previous photo',
        singleCharDescription: 'see the previous photo',
      },
    },
  },
  search: {
    label: 'Search',
    shortcuts: {
      scrollNextResult: {
        command: { key: 'j' },
        description: 'Next result',
        singleCharDescription: 'go to the next search result',
      },
      scrollPreviousResult: {
        command: { key: 'k' },
        description: 'Previous result',
        singleCharDescription: 'go back to the previous search result',
      },
    },
  },
};
