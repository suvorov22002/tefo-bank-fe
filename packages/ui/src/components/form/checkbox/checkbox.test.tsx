import { fireEvent, render, screen } from '@testing-library/react'

import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  it('should render without crashing', () => {
    render(<Checkbox data-testid="checkbox" />)

    expect(screen.getByTestId('checkbox')).toBeInTheDocument()
  })

  it('should call onChange callback when clicked', () => {
    const onChange = jest.fn()

    render(<Checkbox onChange={onChange} checked={false} />)

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('should not call onChange callback when disabled', () => {
    const onChange = jest.fn()

    render(<Checkbox onChange={onChange} checked={false} disabled />)

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should be checked after click', () => {
    render(<Checkbox data-testid="checkbox" />)

    const checkbox = screen.getByTestId('checkbox')

    expect(checkbox).not.toBeChecked()

    fireEvent.click(checkbox)

    expect(checkbox).toBeChecked()
  })
})
