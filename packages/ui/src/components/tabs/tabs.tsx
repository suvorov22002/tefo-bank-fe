import { Tabs as AntdTabs, TabsProps as AntdTabsProps } from 'antd'

export interface TabsProps {
  activeKey?: AntdTabsProps['activeKey']
  addIcon?: AntdTabsProps['addIcon']
  animated?: AntdTabsProps['animated']
  centered?: AntdTabsProps['centered']
  defaultActiveKey?: AntdTabsProps['defaultActiveKey']
  hideAdd?: AntdTabsProps['hideAdd']
  items?: AntdTabsProps['items']
  moreIcon?: AntdTabsProps['moreIcon']
  popupClassName?: AntdTabsProps['popupClassName']
  renderTabBar?: AntdTabsProps['renderTabBar']
  size?: AntdTabsProps['size']
  tabBarExtraContent?: AntdTabsProps['tabBarExtraContent']
  tabBarGutter?: AntdTabsProps['tabBarGutter']
  tabBarStyle?: AntdTabsProps['tabBarStyle']
  tabPosition?: AntdTabsProps['tabPosition']
  destroyInactiveTabPane?: AntdTabsProps['destroyInactiveTabPane']
  type?: AntdTabsProps['type']
  onChange?: AntdTabsProps['onChange']
  onEdit?: AntdTabsProps['onEdit']
  onTabClick?: AntdTabsProps['onTabClick']
  onTabScroll?: AntdTabsProps['onTabScroll']
  children?: AntdTabsProps['children']
  style?: AntdTabsProps['style']
  className?: AntdTabsProps['className']
}

export const Tabs = (props: TabsProps) => {
  return <AntdTabs {...props} />
}
