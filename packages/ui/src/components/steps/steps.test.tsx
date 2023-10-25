import { render, screen } from '@testing-library/react'

import { Steps } from './steps'

describe('Steps', () => {
  it('should mount', () => {
    expect(() => render(<Steps />)).not.toThrow()
  })

  it('should render', () => {
    render(<Steps data-testid="steps" />)

    const steps = screen.getByTestId('steps')

    expect(steps).toBeInTheDocument()
  })
})
