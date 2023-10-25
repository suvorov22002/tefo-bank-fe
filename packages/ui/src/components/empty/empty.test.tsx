import { render, screen } from '@testing-library/react'

import { Empty } from './empty'

describe('Empty', () => {
  // TODO: Move common tests to higher level
  it('should mount', () => {
    expect(() => render(<Empty />)).not.toThrow()
  })

  it('should render', () => {
    render(<Empty data-testid="empty" />)

    const empty = screen.getByTestId('empty')

    expect(empty).toBeInTheDocument()
  })

  it('should render children', () => {
    const emptyChildText = 'Empty child text'

    render(
      <Empty data-testid="empty">
        <p>{emptyChildText}</p>
      </Empty>
    )

    const empty = screen.getByTestId('empty')

    expect(empty).toHaveTextContent(emptyChildText)
    expect(empty).not.toBeEmptyDOMElement()
  })
})
