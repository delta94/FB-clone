import React, { forwardRef } from 'react';

import { useHeroBootloadedComponent } from '@fb-hooks';

import { read } from '@fb-utils/BootloaderResource';

const componentMap = new Map();

function setComponent(name, component) {
  componentMap.set(name, component);
}

function getComponent(name) {
  return componentMap.get(name);
}

export const lazyLoadComponent = (name) => {
  const existingComponent = getComponent(name);
  if (existingComponent) return existingComponent;

  function LazyLoadedComponent(props, ref) {
    const resource = read(name);
    useHeroBootloadedComponent(name);
    return React.createElement(resource, { ...props, ref });
  }

  LazyLoadedComponent.displayName = `lazyLoadComponent(${name})`;

  const ComponentWithRef = forwardRef(LazyLoadedComponent);
  setComponent(name, ComponentWithRef);

  return ComponentWithRef;
};
