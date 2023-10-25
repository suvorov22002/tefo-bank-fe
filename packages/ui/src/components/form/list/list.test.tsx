import { fireEvent, render, screen } from '@testing-library/react'

import { List } from './list'

describe('list', () => {
  it('should render', () => {
    render(<List addNewItemButtonText="" data-testid="list" />)

    expect(screen.getByTestId('list')).toBeInTheDocument()
  })

  it('should render addNewItemButtonText', () => {
    render(<List addNewItemButtonText="testText" data-testid="list" />)

    const selectInput = screen.getByTestId('list').children[0]

    fireEvent.mouseDown(selectInput)

    expect(screen.getByText('testText')).toBeInTheDocument()
  })

  it('should handle add new item', () => {
    const handleAddNewItem = jest.fn()

    render(
      <List addNewItemButtonText="testText" data-testid="list" onAddNewItem={handleAddNewItem} />
    )

    const selectInput = screen.getByTestId('list').children[0]

    fireEvent.mouseDown(selectInput)

    const addNewItemInput = screen.getByRole('textbox')
    const addNewItemButton = screen.getByRole('button')

    fireEvent.change(addNewItemInput, {
      target: {
        value: 'newOption',
      },
    })

    fireEvent.click(addNewItemButton)

    expect(addNewItemInput).toHaveValue('')
    expect(
      screen.getByRole('option', {
        name: 'newOption',
      })
    ).toBeInTheDocument()
    expect(handleAddNewItem).toBeCalledTimes(1)

    fireEvent.change(addNewItemInput, {
      target: {
        value: 'newOption',
      },
    })

    fireEvent.click(addNewItemButton)

    expect(handleAddNewItem).toBeCalledTimes(1)
  })
})
