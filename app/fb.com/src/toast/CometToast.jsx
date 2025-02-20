import React from 'react';
import { FDSCircleButton } from '@fb-button';
import { fbicon } from '@fb-image/fbicon';
import { ix } from '@fb-image/ix';
import { CometPressable } from '@fb-pressable/CometPressable';
import { FDSText } from '@fb-text/FDSText';
import stylex from '@stylexjs/stylex';

import { BaseToast } from './BaseToast';

const CometToast = (props) => {
  const {
    action,
    href,
    icon,
    impressionLoggingRef,
    message,
    onDismiss,
    supressCloseButton = false,
    target,
    // eslint-disable-next-line no-unused-vars
    testid = 'Toast',
    truncateText = false,
    ...rest
  } = props;

  const linkProps = href
    ? {
        target,
        url: href,
      }
    : undefined;

  const ActionComponent = action
    ? {
        label: action.label,
        labelRenderer,
        onPress: action.onPress,
        testid: action.testid,
      }
    : undefined;

  const LinkWrapperComponent =
    rest.onPress || linkProps
      ? (child) => {
          <CometPressable {...rest} expanding linkProps={linkProps} xstyle={styles.pressable}>
            {child}
          </CometPressable>;
        }
      : undefined;

  const CloseButtonComponent = !supressCloseButton && (
    <FDSCircleButton icon={fbicon._(ix(478231), 12)} label="Close" onPress={onDismiss} size={24} />
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const Message = ({ toastMessageId }) => {
    return (
      <FDSText color="primary" id={toastMessageId} numberOfLines={truncateText ? 4 : void 0} type="body3">
        {message}
      </FDSText>
    );
  };

  return (
    <BaseToast
      action={ActionComponent}
      addOnStart={icon}
      closeButton={CloseButtonComponent}
      linkWrapper={LinkWrapperComponent}
      message={Message}
      onDismiss={onDismiss}
      testid={undefined}
      toastRef={impressionLoggingRef}
    />
  );
};

const labelRenderer = (child) => {
  return (
    <FDSText color="blueLink" numberOfLines={1} type="bodyLink3">
      {child}
    </FDSText>
  );
};

export { CometToast };

const styles = stylex.create({
  pressable: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
});
