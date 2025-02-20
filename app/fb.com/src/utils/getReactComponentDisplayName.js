export function getReactComponentDisplayName(comp) {
  if (comp.displayName) {
    return comp.displayName;
  }

  return comp.name ?? 'ReactComponent';
}
