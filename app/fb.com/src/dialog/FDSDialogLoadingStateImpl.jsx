import React from 'react';

import { FDSGlimmer } from '@fb-glimmer/FDSGlimmer';

const styles = {
  firstLine: {
    height: '12px',
    marginBottom: '10px',
    maxWidth: '440px',
  },
  glimmer: {
    borderTopStartRadius: '8px',
    borderTopEndRadius: '8px',
    borderBottomEndRadius: '8px',
    borderBottomStartRadius: '8px',
    boxSizing: 'border-box',
    marginStart: '16px',
    marginEnd: '16px',
    marginLeft: null,
    marginRight: null,
  },
  heading: {
    height: '2px',
    marginTop: '20px',
    marginBottom: '20px',
    maxWidth: '241px',
  },
  secondLine: {
    height: '12px',
    marginBottom: '20px',
    maxWidth: '296px',
  },
};

export const FDSDialogLoadingStateImpl = () => {
  return (
    <>
      <FDSGlimmer index={0} xstyle={[styles.glimmer, styles.heading]} />
      <FDSGlimmer index={1} xstyle={[styles.glimmer, styles.firstLine]} />
      <FDSGlimmer index={2} xstyle={[styles.glimmer, styles.secondLine]} />
    </>
  );
};
