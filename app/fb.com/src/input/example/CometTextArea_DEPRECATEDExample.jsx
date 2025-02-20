/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';
import { CometTextArea_DEPRECATED } from '@fb-input/CometTextArea_DEPRECATED';

export const CometTextArea_DEPRECATEDExample = () => {
  const [value1, setValue1] = useState('Mr Boring');

  return (
    <div>
      <CometTextArea_DEPRECATED
        data-testid={undefined}
        disabled={false}
        label="Enter bio text"
        labelIsHidden
        onChange={(e) => {
          setValue1(e.target.value);
        }}
        placeholder="Describe who you are"
        rows={3}
        textAlign="center"
        value={value1}
      />
    </div>
  );
};
