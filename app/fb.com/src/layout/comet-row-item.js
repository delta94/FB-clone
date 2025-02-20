/* eslint-disable no-sequences */
/* eslint-disable no-self-assign */
/* eslint-disable no-eq-null */
/* eslint-disable max-params */
/* eslint-disable no-var */
/* eslint-disable no-inner-declarations */
/* eslint-disable complexity */
/* eslint-disable no-undef */

__d(
  'CometRowItem.react',
  [
    'BaseRowItem.react',
    'CometErrorBoundary.react',
    'CometPlaceholder.react',
    'CometRowContext',
    'react',
    'react-compiler-runtime',
  ],
  (a, b, c, d, e, f, g) => {
    let h;
    let i = h || (h = d('react'));
    let j = h.useContext;
    let k = {
      4: {
        paddingEnd: 'xg83lxy',
        paddingStart: 'x1h0ha7o',
        $$css: !0,
      },
      8: {
        paddingEnd: 'x150jy0e',
        paddingStart: 'x1e558r4',
        $$css: !0,
      },
      12: {
        paddingEnd: 'xsyo7zv',
        paddingStart: 'x16hj40l',
        $$css: !0,
      },
      16: {
        paddingEnd: 'x1sxyh0',
        paddingStart: 'xurb0ha',
        $$css: !0,
      },
      24: {
        paddingEnd: 'xn6708d',
        paddingStart: 'x1ye3gou',
        $$css: !0,
      },
      32: {
        paddingEnd: 'x1pi30zi',
        paddingStart: 'x1swvt13',
        $$css: !0,
      },
    };
    let l = {
      4: {
        paddingBottom: 'x1120s5i',
        paddingTop: 'x1nn3v0j',
        $$css: !0,
      },
      8: {
        paddingBottom: 'xjkvuk6',
        paddingTop: 'x1iorvi4',
        $$css: !0,
      },
      12: {
        paddingBottom: 'x10b6aqq',
        paddingTop: 'x1yrsyyn',
        $$css: !0,
      },
      16: {
        paddingBottom: 'xwib8y2',
        paddingTop: 'x1y1aw1k',
        $$css: !0,
      },
      24: {
        paddingBottom: 'xsag5q8',
        paddingTop: 'xz9dl7a',
        $$css: !0,
      },
      32: {
        paddingBottom: 'x1l90r2v',
        paddingTop: 'xyamay9',
        $$css: !0,
      },
    };
    let m = i.forwardRef(a);
    function a(a, b) {
      let e = d('react-compiler-runtime').c(44);
      let f;
      e[0] !== a ? ((f = babelHelpers['extends']({}, a)), (e[0] = a), (e[1] = f)) : (f = e[1]);
      a = (a = j(c('CometRowContext'))) != null ? a : {};
      let g = a.spacingHorizontal;
      a = a.spacingVertical;
      let h;
      let n;
      if (e[2] !== f) {
        var o = f;
        h = o.fallback;
        n = o.placeholder;
        o = babelHelpers.objectWithoutPropertiesLoose(o, ['fallback', 'placeholder']);
        e[2] = f;
        e[3] = h;
        e[4] = o;
        e[5] = n;
      } else (h = e[3]), (o = e[4]), (n = e[5]);
      if (n !== void 0) {
        if (e[6] !== f) {
          var p = f;
          p.placeholder;
          p = babelHelpers.objectWithoutPropertiesLoose(p, ['placeholder']);
          p = p;
          e[6] = f;
          e[7] = p;
        } else p = e[7];
        var q;
        e[8] !== p || e[9] !== n || e[10] !== b
          ? ((q =
              n != null
                ? i.jsx(
                    m,
                    babelHelpers['extends']({}, p, {
                      ref: b,
                      children: n,
                    }),
                  )
                : null),
            (e[8] = p),
            (e[9] = n),
            (e[10] = b),
            (e[11] = q))
          : (q = e[11]);
        e[12] !== p || e[13] !== b
          ? ((n = i.jsx(
              m,
              babelHelpers['extends']({}, p, {
                ref: b,
              }),
            )),
            (e[12] = p),
            (e[13] = b),
            (e[14] = n))
          : (n = e[14]);
        e[15] !== q || e[16] !== n
          ? ((p = i.jsx(c('CometPlaceholder.react'), {
              fallback: q,
              children: n,
            })),
            (e[15] = q),
            (e[16] = n),
            (e[17] = p))
          : (p = e[17]);
        return p;
      }
      if (h !== void 0) {
        let r;
        if (e[18] !== f) {
          q = f;
          q.fallback;
          n = babelHelpers.objectWithoutPropertiesLoose(q, ['fallback']);
          r = n;
          e[18] = f;
          e[19] = r;
        } else r = e[19];
        if (h === null) {
          e[20] !== r || e[21] !== b
            ? ((p = i.jsx(c('CometErrorBoundary.react'), {
                children: i.jsx(
                  m,
                  babelHelpers['extends']({}, r, {
                    ref: b,
                  }),
                ),
              })),
              (e[20] = r),
              (e[21] = b),
              (e[22] = p))
            : (p = e[22]);
          return p;
        }
        e[23] !== h || e[24] !== r || e[25] !== b
          ? ((q = function (a, c) {
              return i.jsx(
                m,
                babelHelpers['extends']({}, r, {
                  ref: b,
                  children: typeof h === 'function' ? h(a, c) : h,
                }),
              );
            }),
            (e[23] = h),
            (e[24] = r),
            (e[25] = b),
            (e[26] = q))
          : (q = e[26]);
        e[27] !== r || e[28] !== b
          ? ((n = i.jsx(
              m,
              babelHelpers['extends']({}, r, {
                ref: b,
              }),
            )),
            (e[27] = r),
            (e[28] = b),
            (e[29] = n))
          : (n = e[29]);
        e[30] !== q || e[31] !== n
          ? ((f = i.jsx(c('CometErrorBoundary.react'), {
              fallback: q,
              children: n,
            })),
            (e[30] = q),
            (e[31] = n),
            (e[32] = f))
          : (f = e[32]);
        return f;
      }
      p = k[g];
      q = l[a];
      e[33] !== o.xstyle || e[34] !== p || e[35] !== q
        ? ((n = [p, q, o.xstyle]), (e[33] = o.xstyle), (e[34] = p), (e[35] = q), (e[36] = n))
        : (n = e[36]);
      e[37] !== o.children
        ? ((f = i.jsx(c('CometRowContext').Provider, {
            value: null,
            children: o.children,
          })),
          (e[37] = o.children),
          (e[38] = f))
        : (f = e[38]);
      e[39] !== o || e[40] !== b || e[41] !== n || e[42] !== f
        ? ((g = i.jsx(
            c('BaseRowItem.react'),
            babelHelpers['extends']({}, o, {
              ref: b,
              useDeprecatedStyles: o.useDeprecatedStyles,
              xstyle: n,
              children: f,
            }),
          )),
          (e[39] = o),
          (e[40] = b),
          (e[41] = n),
          (e[42] = f),
          (e[43] = g))
        : (g = e[43]);
      return g;
    }
    b = m;
    g['default'] = b;
  },
  98,
);
