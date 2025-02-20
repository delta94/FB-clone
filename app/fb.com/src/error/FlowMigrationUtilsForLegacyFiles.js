/**
 * Changelog:
 * - 09/12/2024
 */

import { FBLogger } from './FBLogger';

const projectName = 'flow_typing_for_legacy_code';

function invariantViolation(a) {
  FBLogger(projectName)
    .blameToPreviousFile()
    .event(projectName + '.bad_call')
    .mustfix(a);
  return new Error('[' + projectName + '] ' + a);
}

export const FlowMigrationUtilsForLegacyFiles = {
  invariantViolation,
};
