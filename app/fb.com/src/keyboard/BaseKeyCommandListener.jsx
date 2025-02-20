import { useCallback, useContext, useMemo, useRef } from 'react';
import { flushSync } from 'react-dom';
import { CometKeyCommandUtilsContext } from '@fb-contexts';
import { recoverableViolation } from '@fb-error/recoverableViolation';
import { useGetComposingState, useGlobalEventListener, useUnsafeRef_DEPRECATED } from '@fb-hooks';
import stylex from '@stylexjs/stylex';

import { applyKeyCommand } from './applyKeyCommand';
import { CometGlobalKeyCommandWidget } from './CometGlobalKeyCommandWidget';
import { getActiveCommands } from './getActiveCommands';
import { getKeyCommand } from './getKeyCommand';

function p(handler, time) {
  let timeoutID;
  return () => {
    window.clearTimeout(timeoutID);
    timeoutID = window.setTimeout(handler, time);
  };
}

const q = 100;

// type BaseKeyCommandListenerProps = {
//   children?
//   observersEnabled?: boolean
//   className?: string
// }

export function BaseKeyCommandListener({ children: b, xstyle, observersEnabled: e }) {
  // let b = a.children,
  //   e = a.observersEnabled
  // a = a.xstyle

  const f = useRef(null);
  const g = useRef(null);
  const j = useRef(new Set());
  const r = useContext(CometGlobalKeyCommandWidget.Context);
  let s = useCallback(
    (a) => {
      if (!e)
        return {
          getActiveCommands: function () {
            recoverableViolation('Key Command observers are not supported in this context', 'comet_ax');
            return null;
          },
          remove: function () {},
        };
      let b = j.current;
      b.add(a);
      return {
        getActiveCommands: function () {
          return getActiveCommands(g.current, f.current, r);
        },
        remove: function () {
          b['delete'](a);
        },
      };
    },
    [r, e],
  );
  let t = useCallback(
    (a) => {
      e &&
        j.current.forEach((b) => {
          return b({
            key: a,
            type: 'triggered',
          });
        });
    },
    [e],
  );
  let u = useMemo(() => {
    // eslint-disable-next-line react-compiler/react-compiler
    return p(() => {
      e &&
        j.current.forEach((a) => {
          return a({
            type: 'update',
          });
        });
    }, q);
  }, [e]);
  let v = useCallback(
    (a) => {
      let b = f.current !== a;
      f.current = a;
      b && u();
    },
    [u],
  );
  let w = useCallback(
    (a) => {
      let b = g.current !== a;
      g.current = a;
      b && u();
    },
    [u],
  );

  s = useUnsafeRef_DEPRECATED({
    addObserver: s,
    notifyCommandUpdate: u,
    setActiveLayer: v,
    setActiveWrapper: w,
  });

  v = useCallback(() => {
    let a = g.current !== null;
    g.current = null;
    a && u();
  }, [u]);
  let x = useGetComposingState();
  w = useCallback(
    (a) => {
      if (x(a)) return;
      flushSync(() => {
        let b = applyKeyCommand(a, g.current, f.current, r);
        if (b) {
          b = getKeyCommand(a);
          t(b);
        }
      });
    },
    [x, r, t],
  );
  useGlobalEventListener('keydown', w);
  useGlobalEventListener('keyup', w);

  return (
    <CometKeyCommandUtilsContext.Provider value={s.current}>
      <div className={stylex(xstyle)} onBlurCapture={v}>
        {b}
      </div>
    </CometKeyCommandUtilsContext.Provider>
  );
}
