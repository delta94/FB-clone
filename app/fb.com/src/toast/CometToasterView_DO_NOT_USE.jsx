import React, { useEffect, useState } from 'react';
import { BaseContextualLayerAnchorRoot } from '@fb-dialog/BaseContextualLayerAnchorRoot';
import { BasePortal } from '@fb-dialog/BasePortal';
import { useToasterStateManager } from '@fb-hooks';
import { XPlatReactToasterView } from '@fb-toast/XPlatReactToasterView';
import { gkx } from '@fb-utils/gkx';
import stylex from '@stylexjs/stylex';

import { BaseToastAnimationInternal } from './BaseToastAnimationInternal';

export const CometToasterView_DO_NOT_USE = ({
  align = 'start',
  filterToasts,
  maxVisible = 1,
  maxWidth = 'full',
  position = 'bottom',
}) => {
  const stateManager = useToasterStateManager();
  console.log('🚀 ~ stateManager:', stateManager);
  const [toastState, setToastState] = useState(() => {
    return stateManager.getEmptyState();
  });
  console.log('🚀 ~ const[toastState,setToastState]=useState ~ toastState:', toastState);

  useEffect(() => {
    const view = stateManager.registerView(setToastState, 0);
    console.log('🚀 ~ useEffect ~ view:', view);
    return view.remove;
  }, [stateManager]);

  return (
    <BasePortal
      target={document.body}
      xstyle={[
        styles.root,
        gkx[20935] ? undefined : gkx[22885] ? styles.rootWorkplaceLegacy : styles.rootBlue,
        alignStyles[align],
        positionStyles[position],
      ]}
    >
      <ul className={stylex(styles.dummy)}>
        <XPlatReactToasterView
          filterToasts={filterToasts}
          maxVisible={maxVisible}
          onExpireToast={(time) => {
            stateManager.expire(time);
          }}
          toasterState={toastState}
          // eslint-disable-next-line max-params
          children={(children, id, expired, position) => {
            console.log('🚀 ~ children:', children);
            return (
              <BaseToastAnimationInternal
                key={position}
                expired={expired}
                id={id}
                position={position}
                xstyle={[styles.toast, widthStyles[gkx[22886] ? 'regular' : maxWidth]]}
              >
                {/* <div>aaaaa</div> */}
                <BaseContextualLayerAnchorRoot>
                  <div>aaaaa</div>
                </BaseContextualLayerAnchorRoot>
              </BaseToastAnimationInternal>
            );
          }}
        />
      </ul>
    </BasePortal>
  );
};

const styles = stylex.create({
  list: {
    display: 'flex',
    flexDirection: 'column',
    listStyleType: 'none',
    maxWidth: '100%',
  },
  root: {
    bottom: 0,
    display: 'flex',
    right: 0,
    pointerEvents: 'none',
    position: 'fixed',
    left: 'var(--global-panel-width)',
    zIndex: 4,
  },
  rootBlue: {
    zIndex: 402,
  },
  rootWorkplaceLegacy: {
    zIndex: 502,
  },
  toast: {
    paddingTop: '16px',
    paddingRight: '16px',
    paddingBottom: '16px',
    paddingLeft: '16px',
    pointerEvents: 'all',
    // eslint-disable-next-line @stylexjs/valid-styles
    '@media (max-width: 899px)': {
      maxWidth: '100%',
    },
  },

  dummy: {
    display: 'flex',
    flexDirection: 'column',
    listStyleType: 'none',
    maxWidth: '100%',
  },
});

const alignStyles = stylex.create({
  center: {
    justifyContent: 'center',
  },
  end: {
    justifyContent: 'flex-end',
  },
  start: {
    justifyContent: 'flex-start',
  },
});

const widthStyles = stylex.create({
  full: {
    maxWidth: '100%',
  },
  regular: {
    maxWidth: '328px',
  },
});

const positionStyles = stylex.create({
  bottom: {
    bottom: 0,
  },
  top: {
    top: 0,
  },
});
