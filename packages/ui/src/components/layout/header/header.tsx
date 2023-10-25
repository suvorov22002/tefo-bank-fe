import { ReactNode } from 'react'
import { Layout as AntdLayout, LayoutProps as AntdLayoutProps } from 'antd'

import { ArrowLeftOutlinedIcon } from '../../icon'
import { Button } from '../../button'
import { Title } from '../../typography'
import { classes } from '../../../utils'
import { theme } from '../../theme'
import './styles.scss'

export interface HeaderProps {
  title?: string | ReactNode
  className?: AntdLayoutProps['className']
  style?: AntdLayoutProps['style']
  children?: AntdLayoutProps['children']
  extra?: JSX.Element
  onBack?: () => void
}

export const Header = ({
  style,
  children,
  className,
  title,
  onBack,
  extra,
  ...rest
}: HeaderProps) => {
  const { token } = theme.useToken()

  const HeaderTitle =
    typeof title === 'string' ? (
      <Title className={'header__title'} level={4}>
        {title}
      </Title>
    ) : (
      title
    )

  return (
    <AntdLayout.Header
      style={{
        background: token.colorBgContainer,
        ...style,
      }}
      className={classes('header', className)}
      {...rest}
    >
      <div className="header__titleAndBackButtonWrapper">
        {onBack && (
          <Button
            type="text"
            icon={<ArrowLeftOutlinedIcon />}
            className={'header__backButton'}
            onClick={onBack}
          />
        )}
        {HeaderTitle}
      </div>
      {extra}
      {children}
    </AntdLayout.Header>
  )
}
