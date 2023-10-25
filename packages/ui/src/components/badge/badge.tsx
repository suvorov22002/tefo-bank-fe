import { Badge as AntdBadge, BadgeProps as AntdBadgeProps } from 'antd'

export interface BadgeProps {
  color?: AntdBadgeProps['color']
  count?: AntdBadgeProps['count']
  dot?: AntdBadgeProps['dot']
  offset?: AntdBadgeProps['offset']
  overflowCount?: AntdBadgeProps['overflowCount']
  showZero?: AntdBadgeProps['showZero']
  size?: AntdBadgeProps['size']
  status?: AntdBadgeProps['status']
  text?: AntdBadgeProps['text']
  title?: AntdBadgeProps['title']
  className?: AntdBadgeProps['className']
  children?: AntdBadgeProps['children']
}

export const Badge = (props: BadgeProps) => {
  return <AntdBadge {...props} />
}
