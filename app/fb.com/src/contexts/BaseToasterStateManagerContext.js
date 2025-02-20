import React from 'react';
import { BaseToasterStateManager } from '@fb-toast/BaseToasterStateManager';

export const BaseToasterStateManagerContext = React.createContext(BaseToasterStateManager.getInstance());
