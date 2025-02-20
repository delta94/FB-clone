/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useEffect, useRef } from 'react';
import { useTriggerAccessibilityAlert } from '@fb-hooks';

import { getBaseInputValidationStateDescription } from './getBaseInputValidationStateDescription';

// export const useBaseInputValidationAnnouncement = ({
//   label,
//   validationState,
// }) => {
//   const e = useRef();
//   const f = useTriggerAccessibilityAlert();
//   const g = useRef(null);

//   const h = useCallback(() => {
//     let a = validationState
//       ? getBaseInputValidationStateDescription({
//           label,
//           validationState,
//         })
//       : null;
//     a && f(a);
//     g.current = validationState;
//   }, [label, f, validationState]);

//   useEffect(() => {
//     let a = e.current;

//     console.log({ a });

//     if (!a) {
//       return;
//     }
//     validationState !== g.current &&
//       (a === document.activeElement ? (g.current = null) : h());
//     let b = function () {
//       validationState !== g.current && h();
//     };
//     a.addEventListener("blur", b);
//     return function () {
//       a.removeEventListener("blur", b);
//     };
//   }, [h, validationState]);

//   return e;
// };

export const useBaseInputValidationAnnouncement = ({ label, validationState }) => {
  const elementRef = useRef();
  const triggerAlert = useTriggerAccessibilityAlert();
  const prevValidationStateRef = useRef(null);

  const announceValidationState = useCallback(() => {
    const description = validationState ? getBaseInputValidationStateDescription({ label, validationState }) : null;
    if (description) {
      triggerAlert(description);
    }
    prevValidationStateRef.current = validationState;
  }, [label, triggerAlert, validationState]);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (validationState !== prevValidationStateRef.current) {
      if (element === document.activeElement) {
        prevValidationStateRef.current = null;
      } else {
        announceValidationState();
      }
    }

    const handleBlur = () => {
      if (validationState !== prevValidationStateRef.current) {
        announceValidationState();
      }
    };

    element.addEventListener('blur', handleBlur);
    return () => {
      element.removeEventListener('blur', handleBlur);
    };
  }, [announceValidationState, validationState]);

  return elementRef;
};
