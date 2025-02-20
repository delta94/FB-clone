import { getTabbableNodes } from './getTabbableNodes';

let isFocusingWithoutUserIntentFlag = false;
let preventScrollSupported = false;
let initialized = false;
const AUTOFOCUS_TIMEOUT = 500;

function initializePreventScrollSupport() {
  try {
    const div = document.createElement('div');
    div.addEventListener(
      'focus',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
      },
      true,
    );
    div.focus(
      Object.defineProperty({}, 'preventScroll', {
        // eslint-disable-next-line getter-return
        get() {
          preventScrollSupported = true;
        },
      }),
    );
  } catch (error) {}
}

function getScrollableAncestors(element) {
  let parent = element.parentElement;
  const ancestors = [];
  const root = document.scrollingElement || document.documentElement;

  while (parent && parent !== root) {
    const height = parent.offsetHeight;
    const width = parent.offsetWidth;
    if (height < parent.scrollHeight || width < parent.scrollWidth) {
      ancestors.push([parent, parent.scrollTop, parent.scrollLeft]);
    }
    parent = parent.parentElement;
  }
  if (root) {
    ancestors.push([root, root.scrollTop, root.scrollLeft]);
  }
  return ancestors;
}

function restoreScrollableAncestors(scrollableAncestors) {
  for (let i = 0; i < scrollableAncestors.length; i++) {
    const [element, scrollTop, scrollLeft] = scrollableAncestors[i];
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
}

function getAllNodesFromOneOrManyQueries(queries, context) {
  queries = Array.isArray(queries) ? queries : [queries];
  for (let i = 0; i < queries.length; i++) {
    const nodes = context.DO_NOT_USE_queryAllNodes(queries[i]);
    if (nodes) return nodes;
  }
  return null;
}

function getFirstNodeFromOneOrManyQueries(queries, context) {
  queries = Array.isArray(queries) ? queries : [queries];
  for (let i = 0; i < queries.length; i++) {
    const node = context.DO_NOT_USE_queryFirstNode(queries[i]);
    if (node) return node;
  }
  return null;
}

function focusFirst(queries, context, options = {}) {
  const { preventScroll, focusWithoutUserIntent, focusWithAutoFocus } = options;
  const firstNode = getFirstNodeFromOneOrManyQueries(queries, context);
  if (firstNode) {
    focusElement(firstNode, {
      preventScroll,
      focusWithoutUserIntent,
      focusWithAutoFocus,
    });
  }
}

function isFocusingWithoutUserIntent() {
  return isFocusingWithoutUserIntentFlag;
}

function wasElementAutoFocused(element) {
  return element._focusWithAutoFocus === true;
}

function focusElement(element, options = {}) {
  const { preventScroll, focusWithoutUserIntent, focusWithAutoFocus } = options;

  if (element !== null) {
    if (!initialized) {
      initialized = true;
      initializePreventScrollSupport();
    }

    const tabIndexState = element._tabIndexState;
    if (tabIndexState && tabIndexState.canTab === false) return;

    const originalTabIndex = tabIndexState ? tabIndexState.value : element.tabIndex;
    element.tabIndex = -1;
    const prevFocusingWithoutUserIntent = isFocusingWithoutUserIntentFlag;
    isFocusingWithoutUserIntentFlag = focusWithoutUserIntent || false;

    if (focusWithAutoFocus === true) {
      element._focusWithAutoFocus = true;
      window.setTimeout(() => {
        element._focusWithAutoFocus = false;
      }, AUTOFOCUS_TIMEOUT);
    }

    try {
      const lexicalEditor = element.__lexicalEditor;
      if (lexicalEditor !== undefined) {
        lexicalEditor.focus();
      } else if (!preventScrollSupported || !preventScroll) {
        focusWithoutScrollRestoration(element);
      } else {
        const scrollableAncestors = getScrollableAncestors(element);
        focusWithoutScrollRestoration(element, { preventScroll: true });
        restoreScrollableAncestors(scrollableAncestors);
      }
    } catch (error) {
    } finally {
      isFocusingWithoutUserIntentFlag = prevFocusingWithoutUserIntent;
    }

    element.tabIndex = originalTabIndex;
  }
}

function focusNext(container, context, preventScroll) {
  const [allNodes, , , currentIndex] = getTabbableNodes(container, context);
  if (allNodes && currentIndex !== null) {
    focusElement(allNodes[currentIndex + 1], { preventScroll });
  }
}

function focusPrevious(container, context, preventScroll) {
  const [allNodes, , , currentIndex] = getTabbableNodes(container, context);
  if (allNodes && currentIndex !== null) {
    focusElement(allNodes[currentIndex - 1], { preventScroll });
  }
}

// eslint-disable-next-line max-params
function focusNextContained(container, context, event, shouldLoop, callback) {
  const [allNodes, firstNode, lastNode, currentIndex] = getTabbableNodes(container, context);
  if (!allNodes || currentIndex === null) return;

  if (currentIndex === lastNode) {
    if (callback) {
      callback();
    } else if (shouldLoop) {
      focusElement(firstNode);
      event.preventDefault();
      event.stopPropagation();
    }
  } else {
    focusElement(allNodes[currentIndex + 1]);
    event.preventDefault();
    event.stopPropagation();
  }
}

// eslint-disable-next-line max-params
function focusPreviousContained(container, context, event, shouldLoop, callback) {
  const [allNodes, firstNode, lastNode, currentIndex] = getTabbableNodes(container, context);
  if (!allNodes || currentIndex === null) return;

  if (currentIndex === firstNode) {
    if (callback) {
      callback();
    } else if (shouldLoop) {
      focusElement(lastNode);
      event.preventDefault();
      event.stopPropagation();
    }
  } else {
    focusElement(allNodes[currentIndex - 1]);
    event.preventDefault();
    event.stopPropagation();
  }
}

const focusWithoutScrollRestoration = (element, options) => {
  (element.focus || HTMLElement.prototype.focus).call(element, options);
};

export {
  focusElement,
  focusFirst,
  focusNext,
  focusNextContained,
  focusPrevious,
  focusPreviousContained,
  getAllNodesFromOneOrManyQueries,
  getFirstNodeFromOneOrManyQueries,
  isFocusingWithoutUserIntent,
  wasElementAutoFocused,
};
