import { fireEvent, render, screen } from '@testing-library/react'

import { TextArea } from './textArea'

describe('TextArea', () => {
  it('should render', () => {
    render(<TextArea data-testid="textArea" />)

    expect(screen.getByTestId('textArea')).toBeInTheDocument()
  })

  it('should handle disabled', () => {
    render(<TextArea data-testid="textArea" disabled />)

    expect(screen.getByTestId('textArea')).toBeDisabled()
  })

  it('should handle onChange', () => {
    const handleChange = jest.fn()

    render(<TextArea data-testid="textArea" onChange={handleChange} />)
    const textArea = screen.getByTestId('textArea')

    fireEvent.change(textArea, { target: { value: 'Test Value' } })
    expect(handleChange).toHaveBeenCalled()
    expect(textArea).toHaveValue('Test Value')
  })
})
