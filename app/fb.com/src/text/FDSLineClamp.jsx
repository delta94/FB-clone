import React, { forwardRef, useCallback, useRef, useState } from 'react';
import Loadable from 'react-loadable';
import { CometPlaceholder } from '@fb-placeholder/CometPlaceholder';
import { CSSUserAgentSupports } from '@fb-utils/CSSUserAgentSupports';
import { useMergeRefs } from '@fb-hooks';
import stylex from '@stylexjs/stylex';

import { CometTextTypography } from './CometTextTypography';
import { FDSTextContext } from './FDSTextContext';

const CometToolTip = Loadable({
  loader: () => <div>Tooltip</div>, // import('@fb-tooltip/index').then((r) => r.CometTooltip_DEPRECATED),
  loading: () => null,
});

const e = {
  useTranslationKeyForTextParent: function () {},
};

const { useTranslationKeyForTextParent } = e;

const notSupportWebkitLineClamp = CSSUserAgentSupports.webkitLineClamp();

function calculateLineHeight(type) {
  return type && type in CometTextTypography ? CometTextTypography[type].lineHeight : 16;
}

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./text").CometLineClampProps>
 */
export const FDSLineClamp = forwardRef((props, externalRef) => {
  const { id, children, lines = 1, useAutomaticTextDirection = false, truncationTooltip, xstyle } = props;

  const cometTextContextValue = FDSTextContext.useFDSTextContext();
  const [isOverflowing, setOverflowing] = useState(false);
  const ref = useRef(null);

  const translationKeyComp = useTranslationKeyForTextParent();

  let internalStyle;
  let childrenClone = children;

  if (lines > 1) {
    if (notSupportWebkitLineClamp) {
      internalStyle = {
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lines,
        display: '-webkit-box',
      };
    } else {
      const lineHeight = calculateLineHeight(!cometTextContextValue ? undefined : cometTextContextValue.type);
      internalStyle = { maxHeight: lineHeight * lines + 0.1 };

      const calculateSize = {
        maxHeight: 'calc((100% - ' + lineHeight * lines + 'px) * 999)',
        top: lineHeight * (lines - 1),
      };

      childrenClone = (
        <>
          {childrenClone}
          <span
            aria-hidden={true}
            className={stylex(styles.supportLineHeight)}
            style={calculateSize}
            children={'\u2026'}
          />
        </>
      );
    }
  }

  const onMouseEneterWithTooltip = () => {
    const curr = ref.current;
    if (!curr || lines < 1) {
      return;
    }
    setOverflowing(curr.offsetWidth < curr.scrollWidth || curr.offsetHeight < curr.scrollHeight);
  };

  const fallback = useCallback(
    (node) => {
      if (!node || !truncationTooltip) {
        return;
      }
      // n.preload()
      CometToolTip.preload();
    },
    [truncationTooltip],
  );

  const mergedRef = useMergeRefs(externalRef, ref);

  const LineComp = (
    <span
      className={stylex(styles.root, lines === 1 && styles.oneLine, xstyle)}
      data-testid={undefined}
      dir={useAutomaticTextDirection ? 'auto' : undefined}
      id={id}
      onMouseEnter={truncationTooltip ? onMouseEneterWithTooltip : undefined}
      ref={mergedRef}
      style={internalStyle}
      key={translationKeyComp}
    >
      {childrenClone}
    </span>
  );

  return isOverflowing ? (
    <CometPlaceholder fallback={fallback}>
      <CometToolTip tooltip={truncationTooltip}>{LineComp}</CometToolTip>
    </CometPlaceholder>
  ) : (
    LineComp
  );
});

const styles = stylex.create({
  ellisis: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'absolute',
  },

  oneLine: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  root: {
    display: 'block',
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'relative',
  },

  supportLineHeight: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'absolute',
    right: 0,
  },
});
