// __d(
//   "GeoCardHeaderLabelContext",
//   ["react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     a = h || d("react");
//     b = a.createContext(void 0);
//     c = b;
//     g["default"] = c;
//   },
//   98
// );

import React from "react";

const GeoCardHeaderLabelContext = React.createContext<string | undefined>(
  undefined
);

export default GeoCardHeaderLabelContext;
