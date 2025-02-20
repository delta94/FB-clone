import React, { useState } from 'react';
// import { FDSFormTextInput } from '@fb-input/FDSFormTextInput';

export const FDSFormTextInputExample = () => {
  const [value1, setValue1] = useState('');

  return (
    <div>
      {/* <FDSFormTextInput
        autoComplete="off"
        aria-label="Custom pronunciation option"
        disabled={false}
        label="Write your own"
        name="firstname-pronunciation"
        onValueChange={(val) => {
          setValue1(val);
        }}
        placeholder="Write your own"
        testid={undefined}
        value={value1}
      /> */}
    </div>
  );
};
