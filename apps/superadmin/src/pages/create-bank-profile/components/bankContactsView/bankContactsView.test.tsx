import { Text } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { i18nMock } from '@/_tests/mocks/i18n'

import { BankContactsFormValues } from '../../types'
import { BankContactsView } from './index'

jest.mock('next-i18next', () => i18nMock)

describe('BankContactsView', () => {
  const initialValues: BankContactsFormValues = {
    email: '',
    phoneCode: '',
    shortPhoneNumber: '',
  }
  const mockFunctions = {} as {
    onSubmit: jest.Mock
  }

  beforeEach(() => {
    mockFunctions.onSubmit = jest.fn()
  })

  it('should render form', () => {
    const { container } = render(
      <BankContactsView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />
    )

    expect(container.querySelector('form')).toBeInTheDocument()
  })

  it('should render step progress text', () => {
    render(
      <BankContactsView
        initialValues={initialValues}
        onSubmit={mockFunctions.onSubmit}
        stepProgressText={<Text>Step 3 of 4</Text>}
      />
    )

    expect(screen.getByText(/step 3 of 4/i)).toBeInTheDocument()
  })

  it('should render steps', () => {
    render(
      <BankContactsView
        initialValues={initialValues}
        onSubmit={mockFunctions.onSubmit}
        renderSteps={() => <div data-testid="mockSteps" />}
      />
    )

    expect(screen.getByTestId('mockSteps')).toBeInTheDocument()
  })

  it('submit button should be disabled if form is invalid', async () => {
    render(<BankContactsView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />)

    const emailInput = document.querySelector('input[name="email"]')

    if (!emailInput) {
      throw new Error('unable to find elements')
    }

    act(() => {
      fireEvent.change(emailInput, {
        target: {
          value: '@invalidEmail',
        },
      })
    })

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  it('should handle onSubmit', async () => {
    render(<BankContactsView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />)

    const emailInput = document.querySelector('input[name="email"]')
    const phoneNumberCodeInput = document.querySelector('input[name="phoneCode"]')
    const phoneNumberNumberInput = document.querySelector('input[name="shortPhoneNumber"]')

    if (!emailInput || !phoneNumberCodeInput || !phoneNumberNumberInput) {
      throw new Error('Unable to find elements')
    }

    const continueButton = screen.getByRole('button')

    act(() => {
      fireEvent.change(emailInput, {
        target: {
          value: 'simple@example.com',
        },
      })

      fireEvent.change(phoneNumberCodeInput, {
        target: {
          value: '+237',
        },
      })

      fireEvent.change(phoneNumberNumberInput, {
        target: {
          value: '1234567890',
        },
      })

      fireEvent.click(continueButton)
    })

    await waitFor(() => {
      expect(mockFunctions.onSubmit).toBeCalledTimes(1)
      expect(mockFunctions.onSubmit).toBeCalledWith(
        {
          email: 'simple@example.com',
          phoneCode: '+237',
          shortPhoneNumber: '1234567890',
        },
        expect.any(Object)
      )
    })
  })
})
