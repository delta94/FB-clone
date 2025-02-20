// __d(
//   "GeoPrivateCardSectionContext",
//   ["react"],
//   function (a, b, c, d, e, f, g) {
//     "use strict";
//     var h;
//     a = h || d("react");
//     b = a.createContext(!1);
//     g["default"] = b;
//   },
//   98
// );

import React from "react";

interface GeoPrivateLoggingRegionContextType {
  renderer:
    | ((props: { name: string; children: React.ReactNode }) => React.ReactNode)
    | null;
  setupElement:
    | ((element: any, name: string, isDependentRegion: boolean) => void)
    | null;
}

const GeoPrivateLoggingRegionContext =
  React.createContext<GeoPrivateLoggingRegionContextType>({
    renderer: null,
    setupElement: null,
  });

export default GeoPrivateLoggingRegionContext;
