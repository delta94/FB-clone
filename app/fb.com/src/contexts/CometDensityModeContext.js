import { createContext } from 'react';

const densityMode = false;

export const CometDensityModeContext = createContext([densityMode, () => {}]);
