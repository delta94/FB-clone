import React from 'react';

let j = '<!--$-->';
let k = '<!--$?-->';
let l = '<!--$!-->';
let m = '<!--/$-->';
let n = new Map();
let o = new Set();

export const setEnabledBoundaries = function (a) {
  o = new Set(a);
};

export const isEnabledBoundary = function (a) {
  return o.has(a);
};

export const getBoundarySSRContentID = function (a) {
  return 'ssrb_' + a + '_content';
};

export const getBoundaryStartID = function (a) {
  return 'ssrb_' + a + '_start';
};
export const getBoundaryEndID = function (a) {
  return 'ssrb_' + a + '_end';
};
const r = function (a) {
  return '<span id="' + getBoundaryStartID(a) + '" style="display:none"></span>';
};
const s = function (a) {
  return '<span id="' + getBoundaryEndID(a) + '" style="display:none"></span>';
};

export const getBoundaryStartOffset = function (a, b) {
  a = r(a);
  let c = a.length;
  a = b.indexOf(a);
  if (a !== -1) {
    if (b.startsWith(j, a + c)) return [a, c + j.length, 'hydrate'];
    if (b.startsWith(l, a + c)) return [a, c + l.length, 'fallback'];
    if (b.startsWith(k, a + c)) return [a, c + k.length, 'fallback'];
  }
  return null;
};

export const getBoundaryEndOffset = function (a, b) {
  a = m + s(a);
  b = b.indexOf(a);
  return b !== -1 ? [b, a.length] : null;
};

export const getBoundaryString = function (a, b) {
  return r(a) + (String(k) + b + m) + s(a);
};
export const getBoundaryStartComponent = function (a) {
  return (
    <span
      id={getBoundaryStartID(a)}
      style={{
        display: 'none',
      }}
    />
  );
};
export const getBoundaryEndComponent = function (a) {
  return (
    <span
      id={getBoundaryStartID(a)}
      style={{
        display: 'none',
      }}
    />
  );
};

export function tryResolveDisabledBoundaries(a) {
  a.forEach((a) => {
    let b = n.get(a) || null;
    b && b.resolveFunc && typeof b.resolveFunc === 'function' && (b.resolveFunc(a), n['delete'](a));
  });
}
export const tryGetBoundaryPromise = function (a) {
  a = n.get(a);
  return a ? a.promise : null;
};
export const updateDisabledBoundariesMap = function (a, b) {
  n.set(a, b);
};

export const CometSSRMultipassBoundaryUtils = {
  // setEnabled,
  // isEnabled,
  setEnabledBoundaries,
  isEnabledBoundary,
  getBoundarySSRContentID,
  getBoundaryStartID,
  getBoundaryEndID,
  getBoundaryStartOffset,
  getBoundaryEndOffset,
  getBoundaryString,
  getBoundaryStartComponent,
  getBoundaryEndComponent,
  tryResolveDisabledBoundaries,
  tryGetBoundaryPromise,
  updateDisabledBoundariesMap,
};
