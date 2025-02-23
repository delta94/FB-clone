import React from 'react';
import fbt from 'fbt';
import { useDialogHeaderID } from '@fb-contexts';
import { BaseDivider } from '@fb-layout/BaseDivider';
import { FBNucleusCrossFilled24Icon } from '@fb-icons/FBNucleusCrossFilled24Icon';
import { FDSCircleButton } from '@fb-button';
import { html } from 'react-strict-dom';

const styles = {
  headerContainer: {
    width: 'xh8yej3',
    $$css: true,
  },
  headerRow: {
    alignItems: 'x6s0dn4',
    display: 'x78zum5',
    flexShrink: 'x2lah0s',
    justifyContent: 'x13a6bvl',
    marginStart: 'x1d52u69',
    marginEnd: 'xktsk01',
    marginLeft: null,
    marginRight: null,
    minHeight: 'x879a55',
    $$css: true,
  },
};

function FDSDialogLoadingStateHeader({ onClose, withCloseButton = true }) {
  const headerID = useDialogHeaderID();

  const closeButton = withCloseButton ? (
    <FDSCircleButton
      icon={<FBNucleusCrossFilled24Icon />}
      label={fbt._('__JHASH__tnRfHlva-bL__JHASH__', [])}
      onPress={onClose}
      size={36}
      testid={undefined}
    />
  ) : null;

  const headerRow = (
    <html.div id={headerID} style={styles.headerRow}>
      {closeButton}
    </html.div>
  );

  const divider = <BaseDivider />;

  return (
    <html.div style={styles.headerContainer}>
      {headerRow}
      {divider}
    </html.div>
  );
}

export { FDSDialogLoadingStateHeader };
