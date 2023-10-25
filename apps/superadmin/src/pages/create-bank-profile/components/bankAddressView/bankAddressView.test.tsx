import { Text } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { i18nMock } from '@/_tests/mocks/i18n'

import { BankAddressFormValues } from '../../types'
import { BankAddressView } from './index'

jest.mock('next-i18next', () => i18nMock)

describe('BankAddressView', () => {
  const initialValues: BankAddressFormValues = {
    streetLine: '',
    city: '',
    country: '',
    zipCode: '',
    region: '',
  }
  const mockFunctions = {} as {
    onSubmit: jest.Mock
  }

  beforeEach(() => {
    mockFunctions.onSubmit = jest.fn()
  })

  it('should render form', () => {
    const { container } = render(
      <BankAddressView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />
    )

    expect(container.querySelector('form')).toBeInTheDocument()
  })

  it('should render step progress text', () => {
    render(
      <BankAddressView
        initialValues={initialValues}
        onSubmit={mockFunctions.onSubmit}
        stepProgressText={<Text>Step 3 of 4</Text>}
      />
    )

    expect(screen.getByText(/step 3 of 4/i)).toBeInTheDocument()
  })

  it('should render steps', () => {
    render(
      <BankAddressView
        initialValues={initialValues}
        onSubmit={mockFunctions.onSubmit}
        renderSteps={() => <div data-testid="mockSteps" />}
      />
    )

    expect(screen.getByTestId('mockSteps')).toBeInTheDocument()
  })

  it('submit button should be disabled if form is invalid', async () => {
    render(<BankAddressView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />)

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  it('should handle onSubmit', async () => {
    render(<BankAddressView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />)

    const streetInput = document.querySelector('input[name="streetLine"]')
    const cityInput = document.querySelector('input[name="city"]')
    const countryInput = document.querySelector('input[name="country"]')
    const zipInput = document.querySelector('input[name="zipCode"]')
    const regionInput = document.querySelector('input[name="region"]')

    if (!streetInput || !cityInput || !countryInput || !zipInput || !regionInput) {
      throw new Error('Unable to find elements')
    }

    const continueButton = screen.getByRole('button')

    act(() => {
      fireEvent.change(streetInput, {
        target: {
          value: 'Parker ave.14',
        },
      })

      fireEvent.change(cityInput, {
        target: {
          value: 'New York',
        },
      })

      fireEvent.change(countryInput, {
        target: {
          value: 'France',
        },
      })

      fireEvent.change(zipInput, {
        target: {
          value: '95880',
        },
      })

      fireEvent.change(regionInput, {
        target: {
          value: 'Normandy',
        },
      })

      fireEvent.click(continueButton)
    })

    await waitFor(() => {
      expect(mockFunctions.onSubmit).toBeCalledTimes(1)
      expect(mockFunctions.onSubmit).toBeCalledWith(
        {
          streetLine: 'Parker ave.14',
          city: 'New York',
          country: 'France',
          zipCode: '95880',
          region: 'Normandy',
        },
        expect.any(Object)
      )
    })
  })
})
