import React from 'react';
import { LegacyHidden } from '@fb-layout/LegacyHidden';

// Example component using unstable_LegacyHidden
export const LegacyHiddenExample = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle Visibility</button>
      <div style={{ display: 'flex' }}>
        <LegacyHidden mode={isVisible ? 'visible' : 'hidden'}>
          <div>This content is either visible or hidden.</div>
        </LegacyHidden>
      </div>
    </div>
  );
};
