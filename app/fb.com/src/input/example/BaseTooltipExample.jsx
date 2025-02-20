import { CometTooltip_DEPRECATED } from '@fb-tooltip/CometTooltip_DEPRECATED';

export const BaseTooltipExample = () => {
  return (
    <div>
      <CometTooltip_DEPRECATED tooltip="hello" delayTooltipMs={1000}>
        <button>Click me</button>
      </CometTooltip_DEPRECATED>
    </div>
  );
};
