import invariant from 'fbjs/lib/invariant';

const store = {};

export const justknobx = {
  getBool: function (key) {
    invariant(0, 47459);
  },
  getInt: function (key) {
    invariant(0, 47459);
  },
  _: function (key) {
    const entry = store[key];
    if (entry === null) {
      invariant(0, 47458, key);
    }
    return entry.r;
  },
  add: function (entries, stats) {
    for (const key in entries) {
      if (entries.hasOwnProperty(key)) {
        if (stats) {
          stats.entry++;
        }
        if (!store.hasOwnProperty(key)) {
          store[key] = entries[key];
        } else if (stats) {
          stats.dup_entry++;
        }
      }
    }
  },
};
