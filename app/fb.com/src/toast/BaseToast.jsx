import React, { useId } from 'react';
import { tabbableScopeQuery } from '@fb-focus/focusScopeQueries';
import { XPlatReactFocusRegion } from '@fb-focus/XPlatReactFocusRegion';
import { BaseView } from '@fb-layout/BaseView';
import { BaseInlinePressable } from '@fb-pressable/BaseInlinePressable';
import stylex from '@stylexjs/stylex';

import { BaseToastContentWrapper } from './BaseToastContentWrapper';

export function BaseToast(props) {
  const {
    action,
    addOnStart,
    closeButton,
    linkWrapper,
    message,
    onDismiss,
    size = 'full-width',
    // eslint-disable-next-line no-unused-vars
    testid,
    toastRef,
    useInvertedDisplayMode = true,
  } = props;

  // const displayMode = useCurrentDisplayMode() === 'dark' ? 'light' : 'dark';

  const toastMessageId = useId();
  const ariaProps = action
    ? {}
    : {
        'aria-atomic': true,
        role: 'alert',
      };

  const Wrapper = (
    <>
      {addOnStart && <BaseView xstyle={styles.item}>{addOnStart}</BaseView>}
      <BaseView xstyle={[styles.item, styles.itemText]} {...ariaProps}>
        {message({
          toastMessageId: toastMessageId,
        })}
      </BaseView>

      {action && (
        <XPlatReactFocusRegion autoFocusQuery={tabbableScopeQuery}>
          <BaseView aria-labelledby={toastMessageId} role="group" xstyle={styles.item}>
            {action.element
              ? action.element
              : action.labelRenderer && (
                  <BaseInlinePressable
                    onPress={(e) => {
                      onDismiss();
                      action.onPress(e);
                    }}
                    testid={undefined}
                    xstyle={styles.link}
                  >
                    {action.labelRenderer(action.label)}
                  </BaseInlinePressable>
                )}
          </BaseView>
        </XPlatReactFocusRegion>
      )}

      {closeButton && <BaseView xstyle={styles.item}>{closeButton}</BaseView>}
    </>
  );

  const linkWrapperComp = linkWrapper ? linkWrapper(Wrapper) : Wrapper;

  return (
    <BaseToastContentWrapper
      ref={toastRef}
      testid={undefined}
      useInvertedDisplayMode={useInvertedDisplayMode}
      xstyle={[styles.root, size === 'full-width' && styles.rootFullWidth]}
    >
      {linkWrapperComp}
    </BaseToastContentWrapper>
  );
}

const styles = stylex.create({
  item: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 'var(--toast-addon-padding-vertical)',
    paddingRight: 'var(--toast-addon-padding-horizontal)',
    paddingLeft: 'var(--toast-addon-padding-horizontal)',
    paddingTop: 'var(--toast-addon-padding-vertical)',
  },
  itemText: {
    flexGrow: 1,
  },
  link: {
    wordBreak: 'keep-all',
  },
  root: {
    alignItems: 'center',
    backgroundColor: 'var(--toast-background)',
    borderTopLeftRadius: 'var(--toast-corner-radius)',
    borderTopRightRadius: 'var(--toast-corner-radius)',
    borderBottomRightRadius: 'var(--toast-corner-radius)',
    borderBottomLeftRadius: 'var(--toast-corner-radius)',
    boxShadow: 'var(--shadow-elevated)',
    display: 'flex',
    flexShrink: 0,
    maxWidth: 'var(--toast-container-max-width)',
    minWidth: 'var(--toast-container-min-width)',
    paddingLeft: 'var(--toast-container-padding-horizontal)',
    paddingRight: 'var(--toast-container-padding-horizontal)',
    paddingTop: 'var(--toast-container-padding-vertical)',
    paddingBottom: 'var(--toast-container-padding-vertical)',
  },
  rootFullWidth: {
    width: '100%',
  },
});
