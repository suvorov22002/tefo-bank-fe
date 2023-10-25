import { render, screen } from '@testing-library/react'

import { Layout } from './layout'

describe('Layout', () => {
  it('should render', () => {
    render(<Layout data-testid="layout" />)

    const layout = screen.getByTestId('layout')

    expect(layout).toBeInTheDocument()
  })

  it('should render children', () => {
    const layoutChildText = 'Layout child text'

    render(
      <Layout data-testid="layout">
        <p>{layoutChildText}</p>
      </Layout>
    )

    const layout = screen.getByTestId('layout')

    expect(layout).toHaveTextContent(layoutChildText)
    expect(layout).not.toBeEmptyDOMElement()
  })
})
