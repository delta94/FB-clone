import { KSConfig } from './KSConfig';

export function killswitch(id) {
  return KSConfig.killed.has(id);
}
