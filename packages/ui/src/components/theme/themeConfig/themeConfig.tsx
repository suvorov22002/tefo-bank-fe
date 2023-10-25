import { ThemeConfig, theme as antdTheme } from 'antd'

export { antdTheme as theme, type ThemeConfig }

export const defaultThemeConfig: ThemeConfig = {
  // Antd theme config parameters should be putted here to modify default theme config
  token: {
    borderRadius: 2,
  },
  components: {
    Steps: {
      wireframe: true,
    },
  },
}
