import React from 'react';
// import { CometScrollFixerRoot } from '@fb-hooks/useCometScrollAnchor';
// import { CometLayerKeyCommandWrapper } from '@fb-keyboard/CometLayerKeyCommandWrapper';
// import { CometHeroInteractionWithDiv } from './CometHeroInteractionWithDiv';
import { HiddenSubtreeContextProvider } from './HiddenSubtreeContextProvider';

// import { CometContentWrapperContext } from "../context/comet-content-wrapper-context";

// function m(a) {
//   return a;
// }

export const CometMainRoute = ({ contentRefProvider, contentStyleProvider, contentXStyleProvider, children }) => {
  // const { mainRoutesWrapper = m } = useContext(CometContentWrapperContext);

  // h = c("useCometRouterState")();
  // if (h == null)
  //   throw c("unrecoverableViolation")(
  //     "Attempting to render main routes without a router state (provided by the CometRouterStateProvider/CometRouterStateContext).",
  //     "comet_infra"
  //   );

  return (
    <HiddenSubtreeContextProvider isBackgrounded={false} isHidden={false}>
      {/* <CometHeroInteractionWithDiv
        hidden={false}
        htmlAttributes={{
          style: contentStyleProvider
            ? contentXStyleProvider({
                isHidden: false,
                tabVisibilityHidden: undefined,
              })
            : undefined,
        }}
        pageletName="page"
        ref={
          contentRefProvider
            ? contentRefProvider({
                isHidden: false,
              })
            : undefined
        }
        xstyle={contentXStyleProvider({
          isHidden: false,
        })}
      > */}
      {/* eslint-disable-next-line no-useless-concat */}
      {/* <CometLayerKeyCommandWrapper debugName={'tab layer for: ' + 'a'}> */}
      {/* <CometScrollFixerRoot> */}
      {children}
      {/* </CometScrollFixerRoot> */}
      {/* </CometLayerKeyCommandWrapper> */}
      {/* </CometHeroInteractionWithDiv> */}
      {/* <div
        className={stylex(
          contentXStyleProvider({
            isHidden: false,
            tabVisibilityHidden: undefined,
          }),
        )}
      >
        <CometLayerKeyCommandWrapper debugName={'tab layer for: ' + 'a'}>{children}</CometLayerKeyCommandWrapper>
      </div> */}
    </HiddenSubtreeContextProvider>
  );
};
