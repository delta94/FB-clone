/**
 * Changelog:
 * - 09/12/2024
 */

import performanceNowSinceAppStart from 'fbjs/lib/performanceNow';

/* eslint-disable prefer-const */

// let performance = 0;
// let m = 6;
// let n = 6e4;
// let o = 10 * n;
// let q = 0;

// const p = new Map();

// function r() {
//   const a = performance || (performance = performanceNow());
//   if (a > q + n) {
//     const c = a - o;
//     for (
//       let isArray = Array.isArray(p),
//         f = 0,
//         interator = isArray
//           ? p
//           : p[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
//       ;

//     ) {
//       let h;
//       if (isArray) {
//         if (f >= interator.length) break;
//         h = interator[f++];
//       } else {
//         f = interator.next();
//         if (f.done) break;
//         h = f.value;
//       }
//       // eslint-disable-next-line no-self-assign
//       h = h;
//       const i = h[0];
//       h = h[1];
//       h.lastAccessed < c && p["delete"](i);
//     }
//     q = a;
//   }
// }

// function s(hash) {
//   r();
//   const c = performance || (performance = performanceNow());
//   const d = p.get(hash);
//   if (d === null) {
//     p.set(hash, {
//       dropped: 0,
//       logged: [c],
//       lastAccessed: c,
//     });
//     return 1;
//   }
//   const dropped = d.dropped;
//   const e = d.logged;
//   d.lastAccessed = c;
//   while (e[0] < c - n) e.shift();
//   if (e.length < m) {
//     d.dropped = 0;
//     e.push(c);
//     return dropped + 1;
//   } else {
//     d.dropped++;
//     return null;
//   }
// }

// function shouldLog(nError) {
//   return s(nError.hash);
// }

// export const ErrorFilter = {
//   shouldLog,
// };

let errorLogMap = new Map(); // Map to track error logs
let lastCleanupTime = 0;
const logFrequencyLimit = 6; // Maximum number of logs within the time limit
const logTimeLimit = 60000; // Time limit in milliseconds (1 minute)
const oldEntryTimeLimit = 10 * logTimeLimit; // Old entry time limit (10 minutes)

function checkAndLogErrorFrequency(errorHash) {}

function cleanUpOldEntries() {
  let currentTime = performanceNowSinceAppStart();
  if (currentTime > lastCleanupTime + logTimeLimit) {
    let cutoffTime = currentTime - oldEntryTimeLimit;

    for (let [key, entry] of errorLogMap) {
      if (entry.lastAccessed < cutoffTime) {
        errorLogMap.delete(key); // Remove old entries
      }
    }

    lastCleanupTime = currentTime; // Update the last cleanup time
  }
}

export const ErrorFilter = {
  shouldLog: function (error) {
    return checkAndLogErrorFrequency(error.hash);
  },
};
