__d(
  "GeoPrivateBadgeContext",
  ["react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = h || d("react");
    b = a.createContext({ id: null, isLive: !0 });
    g["default"] = b;
  },
  98
);

import React from "react";

interface GeoPrivateBadgeContextProps {
  id: string | null;
  isLive: boolean;
}

const GeoPrivateBadgeContext = React.createContext<GeoPrivateBadgeContextProps>(
  { id: null, isLive: true }
);

export default GeoPrivateBadgeContext;
