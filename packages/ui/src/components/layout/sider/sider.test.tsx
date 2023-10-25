import { render, screen } from '@testing-library/react'

import { Sider } from './index'

describe('Sider', () => {
  it('should render', () => {
    render(<Sider data-testid="sider" />)

    expect(screen.getByTestId('sider')).toBeInTheDocument()
  })

  it('should render children', () => {
    const siderChildText = 'Sider child text'

    render(
      <Sider data-testid="sider">
        <p>{siderChildText}</p>
      </Sider>
    )

    const sider = screen.getByTestId('sider')

    expect(sider).toHaveTextContent(siderChildText)
    expect(sider).not.toBeEmptyDOMElement()
  })
})
