/**
 * Changelog:
 * - 08/01/2025
 */
import React from 'react';

import { CometErrorBoundary } from './CometErrorBoundary';
import { err } from './err';

function ThrowErr(props) {
  const { errorMessage } = props;
  throw err(errorMessage);
}

export const RecoverableViolationWithComponentStack = (props) => {
  const { errorMessage, fallback, projectName } = props;

  return (
    <CometErrorBoundary context={{ project: projectName, type: 'error' }} fallback={() => fallback ?? null}>
      <ThrowErr errorMessage={errorMessage} />
    </CometErrorBoundary>
  );
};

RecoverableViolationWithComponentStack.displayName = `RecoverableViolationWithComponentStack.react`;
