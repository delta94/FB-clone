/**
 * Changelog:
 * - 09/12/2024
 */

import { FBLogger } from './FBLogger';

export function unexpectedUseInComet(a) {
  // if (!c("gkx")("708253")) return;
  a = a + ' called unexpectedly. This is not supported in Comet!';
  let b = FBLogger('comet_infra').blameToPreviousFrame().blameToPreviousFrame();
  b.mustfix(a);
}
