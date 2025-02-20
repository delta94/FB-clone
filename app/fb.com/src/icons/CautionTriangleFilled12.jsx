import React from 'react';

export const CautionTriangleFilled12 = (props) => {
  return (
    <svg viewBox="0 0 12 13" width="1em" height="1em" fill="currentColor" {...props}>
      {props.title && <title>{props.title}</title>}
      {props.children && <defs>{props.children}</defs>}
      <g fillRule="evenodd" transform="translate(-450 -1073)">
        <path d="m456.998 1077.516-.25 2.833c-.033.368-.358.651-.748.651s-.715-.283-.747-.651l-.25-2.833a.968.968 0 0 1 .998-1.015.968.968 0 0 1 .997 1.015zM456 1083.5a1.001 1.001 0 1 1 1-1c0 .551-.449 1-1 1zm1.114-8.877a1.26 1.26 0 0 0-1.094-.623h-.002a1.26 1.26 0 0 0-1.095.62l-4.747 7.996c-.23.388-.234.853-.011 1.245.227.4.64.64 1.106.64h9.459c.464 0 .877-.24 1.105-.638.223-.39.22-.856-.009-1.244l-4.712-7.996z" />
      </g>
    </svg>
  );
};

CautionTriangleFilled12._isSVG = true;
