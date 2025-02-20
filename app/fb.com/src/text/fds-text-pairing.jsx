/* eslint-disable */
__d(
  'FDSTextPairing.react',
  ['CometHeadlineWithAddOn.react', 'FDSText.react', 'getFDSTextHierarchyStyle', 'react', 'stylex'],
  (a, b, c, d, e, f, g) => {
    let h;
    let i;
    let j = i || d('react');
    let k = {
      item: {
        marginBottom: 'xu06os2',
        marginTop: 'x1ok221b',
        $$css: !0,
      },
      root: {
        display: 'x78zum5',
        flexDirection: 'xdt5ytf',
        marginBottom: 'xz62fqu',
        marginTop: 'x16ldp7u',
        $$css: !0,
      },
    };
    let l = {
      1: {
        marginBottom: 'x11tup63',
        marginTop: 'x16z1lm9',
        $$css: !0,
      },
      2: {
        marginBottom: 'x4cne27',
        marginTop: 'xifccgj',
        $$css: !0,
      },
      3: {
        $$css: !0,
      },
      4: {
        $$css: !0,
      },
      entityHeader1: {
        marginBottom: 'x1wsgfga',
        marginTop: 'x9otpla',
        $$css: !0,
      },
      entityHeader2: {
        marginBottom: 'x1wsgfga',
        marginTop: 'x9otpla',
        $$css: !0,
      },
    };
    let m = {
      1: {
        marginBottom: 'xwoyzhm',
        marginTop: 'x1rhet7l',
        $$css: !0,
      },
      2: {
        marginBottom: 'xzueoph',
        marginTop: 'x1k70j0n',
        $$css: !0,
      },
      3: {
        $$css: !0,
      },
      4: {
        $$css: !0,
      },
      entityHeader1: {
        marginBottom: 'x1e56ztr',
        marginTop: 'x1xmf6yo',
        $$css: !0,
      },
      entityHeader2: {
        marginBottom: 'x1e56ztr',
        marginTop: 'x1xmf6yo',
        $$css: !0,
      },
    };
    function a(a) {
      let b = a.body;
      let d = a.bodyColor;
      d = d === void 0 ? 'primary' : d;
      let e = a.bodyId;
      let f = a.bodyLineLimit;
      let g = a.bodyRef;
      let i = a.bodyTruncationTooltip;
      let n = a.dir;
      n = n === void 0 ? 'auto' : n;
      let o = a.headline;
      let p = a.headlineAddOn;
      let q = a.headlineColor;
      q = q === void 0 ? 'primary' : q;
      let r = a.headlineId;
      let s = a.headlineLineLimit;
      let t = a.headlineRef;
      let u = a.headlineTruncationTooltip;
      let v = a.isPrimaryHeading;
      let w = a.isSemanticHeading;
      let x = a.level;
      let y = a.meta;
      let z = a.metaColor;
      z = z === void 0 ? 'secondary' : z;
      let A = a.metaId;
      let B = a.metaLineLimit;
      let C = a.metaLocation;
      C = C === void 0 ? 'below' : C;
      let D = a.metaRef;
      let E = a.metaTestID;
      E = a.metaTruncationTooltip;
      let F = a.reduceEmphasis;
      F = F === void 0 ? !1 : F;
      let G = a.testid;
      G = a.textAlign;
      a = G === void 0 ? 'start' : G;
      G = c('getFDSTextHierarchyStyle')(x, F);
      F = G.bodyType;
      let H = G.headlineType;
      G = G.metaType;
      let I = (h || (h = c('stylex')))(k.item, m[x]);
      p =
        o != null &&
        j.jsx('div', {
          className: I,
          children:
            p != null
              ? j.jsx(c('CometHeadlineWithAddOn.react'), {
                  addOn: p,
                  color: q,
                  headlineRef: t,
                  id: r,
                  isPrimaryHeading: v,
                  isSemanticHeading: w,
                  numberOfLines: s,
                  truncationTooltip: u,
                  type: H,
                  children: o,
                })
              : j.jsx(c('FDSText.react'), {
                  align: a,
                  color: q,
                  dir: n,
                  id: r,
                  isPrimaryHeading: v,
                  isSemanticHeading: w,
                  numberOfLines: s,
                  ref: t,
                  truncationTooltip: u,
                  type: H,
                  children: o,
                }),
        });
      q =
        y != null &&
        j.jsx('div', {
          className: I,
          children: j.jsx(c('FDSText.react'), {
            align: a,
            color: z,
            dir: n,
            id: A,
            isSemanticHeading: !1,
            numberOfLines: B,
            ref: D,
            testid: void 0,
            truncationTooltip: E,
            type: G,
            children: y,
          }),
        });
      return j.jsxs('div', {
        className: h(k.root, l[x]),
        'data-testid': void 0,
        children: [
          C === 'above' && q,
          p,
          b != null &&
            j.jsx('div', {
              className: I,
              children: j.jsx(c('FDSText.react'), {
                align: a,
                color: d,
                dir: n,
                id: e,
                isSemanticHeading: !1,
                numberOfLines: f,
                ref: g,
                truncationTooltip: i,
                type: F,
                children: b,
              }),
            }),
          C === 'below' && q,
        ],
      });
    }
    a.displayName = a.name + ' [from ' + f.id + ']';
    g['default'] = a;
  },
  98,
);
