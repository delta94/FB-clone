__d(
  'CometComponentWithKeyCommands.react',
  ['CometKeyCommandWrapper.react', 'react', 'react-compiler-runtime', 'useKeyCommands'],
  function (a, b, c, d, e, f, g) {
    'use strict';
    var h,
      i = h || d('react'),
      j = {
        displayInherit: { display: 'x1jfb8zj', $$css: !0 },
        inherit: {
          alignContent: 'x4k7w5x',
          alignItems: 'x1h91t0o',
          flexDirection: 'x1beo9mf',
          flexGrow: 'xaigb6o',
          flexShrink: 'x12ejxvf',
          height: 'x3igimt',
          justifyContent: 'xarpa2k',
          maxHeight: 'xedcshv',
          maxWidth: 'x1lytzrv',
          minHeight: 'x1t2pt76',
          minWidth: 'x7ja8zs',
          position: 'x1n2onr6',
          width: 'x1qrby5j',
          $$css: !0,
        },
      };
    function k(a) {
      a = a.commandConfigs;
      c('useKeyCommands')(a);
      return null;
    }
    function a(a) {
      var b = d('react-compiler-runtime').c(16),
        e,
        f,
        g,
        h,
        l;
      b[0] !== a
        ? ((e = a.children),
          (f = a.commandConfigs),
          (g = a.elementType),
          (l = a.xstyle),
          (h = babelHelpers.objectWithoutPropertiesLoose(a, ['children', 'commandConfigs', 'elementType', 'xstyle'])),
          (b[0] = a),
          (b[1] = e),
          (b[2] = f),
          (b[3] = g),
          (b[4] = h),
          (b[5] = l))
        : ((e = b[1]), (f = b[2]), (g = b[3]), (h = b[4]), (l = b[5]));
      b[6] !== g
        ? ((a = g === 'span' ? j.inherit : [j.inherit, j.displayInherit]), (b[6] = g), (b[7] = a))
        : (a = b[7]);
      a = a;
      l = l != null ? l : a;
      b[8] !== f ? ((a = i.jsx(k, { commandConfigs: f })), (b[8] = f), (b[9] = a)) : (a = b[9]);
      b[10] !== e || b[11] !== g || b[12] !== h || b[13] !== l || b[14] !== a
        ? ((f = i.jsxs(
            c('CometKeyCommandWrapper.react'),
            babelHelpers['extends']({ elementType: g, xstyle: l }, h, { children: [a, e] }),
          )),
          (b[10] = e),
          (b[11] = g),
          (b[12] = h),
          (b[13] = l),
          (b[14] = a),
          (b[15] = f))
        : (f = b[15]);
      return f;
    }
    g['default'] = a;
  },
  98,
);
