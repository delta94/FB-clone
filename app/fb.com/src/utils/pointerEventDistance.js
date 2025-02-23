const DEFAULT_THRESHOLD = 1;
const TOUCH_PEN_THRESHOLD = 5;

function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getDistanceBetweenEvents(event1, event2) {
  return calculateDistance(event1.clientX, event1.clientY, event2.clientX, event2.clientY);
}

function isWithinThreshold(event1, event2) {
  const threshold =
    event2.pointerType === 'touch' || event2.pointerType === 'pen' ? TOUCH_PEN_THRESHOLD : DEFAULT_THRESHOLD;
  const distance = getDistanceBetweenEvents(event1, event2);
  return distance <= threshold;
}

export { isWithinThreshold };
