function getMarkerId(a) {
  return a.i;
}
function getSampleRate(a) {
  // eslint-disable-next-line no-return-assign, no-cond-assign
  return (a = a.r) ? a : 0;
}
function getSamplingMethod(a) {
  // eslint-disable-next-line no-return-assign, no-cond-assign
  return (a = a.m) ? a : 1;
}

export const QPLEvent = {
  getMarkerId,
  getSampleRate,
  getSamplingMethod,
};
