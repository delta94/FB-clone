// __d(
//   "GeoPrivateCloseButtonContext",
//   ["react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     a = h || d("react");
//     b = a.createContext({ onHide: void 0 });
//     g["default"] = b;
//   },
//   98
// );

// GeoPrivateCloseButtonContext.ts

import React, { createContext } from "react";

interface CloseButtonContextType {
  onHide?: (source: string) => void;
}

const GeoPrivateCloseButtonContext = createContext<CloseButtonContextType>({
  onHide: undefined,
});

export default GeoPrivateCloseButtonContext;
