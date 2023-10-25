import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { Button } from '../../button'
import { Form } from './form'
import { InputField } from '../input'

interface MockFormValues {
  firstName: string
  lastName: string
}

const mockInitialValues: MockFormValues = {
  firstName: '',
  lastName: '',
}

describe('form', () => {
  const mockFunctions = {} as { handleSubmit: jest.Mock }

  beforeEach(() => {
    mockFunctions.handleSubmit = jest.fn()
  })

  const mockChildren = () => (
    <>
      <InputField name="firstName" data-testid="firstName" />
      <InputField name="lastName" data-testid="lastName" />
      <Button htmlType="submit">Submit</Button>
    </>
  )

  it('Should render without crashing', () => {
    render(
      <Form initialValues={mockInitialValues} onSubmit={mockFunctions.handleSubmit}>
        {mockChildren}
      </Form>
    )

    expect(document.querySelector('form')).toBeInTheDocument()
  })

  it('Should submit with correct values', async () => {
    render(
      <Form initialValues={mockInitialValues} onSubmit={mockFunctions.handleSubmit}>
        {mockChildren}
      </Form>
    )

    const firstNameInput = screen.getByTestId('firstName')
    const lastNameInput = screen.getByTestId('lastName')
    const submitButton = screen.getByRole('button')

    act(() => {
      fireEvent.change(firstNameInput, {
        target: {
          value: 'first name',
        },
      })

      fireEvent.change(lastNameInput, {
        target: {
          value: 'last name',
        },
      })

      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockFunctions.handleSubmit).toBeCalledWith(
        {
          firstName: 'first name',
          lastName: 'last name',
        },
        expect.any(Object)
      )
    })
  })

  it('should not submit when there is initial validation errors', async () => {
    render(
      <Form
        initialValues={mockInitialValues}
        onSubmit={mockFunctions.handleSubmit}
        initialErrors={{
          firstName: 'Required',
        }}
      >
        {mockChildren}
      </Form>
    )

    const submitButton = screen.getByRole('button')

    act(() => {
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockFunctions.handleSubmit).toBeCalledTimes(0)
    })
  })

  it('should handle form level validation', async () => {
    render(
      <Form
        initialValues={mockInitialValues}
        onSubmit={mockFunctions.handleSubmit}
        validate={values => {
          const errors: Partial<MockFormValues> = {}

          if (!values.firstName) errors.firstName = 'Required'
          if (!values.lastName) errors.lastName = 'Required'

          return errors
        }}
      >
        {mockChildren}
      </Form>
    )

    const submitButton = screen.getByRole('button')
    const firstNameInput = screen.getByTestId('firstName')
    const lastNameInput = screen.getByTestId('lastName')

    act(() => {
      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockFunctions.handleSubmit).toBeCalledTimes(0)
      expect(screen.getAllByText('Required')).toHaveLength(2)
    })

    act(() => {
      fireEvent.change(firstNameInput, {
        target: {
          value: 'first name',
        },
      })

      fireEvent.change(lastNameInput, {
        target: {
          value: 'last name',
        },
      })

      fireEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockFunctions.handleSubmit).toBeCalled()
      expect(screen.queryAllByText('Required')).toHaveLength(0)
    })
  })
})
