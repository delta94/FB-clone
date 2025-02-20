/**
 * Changelog:
 * - 09/12/2024
 */

import React, { forwardRef, unstable_LegacyHidden as UnstableLegacyHidden } from 'react';

/** @typedef {Object} LegacyHiddenPropTypes
 *  @property {React.ReactNode} children - The content to render inside the div.
 *  @property {React.HTMLAttributes} [htmlAttributes] - Additional HTML attributes to apply to the div.
 *  @property {'hidden' | 'visible'} mode - Determines the visibility of the content.
 *  @property {boolean} [suppressHydrationWarning] - Suppresses hydration warning.
 */

/**
 * A component that renders a `div` element, conditionally applying the `hidden` attribute
 * and using `unstable_LegacyHidden` to manage the visibility of its children.
 * It defers rendering of the children based on the `mode` prop.
 *
 * @type React.ForwardRefRenderFunction<?, LegacyHiddenPropTypes>
 *
 * @returns {React.Element} The rendered component.
 */
const LegacyHidden = forwardRef((props, ref) => {
  const { children, htmlAttributes, mode, suppressHydrationWarning } = props;

  return (
    <div
      {...htmlAttributes}
      hidden={mode === 'hidden' ? true : undefined}
      ref={ref}
      suppressHydrationWarning={suppressHydrationWarning}
    >
      <UnstableLegacyHidden mode={mode === 'hidden' ? 'unstable-defer-without-hiding' : mode}>
        {children}
      </UnstableLegacyHidden>
    </div>
  );
});

LegacyHidden.displayName = 'LegacyHidden';

export { LegacyHidden };
