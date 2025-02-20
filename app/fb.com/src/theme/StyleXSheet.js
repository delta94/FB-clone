import { invariant } from '@fb-error/invariant';
import Locale from 'fbjs/lib/Locale';

const LIGHT_MODE_CLASS_NAME = '__fb-light-mode';
const DARK_MODE_CLASS_NAME = '__fb-dark-mode';

/**
 * Take a theme and generate it's accompanying CSS variables
 */
function buildTheme(selector, theme) {
  const lines = [];
  lines.push(`${selector} {`);

  // eslint-disable-next-line guard-for-in
  for (const key in theme) {
    const value = theme[key];
    lines.push(`  --${key}: ${value};`);
  }

  lines.push('}');

  return lines.join('\n');
}

/**
 * Create a <style> tag and add it to the head.
 */
function makeStyleTag() {
  const tag = document.createElement('style');
  tag.setAttribute('type', 'text/css');
  tag.setAttribute('data-stylex', 'true');

  const head = document.head || document.getElementsByTagName('head')[0];
  head || invariant(0, 2655);
  head.appendChild(tag);

  return tag;
}

/**
 * Check if the browser supports CSS variables
 */
function doesSupportCSSVariables() {
  return window.CSS && window.CSS.supports && window.CSS.supports('--fake-var:0');
}

// Regex to replace var(--foo) with an inlined version
const VARIABLE_MATCH = /var\(--(.*?)\)/g;

/**
 * This class manages the CSS stylesheet for the page and the injection of new
 * CSS rules.
 */

export class StyleXSheet {
  static LIGHT_MODE_CLASS_NAME = LIGHT_MODE_CLASS_NAME;
  static DARK_MODE_CLASS_NAME = DARK_MODE_CLASS_NAME;

  constructor(opts) {
    this.tag = null;
    this.injected = false;
    this.ruleForPriority = new Map();
    this.rules = [];
    this.rootTheme = opts.rootTheme;
    this.rootDarkTheme = opts.rootDarkTheme;
    //
    this.isSlow =
      opts.isSlow ??
      // eslint-disable-next-line no-restricted-globals
      (typeof location === 'object' && typeof location.search === 'string'
        ? // eslint-disable-next-line no-restricted-globals
          location.search.includes('stylex-slow')
        : false);
    this.supportsVariables = opts.supportsVariables ?? doesSupportCSSVariables();

    this.$1 = Locale.isRTL();
    this.externalRules = new Set();
  }

  getVariableMatch() {
    return VARIABLE_MATCH;
  }

  /**
   * Check if we have don't have access to the dom
   */
  isHeadless() {
    return !this.tag || !window?.document?.body;
  }

  /**
   * Get the stylesheet tag. Throw if none exists.
   */
  getTag() {
    const { tag } = this;
    tag || invariant(0, 11103);
    return tag;
  }

  /**
   * Get the current stylesheet CSS.
   */
  getCSS() {
    return this.rules.join('\n');
  }

  /**
   * Get the position of the rule in the stylesheet.
   */
  getRulePosition(rule) {
    return this.rules.indexOf(rule);
  }

  /**
   * Count of the current rules in the stylesheet. Used in tests.
   */
  getRuleCount() {
    return this.rules.length;
  }

  /**
   * Inject a style tag into the document head
   */
  inject() {
    if (this.injected) {
      return;
    }

    this.injected = true;

    // Running in a server environment
    if (!window.document?.body) {
      this.injectTheme();
      return;
    }

    // Create style tag if in browser
    this.tag = makeStyleTag();
    this.injectTheme();
  }

  /**
   * Inject the theme styles
   */
  injectTheme() {
    if (this.rootTheme) {
      this.insert(buildTheme(`:root, .${LIGHT_MODE_CLASS_NAME}`, this.rootTheme), 0);
    }
    if (this.rootDarkTheme) {
      this.insert(buildTheme(`.${DARK_MODE_CLASS_NAME}:root, .${DARK_MODE_CLASS_NAME}`, this.rootDarkTheme), 0);
    }
  }

  /**
   * Inject custom theme styles (only for internal testing)
   */
  __injectCustomThemeForTesting(selector, theme) {
    if (theme) {
      this.insert(buildTheme(selector, theme), 0);
    }
  }

  /**
   * Delete the requested rule from the stylesheet
   */
  delete(rule) {
    // Get the index of this rule
    const index = this.rules.indexOf(rule);
    invariant(index >= 0, "Couldn't find the index for rule %s", rule);

    // Remove the rule from our index
    this.rules.splice(index, 1);

    if (this.isHeadless()) {
      return;
    }

    const tag = this.getTag();
    const sheet = tag.sheet;
    sheet || invariant(0, 2657);
    sheet.deleteRule(index);
  }

  /**
   *
   */
  normalizeRule(rule) {
    const { rootTheme } = this;
    if (this.supportsVariables || !rootTheme) {
      return rule;
    }

    return rule.replace(VARIABLE_MATCH, (_match, name) => {
      return rootTheme[name];
    });
  }

  /**
   * Get the rule position a rule should be inserted at according to the
   * specified priority.
   */
  getInsertPositionForPriority(priority) {
    // If there's an end rule associated with this priority, then get the next
    // rule which will belong to the next priority
    // The rule will be inserted before it and assigned to the current priority
    const priorityRule = this.ruleForPriority.get(priority);
    if (priorityRule) {
      return this.rules.indexOf(priorityRule) + 1;
    }

    // If we've never created this priority before, then let's find the highest
    // priority to target
    const priorities = Array.from(this.ruleForPriority.keys())
      .sort((a, b) => b - a)
      .filter((num) => (num > priority ? 1 : 0));

    // If there's no priorities then place us at the start
    if (priorities.length === 0) {
      return this.getRuleCount();
    }

    // Place us next to the next highest priority
    const lastPriority = priorities.pop();
    return this.rules.indexOf(this.ruleForPriority.get(lastPriority));
  }

  /**
   * Insert a rule into the stylesheet.
   */
  insert(rawLTRRule, priority, rawRTLRule) {
    // Inject the stylesheet if it hasn't already been
    if (this.injected === false) {
      this.inject();
    }

    if (rawRTLRule) {
      this.insert(addAncestorSelector(rawLTRRule, "html:not([dir='rtl'])"), priority);
      this.insert(addAncestorSelector(rawRTLRule, "html[dir='rtl']"), priority);
      return;
    }

    const rawRule = rawLTRRule;

    // Don't insert this rule if it already exists
    if (this.rules.includes(rawRule)) {
      return;
    }

    const rule = this.normalizeRule(addSpecificityLevel(rawRule, Math.floor(priority / 1000)));

    // Get the position where we should insert the rule
    const insertPos = this.getInsertPositionForPriority(priority);
    this.rules.splice(insertPos, 0, rule);

    // Set this rule as the end of the priority group
    this.ruleForPriority.set(priority, rule);

    if (this.isHeadless()) {
      return;
    }

    const tag = this.getTag();
    const sheet = tag.sheet;

    if (sheet) {
      try {
        sheet.insertRule(rule, Math.min(insertPos, sheet.cssRules.length));
      } catch (err) {
        console.error('insertRule error', err, rule, insertPos);
      }
    }
    // Ignore the case where sheet == null. It's an edge-case Edge 17 bug.
  }
}

/**
 * Adds an ancestor selector in a media-query-aware way.
 */
function addAncestorSelector(selector, ancestorSelector) {
  if (!selector.startsWith('@')) {
    return `${ancestorSelector} ${selector}`;
  }

  const firstBracketIndex = selector.indexOf('{');
  const mediaQueryPart = selector.slice(0, firstBracketIndex + 1);
  const rest = selector.slice(firstBracketIndex + 1);
  return `${mediaQueryPart}${ancestorSelector} ${rest}`;
}

/**
 * Adds :not(#\#) to bump up specificity. as a polyfill for @layer
 */
function addSpecificityLevel(selector, index) {
  if (selector.startsWith('@keyframes')) {
    return selector;
  }
  const pseudo = Array.from({ length: index })
    .map(() => ':not(#\\#)')
    .join('');

  const lastOpenCurly = selector.includes('::') ? selector.indexOf('::') : selector.lastIndexOf('{');
  const beforeCurly = selector.slice(0, lastOpenCurly);
  const afterCurly = selector.slice(lastOpenCurly);

  return `${beforeCurly}${pseudo}${afterCurly}`;
}
