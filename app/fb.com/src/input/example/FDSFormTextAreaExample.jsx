import React, { useState } from 'react';

import { FDSFormTextArea } from '../FDSFormTextArea';

export const FDSFormTextAreaExample = () => {
  const [value1, setValue1] = useState('だれでもない。だれ　でもいたくないです。');

  return (
    <div>
      <FDSFormTextArea
        disable={false}
        label="About you"
        minRows={3}
        onValueChange={(val) => {
          setValue1(val);
        }}
        testid={undefined}
        value={value1}
      />
    </div>
  );
};
