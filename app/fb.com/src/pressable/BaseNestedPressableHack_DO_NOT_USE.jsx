import React, { useEffect, useState } from 'react';

export function BaseNestedPressableHack_DO_NOT_USE(props) {
  const { children } = props;

  const [isMounted, setIsMounted] = useState();

  useEffect(() => {
    return setIsMounted(true);
  }, []);

  const placeholderStyle = isMounted
    ? null
    : {
        height: 0,
        width: 0,
      };

  return (
    <object {...placeholderStyle} type="nested/pressable">
      {children}
    </object>
  );
}
