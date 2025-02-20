const htmlTabIndexDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'tabIndex');
const svgTabIndexDescriptor = Object.getOwnPropertyDescriptor(SVGElement.prototype, 'tabIndex');

const defaultSetter = (a) => a;

const htmlTabIndexSetter = htmlTabIndexDescriptor ? htmlTabIndexDescriptor.set : defaultSetter;
const svgTabIndexSetter = svgTabIndexDescriptor ? svgTabIndexDescriptor.set : defaultSetter;

function getTabIndexSetter(element) {
  return element instanceof SVGElement ? svgTabIndexSetter : htmlTabIndexSetter;
}

export function setElementCanTab(element, canTab, initialize = false) {
  const tabIndexState = element._tabIndexState;
  const setTabIndex = getTabIndexSetter(element);

  if (!tabIndexState) {
    if (canTab && initialize && element.tabIndex < 0) {
      element.tabIndex = 0;
    }
    const state = { value: element.tabIndex, canTab };
    element._tabIndexState = state;
    if (!canTab) {
      element.tabIndex = -1;
    }
    Object.defineProperty(element, 'tabIndex', {
      enumerable: false,
      configurable: true,
      get() {
        return state.canTab ? state.value : -1;
      },
      set(value) {
        if (state.canTab && typeof setTabIndex === 'function') {
          setTabIndex.call(this, value);
        }
        state.value = value;
      },
    });
  } else if (tabIndexState.canTab !== canTab && typeof setTabIndex === 'function') {
    setTabIndex.call(element, canTab ? tabIndexState.value : -1);
    tabIndexState.canTab = canTab;
  }
}

export function canElementTab(element) {
  const tabIndexState = element._tabIndexState;
  if (!tabIndexState) {
    return element.tabIndex > 0;
  } else {
    return tabIndexState.canTab;
  }
}
