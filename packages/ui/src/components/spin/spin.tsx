import { Spin as AntdSpin, SpinProps as AntdSpinProps, theme } from 'antd'

import { classes } from '../../utils'

import './styles.scss'

export interface SpinProps {
  delay?: AntdSpinProps['delay']
  indicator?: AntdSpinProps['indicator']
  size?: AntdSpinProps['size']
  spinning?: AntdSpinProps['spinning']
  tip?: AntdSpinProps['tip']
  wrapperClassName?: AntdSpinProps['wrapperClassName']
  className?: AntdSpinProps['className']
  children?: AntdSpinProps['children']
  style?: AntdSpinProps['style']
  fullscreen?: boolean
}

export const Spin = ({ className, wrapperClassName, fullscreen, style, ...rest }: SpinProps) => {
  const { token } = theme.useToken()

  return (
    <AntdSpin
      wrapperClassName={classes(
        wrapperClassName,
        rest.children && fullscreen && 'spinWrapper_fullscreen'
      )}
      className={classes(className, !rest.children && fullscreen && 'spin_fullscreen')}
      size="large"
      style={{
        background: token.colorBgContainer,
        ...style,
      }}
      {...rest}
    />
  )
}
