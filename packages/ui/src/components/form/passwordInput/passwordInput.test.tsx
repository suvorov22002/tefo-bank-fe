import { fireEvent, render, screen } from '@testing-library/react'

import { PasswordInput } from './passwordInput'

describe('PasswordInput', () => {
  it('should render', () => {
    render(<PasswordInput data-testid="input" />)

    expect(screen.getByTestId('input')).toBeInTheDocument()
  })

  it('should handle disabled', () => {
    render(<PasswordInput data-testid="input" disabled />)

    expect(screen.getByTestId('input')).toBeDisabled()
  })

  it('should handle onChange', () => {
    const handleChange = jest.fn()

    render(<PasswordInput data-testid="input" onChange={handleChange} />)
    const input = screen.getByTestId('input')

    fireEvent.change(input, { target: { value: 'Test Value' } })
    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue('Test Value')
  })

  it('should handle onBlur', () => {
    const handleBlur = jest.fn()

    render(<PasswordInput data-testid="input" onBlur={handleBlur} />)

    fireEvent.blur(screen.getByTestId('input'))

    expect(handleBlur).toBeCalled()
  })
})
