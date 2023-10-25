import { ConfigProvider as AntdConfigProvider } from 'antd'
import { merge } from 'utils'
import { ComponentProps, ReactNode } from 'react'

import { ThemeConfig, defaultThemeConfig } from './themeConfig'

type AntdConfigProviderProps = ComponentProps<typeof AntdConfigProvider>

export interface ThemeConfigProviderProps {
  /** Set direction of layout */
  direction?: 'ltr' | 'rtl' | undefined
  /** Language package setting */
  locale?: AntdConfigProviderProps['locale']
  /** Set theme */
  theme?: ThemeConfig
  /** Set prefix className */
  prefixCls?: string
  /** Set icon prefix className */
  iconPrefixCls?: string
  children?: ReactNode
  getTargetContainer?: () => HTMLElement | Window
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement
  renderEmpty?: (componentName?: string) => ReactNode
}

export const ThemeConfigProvider = ({ theme, ...rest }: ThemeConfigProviderProps) => {
  return <AntdConfigProvider {...rest} theme={merge({}, defaultThemeConfig, theme)} />
}

ThemeConfigProvider.config = AntdConfigProvider.config
