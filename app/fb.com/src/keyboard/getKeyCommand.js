import UserAgent from 'fbjs/lib/UserAgent';

import { createKeyCommand } from './createKeyCommand';
import { getCometKey } from './getCometKey';

export function getKeyCommand(event) {
  const cometKey = getCometKey(event);

  if (!cometKey) {
    return null;
  }

  const isMacOS = UserAgent.isPlatform('Mac OS X');
  const isCommandKey = isMacOS ? event.metaKey : event.ctrlKey;

  const keyCommand = {
    alt: event.altKey,
    command: isCommandKey,
    key: cometKey,
    shift: event.shiftKey,
  };

  return createKeyCommand(keyCommand);
}
