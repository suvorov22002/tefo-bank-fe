import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { InputNumber } from './inputNumber'

describe('InputNumber', () => {
  it('should render', () => {
    render(<InputNumber data-testid="input" />)

    expect(screen.getByTestId('input')).toBeInTheDocument()
  })

  it('should handle disabled', () => {
    render(<InputNumber data-testid="input" disabled />)

    expect(screen.getByTestId('input')).toBeDisabled()
  })

  it('should handle onChange', () => {
    const handleChange = jest.fn()

    render(<InputNumber data-testid="input" onChange={handleChange} />)
    const input = screen.getByTestId('input')

    act(() => {
      fireEvent.change(input, { target: { value: 'Test Value' } })
    })

    // waitFor resolves following issue
    // https://github.com/testing-library/react-testing-library/issues/532
    waitFor(() => {
      expect(input).toHaveValue('Test Value')
      expect(handleChange).toHaveBeenCalled()
    })
  })

  it('should handle onBlur', () => {
    const handleBlur = jest.fn()

    render(<InputNumber data-testid="input" onBlur={handleBlur} />)

    fireEvent.blur(screen.getByTestId('input'))

    act(() => {
      fireEvent.blur(screen.getByTestId('input'))
    })

    expect(handleBlur).toBeCalled()
  })
})
