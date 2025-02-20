/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { createContext, useContext } from "react";
import { I64 } from "I64";
import { useCallbackInt64, useMemoInt64 } from "Int64Hooks";
import { LSIntEnum } from "LSIntEnum";
import { LSMessageThreadUnsendabilityStatus } from "LSMessageThreadUnsendabilityStatus";
import { LSThreadBitOffset } from "LSThreadBitOffset";
import { ThreadStatus } from "ThreadStatus";

const MWPThreadCapabilitiesContext = createContext({
  blurMediaEnabled: false,
  canUnsendMessage: false,
  communityMessagingChannelDescriptionCustomization: false,
  communityMessagingChannelInvite: false,
  disableLinks: false,
  editMessageEnabled: false,
  hasLSThreadBitOffset: (a) => false,
  isPaused: false,
  localDeleteMessageEnabled: false,
  messageForwardEnabled: false,
  messageUnsendEnabled: false,
  modifyPinnedMessageV2Enabled: false,
  reactEnabled: false,
  reactionsV2WriteEnabled: false,
  replyEnabled: false,
  reportMessageToAdminEnabled: false,
  rtcVideoCallEnabled: false,
  rtcVoiceCallEnabled: false,
  seenCountV2Enabled: false,
  subThreadCreationEnabled: false,
});

const Provider = ({ children, customCapabilityCheck, thread }) => {
  const {
    capabilities,
    capabilities2,
    capabilities3,
    capabilities4,
    threadType,
    cannotUnsendReason,
    threadStatus,
  } = thread;

  const hasLSThreadBitOffset = useCallbackInt64(
    (a) =>
      LSThreadBitOffset.has(a, {
        capabilities,
        capabilities2,
        capabilities3,
        capabilities4,
        threadType,
      }),
    [capabilities, capabilities2, capabilities3, capabilities4, threadType]
  );

  const contextValue = useMemoInt64(
    () => ({
      blurMediaEnabled: hasLSThreadBitOffset(46),
      canUnsendMessage:
        cannotUnsendReason !== null
          ? I64.equal(
              cannotUnsendReason,
              LSIntEnum.ofNumber(LSMessageThreadUnsendabilityStatus.CAN_UNSEND)
            )
          : true,
      communityMessagingChannelDescriptionCustomization:
        hasLSThreadBitOffset(135),
      communityMessagingChannelInvite: hasLSThreadBitOffset(120),
      disableLinks: hasLSThreadBitOffset(45),
      editMessageEnabled: hasLSThreadBitOffset(194),
      hasLSThreadBitOffset: customCapabilityCheck ?? hasLSThreadBitOffset,
      isPaused:
        threadStatus !== null &&
        I64.equal(threadStatus, I64.of_int32(ThreadStatus.PAUSED)),
      localDeleteMessageEnabled: hasLSThreadBitOffset(102),
      messageForwardEnabled: hasLSThreadBitOffset(103),
      messageUnsendEnabled:
        hasLSThreadBitOffset(122) && cannotUnsendReason !== null
          ? I64.equal(
              cannotUnsendReason,
              LSIntEnum.ofNumber(LSMessageThreadUnsendabilityStatus.CAN_UNSEND)
            )
          : false,
      modifyPinnedMessageV2Enabled: hasLSThreadBitOffset(172),
      reactEnabled: hasLSThreadBitOffset(18),
      reactionsV2WriteEnabled: hasLSThreadBitOffset(169),
      replyEnabled: hasLSThreadBitOffset(42),
      reportMessageToAdminEnabled: hasLSThreadBitOffset(93),
      rtcVideoCallEnabled: hasLSThreadBitOffset(24),
      rtcVoiceCallEnabled: hasLSThreadBitOffset(25),
      seenCountV2Enabled: hasLSThreadBitOffset(140),
      subThreadCreationEnabled: hasLSThreadBitOffset(167),
    }),
    [
      customCapabilityCheck,
      hasLSThreadBitOffset,
      threadStatus,
      cannotUnsendReason,
    ]
  );

  return (
    <MWPThreadCapabilitiesContext.Provider value={contextValue}>
      {children}
    </MWPThreadCapabilitiesContext.Provider>
  );
};

Provider.displayName = `${Provider.name}`;

const useMWPThreadCapabilitiesContext = () => {
  return useContext(MWPThreadCapabilitiesContext);
};

export {
  Provider as MWPThreadCapabilitiesContextProvider,
  useMWPThreadCapabilitiesContext,
};
