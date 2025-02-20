/* eslint-disable no-sequences */
/* eslint-disable no-eq-null */
/* eslint-disable max-params */
/* eslint-disable no-var */
/* eslint-disable no-inner-declarations */
/* eslint-disable complexity */
/* eslint-disable no-undef */

__d(
  'BaseRowItem.react',
  ['BaseRowContext', 'BaseView.react', 'react', 'react-compiler-runtime', 'react-forget-runtime'],
  (a, b, c, d, e, f, g) => {
    let h;
    let i = h || (h = d('react'));
    h.useContext;
    let j = {
      expanding: {
        flexBasis: 'x1r8uery',
        flexGrow: 'x1iyjqo2',
        flexShrink: 'xs83m0k',
        $$css: !0,
      },
      expandingWithWrap: {
        flexBasis: 'x1l7klhg',
        $$css: !0,
      },
      item: {
        display: 'x78zum5',
        flexDirection: 'xdt5ytf',
        flexShrink: 'x2lah0s',
        maxWidth: 'x193iq5w',
        minWidth: 'xeuugli',
        $$css: !0,
      },
      item_DEPRECATED: {
        maxWidth: 'x193iq5w',
        minWidth: 'xeuugli',
        $$css: !0,
      },
    };
    let k = {
      0: {
        flexBasis: 'xdl72j9',
        $$css: !0,
      },
      1: {
        flexBasis: 'x1l7klhg',
        $$css: !0,
      },
      2: {
        flexBasis: 'x4pfjvb',
        $$css: !0,
      },
      3: {
        flexBasis: 'x1j0tr4d',
        $$css: !0,
      },
      4: {
        flexBasis: 'xhnlq4v',
        $$css: !0,
      },
      5: {
        flexBasis: 'x15foiic',
        $$css: !0,
      },
      6: {
        flexBasis: 'x10r0anl',
        $$css: !0,
      },
      7: {
        flexBasis: 'xarxvua',
        $$css: !0,
      },
      8: {
        flexBasis: 'xvuwby9',
        $$css: !0,
      },
      9: {
        flexBasis: 'xoy383a',
        $$css: !0,
      },
      10: {
        flexBasis: 'x3cfelu',
        $$css: !0,
      },
    };
    let l = {
      bottom: {
        alignSelf: 'xpvyfi4',
        $$css: !0,
      },
      center: {
        alignSelf: 'xamitd3',
        $$css: !0,
      },
      stretch: {
        alignSelf: 'xkh2ocl',
        $$css: !0,
      },
      top: {
        alignSelf: 'xqcrz7y',
        $$css: !0,
      },
    };
    b = i.forwardRef(a);
    function a(a, b) {
      let e = d('react-compiler-runtime').c(19);
      let f;
      e[0] !== a ? ((f = babelHelpers['extends']({}, a)), (e[0] = a), (e[1] = f)) : (f = e[1]);
      let g;
      let h;
      let n;
      let o;
      if (e[2] !== f) {
        a = f;
        g = a.expanding;
        h = a.useDeprecatedStyles;
        n = a.verticalAlign;
        o = a.xstyle;
        a = babelHelpers.objectWithoutPropertiesLoose(a, [
          'expanding',
          'useDeprecatedStyles',
          'verticalAlign',
          'xstyle',
        ]);
        e[2] = f;
        e[3] = a;
        e[4] = g;
        e[5] = h;
        e[6] = n;
        e[7] = o;
      } else (a = e[3]), (g = e[4]), (h = e[5]), (n = e[6]), (o = e[7]);
      f = g === void 0 ? !1 : g;
      g = h === void 0 ? !1 : h;
      h = d('react-forget-runtime').useContextWithBailoutExperiment__unstable(c('BaseRowContext'), m);
      let p = h.columns;
      h = h.wrap;
      g = g ? j.item_DEPRECATED : j.item;
      let q = f && j.expanding;
      f = f && h !== 'none' && j.expandingWithWrap;
      h = p > 0 && k[p];
      p = n != null && l[n];
      e[8] !== g || e[9] !== q || e[10] !== f || e[11] !== h || e[12] !== p || e[13] !== o
        ? ((n = [g, q, f, h, p, o]),
          (e[8] = g),
          (e[9] = q),
          (e[10] = f),
          (e[11] = h),
          (e[12] = p),
          (e[13] = o),
          (e[14] = n))
        : (n = e[14]);
      e[15] !== a || e[16] !== b || e[17] !== n
        ? ((g = i.jsx(
            c('BaseView.react'),
            babelHelpers['extends']({}, a, {
              ref: b,
              xstyle: n,
            }),
          )),
          (e[15] = a),
          (e[16] = b),
          (e[17] = n),
          (e[18] = g))
        : (g = e[18]);
      return g;
    }
    function m(a) {
      return [a.columns, a.wrap];
    }
    e = b;
    g['default'] = e;
  },
  98,
);
