export function intersectionObserverEntryIsIntersecting(props) {
  return props.isIntersecting
    ? props.isIntersecting
    : props.intersectionRatio > 0 ||
        (props.intersectionRect && (props.intersectionRect.height > 0 || props.intersectionRect.width > 0));
}
