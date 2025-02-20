/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/**
 * Changelog:
 * - 08/01/2025
 */

import React from 'react';
import { useToggle } from '@fb-hooks';
import { fbicon } from '@fb-image/fbicon';
import { FDSIcon } from '@fb-image/FDSIcon';
import { ix } from '@fb-image/ix';
import { CometColumn } from '@fb-layout/CometColumn';
import { CometColumnItem } from '@fb-layout/CometColumnItem';
import { CometRow } from '@fb-layout/CometRow';
import { CometRowItem } from '@fb-layout/CometRowItem';
import { CometPressable } from '@fb-pressable/CometPressable';
import { FDSText } from '@fb-text/FDSText';

import { BaseMiddot } from './BaseMiddot';

export const GroupsCometCollapsibleSection = ({
  children,
  disabled = true,
  highlightOnExpanded = false,
  icon,
  initialCollapsed = false,
  label,
  labelColor = 'secondary',
  labelSuffix,
  labelType = 'headlineEmphasized4',
  paddingHorizontal = 0,
  paddingVertical = 0,
}) => {
  // isCollapsed, toggleCollapsed
  const [isCollapsed, toggleCollapsed] = useToggle(initialCollapsed);

  const shouldHighlight = highlightOnExpanded && !isCollapsed;

  const _icon = isCollapsed ? fbicon._(ix(492450), 16) : fbicon._(ix(505564), 16);

  const header = (
    <CometRow
      aria-expanded={!isCollapsed}
      expanding
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      verticalAlign="center"
    >
      {icon && (
        <CometRowItem>
          <FDSIcon color={shouldHighlight ? 'highlight' : 'primary'} icon={icon} />
        </CometRowItem>
      )}
      <CometRowItem expanding>
        <FDSText color={shouldHighlight ? 'highlight' : labelColor} type={labelType}>
          {label}
          {labelSuffix && (
            <FDSText color={shouldHighlight ? 'highlight' : 'secondary'} type="headline4">
              <BaseMiddot />
              {labelSuffix}
            </FDSText>
          )}
        </FDSText>
      </CometRowItem>
      {!disabled && (
        <CometRowItem>
          <CometRow paddingHorizontal={0} paddingTop={0} verticalAlign="center">
            <CometRowItem>
              <FDSIcon color="secondary" icon={_icon} />
            </CometRowItem>
          </CometRow>
        </CometRowItem>
      )}
    </CometRow>
  );

  return (
    <CometColumn>
      <CometColumnItem>
        {disabled ? (
          header
        ) : (
          <CometPressable
            aria-label={label}
            expanding
            onPress={() => {
              toggleCollapsed();
            }}
          >
            {header}
          </CometPressable>
        )}
      </CometColumnItem>
      {!isCollapsed && <CometColumnItem>{children}</CometColumnItem>}
    </CometColumn>
  );
};
