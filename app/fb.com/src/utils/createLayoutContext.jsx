import React, { createContext, useContext, useImperativeHandle, useMemo, useReducer } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

import { useUnsafeRef_DEPRECATED, useRefEffect } from '@fb-hooks';

import { compareDOMOrder } from './compareDOMOrder';

export function createLayoutContext(defaultValue) {
  const defaultContext = {
    getLayout: () => defaultValue,
    dispatch: emptyFunction,
    nodes: new Map(),
    values: [],
  };

  const LayoutContext = createContext(defaultContext);

  function Provider({ children, imperativeRef, value }) {
    const [nodes, dispatch, forceUpdate] = useLayoutReducer();

    useImperativeHandle(
      imperativeRef,
      () => ({
        forceUpdate: () => forceUpdate(),
      }),
      [forceUpdate],
    );

    const contextValue = useMemo(
      () => ({
        getLayout: value,
        dispatch,
        nodes,
        values: Array.from(nodes.values()),
      }),
      [value, dispatch, nodes],
    );

    return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>;
  }

  Provider.displayName = `${Provider.name}`;

  function Resetter(props) {
    return <LayoutContext.Provider value={defaultContext} {...props} />;
  }

  Resetter.displayName = `${Resetter.name}`;

  function useLayoutContext(value) {
    const ref = useUnsafeRef_DEPRECATED(null);
    const context = useContext(LayoutContext);
    const { getLayout, dispatch, nodes, values } = context;

    const layout = useMemo(() => {
      const index = ref.current && nodes.get(ref.current);
      const total = nodes.size;
      return index !== null
        ? getLayout({
            isFirst: index === 0,
            isLast: index >= 0 && index === total - 1,
            index,
            total,
            values,
            nodes,
          })
        : defaultValue;
    }, [getLayout, nodes, values]);

    const refEffect = useRefEffect(
      (node) => {
        ref.current = node;
        dispatch({ add: node, value });
        return () => {
          ref.current = null;
          dispatch({ remove: node });
        };
      },
      [dispatch, value],
    );

    return [layout, refEffect];
  }

  function Consumer({ children, value }) {
    const [layout, refEffect] = useLayoutContext(value);
    return children(layout, refEffect);
  }

  Consumer.displayName = `${Consumer.name} [from some-module-id]`;

  return {
    Provider,
    Consumer,
    Resetter,
    useLayoutContext,
    _context: LayoutContext,
  };
}

function compareNodes(a, b) {
  return compareDOMOrder(a.node, b.node);
}

function layoutReducer(state, action) {
  let list = Array.from(state);
  if (action.remove) {
    list = list.filter((item) => item.node !== action.remove);
  }
  if (action.add) {
    list = list.filter((item) => item.node !== action.add).concat({ node: action.add, value: action.value });
  }
  return list.sort(compareNodes);
}

function useLayoutReducer() {
  const [state, dispatch] = useReducer(layoutReducer, []);
  const layout = useMemo(() => {
    const nodes = new Map();
    const values = state.map((item, index) => {
      nodes.set(item.node, index);
      return item.value;
    });
    return { nodes, values };
  }, [state]);

  return [layout.nodes, dispatch, () => dispatch({})];
}
