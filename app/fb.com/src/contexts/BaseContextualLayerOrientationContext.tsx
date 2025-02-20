import { createContext } from 'react';

const defaultOrientation = { align: 'start', position: 'below' };

export const BaseContextualLayerOrientationContext = createContext(defaultOrientation);
