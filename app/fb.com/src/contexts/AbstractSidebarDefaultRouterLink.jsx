import React from 'react';

import { useApplyGeoDomIDsDirectly } from '@fb-utils/GeoDomID';
import { Link } from '@fb-link/Link';

const AbstractSidebarDefaultRouterLink = (props) => {
  const { children, 'aria-describedby': describedBy, 'aria-labelledby': labelledBy, ...restProps } = props;

  const geoDomProps = useApplyGeoDomIDsDirectly({
    'aria-describedby': describedBy ?? undefined,
    'aria-labelledby': labelledBy ?? undefined,
  });

  const { ref, ...geoProps } = geoDomProps;

  return (
    <Link linkRef={ref} {...restProps} {...geoProps}>
      {children}
    </Link>
  );
};

AbstractSidebarDefaultRouterLink.displayName = 'AbstractSidebarDefaultRouterLink';

export default AbstractSidebarDefaultRouterLink;
