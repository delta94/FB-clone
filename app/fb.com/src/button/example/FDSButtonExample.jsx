import React from 'react';
import { FDSButton } from '@fb-button';

const FDSButtonExample = () => {
  return (
    <div>
      {/* <FDSButton label="dark-overlay" type="dark-overlay" />
      <FDSButton
        tooltip="fdsOverride_collaborativePostCTA"
        label="fdsOverride_collaborativePostCTA"
        type="fdsOverride_collaborativePostCTA"
      />
      <FDSButton tooltip="overlay" label="overlay" type="overlay" />
      <FDSButton tooltip="primary" label="primary" type="primary" />
      <FDSButton tooltip="secondary" label="secondary" type="secondary" /> */}
      <FDSButton tooltip="{ reduceEmphasis = true }" label="{ reduceEmphasis = true }" reduceEmphasis />
    </div>
  );
};

export { FDSButtonExample };
