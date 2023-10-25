import { ReactNode } from 'react'
import { ThemeConfigProvider } from '../components/theme'

export const StoriesThemeWrapper = ({ children }: { children?: ReactNode }) => (
  <ThemeConfigProvider>{children}</ThemeConfigProvider>
)
