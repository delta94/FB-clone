## unstable_LegacyHidden

`unstable_LegacyHidden` is an experimental React component used to manage the visibility of components without immediately removing them from the DOM. It allows React to keep components in the background (rendered but hidden) while optimizing the visibility and rendering of the component. This can be particularly useful for scenarios like lazy loading or background rendering with Suspense and Offscreen features.

### Purpose:

`unstable_LegacyHidden` is designed to allow React to render components without showing them to the user. It enables the "deferred" rendering of components, where the component is rendered but remains hidden, allowing React to prepare the component in the background. Once ready, it can be shown without triggering a full re-render or blocking the UI.

This feature helps improve perceived performance by allowing certain components to load and be prepared ahead of time without affecting the user’s experience.

### Key Features

- **Visibility Control**: The component allows you to toggle the visibility of its children without unmounting them, meaning the component remains in the DOM but is hidden from view.

- **Non-blocking Rendering**: It is often used in conjunction with React’s Suspense or Offscreen to perform background rendering of components, improving performance by deferring rendering.

- **Experimental**: Since this is an experimental API, it is subject to change in future releases of React and is not recommended for use in production environments.

### Usage

```jsx
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
```

```jsx
import React from 'react';
import { LegacyHidden } from '@fb-layout/LegacyHidden';

// Example component using unstable_LegacyHidden
export const LegacyHiddenExample = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle Visibility</button>
      <div style={{ display: 'flex' }}>
        <LegacyHidden mode={isVisible ? 'visible' : 'hidden'}>
          <div>This content is either visible or hidden.</div>
        </LegacyHidden>
      </div>
    </div>
  );
};
```

### Arguments

- `mode`: The `mode` prop defines the visibility of the component. It can either be:
  - `'visible'`: The content is shown to the user.
  - `'hidden'`: The content is hidden but still rendered in the DOM.

### Notes

- **Experimental API**: As the name suggests, `unstable_LegacyHidden` is an experimental feature, and its behavior or API might change in future React versions.

- **Use with Suspense**: This component can be particularly useful when paired with React Suspense or Offscreen features for optimizing rendering when dealing with large or lazy-loaded components.

- **Performance**: By keeping components hidden but rendered, it allows the application to prepare or hydrate components in the background without blocking the main UI thread.

### Conclusion

- `unstable_LegacyHidden` is an experimental feature in React that allows components to be rendered but hidden from the user. It helps optimize performance by enabling background rendering and deferring the display of components, improving the user experience in scenarios like lazy loading and suspense-based rendering. Since it is an unstable API, it may change in future releases, so it should be used cautiously, particularly in production applications.
