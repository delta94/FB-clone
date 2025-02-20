// __d(
//   "GeoBaseListLayoutContext",
//   ["react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     a = h || d("react");
//     b = a.createContext({
//       density: "dense",
//       direction: "vertical",
//       isWithinList: !1,
//       shouldAlignRows: !1,
//     });
//     g["default"] = b;
//   },
//   98
// );

import React from "react";

interface GeoBaseListLayoutContextProps {
  density: "dense" | "normal";
  direction: "vertical" | "horizontal";
  isWithinList: boolean;
  shouldAlignRows: boolean;
}

const GeoBaseListLayoutContext =
  React.createContext<GeoBaseListLayoutContextProps>({
    density: "dense",
    direction: "vertical",
    isWithinList: false,
    shouldAlignRows: false,
  });

export default GeoBaseListLayoutContext;
