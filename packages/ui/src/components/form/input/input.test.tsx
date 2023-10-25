import { fireEvent, render, screen } from '@testing-library/react'

import { Input } from './input'

describe('Input', () => {
  it('should render without crashing', () => {
    render(<Input data-testid="input" />)

    expect(screen.getByTestId('input')).toBeInTheDocument()
  })

  it('should handle disabled', () => {
    render(<Input data-testid="input" disabled />)

    expect(screen.getByTestId('input')).toBeDisabled()
  })

  it('should handle onChange', () => {
    const handleChange = jest.fn()

    render(<Input data-testid="input" onChange={handleChange} />)
    const input = screen.getByTestId('input')

    fireEvent.change(input, { target: { value: 'Test Value' } })
    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue('Test Value')
  })

  it('should handle onBlur', () => {
    const handleBlur = jest.fn()

    render(<Input data-testid="input" onBlur={handleBlur} />)

    fireEvent.blur(screen.getByTestId('input'))

    expect(handleBlur).toBeCalled()
  })

  it('should have correct type', () => {
    render(<Input data-testid="input" type="number" />)

    expect(screen.getByTestId('input')).toHaveAttribute('type', 'number')
  })
})
