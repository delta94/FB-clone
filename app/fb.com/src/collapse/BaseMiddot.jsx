/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from 'react';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    clip: 'rect(0,0,0,0)',
    height: '1px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'absolute',
    width: '1px',
  },
});

export const BaseMiddot = (props) => {
  return (
    <span {...props}>
      <span className={stylex(styles.root)} children="\xa0" />
      <span aria-hidden children=" \xb7 " />
    </span>
  );
};
