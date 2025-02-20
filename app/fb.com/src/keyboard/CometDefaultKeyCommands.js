import { CometKeys } from './CometKeys';

export const CometDefaultKeyCommands = Object.freeze({
  global: {
    label: 'Global',
    shortcuts: {
      bugReporting: {
        command: {
          alt: !0,
          key: CometKeys.B,
          shift: !0,
        },
        description: 'Report a problem',
        isHiddenCommand: !0,
      },
      search: {
        command: {
          key: CometKeys.SLASH,
        },
        description: 'Search Facebook',
        singleCharDescription: 'search Facebook',
      },
      toggleDarkMode: {
        command: {
          alt: !0,
          key: CometKeys.M,
        },
        description: 'Turn dark mode on or off',
        isHiddenCommand: !0,
      },
      toggleNub: {
        command: {
          key: CometKeys.QUESTION,
          shift: !0,
        },
        description: 'Show shortcuts',
      },
      toggleNubFunctionKey: {
        command: {
          key: CometKeys.F1,
        },
        description: 'Show shortcuts',
      },
    },
  },
});
