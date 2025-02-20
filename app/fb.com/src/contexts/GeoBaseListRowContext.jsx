// __d(
//   "GeoBaseListRowContext",
//   ["react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     a = h || d("react");
//     b = a.createContext({ isNested: !1 });
//     g["default"] = b;
//   },
//   98
// );

import React from "react";

interface GeoBaseListRowContextProps {
  isNested: boolean;
}

const GeoBaseListRowContext = React.createContext<GeoBaseListRowContextProps>({
  isNested: false,
});

export default GeoBaseListRowContext;
