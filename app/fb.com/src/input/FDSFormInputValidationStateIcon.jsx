/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/**
 * Changelog:
 * - 08/01/2025
 */

import React from 'react';
import { CautionTriangleFilled12 } from '@fb-icons/CautionTriangleFilled12';
import { fbicon } from '@fb-image/fbicon';
import { FDSIcon } from '@fb-image/FDSIcon';
import { ix } from '@fb-image/ix';
import { FDSProgressRingIndeterminate } from '@fb-process-ring/FDSProgressRingIndeterminate';
import { gkx } from '@fb-utils/gkx';

export const FDSFormInputValidationStateIcon = (props) => {
  const { state, hidden, id, label } = props;

  switch (state) {
    case 'CORRECT':
      return (
        <FDSIcon
          alt={label}
          color="positive"
          icon={fbicon._(ix(498146), 20)}
          id={id}
          isDecorative={hidden}
          testid={undefined}
        />
      );
    case 'ERROR':
      return (
        <FDSIcon
          alt={label}
          color="negative"
          icon={fbicon._(ix(502062), 20)}
          id={id}
          isDecorative={hidden}
          testid={undefined}
        />
      );

    case 'LOADING':
      return (
        <FDSProgressRingIndeterminate
          alt={label}
          id={id}
          isDecorative={hidden}
          color={gkx[6275] ? 'dark' : 'disabled_DEPRECATED'}
          size={20}
          testid={undefined}
        />
      );

    case 'WARN':
      return (
        <FDSIcon
          alt={label}
          color="warning"
          icon={gkx[6275] ? <CautionTriangleFilled12 /> : fbicon._(ix(502062), 20)}
          id={id}
          isDecorative={hidden}
          size={gkx[6275] ? 20 : undefined}
          testid={undefined}
        />
      );
  }
};
