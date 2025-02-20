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

import React, { forwardRef, memo, useContext, useMemo } from 'react';
import { CometContainerPressableContext } from '@fb-contexts';
import { testID } from '@fb-utils/testID';
import stylex from '@stylexjs/stylex';
import Locale from 'fbjs/lib/Locale';

const isRTL = Locale.isRTL();

const _BaseInput = forwardRef((props, ref) => {
  const { xstyle, onChange, onClick, onValueChange, testid, type = 'text', ...rest } = props;

  const compBaseOnType = useMemo(() => {
    switch (type) {
      case 'switch':
        return 'checkbox';
      default:
        return type;
    }
  }, [type]);

  const isCheckboxOrRadio = compBaseOnType === 'checkbox' || compBaseOnType === 'radio';
  const isTextarea = compBaseOnType === 'textarea';
  const cometContainerPressableContextValue = useContext(CometContainerPressableContext);

  const commonProps = {
    dir: isRTL ? 'rtl' : 'ltr',
    ...rest,
    ...testID(testid),
    className: stylex(styles.root, xstyle, cometContainerPressableContextValue && styles.zIndex),
    onChange: (event) => {
      if (!isCheckboxOrRadio) {
        if (onValueChange) {
          onValueChange(event.target.value, event);
        }
        if (onChange) {
          onChange(event);
        }
      }
    },
    onClick: (event) => {
      if (isCheckboxOrRadio && onValueChange) {
        onValueChange(event.target.checked, event);
      }
      if (onClick) {
        onClick(event);
      }
    },
  };

  return isTextarea ? (
    <textarea {...commonProps} ref={ref} />
  ) : (
    <input {...commonProps} ref={ref} type={compBaseOnType} />
  );
});

export const BaseInput = memo(_BaseInput);

BaseInput.displayName = 'BaseInput.react';

const styles = stylex.create({
  root: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':disabled': {
      cursor: 'not-allowed',
    },
    WebkitTapHighlightColor: 'transparent',
    boxSizing: 'border-box',
    touchAction: 'manipulation',
  },
  zIndex: {
    zIndex: 1,
  },
});
