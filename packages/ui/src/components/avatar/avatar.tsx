import { Avatar as AntdAvatar, AvatarProps as AntdAvatarProps } from 'antd'

export interface AvatarProps {
  alt?: AntdAvatarProps['alt']
  gap?: AntdAvatarProps['gap']
  icon?: AntdAvatarProps['icon']
  shape?: AntdAvatarProps['shape']
  size?: AntdAvatarProps['size']
  src?: AntdAvatarProps['src']
  srcSet?: AntdAvatarProps['srcSet']
  draggable?: AntdAvatarProps['draggable']
  crossOrigin?: AntdAvatarProps['crossOrigin']
  style?: AntdAvatarProps['style']
  className?: AntdAvatarProps['className']
  children?: AntdAvatarProps['children']
  onError?: AntdAvatarProps['onError']
}

export const Avatar = (props: AvatarProps) => {
  return <AntdAvatar {...props} />
}
