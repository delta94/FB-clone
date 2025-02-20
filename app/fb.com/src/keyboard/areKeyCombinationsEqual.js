export function areKeyCombinationsEqual(combinationA, combinationB) {
  return !combinationA || !combinationB
    ? combinationA === combinationB
    : combinationA.key !== '' &&
        combinationB.key !== '' &&
        combinationA.key === combinationB.key &&
        (combinationA.alt === true) === (combinationB.alt === true) &&
        (combinationA.command === true) === (combinationB.command === true) &&
        (combinationA.shift === true) === (combinationB.shift === true);
}
