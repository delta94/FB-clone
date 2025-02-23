import React, { forwardRef } from 'react';
import { BaseDialogLabelIDProvider } from '@fb-contexts';
import { FDSDialogContainer } from '@fb-dialog/FDSDialogContainer';
import { FDSDialogPage } from '@fb-dialog/FDSDialogPage';

export const FDSDialog = forwardRef(function FDSDialog(props, ref) {
  const { anchorXStyle, 'aria-label': ariaLabel, disableClosingWithMask, onClose, size, testid, ...restProps } = props;

  const dialogPage = <FDSDialogPage {...restProps} />;

  return (
    <BaseDialogLabelIDProvider>
      <FDSDialogContainer
        anchorXStyle={anchorXStyle}
        aria-label={ariaLabel}
        disableClosingWithMask={disableClosingWithMask}
        onClose={onClose}
        ref={ref}
        size={size}
        testid={undefined}
      >
        {dialogPage}
      </FDSDialogContainer>
    </BaseDialogLabelIDProvider>
  );
});
