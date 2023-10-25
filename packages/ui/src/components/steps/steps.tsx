import { Steps as AntdSteps, StepsProps as AntdStepsProps } from 'antd'

import { classes } from '../../utils'
import './styles.scss'

export interface StepsProps {
  className?: AntdStepsProps['className']
  current?: AntdStepsProps['current']
  direction?: AntdStepsProps['direction']
  initial?: AntdStepsProps['initial']
  labelPlacement?: AntdStepsProps['labelPlacement']
  percent?: AntdStepsProps['percent']
  progressDot?: AntdStepsProps['progressDot']
  responsive?: AntdStepsProps['responsive']
  size?: AntdStepsProps['size']
  status?: AntdStepsProps['status']
  type?: AntdStepsProps['type']
  items?: AntdStepsProps['items']
  onChange?: AntdStepsProps['onChange']
}

export const Steps = ({ className, ...rest }: StepsProps) => {
  return <AntdSteps className={classes('steps', className)} {...rest} />
}
