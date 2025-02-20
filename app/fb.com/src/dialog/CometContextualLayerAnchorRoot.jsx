import React from 'react';
import { BaseContextualLayerAnchorRoot } from './BaseContextualLayerAnchorRoot';

export const CometContextualLayerAnchorRoot = (props) => {
  return <BaseContextualLayerAnchorRoot {...props} />;
};

CometContextualLayerAnchorRoot.displayName = `${CometContextualLayerAnchorRoot.name} [from ${module.id}]`;
