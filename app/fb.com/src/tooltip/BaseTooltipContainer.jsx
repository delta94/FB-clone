import React, { forwardRef, useContext } from 'react';
import { html } from 'react-strict-dom';
import { BaseContextualLayerOrientationContext, BaseContextualLayerContextSizeContext } from '@fb-contexts';
import { FocusRegion } from '@fb-focus/FocusRegion';
import { focusableScopeQuery } from '@fb-focus/focusScopeQueries';
import stylex from '@stylexjs/stylex';

// import { BaseTooltipCarat } from './BaseTooltipCarat';

export const BaseTooltipContainer = forwardRef((props, ref) => {
  const {
    alignOffsetXstyle,
    children,
    closeButton,
    id,
    shouldFadeIn = false,
    shouldShowCarat,
    withCloseButton,
    xstyle,
    role = 'tooltip',
    ...rest
  } = props;

  const { align, position } = useContext(BaseContextualLayerOrientationContext);
  const baseContextualLayerContextSizeValue = useContext(BaseContextualLayerContextSizeContext);

  return (
    <html.div style={[styles.base, n[position], o[align]]}>
      <div
        {...rest}
        {...stylex.props(styles.container, styles.transitionOut, xstyle, shouldFadeIn && styles.transitionIn)}
        data-testid={undefined}
        id={id}
        ref={ref}
        role={role}
      >
        {role === 'dialog' ? (
          <FocusRegion autoFocusQuery={focusableScopeQuery}>
            <>
              {children}
              {withCloseButton === true && <div>{closeButton}</div>}
            </>
          </FocusRegion>
        ) : (
          children
        )}
      </div>
      <html.div
        style={[
          alignOffsetXstyle === undefined &&
            align === 'end' &&
            o.alignEnd(
              baseContextualLayerContextSizeValue === null ? void 0 : baseContextualLayerContextSizeValue.width,
            ),
          alignOffsetXstyle === undefined &&
            align === 'start' &&
            o.alignStart(
              baseContextualLayerContextSizeValue === null ? void 0 : baseContextualLayerContextSizeValue.width,
            ),
          alignOffsetXstyle,
        ]}
      >
        {/* {shouldShowCarat && (
          <BaseTooltipCarat
            fillXStyle={styles.fillXStyle}
            shouldFadeIn={shouldFadeIn}
            transitionInXStyle={styles.transitionIn}
            transitionOutXStyle={styles.transitionOut}
          />
        )} */}
      </html.div>
    </html.div>
  );
});

const styles = stylex.create({
  container: {
    backgroundColor: 'var(--tooltip-background)',
    borderRadius: 'var(--tooltip-corner-radius)',

    boxShadow: 'var(--tooltip-box-shadow)',
    display: 'block',
    filter: 'opacity(1)',
    marginBottom: '2px',
    marginTop: '2px',
    maxWidth: '334px',
    opacity: '0',
    paddingBottom: '12px',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '12px',
    position: 'relative',
    transitionDuration: 'var(--fds-duration-extra-extra-short-out)',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'var(--fds-animation-fade-out)',
  },
  fillXStyle: {
    fill: 'var(--tooltip-background)',
    fillOpacity: 1,
  },
  transitionIn: {
    opacity: 1,
    transitionDuration: 'var(--fds-duration-extra-extra-short-in)',
    transitionTimingFunction: 'var(--fds-animation-fade-in)',
  },
  transitionOut: {
    opacity: 0,
    transitionDuration: 'var(--fds-duration-extra-extra-short-out)',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'var(--fds-animation-fade-out)',
  },
  containerVisible: {
    opacity: '1',
    transitionDuration: 'var(--fds-duration-extra-extra-short-in)',
    transitionTimingFunction: 'var(--fds-animation-fade-in)',
  },
});

const n = stylex.create({
  above: {
    flexDirection: 'column',
  },
  base: {
    display: 'flex',
    marginBottom: '2px',
    marginTop: '2px',
  },
  below: {
    flexDirection: 'column-reverse',
  },
  end: {
    flexDirection: 'row-reverse',
  },
  start: {
    flexDirection: 'row',
  },
});

const l = 10.5;

const o = stylex.create({
  alignEnd: (_size) => ({
    // eslint-disable-next-line @stylexjs/valid-styles
    marginInlineEnd_: (function (size) {
      return typeof size === 'number' ? size + 'px' : size !== null ? size : undefined;
    })('calc(' + (_size ?? 0) + 'px / 2 - ' + l + 'px)'),
    // eslint-disable-next-line no-constant-binary-expression
    marginRight: 'calc(' + (size ?? 0) + 'px / 2 - ' + l + 'px)' === null ? null : 'var(--marginInlineEnd)',
  }),
  alignStart: (_size) => ({
    // eslint-disable-next-line @stylexjs/valid-styles
    marginInlineStart_: (function (size) {
      return typeof size === 'number' ? size + 'px' : size !== null ? size : undefined;
    })('calc(' + (_size ?? 0) + 'px / 2 - ' + l + 'px)'),
    // eslint-disable-next-line no-constant-binary-expression
    marginLeft: 'calc(' + (size ?? 0) + 'px / 2 - ' + l + 'px)' === null ? null : 'var(--marginInlineStart)',
  }),
  end: {
    alignItems: 'flex-end',
  },
  middle: {
    alignItems: 'center',
  },
  start: {
    alignItems: 'flex-start',
  },
  stretch: {
    alignItems: 'center',
  },
});
