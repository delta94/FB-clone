import React from 'react';

class XPlatReactToasterView extends React.PureComponent {
  static defaultProps = {
    maxVisible: 1,
  };

  constructor(props) {
    super(props);
    this.state = {
      visibleToasts: [],
    };
  }

  static getDerivedStateFromProps = function (a, b) {
    b = b ? b.visibleToasts.slice(0, a.maxVisible) : [];
    let c = 0;
    let d = a.filterToasts;
    let e = a.toasterState;
    let f = {};
    let g = d
      ? // eslint-disable-next-line array-callback-return
        Object.keys(e).filter((b) => {
          let c;
          let g = e[b];
          f[b] = g;
          let h = !g ? void 0 : g.shown;
          c = !g ? void 0 : !(c = g.value) ? void 0 : !(c = c.type) ? void 0 : c.name;
          if (!g || !c) {
            return !0;
          }
          if (d.has(c) && !h) {
            a.onExpireToast(b);
            return !1;
          }
        })
      : Object.keys(e);
    let h = b.reduce((a, b) => {
      b && a.add(b.id);
      return a;
    }, new Set());
    let i = 0;
    while (c < a.maxVisible) {
      let j = b[c];
      let k = Object.keys(f).length > 0 ? f : a.toasterState;
      if (j) {
        k = Object.prototype.hasOwnProperty.call(k, j.id);
        if (k) {
          k = e[j.id];
          b[c] = {
            expired: k.expired,
            id: k.id,
            toast: k.value,
          };
          c++;
          continue;
        } else b[c] = null;
      }
      j = null;
      while (!j && i < g.length) {
        k = g[i++];
        let l = h.has(k);
        l || (j = a.toasterState[k]);
      }
      j &&
        (b[c] = {
          expired: j.expired,
          id: j.id,
          toast: j.value,
        });
      c++;
    }
    return {
      visibleToasts: b,
    };
  };

  render() {
    return (
      <>
        {this.state.visibleToasts.map((visibleToast, index) =>
          visibleToast ? this.props.children(visibleToast.toast, visibleToast.id, visibleToast.expired, index) : null,
        )}
      </>
    );
  }
}

export { XPlatReactToasterView };
