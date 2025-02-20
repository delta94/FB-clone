/**
 * Changelog:
 * - 09/12/2024
 */

import React, { PureComponent } from 'react';
import { getReactElementDisplayName } from '@fb-utils/getReactElementDisplayName';

import { ErrorPubSub } from './ErrorPubSub';
import { ErrorSerializer } from './ErrorSerializer';
import { getErrorSafe } from './getErrorSafe';

function getReactDisplayName(children) {
  const _children = React.Children.count(children) > 1 ? React.Children.toArray(children)[0] : children;
  return getReactElementDisplayName(_children);
}

export class ErrorBoundary extends PureComponent {
  // eslint-disable-next-line react/sort-comp
  static defaultProps = {
    forceResetErrorCount: 0,
  };

  static getDerivedStateFromError = function (error) {
    return {
      error: getErrorSafe(error),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      // eslint-disable-next-line react/prop-types
      moduleName: getReactDisplayName(this.props.children),
    };

    this.suppressReactDefaultErrorLogging = true;
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.error &&
      this.props.forceResetErrorCount &&
      this.props.forceResetErrorCount !== prevProps.forceResetErrorCount
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        error: null,
      });
      return;
    }
  }

  componentDidCatch(e, errorInfo) {
    const { componentStack } = errorInfo;
    let { augmentError, context = {}, description = 'base', onError } = this.props;

    if (!context.messageFormat) {
      context.messageFormat = 'caught error in module %s (%s)';
      context.messageParams = [this.state.moduleName, description];
    }

    const { error, moduleName } = this.state;

    if (error) {
      ErrorSerializer.aggregateError(error, {
        componentStack,
        loggingSource: 'ERROR_BOUNDARY',
      });

      ErrorSerializer.aggregateError(error, context);

      if (typeof augmentError === 'function') {
        augmentError(error);
      }

      ErrorPubSub.reportError(error);

      if (typeof onError === 'function') {
        onError(error, moduleName);
      }
    }
  }

  render() {
    const { error, moduleName } = this.state;
    if (error) {
      const { fallback } = this.props;
      return fallback ? fallback(error, moduleName) : null;
    }
    return this.props.children ? this.props.children : null;
  }
}
