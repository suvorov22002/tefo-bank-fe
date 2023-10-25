import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { i18nMock } from '@/_tests/mocks/i18n'

import { BankInformationVerifyView } from './index'
import { CreateBankProfileFormValues } from '../../types'

jest.mock('next-i18next', () => i18nMock)

describe('BankInformationVerifyView', () => {
  const initialValues: CreateBankProfileFormValues = {
    shortName: 'shortName',
    longName: 'longName',
    streetLine: 'Parker ave.14',
    city: 'New York',
    country: 'France',
    zipCode: '95880',
    region: 'Normandy',
    email: 'simple@example.com',
    phoneCode: '+237',
    shortPhoneNumber: '1234567890',
    codeGroup: '232131',
    swiftCode: '23112321',
  }

  const mockFunctions = {} as {
    onSubmit: jest.Mock
  }

  beforeEach(() => {
    mockFunctions.onSubmit = jest.fn()
  })

  it('should render form', () => {
    const { container } = render(
      <BankInformationVerifyView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />
    )

    expect(container.querySelector('form')).toBeInTheDocument()
  })

  it('submit button should be disabled if information is not verified', async () => {
    render(
      <BankInformationVerifyView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />
    )

    const informationVerifiedCheckbox = screen.getByRole('checkbox')
    const continueButton = screen.getByRole('button')

    await waitFor(() => {
      expect(continueButton).toBeDisabled()
    })

    act(() => {
      fireEvent.click(informationVerifiedCheckbox)
    })

    await waitFor(() => {
      expect(continueButton).toBeEnabled()
    })
  })

  it('should show all fields', () => {
    render(
      <BankInformationVerifyView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />
    )
    const shortNameInput = document.querySelector('input[name="shortName"]')
    const longNameInput = document.querySelector('input[name="longName"]')
    const streetInput = document.querySelector('input[name="streetLine"]')
    const cityInput = document.querySelector('input[name="city"]')
    const countryInput = document.querySelector('input[name="country"]')
    const zipInput = document.querySelector('input[name="zipCode"]')
    const regionInput = document.querySelector('input[name="region"]')
    const emailInput = document.querySelector('input[name="email"]')
    const phoneNumberCodeInput = document.querySelector('input[name="phoneCode"]')
    const phoneNumberNumberInput = document.querySelector('input[name="shortPhoneNumber"]')
    const swiftCodeInput = document.querySelector('input[name="swiftCode"]')
    const codeGroupInput = document.querySelector('input[name="codeGroup"]')

    const inputs = [
      shortNameInput,
      longNameInput,
      streetInput,
      cityInput,
      countryInput,
      zipInput,
      regionInput,
      emailInput,
      phoneNumberCodeInput,
      phoneNumberNumberInput,
      swiftCodeInput,
      codeGroupInput,
    ]

    // TODO: Move it to the test utils
    const missingElementIndex = inputs.findIndex(input => !input)

    if (missingElementIndex > -1) {
      throw new Error(`Unable to find elements ${missingElementIndex}`)
    }

    inputs.forEach(input => expect(input).toBeInTheDocument())
  })

  it('should handle onSubmit', async () => {
    render(
      <BankInformationVerifyView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />
    )

    const cityInput = screen.getByRole('textbox', { name: 'city' })
    const continueButton = screen.getByRole('button')
    const informationVerifiedCheckbox = screen.getByRole('checkbox')

    act(() => {
      fireEvent.change(cityInput, {
        target: {
          value: 'New York333',
        },
      })
      fireEvent.click(informationVerifiedCheckbox)
      fireEvent.click(continueButton)
    })

    await waitFor(() => {
      expect(mockFunctions.onSubmit).toBeCalledTimes(1)
      expect(mockFunctions.onSubmit).toBeCalledWith(
        {
          ...initialValues,
          city: 'New York333',
          informationVerified: true,
        },
        expect.any(Object)
      )
    })
  })
})
