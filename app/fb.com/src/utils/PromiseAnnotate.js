const setDisplayName = (component, displayName) => {
  component.displayName = displayName;
  return component;
};

/**
 * Gets the display name from a React component.
 *
 * @param {React.ComponentType} component - The React component.
 * @returns {string | null} - The display name or null if not available.
 */
const getDisplayName = (component) => {
  const displayName = component.displayName;

  if (typeof displayName === 'string') {
    return displayName;
  } else {
    return null;
  }
};

/**
 * Utility functions for working with React component display names.
 */
export const PromiseAnnotate = {
  setDisplayName,
  getDisplayName,
};

/*

export const setDisplayName = (a, b) => {
  a.displayName = b;
  return a;
};

export const getDisplayName = (a) => {
  a = a.displayName;

  if (typeof a === 'string') {
    return a;
  } else {
    return null;
  }
};

export const PromiseAnnotate = {
  setDisplayName,
  getDisplayName,
};



*/
