import React from 'react';

import { useCurrentDisplayMode } from '@fb-hooks';

import { BaseGlimmer } from './BaseGlimmer';

const styles = {
  dark: { backgroundColor: 'xhzw6zf' },
  light: { backgroundColor: 'x1vtvx1t' },
};

export const FDSGlimmer = (props) => {
  const { xstyle, ...rest } = props;
  const displayMode = useCurrentDisplayMode();
  return <BaseGlimmer xstyle={[displayMode === 'dark' ? styles.dark : styles.light, xstyle]} {...rest} />;
};

FDSGlimmer.displayName = FDSGlimmer.name + ' [from ' + module.id + ']';
