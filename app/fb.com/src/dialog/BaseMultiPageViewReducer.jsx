import { FBLogger } from '@fb-error/FBLogger';

let counter = 0;
function getNextKey() {
  return counter++;
}

const initialState = [{ key: getNextKey(), type: 'initial_page' }];

function reducer(state, action) {
  const filteredState = state.filter((item) => item.type !== 'pushed_page' || !item.removed);

  switch (action.type) {
    case 'push_page': {
      const duplicate = action.pageKey != null ? filteredState.find((item) => item.pageKey === action.pageKey) : null;
      if (duplicate != null) {
        throw FBLogger('comet_ui').mustfixThrow('Tried to push page with duplicate key.');
      }
      return filteredState.concat([
        {
          component: action.component,
          direction: action.direction,
          key: getNextKey(),
          pageKey: action.pageKey,
          removed: false,
          type: 'pushed_page',
        },
      ]);
    }
    case 'clear_removed_pages': {
      return filteredState;
    }
    case 'pop_page': {
      const lastIndex = filteredState.length - 1;
      const lastPage = filteredState[lastIndex];
      if (lastPage.type === 'pushed_page') {
        let index = action.index;
        if (action.pageKey != null) {
          const foundIndex = filteredState.findIndex((item) => item.pageKey === action.pageKey);
          index = foundIndex > -1 ? foundIndex : index;
        }
        return [...filteredState.slice(0, index != null ? Math.max(index + 1, 1) : -1), { ...lastPage, removed: true }];
      }
      break;
    }
    default:
      return state;
  }
  return state;
}

export { initialState, reducer };
