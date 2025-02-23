import React, { forwardRef, useReducer } from 'react';
import { BaseMultiPageViewContainer } from '@fb-dialog/BaseMultiPageViewContainer';
import { reducer, initialState } from '@fb-dialog/BaseMultiPageViewReducer';

export const BaseMultiPageView = forwardRef(function BaseMultiPageView(props, ref) {
  // Create a shallow copy of props (if needed)
  const extendedProps = { ...props };

  // Set up state for managing the page history
  const [pageHistory, dispatch] = useReducer(reducer, initialState);

  // Function to push a new page onto the history
  const onAddPage = (direction, component, pageInfo) => {
    dispatch({
      component,
      direction,
      pageKey: pageInfo ? pageInfo.pageKey : undefined,
      type: 'push_page',
    });
  };

  // Function to pop a page from the history
  const onPopPage = (page) => {
    dispatch({
      index: page ? page.index : undefined,
      pageKey: page ? page.pageKey : undefined,
      type: 'pop_page',
    });
  };

  // Function to clear removed pages
  const onClearRemovedPages = () => {
    dispatch({ type: 'clear_removed_pages' });
  };

  return (
    <BaseMultiPageViewContainer
      {...extendedProps}
      onAddPage={onAddPage}
      onClearRemovedPages={onClearRemovedPages}
      onPopPage={onPopPage}
      pageHistory={pageHistory}
      ref={ref}
    />
  );
});
