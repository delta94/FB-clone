/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from 'react';
import { BaseView } from '@fb-layout/BaseView';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  visuallyHidden: {
    clip: 'rect(0,0,0,0)',
    clipPath: 'inset(50%)',
    height: '1px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'absolute',
    width: '1px',
  },
});

export function CometScreenReaderText({ text, ...rest }) {
  return (
    <BaseView {...rest} xstyle={styles.visuallyHidden}>
      {text}
    </BaseView>
  );
}
