import { invariant } from '@fb-error/invariant';

import { entriesMap } from './entriesMap';

const usedPathsSet = new Set();

export function ix(key, externalEntriesMap) {
  let entry;

  if (externalEntriesMap) {
    entry = externalEntriesMap[key];
  } else {
    entry = entriesMap[key];
  }

  !entry && invariant(0, 11798, key);
  return entry;
}

ix.add = function (entries, counters) {
  // let hasDuplicates = false;
  // eslint-disable-next-line guard-for-in
  for (const key in entries) {
    counters && counters.entry++;
    if (!(key in entriesMap)) {
      entries[key].loggingID = key;
      entriesMap[key] = entries[key];
    } else {
      // hasDuplicates &&
      counters && counters.dup_entry++;
    }
  }
};

ix.getUsedPathsForReactFlight = function () {
  window.__flight_execution_mode_DO_NOT_USE === 'flight' || invariant(0, 34547);
  return Array.from(usedPathsSet);
};

ix.getAllPaths = function () {
  const uniquePathsSet = new Set();

  Object.values(entriesMap)
    // eslint-disable-next-line array-callback-return
    .map((entry) => {
      if ((!entry ? undefined : entry.sprited) === 0) {
        return entry.uri;
      } else if ((!entry ? void 0 : entry.sprited) === 1) {
        return entry._spi;
      } else if ((!entry ? void 0 : entry.sprited) === 2) {
        return entry.spi;
      }
    })
    .forEach((entry) => {
      return uniquePathsSet && uniquePathsSet.add(entry);
    });

  return uniquePathsSet;

  // Object.values(entriesMap).forEach((entry) => {
  //   if (entry && entry.sprited === 0) uniquePathsSet.add(entry.uri);
  //   else if (entry && entry.sprited === 1) uniquePathsSet.add(entry._spi);
  //   else if (entry && entry.sprited === 2) uniquePathsSet.add(entry.spi);
  // });
  // return uniquePathsSet;
};
