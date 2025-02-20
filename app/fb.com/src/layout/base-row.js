/* eslint-disable max-params */
/* eslint-disable no-var */
/* eslint-disable no-inner-declarations */
/* eslint-disable complexity */
/* eslint-disable no-undef */
__d(
  'BaseRow.react',
  ['BaseRowContext', 'BaseView.react', 'react', 'react-compiler-runtime', 'useBaseRowA11yWrap', 'useMergeRefs'],
  (a, b, c, d, e, f, g) => {
    let h;
    let i = h || (h = d('react'));
    h.useMemo;
    let j = {
      expanding: {
        flexBasis: 'x1r8uery',
        flexGrow: 'x1iyjqo2',
        flexShrink: 'xs83m0k',
        minWidth: 'xeuugli',
        $$css: !0,
      },
      row: {
        display: 'x78zum5',
        flexShrink: 'x2lah0s',
        position: 'x1n2onr6',
        $$css: !0,
      },
    };
    let k = {
      center: {
        justifyContent: 'xl56j7k',
        $$css: !0,
      },
      end: {
        justifyContent: 'x13a6bvl',
        $$css: !0,
      },
      justify: {
        justifyContent: 'x1qughib',
        $$css: !0,
      },
      start: {
        justifyContent: 'x1nhvcw1',
        $$css: !0,
      },
    };
    let l = {
      bottom: {
        alignItems: 'xuk3077',
        $$css: !0,
      },
      center: {
        alignItems: 'x6s0dn4',
        $$css: !0,
      },
      stretch: {
        alignItems: 'x1qjc9v5',
        $$css: !0,
      },
      top: {
        alignItems: 'x1cy8zhl',
        $$css: !0,
      },
    };
    let m = {
      backward: {
        flexDirection: 'x15zctf7',
        $$css: !0,
      },
      forward: {
        flexDirection: 'x1q0g3np',
        $$css: !0,
      },
    };
    let n = {
      backward: {
        flexWrap: 'x8hhl5t',
        $$css: !0,
      },
      forward: {
        flexWrap: 'x1a02dak',
        $$css: !0,
      },
      none: {
        flexWrap: 'xozqiw3',
        $$css: !0,
      },
    };
    let o = {
      end: 'start',
      start: 'end',
    };
    b = i.forwardRef(a);
    function a(a, b) {
      let e = d('react-compiler-runtime').c(34);
      let f;
      let g;
      let h;
      let p;
      let q;
      let r;
      let s;
      let t;
      let u;
      let v;
      e[0] !== a
        ? ((p = a.align),
          (f = a.children),
          (q = a.columns),
          (r = a.direction),
          (s = a.expanding),
          (h = a.role),
          (t = a.verticalAlign),
          (u = a.wrap),
          (v = a.xstyle),
          (g = babelHelpers.objectWithoutPropertiesLoose(a, [
            'align',
            'children',
            'columns',
            'direction',
            'expanding',
            'role',
            'verticalAlign',
            'wrap',
            'xstyle',
          ])),
          (e[0] = a),
          (e[1] = f),
          (e[2] = g),
          (e[3] = h),
          (e[4] = p),
          (e[5] = q),
          (e[6] = r),
          (e[7] = s),
          (e[8] = t),
          (e[9] = u),
          (e[10] = v))
        : ((f = e[1]),
          (g = e[2]),
          (h = e[3]),
          (p = e[4]),
          (q = e[5]),
          (r = e[6]),
          (s = e[7]),
          (t = e[8]),
          (u = e[9]),
          (v = e[10]));
      a = p === void 0 ? 'justify' : p;
      p = q === void 0 ? 0 : q;
      q = r === void 0 ? 'forward' : r;
      r = s === void 0 ? !1 : s;
      s = t === void 0 ? 'stretch' : t;
      t = u === void 0 ? 'none' : u;
      e[11] !== p || e[12] !== t
        ? ((u = {
            columns: p,
            wrap: t,
          }),
          (e[11] = p),
          (e[12] = t),
          (e[13] = u))
        : (u = e[13]);
      p = u;
      u = p;
      p = c('useBaseRowA11yWrap')(q === 'forward' && t === 'backward');
      let w = p[0];
      p = p[1];
      b = c('useMergeRefs')(b, p);
      p = f;
      if (q === 'forward' && t === 'backward' && w && Array.isArray(f) && f.length === 2) {
        var x = f;
        var y = x[0];
        x = x[1];
        var z;
        e[14] !== y || e[15] !== x ? ((z = [x, y]), (e[14] = y), (e[15] = x), (e[16] = z)) : (z = e[16]);
        p = z;
      }
      y = r && j.expanding;
      x = k[q === 'backward' && (a === 'start' || a === 'end') ? o[a] : a];
      z = l[s];
      r = n[t];
      a = w && q === 'forward' && t === 'backward' && Array.isArray(f) && f.length === 2 && n.forward;
      s = m[q];
      e[17] !== x || e[18] !== z || e[19] !== r || e[20] !== a || e[21] !== s || e[22] !== y || e[23] !== v
        ? ((w = [j.row, y, x, z, r, a, s, v]),
          (e[17] = x),
          (e[18] = z),
          (e[19] = r),
          (e[20] = a),
          (e[21] = s),
          (e[22] = y),
          (e[23] = v),
          (e[24] = w))
        : (w = e[24]);
      e[25] !== p || e[26] !== u
        ? ((t = i.jsx(c('BaseRowContext').Provider, {
            value: u,
            children: p,
          })),
          (e[25] = p),
          (e[26] = u),
          (e[27] = t))
        : (t = e[27]);
      e[28] !== b || e[29] !== g || e[30] !== h || e[31] !== w || e[32] !== t
        ? ((f = i.jsx(
            c('BaseView.react'),
            babelHelpers['extends']({}, g, {
              ref: b,
              role: h,
              xstyle: w,
              children: t,
            }),
          )),
          (e[28] = b),
          (e[29] = g),
          (e[30] = h),
          (e[31] = w),
          (e[32] = t),
          (e[33] = f))
        : (f = e[33]);
      return f;
    }
    e = b;
    g['default'] = e;
  },
  98,
);
