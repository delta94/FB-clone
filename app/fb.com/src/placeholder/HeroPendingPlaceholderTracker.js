const interactionMap = new Map();

/**
 * Adds an interaction to the tracker.
 *
 * @param {string} key - The key to identify the interaction.
 */
function addInteraction(key) {
  if (!interactionMap.has(key)) {
    interactionMap.set(key, new Map());
  }
}

/**
 * Adds a placeholder to the tracker.
 *
 * @param {string} key - The key identifying the interaction.
 * @param {string} placeholderKey - The key to identify the placeholder.
 * @param {string} description - The description of the placeholder.
 * @param {number} startTime - The start time of the placeholder.
 * @param {string[]} pageletStack - The pagelet stack associated with the placeholder.
 */
// eslint-disable-next-line max-params
function addPlaceholder(key, placeholderKey, description, startTime, pageletStack) {
  const interaction = interactionMap.get(key);
  if (interaction) {
    interaction.set(placeholderKey, {
      description,
      pageletStack,
      startTime,
    });
  }
}

/**
 * Retrieves all placeholders associated with an interaction.
 *
 * @param {string} key - The key identifying the interaction.
 * @returns {Array} - An array of placeholders.
 */
function dump(key) {
  const interaction = interactionMap.get(key);
  return interaction ? Array.from(interaction.values()) : [];
}

/**
 * Removes an interaction from the tracker.
 *
 * @param {string} key - The key identifying the interaction to be removed.
 */
function removeInteraction(key) {
  interactionMap.delete(key);
}

/**
 * Removes a placeholder from an interaction.
 *
 * @param {string} key - The key identifying the interaction.
 * @param {string} placeholderKey - The key identifying the placeholder to be removed.
 */
function removePlaceholder(key, placeholderKey) {
  const interaction = interactionMap.get(key);
  if (interaction) {
    interaction.delete(placeholderKey);
  }
}

/**
 * Checks if an interaction is active in the tracker.
 *
 * @param {string} key - The key identifying the interaction.
 * @returns {boolean} - True if the interaction is active, false otherwise.
 */
function isInteractionActive(key) {
  return interactionMap.has(key);
}

export const HeroPendingPlaceholderTracker = {
  addInteraction,
  addPlaceholder,
  dump,
  isInteractionActive,
  removeInteraction,
  removePlaceholder,
};

/**
const g = new Map();

function a(a) {
  g.has(a) || g.set(a, new Map());
}

function b(a, b, c, d, e) {
  a = g.get(a);
  a &&
    a.set(b, {
      description: c,
      startTime: d,
      pageletStack: e,
    });
}
function c(a) {
  a = g.get(a);
  return a ? Array.from(a.values()) : [];
}
function d(a) {
  g['delete'](a);
}
function e(a, b) {
  a = g.get(a);
  a && a['delete'](b);
}
function h(a) {
  return g.has(a);
}

 */
