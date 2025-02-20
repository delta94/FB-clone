import { getDefaultViewForNode } from './getDefaultViewForNode';

export const getComputedStyle = (node, pseudoElement) => {
  const defaultView = getDefaultViewForNode(node);
  return defaultView ? defaultView.getComputedStyle(node, pseudoElement) : null;
};
