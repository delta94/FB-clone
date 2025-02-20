class _SVGIcon {
  constructor(component) {
    this.component = component;
  }
}

function svgIcon(component) {
  return new _SVGIcon(component);
}

class EmojiIcon {
  constructor(codepoints, component) {
    this.codepoints = codepoints;
    this.component = component;
  }
}

class LegacySVGIcon {
  constructor(component) {
    this.component = component;
  }
}

function legacySVGIcon(component) {
  return new LegacySVGIcon(component);
}

// let SVGIcon = function (a) {
//   this.component = a;
// };

// function svgIcon(a) {
//   return new SVGIcon(a);
// }

// const EmojiIcon = function (a, b) {
//   this.codepoints = a;
//   this.component = b;
// };

// let LegacySVGIcon = function (a) {
//   this.component = a;
// };

// function legacySVGIcon(a) {
//   return new LegacySVGIcon(a);
// }

export const SVGIcon = {
  EmojiIcon,
  LegacySVGIcon,
  SVGIcon: _SVGIcon,
  legacySVGIcon,
  svgIcon,
};
