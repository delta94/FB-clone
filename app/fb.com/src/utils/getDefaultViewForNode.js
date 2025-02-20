export const getDefaultViewForNode = (node) => {
  const ownerDocument = node === document ? document : node.ownerDocument;
  return ownerDocument?.defaultView || null;
};
