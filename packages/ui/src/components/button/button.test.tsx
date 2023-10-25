import { fireEvent } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'

import { Button } from './button'

describe('Button', () => {
  it('should mount', () => {
    expect(() => render(<Button />)).not.toThrow()
  })

  it('should render', () => {
    render(<Button />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  it('should render children', () => {
    const buttonText = 'Test button'

    render(
      <Button data-testid="button">
        <p>{buttonText}</p>
      </Button>
    )

    const button = screen.getByTestId('button')

    expect(button.children[0].tagName).toBe('P')
    expect(button).toHaveTextContent(buttonText)
  })

  it('should have correct htmlType', () => {
    render(<Button htmlType="submit" />)

    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should handle disabled', () => {
    render(<Button disabled />)

    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
  })

  it('should calls the onClick handler when the button is clicked', () => {
    const handleClick = jest.fn()

    render(<Button onClick={handleClick} />)

    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
