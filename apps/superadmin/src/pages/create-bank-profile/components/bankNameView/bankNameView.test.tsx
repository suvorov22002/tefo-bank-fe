import { Text } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { i18nMock } from '@/_tests/mocks/i18n'

import { BankNameFormValues } from '../../types'
import { BankNameView } from './index'

jest.mock('next-i18next', () => i18nMock)

describe('BankNameView', () => {
  const initialValues: BankNameFormValues = {
    shortName: '',
    longName: '',
  }
  const mockFunctions = {} as {
    onSubmit: jest.Mock
  }

  beforeEach(() => {
    mockFunctions.onSubmit = jest.fn()
  })

  it('should render form', () => {
    const { container } = render(
      <BankNameView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />
    )

    expect(container.querySelector('form')).toBeInTheDocument()
  })

  it('should render step progress text', () => {
    render(
      <BankNameView
        initialValues={initialValues}
        onSubmit={mockFunctions.onSubmit}
        stepProgressText={<Text>Step 1 of 4</Text>}
      />
    )

    expect(screen.getByText(/step 1 of 4/i)).toBeInTheDocument()
  })

  it('should render steps', () => {
    render(
      <BankNameView
        initialValues={initialValues}
        onSubmit={mockFunctions.onSubmit}
        renderSteps={() => <div data-testid="mockSteps" />}
      />
    )

    expect(screen.getByTestId('mockSteps')).toBeInTheDocument()
  })

  it('submit button should be disabled if form is invalid', async () => {
    render(<BankNameView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />)

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  it('should handle onSubmit', async () => {
    render(<BankNameView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />)

    const shortNameInput = document.querySelector('input[name="shortName"]')

    const longNameInput = document.querySelector('input[name="longName"]')

    if (!shortNameInput || !longNameInput) {
      throw new Error('Unable to find elements')
    }

    const continueButton = screen.getByRole('button')

    act(() => {
      fireEvent.change(shortNameInput, {
        target: {
          value: 'shortName',
        },
      })

      fireEvent.change(longNameInput, {
        target: {
          value: 'longName',
        },
      })

      fireEvent.click(continueButton)
    })

    await waitFor(() => {
      expect(mockFunctions.onSubmit).toBeCalledTimes(1)
      expect(mockFunctions.onSubmit).toBeCalledWith(
        {
          shortName: 'shortName',
          longName: 'longName',
        },
        expect.any(Object)
      )
    })
  })
})
