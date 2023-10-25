import { LinkProps as AntdLinkProps } from 'antd/es/typography/Link'
import { Typography as AntdTypography } from 'antd'
import { HTMLAttributes, forwardRef } from 'react'

export interface LinkProps extends HTMLAttributes<HTMLSpanElement> {
  code?: AntdLinkProps['code']
  copyable?: AntdLinkProps['copyable']
  delete?: AntdLinkProps['delete']
  disabled?: AntdLinkProps['disabled']
  editable?: AntdLinkProps['editable']
  ellipsis?: AntdLinkProps['ellipsis']
  keyboard?: AntdLinkProps['keyboard']
  mark?: AntdLinkProps['mark']
  onClick?: AntdLinkProps['onClick']
  strong?: AntdLinkProps['strong']
  italic?: AntdLinkProps['italic']
  type?: AntdLinkProps['type']
  underline?: AntdLinkProps['underline']
}

export const Link = forwardRef<HTMLSpanElement, LinkProps>((props, ref) => {
  return <AntdTypography.Link ref={ref} {...props} />
})
