import { FC } from 'react'
import { render, screen } from '@testing-library/react'

import { ThemeConfigProvider } from './themeConfigProvider'
import { theme } from './themeConfig'

const ThemeConfigProviderChild: FC = props => {
  const { token } = theme.useToken()

  return (
    <div style={{ borderRadius: token.borderRadius, lineHeight: token.lineHeight }} {...props} />
  )
}

describe('ThemeConfigProvider', () => {
  it('should mount', () => {
    expect(() => render(<ThemeConfigProvider />)).not.toThrow()
  })

  it('should render children', () => {
    render(
      <ThemeConfigProvider>
        <div data-testid="config-provider-child" />
      </ThemeConfigProvider>
    )

    const component = screen.getByTestId('config-provider-child')

    expect(component).toBeInTheDocument()
  })

  it('should handle default theme config overrides', () => {
    const customBorderRadius = 8
    const customLineHeight = 3

    render(
      <ThemeConfigProvider
        theme={{ token: { borderRadius: customBorderRadius, lineHeight: customLineHeight } }}
      >
        <ThemeConfigProviderChild data-testid="config-provider-child" />
      </ThemeConfigProvider>
    )

    const component = screen.getByTestId('config-provider-child')

    expect(component).toHaveStyle({ borderRadius: customBorderRadius + 'px' })
    expect(component).toHaveStyle({ lineHeight: customLineHeight })
  })
})
