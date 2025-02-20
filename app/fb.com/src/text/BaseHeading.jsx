import React, { forwardRef, useContext } from 'react';
import { html } from 'react-strict-dom';
import { BaseHeadingContext, BaseTextContext } from '@fb-contexts';
import { unrecoverableViolation } from '@fb-error/unrecoverableViolation';
import { gkx } from '@fb-utils/gkx';
import stylex from '@stylexjs/stylex';
import UserAgent from 'fbjs/lib/UserAgent';

const HEADING_TAGS = {
  1: html.h1,
  2: html.h2,
  3: html.h3,
  4: html.h4,
  5: html.h5,
  6: html.h6,
};

// Determine styles
const isOldBrowser =
  UserAgent.isBrowser('Chrome < 83') || UserAgent.isBrowser('Safari < 14.1') || UserAgent.isBrowser('Firefox < 69');

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./text").BaseHeadingProps>
 */
const BaseHeading = forwardRef((props, ref) => {
  const {
    children,
    id,
    isPrimaryHeading = false,
    suppressHydrationWarning,
    xstyle,
    //
    testid,
  } = props;

  const headingContext = useContext(BaseHeadingContext);
  const textContext = useContext(BaseTextContext);
  const isNested = textContext?.nested === true;

  let HeadingTag;

  if (isPrimaryHeading) {
    HeadingTag = html.h1;
  } else {
    const a = Math.max(Math.min(headingContext, 6), 2);
    HeadingTag = HEADING_TAGS[String(a)];
  }

  if (!HeadingTag) {
    throw unrecoverableViolation('Failed to retrieve a heading tag, this should not be possible', 'comet_ui');
  }

  const dynamicStyles = gkx[8029] ? [styles.rootGated, isOldBrowser && styles.oldBrowsers] : [];

  const finalStyles = [styles.root].concat(dynamicStyles, [[xstyle]]);

  const dir = isNested ? undefined : 'auto';

  const element = (
    <HeadingTag
      data-testid={testid}
      dir={dir}
      id={id}
      ref={ref}
      style={finalStyles}
      suppressHydrationWarning={suppressHydrationWarning}
    >
      {children}
    </HeadingTag>
  );

  return element;
});

export { BaseHeading };

const styles = stylex.create({
  oldBrowsers: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':focus': {
      boxShadow: 'var(--focus-ring-shadow-default)',
    },

    boxShadow: 'none',
  },

  root: {
    color: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    outline: 'none',
  },

  rootGated: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':focus-visible': {
      boxShadow: 'var(--focus-ring-shadow-default)',
    },

    // eslint-disable-next-line @stylexjs/valid-styles
    '@supports not selector(:focus-visible)': {
      ':focus': {
        boxShadow: 'var(--focus-ring-shadow-default)',
      },
    },

    boxShadow: 'none',
  },
});
