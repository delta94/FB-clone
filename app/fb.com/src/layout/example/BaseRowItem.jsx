import React from 'react';
import { BaseRowItem } from '@fb-layout/BaseRowItem';

import { BaseRow } from '../BaseRow';

const BaseRowItemExample = () => {
  return (
    <div>
      <BaseRow align="start">
        <BaseRowItem verticalAlign="center">123</BaseRowItem>
      </BaseRow>
    </div>
  );
};

export { BaseRowItemExample };
