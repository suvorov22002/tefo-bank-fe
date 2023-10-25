import { fireEvent, render, screen } from '@testing-library/react'

import { Select } from './select'

describe('Select', () => {
  const mockOptions = [
    {
      label: 'Apple',
      value: 'APPLE',
    },
    {
      label: 'Orange',
      value: 'ORANGE',
    },
    {
      label: 'Watermelon',
      value: 'WATERMELON',
    },
  ]

  it('should render the component', () => {
    render(<Select data-testid="select" />)

    expect(screen.getByTestId('select')).toBeInTheDocument()
  })

  it('should render options', () => {
    render(<Select data-testid="select" options={mockOptions} />)

    const select = screen.getByTestId('select').children[0]

    fireEvent.mouseDown(select)

    const options = mockOptions.map(option => {
      return screen.getByText(option.label)
    })

    options.forEach(option => {
      expect(option).toBeInTheDocument()
    })
  })

  it('should call onChange callback when clicked on option', () => {
    const onChange = jest.fn()

    render(<Select data-testid="select" options={mockOptions} onChange={onChange} />)

    const select = screen.getByTestId('select').children[0]

    fireEvent.mouseDown(select)

    const option = screen.getByText(mockOptions[0].label)

    fireEvent.click(option)

    expect(onChange).toHaveBeenCalledWith(mockOptions[0].value, mockOptions[0])
  })
})
