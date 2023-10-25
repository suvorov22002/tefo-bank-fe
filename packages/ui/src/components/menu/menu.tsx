import {
  Menu as AntdMenu,
  MenuItemProps as AntdMenuItemProps,
  MenuProps as AntdMenuProps,
} from 'antd'

export interface MenuProps {
  defaultOpenKeys?: AntdMenuProps['defaultOpenKeys']
  defaultSelectedKeys?: AntdMenuProps['defaultSelectedKeys']
  expandIcon?: AntdMenuProps['expandIcon']
  forceSubMenuRender?: AntdMenuProps['forceSubMenuRender']
  inlineCollapsed?: AntdMenuProps['inlineCollapsed']
  inlineIndent?: AntdMenuProps['inlineIndent']
  items?: AntdMenuProps['items']
  mode?: AntdMenuProps['mode']
  multiple?: AntdMenuProps['multiple']
  openKeys?: AntdMenuProps['openKeys']
  overflowedIndicator?: AntdMenuProps['overflowedIndicator']
  selectable?: AntdMenuProps['selectable']
  selectedKeys?: AntdMenuProps['selectedKeys']
  style?: AntdMenuProps['style']
  subMenuCloseDelay?: AntdMenuProps['subMenuCloseDelay']
  subMenuOpenDelay?: AntdMenuProps['subMenuOpenDelay']
  theme?: AntdMenuProps['theme']
  className?: AntdMenuProps['className']
  triggerSubMenuAction?: AntdMenuProps['triggerSubMenuAction']
  onClick?: AntdMenuProps['onClick']
  onDeselect?: AntdMenuProps['onDeselect']
  onOpenChange?: AntdMenuProps['onOpenChange']
  onSelect?: AntdMenuProps['onSelect']
}

export type MenuItemProps = AntdMenuItemProps

export const Menu = (props: MenuProps) => <AntdMenu {...props} />
