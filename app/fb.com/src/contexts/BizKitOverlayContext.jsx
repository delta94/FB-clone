import React from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

import { FilterTabs } from './BizSuiteNotificationFilterTabs';

const defaultBizKitOverlayContext = {
  activeOverlay: null,
  activeToolGroup: null,
  currentAccountInfo: null,
  enteredFromGlobalSearch: false,
  entryPointRef: null,
  filterSelectorVisible: false,
  filterTab: FilterTabs.ALL,
  interactionUUID: null,
  isFilterTabDropdownVisible: false,
  isFilterTooltipVisible: false,
  isInAppToastVisible: true,
  isSuggestionsVisible: true,
  jewelTabHasData: { current: new Map() },
  notificationFilters: null,
  openedOverlays: new Set(),
  preloadedHighNotificationQuery: null,
  preloadedMBSNotificationsQuery: null,
  preloadedOtherNotificationQuery: null,
  preloadedPageLocalScopeQuery: null,
  preloadedSuggestionsQuery: null,
  selectedFilter: [],
  setActiveOverlay: emptyFunction,
  setActiveToolGroup: emptyFunction,
  setCurrentAccountInfo: emptyFunction,
  setEnteredFromGlobalSearch: emptyFunction,
  setEntryPointRef: emptyFunction,
  setFilterSelectorVisible: emptyFunction,
  setFilterTab: emptyFunction,
  setFilterTabDropdownVisible: emptyFunction,
  setFilterTooltipVisible: emptyFunction,
  setInAppToastVisible: emptyFunction,
  setInteractionUUID: emptyFunction,
  setNotificationFilters: emptyFunction,
  setOpenedOverlays: emptyFunction,
  setPreloadedHighNotificationQuery: emptyFunction,
  setPreloadedMBSNotificationsQuery: emptyFunction,
  setPreloadedOtherNotificationQuery: emptyFunction,
  setPreloadedPageLocalScopeQuery: emptyFunction,
  setPreloadedSuggestionsQuery: emptyFunction,
  setSelectedFilter: emptyFunction,
  setShouldRefetchQuery: emptyFunction,
  setShowJewelNotifSetting: emptyFunction,
  setSuggestionsVisible: emptyFunction,
  shouldRefetchQuery: false,
  showJewelNotifSetting: false,
};

const BizKitOverlayContext = React.createContext(defaultBizKitOverlayContext);

export default BizKitOverlayContext;
