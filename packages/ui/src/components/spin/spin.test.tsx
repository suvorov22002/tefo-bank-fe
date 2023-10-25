import { render, screen } from '@testing-library/react'

import { Spin } from './spin'

describe('Spin', () => {
  it('should mount', () => {
    expect(() => render(<Spin />)).not.toThrow()
  })

  it('should render', () => {
    render(<Spin data-testid="spin" />)

    const spin = screen.getByTestId('spin')

    expect(spin).toBeInTheDocument()
  })
})
