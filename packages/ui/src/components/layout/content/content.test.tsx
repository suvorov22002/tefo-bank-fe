import { render, screen } from '@testing-library/react'

import { Content } from './content'

describe('Content', () => {
  it('should render', () => {
    render(<Content data-testid="content" />)

    const content = screen.getByTestId('content')

    expect(content).toBeInTheDocument()
  })

  it('should render children', () => {
    const contentChildText = 'Content child text'

    render(
      <Content data-testid="content">
        <p>{contentChildText}</p>
      </Content>
    )

    const content = screen.getByTestId('content')

    expect(content).toHaveTextContent(contentChildText)
    expect(content).not.toBeEmptyDOMElement()
  })
})
