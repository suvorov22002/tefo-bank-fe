import AntdIcon from '@ant-design/icons'
import { ComponentProps } from 'react'

type AntdIconProps = ComponentProps<typeof AntdIcon>

export interface IconProps {
  component?: AntdIconProps['component']
  rotate?: AntdIconProps['rotate']
  spin?: AntdIconProps['spin']
  style?: AntdIconProps['style']
  className?: AntdIconProps['className']
}

export const Icon = (props: IconProps) => <AntdIcon {...props} />
