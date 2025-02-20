import { useLayoutEffect, useRef } from 'react';

export function useIsMountedRef() {
  let mount = useRef(false);

  useLayoutEffect(() => {
    mount.current = true;
    return function () {
      mount.current = false;
    };
  }, []);

  return mount;
}
