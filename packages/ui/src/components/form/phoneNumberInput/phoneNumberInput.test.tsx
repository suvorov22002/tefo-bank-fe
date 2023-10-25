import { PhoneNumberInput } from './phoneNumberInput'
import { fireEvent, render, screen } from '@testing-library/react'

describe('PhoneNumberInput', () => {
  it('should render', () => {
    render(<PhoneNumberInput data-testid="phoneNumberInput" />)

    const phoneNumberInput = screen.getByTestId('phoneNumberInput')

    expect(phoneNumberInput).toBeInTheDocument()
    expect(phoneNumberInput.querySelectorAll('input')).toHaveLength(2)
  })

  it('should handle onChange', () => {
    const handleCodeChange = jest.fn()
    const handleNumberChange = jest.fn()

    render(
      <PhoneNumberInput
        data-testid="phoneNumberInput"
        codeInputProps={{
          onChange: handleCodeChange,
        }}
        numberInputProps={{
          onChange: handleNumberChange,
        }}
      />
    )

    const phoneNumberInput = screen.getByTestId('phoneNumberInput')

    const [codeInput, numberInput] = phoneNumberInput.querySelectorAll('input')

    fireEvent.change(codeInput, {
      target: {
        value: 'code',
      },
    })

    fireEvent.change(numberInput, {
      target: {
        value: 'number',
      },
    })

    expect(handleCodeChange).toBeCalled()
    expect(handleNumberChange).toBeCalled()
  })

  it('should handle onBlur', () => {
    const handleCodeBlur = jest.fn()
    const handleNumberBlur = jest.fn()

    render(
      <PhoneNumberInput
        data-testid="phoneNumberInput"
        codeInputProps={{
          onBlur: handleCodeBlur,
        }}
        numberInputProps={{
          onBlur: handleNumberBlur,
        }}
      />
    )

    const phoneNumberInput = screen.getByTestId('phoneNumberInput')

    const [codeInput, numberInput] = phoneNumberInput.querySelectorAll('input')

    fireEvent.blur(codeInput)

    fireEvent.blur(numberInput)

    expect(handleCodeBlur).toBeCalled()
    expect(handleNumberBlur).toBeCalled()
  })

  it('should handle disabled', () => {
    render(<PhoneNumberInput data-testid="phoneNumberInput" disabled />)

    const phoneNumberInput = screen.getByTestId('phoneNumberInput')

    const [codeInput, numberInput] = phoneNumberInput.querySelectorAll('input')

    expect(codeInput).toBeDisabled()
    expect(numberInput).toBeDisabled()
  })
})
