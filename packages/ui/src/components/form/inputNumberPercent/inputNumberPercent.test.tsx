import { act, fireEvent, render, screen } from '@testing-library/react'

import { InputNumberPercent } from './inputNumberPercent'

describe('InputNumberPercent', () => {
  it('should render', () => {
    render(<InputNumberPercent data-testid="input" />)

    expect(screen.getByTestId('input')).toBeInTheDocument()
  })

  it('should handle disabled', () => {
    render(<InputNumberPercent data-testid="input" disabled />)

    expect(screen.getByTestId('input')).toBeDisabled()
  })

  it('should handle onChange', () => {
    const handleChange = jest.fn()

    render(<InputNumberPercent data-testid="input" onChange={handleChange} />)
    const input = screen.getByTestId('input')

    act(() => {
      fireEvent.change(input, { target: { value: '24%' } })
    })

    expect(handleChange).toHaveBeenCalledWith(24)
  })

  it('should handle onBlur', () => {
    const handleBlur = jest.fn()

    render(<InputNumberPercent data-testid="input" onBlur={handleBlur} />)

    fireEvent.blur(screen.getByTestId('input'))

    act(() => {
      fireEvent.blur(screen.getByTestId('input'))
    })

    expect(handleBlur).toBeCalled()
  })
})
