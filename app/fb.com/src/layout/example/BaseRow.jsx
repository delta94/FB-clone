import React from 'react';

import { BaseRow } from '../BaseRow';

const BaseRowExample = () => {
  return (
    <div>
      <BaseRow align="start">BaseRow start</BaseRow>
      <BaseRow align="center">BaseRow center</BaseRow>
      <BaseRow align="end">BaseRow end</BaseRow>

      <div>
        <BaseRow verticalAlign="center" align="justify">
          <div>123</div>
          <div>BaseRow verticalAlign-center align-justify</div>
        </BaseRow>
      </div>
    </div>
  );
};

export { BaseRowExample };
