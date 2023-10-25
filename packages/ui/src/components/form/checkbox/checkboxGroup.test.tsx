import { fireEvent, render, screen } from '@testing-library/react'

import { CheckboxGroup } from './checkboxGroup'

describe('Checkbox', () => {
  const mockOptions = [
    {
      label: 'Apple',
      value: 'APPLE',
      'data-testid': 'option',
    },
    {
      label: 'Orange',
      value: 'ORANGE',
    },
    {
      label: 'Watermelon',
      value: 'WATERMELON',
      'data-testid': 'option',
    },
  ]

  it('should render without crashing', () => {
    render(<CheckboxGroup data-testid="checkboxGroup" name="option" options={mockOptions} />)

    expect(screen.getByTestId('checkboxGroup')).toBeInTheDocument()
  })

  it('should pass name to all elements of the group', () => {
    render(<CheckboxGroup name="option" options={mockOptions} />)

    expect(document.querySelectorAll('input[name="option"]')).toHaveLength(mockOptions.length)
  })

  it('should call onChange when clicked on the element of group', () => {
    const onChangeMock = jest.fn()

    render(
      <CheckboxGroup data-testid="checkboxGroup" options={mockOptions} onChange={onChangeMock} />
    )

    fireEvent.click(screen.getByTestId('checkboxGroup').children[0])

    expect(onChangeMock).toBeCalledTimes(1)
  })

  it('should handle value', () => {
    render(
      <CheckboxGroup
        data-testid="checkboxGroup"
        options={mockOptions}
        value={[mockOptions[0].value]}
      />
    )

    const checkboxGroupElements = screen
      .getByTestId('checkboxGroup')
      .querySelectorAll('input[type="checkbox"]')

    expect(checkboxGroupElements[0]).toBeChecked()
    expect(checkboxGroupElements[1]).not.toBeChecked()
    expect(checkboxGroupElements[2]).not.toBeChecked()
  })

  it('should check group element after click', () => {
    render(<CheckboxGroup data-testid="checkboxGroup" options={mockOptions} />)

    const checkboxGroupElements = screen
      .getByTestId('checkboxGroup')
      .querySelectorAll('input[type="checkbox"]')

    checkboxGroupElements.forEach(element => {
      expect(element).not.toBeChecked()
    })

    checkboxGroupElements.forEach(element => {
      fireEvent.click(element)
    })

    checkboxGroupElements.forEach(element => {
      expect(element).toBeChecked()
    })
  })
})
