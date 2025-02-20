export function coerceImageishURL(imageOption) {
  if (
    imageOption &&
    typeof imageOption === 'object' &&
    !imageOption.sprited &&
    typeof imageOption.uri === 'string' &&
    imageOption.width !== undefined &&
    imageOption.height !== undefined
  )
    return imageOption;
  else {
    return null;
  }
}
