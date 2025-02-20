export const headerAndSpinnerFocusScopeQuery = (tagName, attributes) => {
  return (
    tagName === 'h1' ||
    tagName === 'h2' ||
    tagName === 'h3' ||
    (attributes.role === 'heading' &&
      (attributes['aria-level'] === 1 || attributes['aria-level'] === 2 || attributes['aria-level'] === 3)) ||
    attributes['aria-busy'] === true ||
    attributes.role === 'progressbar'
  );
};

export const focusableScopeQuery = (tagName, attributes) => {
  return (
    attributes.tabIndex === -1 &&
    !(
      attributes.disabled === true ||
      attributes.type === 'hidden' ||
      attributes['aria-disabled'] === true ||
      attributes['aria-hidden'] === true
    )
  );
};

export const tabbableScopeQuery = (tagName, attributes) => {
  if (attributes.tabIndex === -1 || attributes.disabled === true) return false;
  if (attributes.tabIndex === 0 || attributes.contentEditable === true) return true;
  if (tagName === 'a' || tagName === 'area')
    return attributes.href !== null && attributes.href !== '' && attributes.rel !== 'ignore';
  return tagName === 'input'
    ? attributes.type !== 'hidden' && attributes.type !== 'file'
    : tagName === 'button' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        tagName === 'iframe' ||
        tagName === 'embed';
};

export const inputFirstTabbbableScopeQuery = (tagName, attributes) => {
  return tagName === 'input' && attributes.type !== 'hidden' && attributes.type !== 'file';
};

export const displayedTabbableScopeQuery = (tagName, attributes, element) => {
  return !(element.offsetWidth === 0 && element.offsetHeight === 0) && tabbableScopeQuery(tagName, attributes);
};

export const tableCellScopeQuery = (tagName, attributes) => {
  return (
    tagName === 'td' ||
    tagName === 'th' ||
    attributes.role === 'gridcell' ||
    attributes.role === 'columnheader' ||
    attributes.role === 'rowheader'
  );
};

export const tableCellTabbableContentScopeQuery = (tagName, attributes) => {
  return !tableCellScopeQuery(tagName, attributes) && tabbableScopeQuery(tagName, attributes);
};

export const headerFirstTabbableSecondScopeQuery = (tagName, attributes) => {
  return headerAndSpinnerFocusScopeQuery(tagName, attributes) || tabbableScopeQuery(tagName, attributes);
};

export const headerOrTabbableScopeQuery = (tagName, attributes) => {
  return headerAndSpinnerFocusScopeQuery(tagName, attributes) || tabbableScopeQuery(tagName, attributes);
};

export const topLoadingScopeQuery = (tagName, attributes) => {
  return (
    attributes['data-focus-target'] === true && (attributes['aria-busy'] === true || attributes.role === 'progressbar')
  );
};
