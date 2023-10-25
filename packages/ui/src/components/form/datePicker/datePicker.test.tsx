import { render, screen } from '@testing-library/react'

import { DatePicker } from './datePicker'

describe('DatePicker', () => {
  it('should mount', () => {
    expect(() => render(<DatePicker />)).not.toThrow()
  })

  it('should render', () => {
    render(<DatePicker data-testid="datePicker" />)

    expect(screen.getByTestId('datePicker')).toBeInTheDocument()
  })
})
