import { useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { BankSettingsCustomers } from '@/domains/bankSettings'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { DictionaryValue, DictionaryValueStatuses } from '@/domains/dictionaries'

import { BankSettingsCustomersTabContent } from './index'
import { BankSettingsTabsKeys } from '../../consts'
import { useAllDictionaryValuesByDictionaryCode } from '../../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode'
import { useBankSettingsCustomers } from '../../../../domains/bankSettings/useBankSettingsCustomers'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode')
jest.mock('../../../../domains/bankSettings/useBankSettingsCustomers')

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankSettingsCustomersMock = useBankSettingsCustomers as jest.MockedFunction<any>
const useAllDictionaryValuesByDictionaryCodeMock =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAllDictionaryValuesByDictionaryCode as jest.MockedFunction<any>

const setBankSettingsFormsEditModeMapMock = jest.fn()

export const bankSettingsCustomersMock: BankSettingsCustomers = {
  internalCodeLength: 20,
  isUsedUnitCodeInInternalCode: true,
  internalCodeAllowedSymbolsDictionaryValueId: 1,
  internalCodeFreeSegmentDictionaryValueId: 2,
  minAgeForOnboarding: 20,
  KYCPeriod: 20,
  documentTypeForPhotoDictionaryValueId: 3,
  documentTypeForSignatureDictionaryValueId: 4,
  defaultLegalFormForNaturalPersonDictionaryValueId: 5,
  defaultEconomicSectorForNaturalPersonDictionaryValueId: 6,
}

const dictionaryValuesMock: DictionaryValue[] = [
  {
    id: 1,
    name: 'Name1',
    code: '1',
    status: DictionaryValueStatuses.Active,
    index: 1,
  },
  {
    id: 2,
    name: 'Name2',
    code: '2',
    status: DictionaryValueStatuses.Active,
    index: 2,
  },
  {
    id: 3,
    name: 'Name3',
    code: '3',
    status: DictionaryValueStatuses.Active,
    index: 3,
  },
  {
    id: 4,
    name: 'Name4',
    code: '4',
    status: DictionaryValueStatuses.Active,
    index: 4,
  },
  {
    id: 5,
    name: 'Name5',
    code: '5',
    status: DictionaryValueStatuses.Active,
    index: 5,
  },
  {
    id: 6,
    name: 'Name6',
    code: '6',
    status: DictionaryValueStatuses.Active,
    index: 6,
  },
]

describe('BankSettingsCustomersTabContent', () => {
  afterEach(() => {
    useBankSettingsCustomersMock.mockReset()
    useAllDictionaryValuesByDictionaryCodeMock.mockReset()
    setBankSettingsFormsEditModeMapMock.mockReset()
  })

  it('should show component content in a view mode', () => {
    useBankSettingsCustomersMock.mockReturnValue({
      getBankSettingsCustomers: {
        isLoading: false,
        data: bankSettingsCustomersMock,
      },
      editBankSettingsCustomers: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useAllDictionaryValuesByDictionaryCodeMock.mockReturnValue({
      getAllDictionaryValuesByDictionaryCode: {
        isLoading: false,
        data: [],
      },
    })

    render(
      <BankSettingsCustomersTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    expect(screen.queryByText('bank-settings:tabs.customers.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeEnabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // InputNumberField internalCodeLength
    expect(
      screen.queryByText('bank-settings:tabs.customers.form.labels.internalCodeLength')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'internalCodeLength' })).toBeDisabled()
    expect(screen.queryByRole('spinbutton', { name: 'internalCodeLength' })).toHaveDisplayValue(
      String(bankSettingsCustomersMock['internalCodeLength'])
    )

    // CheckboxField isUsedUnitCodeInInternalCode
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.customers.form.labels.isUsedUnitCodeInInternalCode'
      )
    ).toBeChecked()
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.customers.form.labels.isUsedUnitCodeInInternalCode'
      )
    ).toBeDisabled()

    // SelectField internalCodeAllowedSymbolsDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.customers.form.labels.internalCodeAllowedSymbolsDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'internalCodeAllowedSymbolsDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(bankSettingsCustomersMock['internalCodeAllowedSymbolsDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField internalCodeFreeSegmentDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.customers.form.labels.internalCodeFreeSegmentDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'internalCodeFreeSegmentDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(bankSettingsCustomersMock['internalCodeFreeSegmentDictionaryValueId'])
    ).toBeInTheDocument()

    // InputNumberField minAgeForOnboarding
    expect(
      screen.queryByText('bank-settings:tabs.customers.form.labels.minAgeForOnboarding')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'minAgeForOnboarding' })).toBeDisabled()
    expect(screen.queryByRole('spinbutton', { name: 'minAgeForOnboarding' })).toHaveDisplayValue(
      String(bankSettingsCustomersMock['minAgeForOnboarding'])
    )

    // InputNumberField KYCPeriod
    expect(
      screen.queryByText('bank-settings:tabs.customers.form.labels.KYCPeriod')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'KYCPeriod' })).toBeDisabled()
    expect(screen.queryByRole('spinbutton', { name: 'KYCPeriod' })).toHaveDisplayValue(
      String(bankSettingsCustomersMock['KYCPeriod'])
    )

    // SelectField documentTypeForPhotoDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.customers.form.labels.documentTypeForPhotoDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'documentTypeForPhotoDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(bankSettingsCustomersMock['documentTypeForPhotoDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField documentTypeForSignatureDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.customers.form.labels.documentTypeForSignatureDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'documentTypeForSignatureDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(bankSettingsCustomersMock['documentTypeForSignatureDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField defaultLegalFormForNaturalPersonDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.customers.form.labels.defaultLegalFormForNaturalPersonDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'defaultLegalFormForNaturalPersonDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(
        bankSettingsCustomersMock[
          'defaultLegalFormForNaturalPersonDictionaryValueId'
        ] as NonNullable<BankSettingsCustomers['defaultLegalFormForNaturalPersonDictionaryValueId']>
      )
    ).toBeInTheDocument()

    // SelectField defaultLegalFormForNaturalPersonDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.customers.form.labels.defaultEconomicSectorForNaturalPersonDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', {
        name: 'defaultEconomicSectorForNaturalPersonDictionaryValueId',
      })
    ).toBeDisabled()
    expect(
      screen.queryByText(
        bankSettingsCustomersMock[
          'defaultEconomicSectorForNaturalPersonDictionaryValueId'
        ] as NonNullable<
          BankSettingsCustomers['defaultEconomicSectorForNaturalPersonDictionaryValueId']
        >
      )
    ).toBeInTheDocument()
  })

  it('should show component content in the edit mode', () => {
    useBankSettingsCustomersMock.mockReturnValue({
      getBankSettingsCustomers: {
        isLoading: false,
        data: bankSettingsCustomersMock,
      },
      editBankSettingsCustomers: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useAllDictionaryValuesByDictionaryCodeMock.mockReturnValue({
      getAllDictionaryValuesByDictionaryCode: {
        isLoading: false,
        data: dictionaryValuesMock,
      },
    })

    render(
      <BankSettingsCustomersTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: true,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const cancelButton = screen.queryByText('common:buttons.cancel')?.closest('button')
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    expect(screen.queryByText('bank-settings:tabs.customers.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeDisabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // InputNumberField internalCodeLength
    expect(
      screen.queryByText('bank-settings:tabs.customers.form.labels.internalCodeLength')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'internalCodeLength' })).toBeEnabled()
    expect(screen.queryByRole('spinbutton', { name: 'internalCodeLength' })).toHaveDisplayValue(
      String(bankSettingsCustomersMock['internalCodeLength'])
    )

    // CheckboxField isUsedUnitCodeInInternalCode
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.customers.form.labels.isUsedUnitCodeInInternalCode'
      )
    ).toBeChecked()
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.customers.form.labels.isUsedUnitCodeInInternalCode'
      )
    ).toBeEnabled()

    // SelectField internalCodeAllowedSymbolsDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.customers.form.labels.internalCodeAllowedSymbolsDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'internalCodeAllowedSymbolsDictionaryValueId' })
    ).toBeEnabled()
    expect(screen.queryByText(dictionaryValuesMock[0].name)).toBeInTheDocument()

    // SelectField internalCodeFreeSegmentDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.customers.form.labels.internalCodeFreeSegmentDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'internalCodeFreeSegmentDictionaryValueId' })
    ).toBeEnabled()
    expect(screen.queryByText(dictionaryValuesMock[1].name)).toBeInTheDocument()

    // InputNumberField minAgeForOnboarding
    expect(
      screen.queryByText('bank-settings:tabs.customers.form.labels.minAgeForOnboarding')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'minAgeForOnboarding' })).toBeEnabled()
    expect(screen.queryByRole('spinbutton', { name: 'minAgeForOnboarding' })).toHaveDisplayValue(
      String(bankSettingsCustomersMock['minAgeForOnboarding'])
    )

    // InputNumberField KYCPeriod
    expect(
      screen.queryByText('bank-settings:tabs.customers.form.labels.KYCPeriod')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'KYCPeriod' })).toBeEnabled()
    expect(screen.queryByRole('spinbutton', { name: 'KYCPeriod' })).toHaveDisplayValue(
      String(bankSettingsCustomersMock['KYCPeriod'])
    )

    // SelectField documentTypeForPhotoDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.customers.form.labels.documentTypeForPhotoDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'documentTypeForPhotoDictionaryValueId' })
    ).toBeEnabled()
    expect(screen.queryByText(dictionaryValuesMock[2].name)).toBeInTheDocument()

    // SelectField documentTypeForSignatureDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.customers.form.labels.documentTypeForSignatureDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'documentTypeForSignatureDictionaryValueId' })
    ).toBeEnabled()
    expect(screen.queryByText(dictionaryValuesMock[3].name)).toBeInTheDocument()

    // SelectField defaultLegalFormForNaturalPersonDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.customers.form.labels.defaultLegalFormForNaturalPersonDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'defaultLegalFormForNaturalPersonDictionaryValueId' })
    ).toBeEnabled()
    expect(screen.queryByText(dictionaryValuesMock[4].name)).toBeInTheDocument()

    // SelectField defaultLegalFormForNaturalPersonDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.customers.form.labels.defaultEconomicSectorForNaturalPersonDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', {
        name: 'defaultEconomicSectorForNaturalPersonDictionaryValueId',
      })
    ).toBeEnabled()
    expect(screen.queryByText(dictionaryValuesMock[5].name)).toBeInTheDocument()

    // Controls
    expect(cancelButton).toBeEnabled()
    expect(saveButton).toBeInTheDocument()
  })

  it('should handle success submit of the form', async () => {
    useBankSettingsCustomersMock.mockReturnValue({
      getBankSettingsCustomers: {
        isLoading: false,
        data: bankSettingsCustomersMock,
      },
      editBankSettingsCustomers: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useAllDictionaryValuesByDictionaryCodeMock.mockReturnValue({
      getAllDictionaryValuesByDictionaryCode: {
        isLoading: false,
        data: dictionaryValuesMock,
      },
    })

    render(
      <BankSettingsCustomersTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: true,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const checkbox = screen.queryByLabelText(
      'bank-settings:tabs.customers.form.labels.isUsedUnitCodeInInternalCode'
    )
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    if (!checkbox || !saveButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.click(checkbox)
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useBankSettingsCustomersMock.mockReturnValue({
      getBankSettingsCustomers: {
        isLoading: false,
        data: bankSettingsCustomersMock,
      },
      editBankSettingsCustomers: {
        isLoading: false,
        mutateAsync: jest.fn(() => Promise.reject({ body: { message: '' } })),
      },
    })
    useAllDictionaryValuesByDictionaryCodeMock.mockReturnValue({
      getAllDictionaryValuesByDictionaryCode: {
        isLoading: false,
        data: dictionaryValuesMock,
      },
    })

    render(
      <BankSettingsCustomersTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: true,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const checkbox = screen.queryByLabelText(
      'bank-settings:tabs.customers.form.labels.isUsedUnitCodeInInternalCode'
    )
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    if (!checkbox || !saveButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.click(checkbox)
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
    })
  })

  it('should have unsaved changes handling', () => {
    useBankSettingsCustomersMock.mockReturnValue({
      getBankSettingsCustomers: {
        isLoading: false,
        data: bankSettingsCustomersMock,
      },
      editBankSettingsCustomers: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useAllDictionaryValuesByDictionaryCodeMock.mockReturnValue({
      getAllDictionaryValuesByDictionaryCode: {
        isLoading: false,
        data: dictionaryValuesMock,
      },
    })

    render(
      <BankSettingsCustomersTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: true,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
