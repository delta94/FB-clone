/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
// eslint-disable-next-line max-params
export function getCubicBezierPercentageFunc(a, b, c, d) {
  function e(a, b) {
    return 1 - 3 * b + 3 * a;
  }
  function f(a, b) {
    return 3 * b - 6 * a;
  }
  function g(a) {
    return 3 * a;
  }
  function h(a, b, c) {
    return ((e(b, c) * a + f(b, c)) * a + g(b)) * a;
  }
  function i(a, b, c) {
    return 3 * e(b, c) * a * a + 2 * f(b, c) * a + g(b);
  }
  function j(b) {
    let d = b;
    for (let e = 0; e < 4; ++e) {
      let f = i(d, a, c);
      if (f === 0) return d;
      let g = h(d, a, c) - b;
      d -= g / f;
    }
    return d;
  }
  return function (e) {
    return a === b && c === d ? e : h(j(e), b, d);
  };
}

// eslint-disable-next-line complexity
export function getRingGifUrl(color, size, theme) {
  switch (size) {
    case '12':
      switch (theme) {
        case 'dark':
          switch (color) {
            case 'blue':
              return {
                height: 12,
                loggingID: '1876411',
                sprited: 0,
                uri: '/assets/progress-ring/3mD7kKai_7W.gif',
                width: 12,
              };
            case 'disabled':
              return {
                height: 12,
                loggingID: '1876443',
                sprited: 0,
                uri: '/assets/progress-ring/dzn6it4Fw3p.gif',
                width: 12,
              };
            case 'dark':
              return {
                height: 12,
                loggingID: '1876427',
                sprited: 0,
                uri: '/assets/progress-ring/MStXnCtsaSe.gif',
                width: 12,
              };
            case 'light':
              return {
                height: 12,
                loggingID: '1876427',
                sprited: 0,
                uri: '/assets/progress-ring/MStXnCtsaSe.gif',
                width: 12,
              };
            default:
              return {
                height: 12,
                loggingID: '1876427',
                sprited: 0,
                uri: '/assets/progress-ring/MStXnCtsaSe.gif',
                width: 12,
              };
          }
        case 'light':
          switch (color) {
            case 'blue':
              return {
                height: 12,
                loggingID: '1876419',
                sprited: 0,
                uri: '/assets/progress-ring/NiR8M1k4AVU.gif',
                width: 12,
              };
            case 'disabled':
              return {
                height: 12,
                loggingID: '1876451',
                sprited: 0,
                uri: '/assets/progress-ring/Bys0xcVibDa.gif',
                width: 12,
              };
            case 'dark':
              return {
                height: 12,
                loggingID: '1876435',
                sprited: 0,
                uri: '/assets/progress-ring/TtXj9IXnkoK.gif',
                width: 12,
              };
            case 'light':
              return {
                height: 12,
                loggingID: '1876427',
                sprited: 0,
                uri: '/assets/progress-ring/MStXnCtsaSe.gif',
                width: 12,
              };
            default:
              return {
                height: 12,
                loggingID: '1876435',
                sprited: 0,
                uri: '/assets/progress-ring/TtXj9IXnkoK.gif',
                width: 12,
              };
          }
        default:
          return {
            height: 12,
            loggingID: '1876435',
            sprited: 0,
            uri: '/assets/progress-ring/TtXj9IXnkoK.gif',
            width: 12,
          };
      }
    case '16':
      switch (theme) {
        case 'dark':
          switch (color) {
            case 'blue':
              return {
                height: 16,
                loggingID: '1876412',
                sprited: 0,
                uri: '/assets/progress-ring/mHADa0fT0mI.gif',
                width: 16,
              };
            case 'disabled':
              return {
                height: 16,
                loggingID: '1876444',
                sprited: 0,
                uri: '/assets/progress-ring/wqjQpFb4tea.gif',
                width: 16,
              };
            case 'dark':
              return {
                height: 16,
                loggingID: '1876428',
                sprited: 0,
                uri: '/assets/progress-ring/dw2egiKdoVV.gif',
                width: 16,
              };
            case 'light':
              return {
                height: 16,
                loggingID: '1876428',
                sprited: 0,
                uri: '/assets/progress-ring/dw2egiKdoVV.gif',
                width: 16,
              };
            default:
              return {
                height: 16,
                loggingID: '1876428',
                sprited: 0,
                uri: '/assets/progress-ring/dw2egiKdoVV.gif',
                width: 16,
              };
          }
        case 'light':
          switch (color) {
            case 'blue':
              return {
                height: 16,
                loggingID: '1876420',
                sprited: 0,
                uri: '/assets/progress-ring/FNERtXIk9xp.gif',
                width: 16,
              };
            case 'disabled':
              return {
                height: 16,
                loggingID: '1876452',
                sprited: 0,
                uri: '/assets/progress-ring/Wk0dcHGH6EG.gif',
                width: 16,
              };
            case 'dark':
              return {
                height: 16,
                loggingID: '1876436',
                sprited: 0,
                uri: '/assets/progress-ring/HNs8yq0QiXE.gif',
                width: 16,
              };
            case 'light':
              return {
                height: 16,
                loggingID: '1876428',
                sprited: 0,
                uri: '/assets/progress-ring/dw2egiKdoVV.gif',
                width: 16,
              };
            default:
              return {
                height: 16,
                loggingID: '1876436',
                sprited: 0,
                uri: '/assets/progress-ring/HNs8yq0QiXE.gif',
                width: 16,
              };
          }
        default:
          return {
            height: 16,
            loggingID: '1876436',
            sprited: 0,
            uri: '/assets/progress-ring/HNs8yq0QiXE.gif',
            width: 16,
          };
      }
    case '20':
      switch (theme) {
        case 'dark':
          switch (color) {
            case 'blue':
              return {
                height: 20,
                loggingID: '1876413',
                sprited: 0,
                uri: '/assets/progress-ring/ZY0eC865SgX.gif',
                width: 20,
              };
            case 'disabled':
              return {
                height: 20,
                loggingID: '1876445',
                sprited: 0,
                uri: '/assets/progress-ring/yy3mR2PXKrn.gif',
                width: 20,
              };
            case 'dark':
              return {
                height: 20,
                loggingID: '1876429',
                sprited: 0,
                uri: '/assets/progress-ring/1DbfjOftY0d.gif',
                width: 20,
              };
            case 'light':
              return {
                height: 20,
                loggingID: '1876429',
                sprited: 0,
                uri: '/assets/progress-ring/1DbfjOftY0d.gif',
                width: 20,
              };
            default:
              return {
                height: 20,
                loggingID: '1876429',
                sprited: 0,
                uri: '/assets/progress-ring/1DbfjOftY0d.gif',
                width: 20,
              };
          }
        case 'light':
          switch (color) {
            case 'blue':
              return {
                height: 20,
                loggingID: '1876421',
                sprited: 0,
                uri: '/assets/progress-ring/l2FWxc8ihQj.gif',
                width: 20,
              };
            case 'disabled':
              return {
                height: 20,
                loggingID: '1876453',
                sprited: 0,
                uri: '/assets/progress-ring/aOTs7vt2hEc.gif',
                width: 20,
              };
            case 'dark':
              return {
                height: 20,
                loggingID: '1876437',
                sprited: 0,
                uri: '/assets/progress-ring/ay_drQe6StD.gif',
                width: 20,
              };
            case 'light':
              return {
                height: 20,
                loggingID: '1876429',
                sprited: 0,
                uri: '/assets/progress-ring/1DbfjOftY0d.gif',
                width: 20,
              };
            default:
              return {
                height: 20,
                loggingID: '1876437',
                sprited: 0,
                uri: '/assets/progress-ring/ay_drQe6StD.gif',
                width: 20,
              };
          }
        default:
          return {
            height: 20,
            loggingID: '1876437',
            sprited: 0,
            uri: '/assets/progress-ring/ay_drQe6StD.gif',
            width: 20,
          };
      }
    case '24':
      switch (theme) {
        case 'dark':
          switch (color) {
            case 'blue':
              return {
                height: 24,
                loggingID: '1876414',
                sprited: 0,
                uri: '/assets/progress-ring/M3mvaC7u8oH.gif',
                width: 24,
              };
            case 'disabled':
              return {
                height: 24,
                loggingID: '1876446',
                sprited: 0,
                uri: '/assets/progress-ring/gTdm7zPKz-c.gif',
                width: 24,
              };
            case 'dark':
              return {
                height: 24,
                loggingID: '1876430',
                sprited: 0,
                uri: '/assets/progress-ring/2uPGz8a6lb6.gif',
                width: 24,
              };
            case 'light':
              return {
                height: 24,
                loggingID: '1876430',
                sprited: 0,
                uri: '/assets/progress-ring/2uPGz8a6lb6.gif',
                width: 24,
              };
            default:
              return {
                height: 24,
                loggingID: '1876430',
                sprited: 0,
                uri: '/assets/progress-ring/2uPGz8a6lb6.gif',
                width: 24,
              };
          }
        case 'light':
          switch (color) {
            case 'blue':
              return {
                height: 24,
                loggingID: '1876422',
                sprited: 0,
                uri: '/assets/progress-ring/Io_N1z4MXYh.gif',
                width: 24,
              };
            case 'disabled':
              return {
                height: 24,
                loggingID: '1876454',
                sprited: 0,
                uri: '/assets/progress-ring/wVjfNbGZ3CH.gif',
                width: 24,
              };
            case 'dark':
              return {
                height: 24,
                loggingID: '1876438',
                sprited: 0,
                uri: '/assets/progress-ring/iACDMhAROS_.gif',
                width: 24,
              };
            case 'light':
              return {
                height: 24,
                loggingID: '1876430',
                sprited: 0,
                uri: '/assets/progress-ring/2uPGz8a6lb6.gif',
                width: 24,
              };
            default:
              return {
                height: 24,
                loggingID: '1876438',
                sprited: 0,
                uri: '/assets/progress-ring/iACDMhAROS_.gif',
                width: 24,
              };
          }
        default:
          return {
            height: 24,
            loggingID: '1876438',
            sprited: 0,
            uri: '/assets/progress-ring/iACDMhAROS_.gif',
            width: 24,
          };
      }
    case '32':
      switch (theme) {
        case 'dark':
          switch (color) {
            case 'blue':
              return {
                height: 32,
                loggingID: '1876415',
                sprited: 0,
                uri: '/assets/progress-ring/hVe2HmwMRpE.gif',
                width: 32,
              };
            case 'disabled':
              return {
                height: 32,
                loggingID: '1876447',
                sprited: 0,
                uri: '/assets/progress-ring/kdaft251gQ_.gif',
                width: 32,
              };
            case 'dark':
              return {
                height: 32,
                loggingID: '1876431',
                sprited: 0,
                uri: '/assets/progress-ring/60r9oPEvxiL.gif',
                width: 32,
              };
            case 'light':
              return {
                height: 32,
                loggingID: '1876431',
                sprited: 0,
                uri: '/assets/progress-ring/60r9oPEvxiL.gif',
                width: 32,
              };
            default:
              return {
                height: 32,
                loggingID: '1876431',
                sprited: 0,
                uri: '/assets/progress-ring/60r9oPEvxiL.gif',
                width: 32,
              };
          }
        case 'light':
          switch (color) {
            case 'blue':
              return {
                height: 32,
                loggingID: '1876423',
                sprited: 0,
                uri: '/assets/progress-ring/-1hifBvDgEQ.gif',
                width: 32,
              };
            case 'disabled':
              return {
                height: 32,
                loggingID: '1876455',
                sprited: 0,
                uri: '/assets/progress-ring/oT6wM_vuQNQ.gif',
                width: 32,
              };
            case 'dark':
              return {
                height: 32,
                loggingID: '1876439',
                sprited: 0,
                uri: '/assets/progress-ring/WEhNL1y2zoZ.gif',
                width: 32,
              };
            case 'light':
              return {
                height: 32,
                loggingID: '1876431',
                sprited: 0,
                uri: '/assets/progress-ring/60r9oPEvxiL.gif',
                width: 32,
              };
            default:
              return {
                height: 32,
                loggingID: '1876439',
                sprited: 0,
                uri: '/assets/progress-ring/WEhNL1y2zoZ.gif',
                width: 32,
              };
          }
        default:
          return {
            height: 32,
            loggingID: '1876439',
            sprited: 0,
            uri: '/assets/progress-ring/WEhNL1y2zoZ.gif',
            width: 32,
          };
      }
    case '48':
      switch (theme) {
        case 'dark':
          switch (color) {
            case 'blue':
              return {
                height: 48,
                loggingID: '1876416',
                sprited: 0,
                uri: '/assets/progress-ring/yFaaylccZ5L.gif',
                width: 48,
              };
            case 'disabled':
              return {
                height: 48,
                loggingID: '1876448',
                sprited: 0,
                uri: '/assets/progress-ring/6-FTd4KBtOk.gif',
                width: 48,
              };
            case 'dark':
              return {
                height: 48,
                loggingID: '1876432',
                sprited: 0,
                uri: '/assets/progress-ring/NlAFhiEx3a1.gif',
                width: 48,
              };
            case 'light':
              return {
                height: 48,
                loggingID: '1876432',
                sprited: 0,
                uri: '/assets/progress-ring/NlAFhiEx3a1.gif',
                width: 48,
              };
            default:
              return {
                height: 48,
                loggingID: '1876432',
                sprited: 0,
                uri: '/assets/progress-ring/NlAFhiEx3a1.gif',
                width: 48,
              };
          }
        case 'light':
          switch (color) {
            case 'blue':
              return {
                height: 48,
                loggingID: '1876424',
                sprited: 0,
                uri: '/assets/progress-ring/RcIiVWWukEr.gif',
                width: 48,
              };
            case 'disabled':
              return {
                height: 48,
                loggingID: '1876456',
                sprited: 0,
                uri: '/assets/progress-ring/ac61i44rSWK.gif',
                width: 48,
              };
            case 'dark':
              return {
                height: 48,
                loggingID: '1876440',
                sprited: 0,
                uri: '/assets/progress-ring/mAeZkO4yhqj.gif',
                width: 48,
              };
            case 'light':
              return {
                height: 48,
                loggingID: '1876432',
                sprited: 0,
                uri: '/assets/progress-ring/NlAFhiEx3a1.gif',
                width: 48,
              };
            default:
              return {
                height: 48,
                loggingID: '1876440',
                sprited: 0,
                uri: '/assets/progress-ring/mAeZkO4yhqj.gif',
                width: 48,
              };
          }
        default:
          return {
            height: 48,
            loggingID: '1876440',
            sprited: 0,
            uri: '/assets/progress-ring/mAeZkO4yhqj.gif',
            width: 48,
          };
      }
    case '60':
      switch (theme) {
        case 'dark':
          switch (color) {
            case 'blue':
              return {
                height: 64,
                loggingID: '1940508',
                sprited: 0,
                uri: '/assets/progress-ring/ycQ2OPoZwUA.gif',
                width: 64,
              };
            case 'disabled':
              return {
                height: 64,
                loggingID: '1940512',
                sprited: 0,
                uri: '/assets/progress-ring/JYwEre3ewp7.gif',
                width: 64,
              };
            case 'dark':
              return {
                height: 64,
                loggingID: '1940510',
                sprited: 0,
                uri: '/assets/progress-ring/8gPN8wBD9yB.gif',
                width: 64,
              };
            case 'light':
              return {
                height: 64,
                loggingID: '1940510',
                sprited: 0,
                uri: '/assets/progress-ring/8gPN8wBD9yB.gif',
                width: 64,
              };
            default:
              return {
                height: 64,
                loggingID: '1940510',
                sprited: 0,
                uri: '/assets/progress-ring/8gPN8wBD9yB.gif',
                width: 64,
              };
          }
        case 'light':
          switch (color) {
            case 'blue':
              return {
                height: 64,
                loggingID: '1940509',
                sprited: 0,
                uri: '/assets/progress-ring/8kyIVWHZW-b.gif',
                width: 64,
              };
            case 'disabled':
              return {
                height: 64,
                loggingID: '1940513',
                sprited: 0,
                uri: '/assets/progress-ring/M2HDLLPAUWl.gif',
                width: 64,
              };
            case 'dark':
              return {
                height: 64,
                loggingID: '1940511',
                sprited: 0,
                uri: '/assets/progress-ring/WtK_u51t3nM.gif',
                width: 64,
              };
            case 'light':
              return {
                height: 64,
                loggingID: '1940510',
                sprited: 0,
                uri: '/assets/progress-ring/8gPN8wBD9yB.gif',
                width: 64,
              };
            default:
              return {
                height: 64,
                loggingID: '1940511',
                sprited: 0,
                uri: '/assets/progress-ring/WtK_u51t3nM.gif',
                width: 64,
              };
          }
        default:
          return {
            height: 64,
            loggingID: '1940511',
            sprited: 0,
            uri: '/assets/progress-ring/WtK_u51t3nM.gif',
            width: 64,
          };
      }
    case '72':
      switch (theme) {
        case 'dark':
          switch (color) {
            case 'blue':
              return {
                height: 72,
                loggingID: '1876418',
                sprited: 0,
                uri: '/assets/progress-ring/96GJYGbUDCJ.gif',
                width: 72,
              };
            case 'disabled':
              return {
                height: 72,
                loggingID: '1876450',
                sprited: 0,
                uri: '/assets/progress-ring/Tks_lRPtYc-.gif',
                width: 72,
              };
            case 'dark':
              return {
                height: 72,
                loggingID: '1876434',
                sprited: 0,
                uri: '/assets/progress-ring/uzrQzxgD_Bg.gif',
                width: 72,
              };
            case 'light':
              return {
                height: 72,
                loggingID: '1876434',
                sprited: 0,
                uri: '/assets/progress-ring/uzrQzxgD_Bg.gif',
                width: 72,
              };
            default:
              return {
                height: 72,
                loggingID: '1876434',
                sprited: 0,
                uri: '/assets/progress-ring/uzrQzxgD_Bg.gif',
                width: 72,
              };
          }
        case 'light':
          switch (color) {
            case 'blue':
              return {
                height: 72,
                loggingID: '1876426',
                sprited: 0,
                uri: '/assets/progress-ring/9ISCYYcy94m.gif',
                width: 72,
              };
            case 'disabled':
              return {
                height: 72,
                loggingID: '1876458',
                sprited: 0,
                uri: '/assets/progress-ring/ZH27Vvjc9-u.gif',
                width: 72,
              };
            case 'dark':
              return {
                height: 72,
                loggingID: '1876442',
                sprited: 0,
                uri: '/assets/progress-ring/79uB7ciX8vY.gif',
                width: 72,
              };
            case 'light':
              return {
                height: 72,
                loggingID: '1876434',
                sprited: 0,
                uri: '/assets/progress-ring/uzrQzxgD_Bg.gif',
                width: 72,
              };
            default:
              return {
                height: 72,
                loggingID: '1876442',
                sprited: 0,
                uri: '/assets/progress-ring/79uB7ciX8vY.gif',
                width: 72,
              };
          }
        default:
          return {
            height: 72,
            loggingID: '1876442',
            sprited: 0,
            uri: '/assets/progress-ring/79uB7ciX8vY.gif',
            width: 72,
          };
      }
    default:
      return {
        height: 32,
        loggingID: '1876439',
        sprited: 0,
        uri: '/assets/progress-ring/WEhNL1y2zoZ.gif',
        width: 32,
      };
  }
}

export function getRingColor(color) {
  switch (color) {
    case 'dark':
      return {
        backgroundColor: 'var(--progress-ring-neutral-background)',
        foregroundColor: 'var(--progress-ring-neutral-foreground)',
      };
    case 'light':
      return {
        backgroundColor: 'var(--progress-ring-on-media-background)',
        foregroundColor: 'var(--progress-ring-on-media-foreground)',
      };
    case 'blue':
      return {
        backgroundColor: 'var(--progress-ring-blue-background)',
        foregroundColor: 'var(--progress-ring-blue-foreground)',
      };
    case 'disabled':
      return {
        backgroundColor: 'var(--progress-ring-disabled-background)',
        foregroundColor: 'var(--progress-ring-disabled-foreground)',
      };
    default:
      return {
        backgroundColor: 'var(--progress-ring-neutral-background)',
        foregroundColor: 'var(--progress-ring-neutral-foreground)',
      };
  }
}

export const FDSProgressRingUtils = {
  getCubicBezierPercentageFunc,
  getRingColor,
  getRingGifUrl,
};
