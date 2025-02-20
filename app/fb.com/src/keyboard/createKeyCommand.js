const modifierKeys = ['alt', 'command', 'shift'];

export function createKeyCommand(keyConfig) {
  return modifierKeys
    .filter((modifierKey) => {
      return (!keyConfig ? undefined : keyConfig[modifierKey]) === true;
    })
    .concat(!keyConfig ? undefined : keyConfig.key)
    .join(' ');
}
