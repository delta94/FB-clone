export function getTabbableNodes(container, querySelector) {
  const activeElement = document.activeElement;

  const isTabbable = (element, querySelector, node) => {
    return (
      node === activeElement ||
      (element(node, querySelector, node) &&
        node.offsetWidth > 0 &&
        node.offsetHeight > 0 &&
        node.tabIndex !== -1 &&
        window.getComputedStyle(node).visibility !== 'hidden')
    );
  };

  const tabbableNodes = activeElement ? querySelector.DO_NOT_USE_queryAllNodes(container, isTabbable) : null;

  if (tabbableNodes === null) {
    return [null, null, null, 0, null];
  }

  const radioGroups = {};

  tabbableNodes.forEach((node) => {
    if (node instanceof HTMLInputElement && node.tagName === 'INPUT' && node.type === 'radio' && node.name !== null) {
      if (radioGroups[node.name]) {
        radioGroups[node.name].push(node);
      } else {
        radioGroups[node.name] = [node];
      }
    }
  });

  const radioGroupsWithChecked = Object.values(radioGroups)
    .map((group) => {
      if (group.find((node) => node.checked)) {
        return group.filter((node) => !node.checked);
      }
      return group.slice(1);
    })
    .flat();

  const filteredTabbableNodes = tabbableNodes.filter((node) => {
    return !radioGroupsWithChecked.includes(node);
  });

  const firstNode = filteredTabbableNodes[0];
  const lastNode = filteredTabbableNodes[filteredTabbableNodes.length - 1];
  const activeNodeIndex = filteredTabbableNodes.indexOf(activeElement);
  const activeNode = activeNodeIndex !== -1 ? filteredTabbableNodes[activeNodeIndex - 1] : null;

  return [filteredTabbableNodes, firstNode, lastNode, activeNodeIndex, activeNode];
}
