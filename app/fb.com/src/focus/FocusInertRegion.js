import React, { useLayoutEffect, useRef } from 'react';
import { setElementCanTab } from '@fb-focus/setElementCanTab';
import { gkx } from '@fb-utils/gkx';

export const FocusInertRegion = ({ children, disabled = false, focusQuery, forceHTMLInert = false }) => {
  // Ref for the container element.
  const containerRef = useRef(null);

  // On mount and when `disabled` or `focusQuery` change,
  // update tabbing behavior on all matching nodes within the container.
  useLayoutEffect(() => {
    if (focusQuery && containerRef.current) {
      // Query all nodes within the container using the provided focus query.
      const nodes = containerRef.current.DO_NOT_USE_queryAllNodes(focusQuery);
      if (nodes !== null) {
        for (let i = 0; i < nodes.length; i++) {
          setElementCanTab(nodes[i], disabled);
        }
      }
    }
  }, [disabled, focusQuery]);

  // If not disabled and either gkx flag "329" is true or forceHTMLInert is set,
  // wrap the children in a <div> with the HTML inert attribute.
  const shouldApplyInert = !disabled && (gkx['329'] || forceHTMLInert);
  const content = shouldApplyInert ? <div inert="">{children}</div> : children;

  // Wrap the content in an experimental scope component so we can reference its DOM.
  const Scope = React.unstable_Scope;
  return <Scope ref={containerRef}>{content}</Scope>;
};
