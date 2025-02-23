import ExecutionEnvironment from './ExecutionEnvironment';
import { suspendOrThrowIfUsedInSSR } from '@fb-dump/suspendOrThrowIfUsedInSSR';

const resourceMap = {};

export const preload = (resource) => {
  resource.load();
};

export const read = (resource) => {
  const module = resource.getModuleIfRequireable();
  if (module === null) {
    if (!ExecutionEnvironment.isInBrowser && !resource.isAvailableInSSR_DO_NOT_USE()) {
      suspendOrThrowIfUsedInSSR('Loading of bootloaded and T3 components is disabled during SSR');
    }
    const moduleId = resource.getModuleId();
    if (!resourceMap[moduleId]) {
      resourceMap[moduleId] = resource.load();
      resourceMap[moduleId].finally(() => {
        delete resourceMap[moduleId];
      });
    }
    throw resourceMap[moduleId];
  }
  return module;
};
