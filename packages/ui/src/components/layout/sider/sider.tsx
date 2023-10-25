import { ReactNode } from 'react'

import { Layout as AntdLayout, SiderProps as AntdSiderProps } from 'antd'

interface SiderProps {
  breakpoint?: AntdSiderProps['breakpoint']
  className?: AntdSiderProps['className']
  collapsed?: AntdSiderProps['collapsed']
  collapsedWidth?: AntdSiderProps['collapsedWidth']
  collapsible?: AntdSiderProps['collapsible']
  defaultCollapsed?: AntdSiderProps['defaultCollapsed']
  reverseArrow?: AntdSiderProps['reverseArrow']
  style?: AntdSiderProps['style']
  theme?: AntdSiderProps['theme']
  trigger?: AntdSiderProps['trigger']
  width?: AntdSiderProps['width']
  zeroWidthTriggerStyle?: AntdSiderProps['zeroWidthTriggerStyle']
  onBreakpoint?: AntdSiderProps['onBreakpoint']
  onCollapse?: AntdSiderProps['onCollapse']
  children?: ReactNode
}

export const Sider = (props: SiderProps) => {
  return <AntdLayout.Sider {...props} />
}
