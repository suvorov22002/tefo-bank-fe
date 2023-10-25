import { Card as AntdCard, CardProps as AntdCardProps } from 'antd'

export interface CardProps {
  actions?: AntdCardProps['actions']
  activeTabKey?: AntdCardProps['activeTabKey']
  bodyStyle?: AntdCardProps['bodyStyle']
  bordered?: AntdCardProps['bordered']
  cover?: AntdCardProps['cover']
  defaultActiveTabKey?: AntdCardProps['defaultActiveTabKey']
  extra?: AntdCardProps['extra']
  headStyle?: AntdCardProps['headStyle']
  hoverable?: AntdCardProps['hoverable']
  loading?: AntdCardProps['loading']
  size?: AntdCardProps['size']
  tabBarExtraContent?: AntdCardProps['tabBarExtraContent']
  tabList?: AntdCardProps['tabList']
  tabProps?: AntdCardProps['tabProps']
  title?: AntdCardProps['title']
  type?: AntdCardProps['type']
  className?: AntdCardProps['className']
  children?: AntdCardProps['children']
  onTabChange?: AntdCardProps['onTabChange']
}

export const Card = (props: CardProps) => <AntdCard {...props} />
