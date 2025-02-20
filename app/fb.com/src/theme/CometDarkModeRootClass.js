// import ExecutionEnvironment from "fbjs/lib/ExecutionEnvironment";

import { executionEnvironment } from '@fb-utils/ExecutionEnvironment';

import { StyleXSheet } from './StyleXSheet';

/**
 * Adds or removes a class from the HTML element based on the condition.
 *
 * @param {HTMLElement} element - The HTML element.
 * @param {string} className - The class name to add or remove.
 * @param {boolean} condition - Whether to add or remove the class.
 */
function toggleClass(element, className, condition) {
  condition ? element.classList.add(className) : element.classList.remove(className);
}

/**
 * Toggles the dark mode class on the root HTML element.
 *
 * @param {boolean} isEnabled - Whether dark mode is enabled.
 */
function toggleDarkModeRootClass(isEnabled) {
  updateDarkModeRootClass(isEnabled ? 'ENABLED' : 'DISABLED');
}

/**
 * Updates the dark mode root class based on the mode status.
 *
 * @param {string} status - The dark mode status.
 */
function updateDarkModeRootClass(status) {
  if (!executionEnvironment.canUseDOM) {
    return;
  }

  const rootElement = window.document.documentElement;

  toggleClass(rootElement, StyleXSheet.DARK_MODE_CLASS_NAME, status === 'ENABLED');

  toggleClass(rootElement, StyleXSheet.LIGHT_MODE_CLASS_NAME, status === 'DISABLED' || status === 'UNDECLARED');
}

export const CometDarkModeRootClass = {
  updateDarkModeRootClass,
  toggleDarkModeRootClass,
};
