import { Tooltip as AntdTooltip, TooltipProps as AntdTooltipProps } from 'antd'

export interface TooltipProps {
  title?: AntdTooltipProps['title']
  align?: AntdTooltipProps['align']
  arrow?: AntdTooltipProps['arrow']
  autoAdjustOverflow?: AntdTooltipProps['autoAdjustOverflow']
  color?: AntdTooltipProps['color']
  defaultOpen?: AntdTooltipProps['defaultOpen']
  destroyTooltipOnHide?: AntdTooltipProps['destroyTooltipOnHide']
  getPopupContainer?: AntdTooltipProps['getPopupContainer']
  mouseEnterDelay?: AntdTooltipProps['mouseEnterDelay']
  mouseLeaveDelay?: AntdTooltipProps['mouseLeaveDelay']
  overlayClassName?: AntdTooltipProps['overlayClassName']
  overlayStyle?: AntdTooltipProps['overlayStyle']
  overlayInnerStyle?: AntdTooltipProps['overlayInnerStyle']
  placement?: AntdTooltipProps['placement']
  trigger?: AntdTooltipProps['trigger']
  open?: AntdTooltipProps['open']
  zIndex?: AntdTooltipProps['zIndex']
  children?: AntdTooltipProps['children']
  className?: AntdTooltipProps['className']
}

export const Tooltip = (props: TooltipProps) => {
  return <AntdTooltip {...props} />
}
