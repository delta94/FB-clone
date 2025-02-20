/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import GeoPrivateToaster from "../business/geo-ui/GeoPrivateToaster";
import {
  createItemKey,
  itemsReducer,
  updateGlobalToasterSubscribers,
} from "../business/helpers/GeoPrivateToasterUtils";

let globalToasterRoot = null;

const getGlobalToasterRoot = () => {
  if (globalToasterRoot === null) {
    globalToasterRoot = document.createElement("div");
    document.body?.appendChild(globalToasterRoot);
  }
  return globalToasterRoot;
};

const toastsContext = { current: [] };

const updateToastsContext = (updateFn) => {
  toastsContext.current =
    typeof updateFn === "function" ? updateFn(toastsContext.current) : updateFn;
  updateGlobalToasterSubscribers(toastsContext.current);
};

const GeoPrivateToasterGlobalContext = createContext(() => {
  let initialized = false;

  const ToasterComponent = () => {
    const [toasts, setToasts] = useState(() => toastsContext.current);

    toastsContext.current = toasts;
    updateToastsContext(setToasts);

    useLayoutEffect(() => {
      updateGlobalToasterSubscribers(toasts);
    }, [toasts]);

    return <GeoPrivateToaster items={toasts} />;
  };

  ToasterComponent.displayName = `${ToasterComponent.name} [from ${GeoPrivateToasterGlobalContext.id}]`;

  const initializeToaster = () => {
    if (!initialized) {
      const root = ReactDOM.createRoot(getGlobalToasterRoot());
      root.render(<ToasterComponent />);
      initialized = true;
    }
  };

  const addToast = (toast, config) => {
    initializeToaster();
    const key = createItemKey();
    const onAfterHide = () =>
      updateToastsContext((currentToasts) =>
        itemsReducer(currentToasts, { type: "remove", key })
      );

    updateToastsContext((currentToasts) =>
      itemsReducer(currentToasts, {
        type: "add",
        toast,
        config,
        key,
        onAfterHide,
      })
    );

    return key;
  };

  const removeToast = (key) => {
    initializeToaster();
    updateToastsContext((currentToasts) =>
      itemsReducer(currentToasts, { type: "hide", key })
    );
  };

  const clearToasts = () => {
    initializeToaster();
    updateToastsContext((currentToasts) =>
      itemsReducer(currentToasts, { type: "hideAll" })
    );
  };

  return { add: addToast, remove: removeToast, clear: clearToasts };
});

const GeoPrivateToastsGlobalContext = createContext(toastsContext);

export {
  GeoPrivateToasterGlobalContext,
  GeoPrivateToastsGlobalContext,
  getGlobalToasterRoot,
};
