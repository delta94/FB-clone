/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* eslint-disable no-self-assign */
/* eslint-disable no-var */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-eq-null */
/* eslint-disable complexity */
__d(
  'FDSButton.react',
  [
    'BaseStyledButton.react',
    'CometGHLRenderingContext',
    'FDSIcon.react',
    'FDSText.react',
    'FDSTooltip.react',
    'react',
    'react-compiler-runtime',
    'useCometTheme',
    'useMergeRefs',
  ],
  (a, b, c, d, e, f, g) => {
    let h;
    let i = h || (h = d('react'));
    b = h;
    let j = b.useContext;
    let k = b.useRef;
    let l = {
      contentDisabled: {
        opacity: 'xuzhngd',
        $$css: !0,
      },
      darkOverlay: {
        backgroundColor: 'x18l40ae',
        color: 'x14ctfv',
        $$css: !0,
      },
      darkOverlayPressed: {
        backgroundColor: 'x1lxk4cn',
        $$css: !0,
      },
      disabled: {
        backgroundColor: 'xwcfey6',
        $$css: !0,
      },
      fadeOut: {
        opacity: 'x17kgks6',
        transitionDelay: 'x5w5eug',
        transitionDuration: 'x1g2r6go',
        transitionProperty: 'x19991ni',
        transitionTimingFunction: 'xcj1dhv',
        $$css: !0,
      },
      fdsOverrideBlack: {
        backgroundColor: 'xal61yo',
        $$css: !0,
      },
      fdsOverrideCollaborativePostCTA: {
        backgroundColor: 'x14hiurz',
        mixBlendMode: 'x1nor908',
        $$css: !0,
      },
      fdsOverrideNegative: {
        backgroundColor: 'x1ciooss',
        $$css: !0,
      },
      fdsOverridePositive: {
        backgroundColor: 'xv9rvxn',
        $$css: !0,
      },
      overlay: {
        backgroundColor: 'x14hiurz',
        $$css: !0,
      },
      overlayDeemphasized: {
        backgroundColor: 'x1f2gare',
        $$css: !0,
      },
      overlayDeemphasizedOverlayPressed: {
        backgroundColor: 'x1f2gare',
        $$css: !0,
      },
      overlayDisabled: {
        backgroundColor: 'x1ahlmzr',
        $$css: !0,
      },
      overlayOverlayPressed: {
        backgroundColor: 'xiwuv7k',
        $$css: !0,
      },
      paddingIconOnly: {
        paddingEnd: 'x1jdnuiz',
        paddingStart: 'x1x99re3',
        $$css: !0,
      },
      primary: {
        backgroundColor: 'xtvsq51',
        $$css: !0,
      },
      primaryDeemphasized: {
        backgroundColor: 'x1hr4nm9',
        $$css: !0,
      },
      primaryDeemphasizedOverlayPressed: {
        backgroundColor: 'x18z898i',
        $$css: !0,
      },
      primaryOverlayPressed: {
        backgroundColor: 'x1iutvsz',
        $$css: !0,
      },
      secondary: {
        backgroundColor: 'x1qhmfi1',
        $$css: !0,
      },
      secondaryDeemphasized: {
        backgroundColor: 'xjbqb8w',
        $$css: !0,
      },
      secondaryDeemphasizedOverlayPressed: {
        backgroundColor: 'x18z898i',
        $$css: !0,
      },
      secondaryOverlayPressed: {
        backgroundColor: 'x1iutvsz',
        $$css: !0,
      },
      sizeLarge: {
        height: 'x1fq8qgq',
        $$css: !0,
      },
      sizeMedium: {
        height: 'x1r1pt67',
        $$css: !0,
      },
    };
    let m = {
      'dark-overlay': {
        deemphasized: 'white',
        default: 'white',
        disabled: 'disabled',
      },
      overlay: {
        deemphasized: 'white',
        default: 'primary',
        disabled: 'disabled',
      },
      primary: {
        deemphasized: 'highlight',
        default: 'white',
        disabled: 'disabled',
      },
      secondary: {
        deemphasized: 'highlight',
        default: 'secondary',
        disabled: 'disabled',
      },
    };
    let n = {
      'dark-overlay': {
        deemphasized: 'white',
        default: 'white',
        disabled: 'disabled',
      },
      overlay: {
        deemphasized: 'white',
        default: 'primary',
        disabled: 'disabled',
      },
      primary: {
        deemphasized: 'highlight',
        default: 'white',
        disabled: 'disabled',
      },
      secondary: {
        deemphasized: 'highlight',
        default: 'primary',
        disabled: 'disabled',
      },
    };
    e = i.forwardRef(a);
    function a(a, b) {
      let e;
      let f = d('react-compiler-runtime').c(95);
      if (f[0] !== a) {
        var g = a.addOnPrimary;
        var h = a.addOnSecondary;
        var o = a.disabled;
        var p = a.icon;
        var q = a.id;
        var r = a.label;
        var s = a.labelIsHidden;
        var t = a.linkProps;
        var u = a.onFocusIn;
        var v = a.onFocusOut;
        var w = a.onHoverIn;
        var x = a.onHoverOut;
        var y = a.onPress;
        var z = a.onPressIn;
        var A = a.onPressOut;
        var B = a.padding;
        var C = a.reduceEmphasis;
        a.showDynamicHover;
        var D = a.size;
        var E = a.suppressHydrationWarning;
        var F = a.testid;
        var G = a.testOnly_pressed;
        var H = a.tooltip;
        var I = a.tooltipPosition;
        var J = a.type;
        var K = babelHelpers.objectWithoutPropertiesLoose(a, [
          'addOnPrimary',
          'addOnSecondary',
          'disabled',
          'icon',
          'id',
          'label',
          'labelIsHidden',
          'linkProps',
          'onFocusIn',
          'onFocusOut',
          'onHoverIn',
          'onHoverOut',
          'onPress',
          'onPressIn',
          'onPressOut',
          'padding',
          'reduceEmphasis',
          'showDynamicHover',
          'size',
          'suppressHydrationWarning',
          'testid',
          'testOnly_pressed',
          'tooltip',
          'tooltipPosition',
          'type',
        ]);
        g = g;
        h = h;
        o = o;
        p = p;
        q = q;
        r = r;
        s = s;
        t = t;
        u = u;
        v = v;
        w = w;
        x = x;
        y = y;
        z = z;
        A = A;
        B = B;
        C = C;
        D = D;
        E = E;
        F = F;
        G = G;
        H = H;
        I = I;
        J = J;
        K = K;
        f[0] = a;
        f[1] = g;
        f[2] = h;
        f[3] = K;
        f[4] = p;
        f[5] = q;
        f[6] = r;
        f[7] = t;
        f[8] = u;
        f[9] = v;
        f[10] = w;
        f[11] = x;
        f[12] = y;
        f[13] = z;
        f[14] = A;
        f[15] = o;
        f[16] = s;
        f[17] = B;
        f[18] = C;
        f[19] = D;
        f[20] = E;
        f[21] = G;
        f[22] = I;
        f[23] = J;
        f[24] = F;
        f[25] = H;
      } else
        (g = f[1]),
          (h = f[2]),
          (K = f[3]),
          (p = f[4]),
          (q = f[5]),
          (r = f[6]),
          (t = f[7]),
          (u = f[8]),
          (v = f[9]),
          (w = f[10]),
          (x = f[11]),
          (y = f[12]),
          (z = f[13]),
          (A = f[14]),
          (o = f[15]),
          (s = f[16]),
          (B = f[17]),
          (C = f[18]),
          (D = f[19]),
          (E = f[20]),
          (G = f[21]),
          (I = f[22]),
          (J = f[23]),
          (F = f[24]),
          (H = f[25]);
      a = o === void 0 ? !1 : o;
      o = s === void 0 ? !1 : s;
      s = B === void 0 ? 'normal' : B;
      B = C === void 0 ? !1 : C;
      C = D === void 0 ? 'medium' : D;
      D = E === void 0 ? !1 : E;
      E = G === void 0 ? !1 : G;
      G = I === void 0 ? 'above' : I;
      I = J === void 0 ? 'primary' : J;
      J = I === 'fdsOverride_collaborativePostCTA' ? 'secondary' : I in m ? I : 'primary';
      let L = a ? 'disabled' : B ? 'deemphasized' : 'default';
      let M = m[J][L];
      L = n[J][L];
      let N = k(null);
      let O = c('useCometTheme')('light');
      let P = O[0];
      O = O[1];
      let Q = j(c('CometGHLRenderingContext'));
      Q = t != null && Q;
      e = (e = K['aria-label']) != null ? e : r;
      Q = Q ? void 0 : e;
      e = c('useMergeRefs')(N, b);
      f[26] !== r || f[27] !== o || f[28] !== C || f[29] !== M
        ? ((N = o
            ? null
            : i.jsx(c('FDSText.react'), {
                color: M,
                numberOfLines: 1,
                type: C === 'large' ? 'button1' : 'button2',
                children: r,
              })),
          (f[26] = r),
          (f[27] = o),
          (f[28] = C),
          (f[29] = M),
          (f[30] = N))
        : (N = f[30]);
      b = I === 'overlay' && a && l.contentDisabled;
      r = I === 'overlay' && O;
      M = C === 'medium' && l.sizeMedium;
      O = C === 'large' && l.sizeLarge;
      C = p != null && o && l.paddingIconOnly;
      f[31] !== b || f[32] !== r || f[33] !== M || f[34] !== O || f[35] !== C
        ? ((o = [b, r, M, O, C]), (f[31] = b), (f[32] = r), (f[33] = M), (f[34] = O), (f[35] = C), (f[36] = o))
        : (o = f[36]);
      f[37] !== p || f[38] !== L
        ? ((b =
            p &&
            i.jsx(c('FDSIcon.react'), {
              color: L,
              icon: p,
              isDecorative: !0,
              size: 16,
            })),
          (f[37] = p),
          (f[38] = L),
          (f[39] = b))
        : (b = f[39]);
      r = B && l.primaryDeemphasizedOverlayPressed;
      M = J === 'secondary' && l.secondaryOverlayPressed;
      O = J === 'secondary' && B && l.secondaryDeemphasizedOverlayPressed;
      C = J === 'overlay' && l.overlayOverlayPressed;
      p = J === 'overlay' && B && l.overlayDeemphasizedOverlayPressed;
      L = J === 'dark-overlay' && l.darkOverlayPressed;
      J = J === 'dark-overlay' && B && l.overlayDeemphasizedOverlayPressed;
      let R;
      f[40] !== r || f[41] !== M || f[42] !== O || f[43] !== C || f[44] !== p || f[45] !== L || f[46] !== J
        ? ((R = [l.primaryOverlayPressed, r, M, O, C, p, L, J, l.fadeOut]),
          (f[40] = r),
          (f[41] = M),
          (f[42] = O),
          (f[43] = C),
          (f[44] = p),
          (f[45] = L),
          (f[46] = J),
          (f[47] = R))
        : (R = f[47]);
      r = I === 'primary' && l.primary;
      M = I === 'primary' && B && l.primaryDeemphasized;
      O = I === 'secondary' && l.secondary;
      C = I === 'secondary' && B && l.secondaryDeemphasized;
      p = I === 'fdsOverride_black' && l.fdsOverrideBlack;
      L = I === 'fdsOverride_negative' && l.fdsOverrideNegative;
      J = I === 'fdsOverride_positive' && l.fdsOverridePositive;
      let S = I === 'fdsOverride_collaborativePostCTA' && l.fdsOverrideCollaborativePostCTA;
      let T = I === 'overlay' && l.overlay;
      B = I === 'overlay' && B && l.overlayDeemphasized;
      let U = a && l.disabled;
      let V = I === 'overlay' && a && l.overlayDisabled;
      let W = I === 'dark-overlay' && l.darkOverlay;
      let X;
      f[48] !== r ||
      f[49] !== M ||
      f[50] !== O ||
      f[51] !== C ||
      f[52] !== p ||
      f[53] !== L ||
      f[54] !== J ||
      f[55] !== S ||
      f[56] !== T ||
      f[57] !== B ||
      f[58] !== U ||
      f[59] !== V ||
      f[60] !== W
        ? ((X = [r, M, O, C, p, L, J, S, T, B, U, V, W]),
          (f[48] = r),
          (f[49] = M),
          (f[50] = O),
          (f[51] = C),
          (f[52] = p),
          (f[53] = L),
          (f[54] = J),
          (f[55] = S),
          (f[56] = T),
          (f[57] = B),
          (f[58] = U),
          (f[59] = V),
          (f[60] = W),
          (f[61] = X))
        : (X = f[61]);
      f[62] !== g ||
      f[63] !== h ||
      f[64] !== K ||
      f[65] !== Q ||
      f[66] !== a ||
      f[67] !== q ||
      f[68] !== t ||
      f[69] !== e ||
      f[70] !== u ||
      f[71] !== v ||
      f[72] !== w ||
      f[73] !== x ||
      f[74] !== y ||
      f[75] !== z ||
      f[76] !== A ||
      f[77] !== s ||
      f[78] !== D ||
      f[79] !== N ||
      f[80] !== o ||
      f[81] !== b ||
      f[82] !== R ||
      f[83] !== X ||
      f[84] !== E ||
      f[85] !== F
        ? ((r = i.jsx(
            c('BaseStyledButton.react'),
            babelHelpers['extends']({}, K, {
              addOnEnd: h,
              addOnStart: g,
              'aria-label': Q,
              content: N,
              contentXstyle: o,
              disabled: a,
              icon: b,
              id: q,
              linkProps: t,
              onFocusIn: u,
              onFocusOut: v,
              onHoverIn: w,
              onHoverOut: x,
              onPress: y,
              onPressIn: z,
              onPressOut: A,
              overlayPressedStyle: R,
              padding: s,
              ref: e,
              suppressHydrationWarning: D,
              testOnly_pressed: E,
              testid: void 0,
              xstyle: X,
            }),
          )),
          (f[62] = g),
          (f[63] = h),
          (f[64] = K),
          (f[65] = Q),
          (f[66] = a),
          (f[67] = q),
          (f[68] = t),
          (f[69] = e),
          (f[70] = u),
          (f[71] = v),
          (f[72] = w),
          (f[73] = x),
          (f[74] = y),
          (f[75] = z),
          (f[76] = A),
          (f[77] = s),
          (f[78] = D),
          (f[79] = N),
          (f[80] = o),
          (f[81] = b),
          (f[82] = R),
          (f[83] = X),
          (f[84] = E),
          (f[85] = F),
          (f[86] = r))
        : (r = f[86]);
      M = r;
      f[87] !== P || f[88] !== M || f[89] !== I
        ? ((O =
            I === 'overlay'
              ? i.jsx(P, {
                  children: M,
                })
              : M),
          (f[87] = P),
          (f[88] = M),
          (f[89] = I),
          (f[90] = O))
        : (O = f[90]);
      C = O;
      if (H != null) {
        f[91] !== C || f[92] !== H || f[93] !== G
          ? ((p = i.jsx(c('FDSTooltip.react'), {
              position: G,
              tooltip: H,
              children: C,
            })),
            (f[91] = C),
            (f[92] = H),
            (f[93] = G),
            (f[94] = p))
          : (p = f[94]);
        return p;
      }
      return C;
    }
    f = e;
    g['default'] = f;
  },
  98,
);
