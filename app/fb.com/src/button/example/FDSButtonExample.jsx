import React from 'react';
import { FDSButton } from '@fb-button';

const FDSButtonExample = () => {
  return (
    <div>
      <FDSButton label="dark-overlay" type="dark-overlay" />
      <FDSButton label="fdsOverride_collaborativePostCTA" type="fdsOverride_collaborativePostCTA" />
      <FDSButton label="overlay" type="overlay" />
      <FDSButton label="primary" type="primary" />
      <FDSButton label="secondary" type="secondary" />
      <FDSButton label="{ reduceEmphasis = true }" reduceEmphasis />
    </div>
  );
};

export { FDSButtonExample };
