class Rectangle {
  constructor() {
    this.bottom = 0;
    this.height = 0;
    this.left = 0;
    this.right = 0;
    this.top = 0;
    this.width = 0;
    this.x = 0;
    this.y = 0;
  }

  static fromRect(rectData) {
    rectData = rectData || {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    };

    const c = rectData.height || 0;
    const d = rectData.width || 0;
    const e = rectData.x || 0;
    const b = rectData.y || 0;

    const f = new Rectangle();
    f.x = e;
    f.y = b;
    f.width = d;
    f.height = c;
    f.top = b;
    f.bottom = b + c;
    f.right = e + d;
    f.left = e;
    return f;
  }
}

const b = typeof window !== 'undefined' && 'DOMRectReadOnly' in window;

const c = b ? window.DOMRectReadOnly.fromRect : undefined;

const d = !!c && typeof c === 'function';

export const DOMRectReadOnly = d ? window.DOMRectReadOnly : Rectangle;
