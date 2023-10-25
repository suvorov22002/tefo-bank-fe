import { render, screen } from '@testing-library/react'

import { TimePicker } from './timePicker'

describe('TimePicker', () => {
  it('should mount', () => {
    expect(() => render(<TimePicker />)).not.toThrow()
  })

  it('should render', () => {
    render(<TimePicker data-testid="timePicker" />)

    expect(screen.getByTestId('timePicker')).toBeInTheDocument()
  })
})
