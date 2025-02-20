/* eslint-disable react/jsx-pascal-case */
import React from 'react';
// import { FDSButtonExample, FDSCircleButton } from '@fb-button';
import { fbicon } from '@fb-image/fbicon';
import { ix } from '@fb-image/ix';
// import { CometTextArea_DEPRECATEDExample } from '@fb-input/example/CometTextArea_DEPRECATEDExample';
// import { FDSFormTextAreaExample } from '@fb-input/example/FDSFormTextAreaExample';
// import { FDSFormTextInputExample } from '@fb-input/example/FDSFormTextInputExample';
// import { FDSTextExample } from '@fb-text/example/FDSTextExample';
import { BaseTooltipExample } from '@fb-input/example/BaseTooltipExample';

const ExamplePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem', backgroundColor: 'black' }}>
      {/* <FDSTextExample /> */}
      {/* <FDSButtonExample />
      <FDSCircleButton icon={fbicon._(ix(478231), 12)} label="Close" size={24} />
      <FDSFormTextAreaExample />
      <FDSFormTextInputExample />
      <CometTextArea_DEPRECATEDExample /> */}
      <BaseTooltipExample />
    </div>
  );
};

export { ExamplePage };
