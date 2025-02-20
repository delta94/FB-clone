import { useCometPlaceholderImpl } from './useCometPlaceholderImpl';

export function CometBackupPlaceholder(props) {
  return useCometPlaceholderImpl({
    ...props,
    unstable_avoidThisFallback: !0,
  });
}
