import { render, screen } from '@testing-library/react'

import { Footer } from './footer'

describe('Footer', () => {
  it('should render', () => {
    render(<Footer data-testid="footer" />)

    const footer = screen.getByTestId('footer')

    expect(footer).toBeInTheDocument()
  })

  it('should render children', () => {
    const footerChildText = 'Footer child text'

    render(
      <Footer data-testid="footer">
        <p>{footerChildText}</p>
      </Footer>
    )

    const footer = screen.getByTestId('footer')

    expect(footer).toHaveTextContent(footerChildText)
    expect(footer).not.toBeEmptyDOMElement()
  })
})
