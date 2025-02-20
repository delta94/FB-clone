__d(
  "GeoPrivateBasePortalTargetContext",
  ["react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h;
    a = h || d("react");
    b = a.createContext(document.body);
    g["default"] = b;
  },
  98
);

import React from "react";

const GeoPrivateBasePortalTargetContext = React.createContext<HTMLElement>(
  document.body
);

export default GeoPrivateBasePortalTargetContext;
