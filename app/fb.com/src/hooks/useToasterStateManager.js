import { useContext } from 'react';
import { BaseToasterStateManagerContext } from '@fb-contexts';

export function useToasterStateManager() {
  return useContext(BaseToasterStateManagerContext);
}
