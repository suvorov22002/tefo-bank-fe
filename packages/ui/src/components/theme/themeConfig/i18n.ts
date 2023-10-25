import en from 'antd/locale/en_US'

import { ThemeConfigProviderProps } from './themeConfigProvider'

export type ThemeLocale = ThemeConfigProviderProps['locale']

export const ThemeLocaleMap: Readonly<Record<string, ThemeLocale>> = Object.freeze({
  en,
})
