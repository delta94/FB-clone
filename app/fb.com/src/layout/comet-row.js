/* eslint-disable no-eq-null */
/* eslint-disable max-params */

/* eslint-disable no-undef */
__d(
  'CometRow.react',
  ['BaseRow.react', 'CometColumnContext', 'CometColumnItem.react', 'CometRowContext', 'CometRowItem.react', 'react'],
  (a, b, c, d, e, f, g) => {
    let h;
    let i = h || (h = d('react'));
    b = h;
    let j = b.useContext;
    let k = b.useMemo;
    let l = {
      4: {
        paddingEnd: 'x150jy0e',
        paddingStart: 'x1e558r4',
        $$css: !0,
      },
      8: {
        paddingEnd: 'x1sxyh0',
        paddingStart: 'xurb0ha',
        $$css: !0,
      },
      12: {
        paddingEnd: 'xn6708d',
        paddingStart: 'x1ye3gou',
        $$css: !0,
      },
      16: {
        paddingEnd: 'x1pi30zi',
        paddingStart: 'x1swvt13',
        $$css: !0,
      },
    };
    let m = {
      0: {
        paddingTop: 'xexx8yu',
        $$css: !0,
      },
      4: {
        paddingTop: 'x1iorvi4',
        $$css: !0,
      },
      8: {
        paddingTop: 'x1y1aw1k',
        $$css: !0,
      },
      12: {
        paddingTop: 'xz9dl7a',
        $$css: !0,
      },
      16: {
        paddingTop: 'xyamay9',
        $$css: !0,
      },
    };
    let n = {
      4: {
        paddingBottom: 'xjkvuk6',
        paddingTop: 'x1iorvi4',
        $$css: !0,
      },
      8: {
        paddingBottom: 'xwib8y2',
        paddingTop: 'x1y1aw1k',
        $$css: !0,
      },
      12: {
        paddingBottom: 'xsag5q8',
        paddingTop: 'xz9dl7a',
        $$css: !0,
      },
      16: {
        paddingBottom: 'x1l90r2v',
        paddingTop: 'xyamay9',
        $$css: !0,
      },
    };
    let o = {
      4: {
        marginEnd: 'xwrv7xz',
        marginStart: 'x8182xy',
        $$css: !0,
      },
      8: {
        marginEnd: 'xcud41i',
        marginStart: 'x139jcc6',
        $$css: !0,
      },
      12: {
        marginEnd: 'xykv574',
        marginStart: 'xbmpl8g',
        $$css: !0,
      },
      16: {
        marginEnd: 'x1n0m28w',
        marginStart: 'xp7jhwk',
        $$css: !0,
      },
      24: {
        marginEnd: 'x12rz0ws',
        marginStart: 'x16hk5td',
        $$css: !0,
      },
      32: {
        marginEnd: 'x19f6ikt',
        marginStart: 'x169t7cy',
        $$css: !0,
      },
    };
    let p = {
      4: {
        marginBottom: 'xmgb6t1',
        marginTop: 'x1kgmq87',
        $$css: !0,
      },
      8: {
        marginBottom: 'x4vbgl9',
        marginTop: 'x1rdy4ex',
        $$css: !0,
      },
      12: {
        marginBottom: 'x4cne27',
        marginTop: 'xifccgj',
        $$css: !0,
      },
      16: {
        marginBottom: 'x1wsgfga',
        marginTop: 'x9otpla',
        $$css: !0,
      },
      24: {
        marginBottom: 'xh3wvx0',
        marginTop: 'x7wgvq7',
        $$css: !0,
      },
      32: {
        marginBottom: 'x1oo3vh0',
        marginTop: 'xwya9rg',
        $$css: !0,
      },
    };
    e = i.forwardRef(a);
    function a(a, b) {
      a = babelHelpers['extends']({}, a);
      let d = j(c('CometColumnContext'));
      let e = j(c('CometRowContext'));
      let f = (d == null ? void 0 : d.paddingHorizontal) != null ? 0 : 12;
      let g = (d == null ? void 0 : d.spacing) != null ? 0 : 16;
      let h = a.children;
      let q = a.paddingHorizontal;
      f = q === void 0 ? f : q;
      q = a.paddingVertical;
      q = q === void 0 ? 0 : q;
      let r = a.paddingTop;
      g = r === void 0 ? (a.paddingVertical == null ? g : null) : r;
      r = a.spacing;
      r = r === void 0 ? 12 : r;
      let s = a.spacingHorizontal;
      let t = s === void 0 ? r : s;
      s = a.spacingVertical;
      let u = s === void 0 ? r : s;
      r = a.xstyle;
      s = babelHelpers.objectWithoutPropertiesLoose(a, [
        'children',
        'paddingHorizontal',
        'paddingVertical',
        'paddingTop',
        'spacing',
        'spacingHorizontal',
        'spacingVertical',
        'xstyle',
      ]);
      a = k(() => {
        return {
          spacingHorizontal: t,
          spacingVertical: u,
        };
      }, [t, u]);
      b = i.jsx(
        c('BaseRow.react'),
        babelHelpers['extends']({}, s, {
          ref: b,
          xstyle: [l[f], n[q], g != null && m[g], o[t], p[u], r],
          children: i.jsx(c('CometRowContext').Provider, {
            value: a,
            children: h,
          }),
        }),
      );
      if (e != null)
        return i.jsx(c('CometRowItem.react'), {
          expanding: s.expanding,
          children: b,
        });
      return d != null
        ? i.jsx(c('CometColumnItem.react'), {
            expanding: s.expanding,
            children: b,
          })
        : b;
    }
    a.displayName = a.name + ' [from ' + f.id + ']';
    d = e;
    g['default'] = d;
  },
  98,
);
