import { render, screen } from '@testing-library/react'

import { Card } from './card'

describe('Card', () => {
  it('should render without errors', () => {
    render(<Card data-testid="card" />)

    const card = screen.getByTestId('card')

    expect(card).toBeInTheDocument()
  })

  it('should render children', () => {
    const cardChildText = 'Card child text'

    render(<Card data-testid="card">{cardChildText}</Card>)

    const card = screen.getByTestId('card')

    expect(card).toHaveTextContent(cardChildText)
    expect(card).not.toBeEmptyDOMElement()
  })
})
