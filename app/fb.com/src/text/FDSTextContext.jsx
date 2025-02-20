import React, { createContext, useContext, useMemo } from 'react';

import { CometTextTypography } from './CometTextTypography';

const Context = createContext(null);

const buttonColorMap = {
  disabled: 'disabledButton',
  highlight: 'primaryDeemphasizedButton',
  secondary: 'secondaryButton',
  white: 'primaryButton',
};

/**
 * Returns the color class name for the button based on the type and default mapping.
 * @param {string} color - The color provided.
 * @param {boolean} isButton - Whether the type is a button.
 * @returns {string} - The resolved color class name.
 */
function resolveButtonColor(color, isButton) {
  return isButton ? buttonColorMap[color] || color : color;
}

/**
 * Custom hook to access the FDSTextContext.
 * @returns {object|null} - The current context value or null if not provided.
 */
function useFDSTextContext() {
  return useContext(Context);
}

/**
 * FDSTextContextProvider component to provide text context.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child nodes.
 * @param {string} [props.color] - Text color.
 * @param {string} [props.type] - Typography type.
 * @returns {JSX.Element} - The provider component.
 */
function FDSTextContextProvider({ children, color, type }) {
  if (type === null) {
    // If no type is provided, render children without context value
    const resolvedChildren = typeof children === 'function' ? children(null) : children;
    return <Context.Provider value={null}>{resolvedChildren}</Context.Provider>;
  }

  // Otherwise, use FDSTextContextProviderNonNull
  return (
    <FDSTextContextProviderNonNull color={color} type={type}>
      {children}
    </FDSTextContextProviderNonNull>
  );
}

/**
 * Non-null FDSTextContextProvider for managing text color and type.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child nodes.
 * @param {string} [props.color] - Text color.
 * @param {string} props.type - Typography type.
 * @returns {JSX.Element} - The provider component.
 */
function FDSTextContextProviderNonNull({ children, color, type }) {
  // Get the default color for the typography type
  const defaultColor = CometTextTypography[type]?.defaultColor || 'primary';

  // Resolve the color using the button color map if applicable
  const resolvedColor = resolveButtonColor(color ?? defaultColor, type === 'button1' || type === 'button2');

  // Memoize the context value
  const contextValue = useMemo(() => ({ color: resolvedColor, type }), [resolvedColor, type]);

  return (
    <Context.Provider value={contextValue}>
      {typeof children === 'function' ? children(contextValue) : children}
    </Context.Provider>
  );
}

FDSTextContextProviderNonNull.displayName = 'FDSTextContextProviderNonNull';

export const FDSTextContext = {
  useFDSTextContext,
  FDSTextContextProvider,
  FDSTextContextProviderNonNull,
};
