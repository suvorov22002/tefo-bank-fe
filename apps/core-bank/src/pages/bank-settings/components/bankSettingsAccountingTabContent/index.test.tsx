import { useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { BankSettingsAccounting } from '@/domains/bankSettings'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { DictionaryValue, DictionaryValueStatuses } from '@/domains/dictionaries'

import { BankSettingsAccountingTabContent } from './index'
import { BankSettingsTabsKeys } from '../../consts'
import { useAllDictionaryValuesByDictionaryCode } from '../../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode'
import { useBankSettingsAccounting } from '../../../../domains/bankSettings/useBankSettingsAccounting'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode')
jest.mock('../../../../domains/bankSettings/useBankSettingsAccounting')

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankSettingsAccountingMock = useBankSettingsAccounting as jest.MockedFunction<any>
const useAllDictionaryValuesByDictionaryCodeMock =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAllDictionaryValuesByDictionaryCode as jest.MockedFunction<any>

const setBankSettingsFormsEditModeMapMock = jest.fn()

export const bankSettingsAccountingMock: BankSettingsAccounting = {
  accountingMethodDictionaryValueId: 1,
  accountingSystemTypeDictionaryValueId: 2,
  accountNumberLength: 20,
  isUsedIBAN: true,
  accountNumberAllowedSymbolsDictionaryValueId: 3,
  accountNumberFreeSegmentDictionaryValueId: 4,
  IBANLength: 27,
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

describe('BankSettingsAccountingTabContent', () => {
  afterEach(() => {
    useBankSettingsAccountingMock.mockReset()
    useAllDictionaryValuesByDictionaryCodeMock.mockReset()
    setBankSettingsFormsEditModeMapMock.mockReset()
  })

  it('should show component content in a view mode', () => {
    useBankSettingsAccountingMock.mockReturnValue({
      getBankSettingsAccounting: {
        isLoading: false,
        data: bankSettingsAccountingMock,
      },
      editBankSettingsAccounting: {
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
      <BankSettingsAccountingTabContent
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

    expect(screen.queryByText('bank-settings:tabs.accounting.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeEnabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // SelectField accountingMethodDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.accounting.form.labels.accountingMethodDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'accountingMethodDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(
        bankSettingsAccountingMock['accountingMethodDictionaryValueId'] as NonNullable<
          BankSettingsAccounting['accountingMethodDictionaryValueId']
        >
      )
    ).toBeInTheDocument()
    expect(screen.queryByText('common:forms.helpMessages.canBeSetOnce')).toBeInTheDocument()

    // SelectField accountingSystemTypeDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.accounting.form.labels.accountingSystemTypeDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'accountingSystemTypeDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(
        bankSettingsAccountingMock['accountingSystemTypeDictionaryValueId'] as NonNullable<
          BankSettingsAccounting['accountingSystemTypeDictionaryValueId']
        >
      )
    ).toBeInTheDocument()

    // InputNumberField accountNumberLength
    expect(
      screen.queryByText('bank-settings:tabs.accounting.form.labels.accountNumberLength')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'accountNumberLength' })).toBeDisabled()
    expect(screen.queryByRole('spinbutton', { name: 'accountNumberLength' })).toHaveDisplayValue(
      String(bankSettingsAccountingMock['accountNumberLength'])
    )

    // SelectField accountNumberAllowedSymbolsDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.accounting.form.labels.accountNumberAllowedSymbolsDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'accountNumberAllowedSymbolsDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(
        bankSettingsAccountingMock['accountNumberAllowedSymbolsDictionaryValueId'] as NonNullable<
          BankSettingsAccounting['accountNumberAllowedSymbolsDictionaryValueId']
        >
      )
    ).toBeInTheDocument()

    // SelectField accountNumberFreeSegmentDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.accounting.form.labels.accountNumberFreeSegmentDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'accountNumberFreeSegmentDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(
        bankSettingsAccountingMock['accountNumberFreeSegmentDictionaryValueId'] as NonNullable<
          BankSettingsAccounting['accountNumberFreeSegmentDictionaryValueId']
        >
      )
    ).toBeInTheDocument()

    // CheckboxField isUsedIBAN
    expect(
      screen.queryByLabelText('bank-settings:tabs.accounting.form.labels.isUsedIBAN')
    ).toBeChecked()
    expect(
      screen.queryByLabelText('bank-settings:tabs.accounting.form.labels.isUsedIBAN')
    ).toBeDisabled()

    // InputNumberField IBANLength
    expect(
      screen.queryByText('bank-settings:tabs.accounting.form.labels.IBANLength')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'IBANLength' })).toBeDisabled()
    expect(screen.queryByRole('spinbutton', { name: 'IBANLength' })).toHaveDisplayValue(
      String(bankSettingsAccountingMock['IBANLength'])
    )
  })

  it('should show component content in the initial edit mode', async () => {
    useBankSettingsAccountingMock.mockReturnValue({
      getBankSettingsAccounting: {
        isLoading: false,
        data: {
          accountingMethodDictionaryValueId: '',
          accountingSystemTypeDictionaryValueId: '',
          accountNumberLength: 0,
          accountNumberAllowedSymbolsDictionaryValueId: '',
          accountNumberFreeSegmentDictionaryValueId: '',
          isUsedIBAN: false,
          IBANLength: 0,
        },
      },
      editBankSettingsAccounting: {
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
      <BankSettingsAccountingTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: true,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const accountingMethodField = screen.getByRole('combobox', {
      name: 'accountingMethodDictionaryValueId',
    })
    const accountingSystemTypeField = screen.getByRole('combobox', {
      name: 'accountingSystemTypeDictionaryValueId',
    })
    const accountingNumberLengthField = screen.getByRole('spinbutton', {
      name: 'accountNumberLength',
    })
    const accountNumberAllowedSymbolsField = screen.getByRole('combobox', {
      name: 'accountNumberAllowedSymbolsDictionaryValueId',
    })
    const accountNumberFreeSegmentField = screen.getByRole('combobox', {
      name: 'accountNumberFreeSegmentDictionaryValueId',
    })
    const IBANIsUsedField = screen.getByLabelText(
      'bank-settings:tabs.accounting.form.labels.isUsedIBAN'
    )
    const IBANLengthField = screen.getByRole('spinbutton', { name: 'IBANLength' })
    const cancelButton = screen.getByText('common:buttons.cancel')?.closest('button')
    const saveButton = screen.getByText('common:buttons.save')?.closest('button')

    if (!saveButton) {
      throw new Error('Unable to find elements')
    }

    expect(screen.queryByText('bank-settings:tabs.accounting.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeDisabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // SelectField accountingMethodDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.accounting.form.labels.accountingMethodDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(accountingMethodField).toBeEnabled()
    expect(screen.queryByText('common:forms.helpMessages.canBeSetOnce')).toBeInTheDocument()

    // SelectField accountingSystemTypeDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.accounting.form.labels.accountingSystemTypeDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(accountingSystemTypeField).toBeEnabled()

    // InputNumberField accountNumberLength
    expect(
      screen.queryByText('bank-settings:tabs.accounting.form.labels.accountNumberLength')
    ).toBeInTheDocument()
    expect(accountingNumberLengthField).toBeEnabled()

    // SelectField accountNumberAllowedSymbolsDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.accounting.form.labels.accountNumberAllowedSymbolsDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(accountNumberAllowedSymbolsField).toBeEnabled()

    // SelectField accountNumberFreeSegmentDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.accounting.form.labels.accountNumberFreeSegmentDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(accountNumberFreeSegmentField).toBeEnabled()

    // CheckboxField isUsedIBAN
    expect(IBANIsUsedField).not.toBeChecked()
    expect(IBANIsUsedField).toBeEnabled()

    // InputNumberField IBANLength
    expect(
      screen.queryByText('bank-settings:tabs.accounting.form.labels.IBANLength')
    ).toBeInTheDocument()
    expect(IBANLengthField).toBeEnabled()

    // Controls
    expect(cancelButton).toBeEnabled()
    expect(saveButton).toBeInTheDocument()

    act(() => {
      fireEvent.mouseDown(accountingMethodField)
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByText(dictionaryValuesMock[0].name)[0])
    })

    act(() => {
      fireEvent.mouseDown(accountingSystemTypeField)
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByText(dictionaryValuesMock[1].name)[1])
    })

    act(() => {
      fireEvent.change(accountingNumberLengthField, {
        target: {
          value: bankSettingsAccountingMock.accountNumberLength,
        },
      })
    })

    await act(() => {
      fireEvent.mouseDown(accountNumberAllowedSymbolsField)
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByText(dictionaryValuesMock[2].name)[2])
    })

    act(() => {
      fireEvent.mouseDown(accountNumberFreeSegmentField)
    })
    await waitFor(() => {
      fireEvent.click(screen.getAllByText(dictionaryValuesMock[3].name)[3])
    })

    act(() => {
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:popconfirms.canBeSetOnceTitle')).toBeVisible()
      expect(screen.queryByText('common:popconfirms.canBeSetOnceDescription')).toBeVisible()
      expect(screen.queryByText('common:buttons.yes')).toBeVisible()
      expect(screen.queryByText('common:buttons.no')).toBeVisible()
    })
  })

  it('should show component content in the regular edit mode', () => {
    useBankSettingsAccountingMock.mockReturnValue({
      getBankSettingsAccounting: {
        isLoading: false,
        data: bankSettingsAccountingMock,
      },
      editBankSettingsAccounting: {
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
      <BankSettingsAccountingTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: true,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const cancelButton = screen.queryByText('common:buttons.cancel')?.closest('button')
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    expect(screen.queryByText('bank-settings:tabs.accounting.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeDisabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // SelectField accountingMethodDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.accounting.form.labels.accountingMethodDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'accountingMethodDictionaryValueId' })
    ).toBeDisabled()
    expect(screen.queryByText(dictionaryValuesMock[0].name)).toBeInTheDocument()
    expect(screen.queryByText('common:forms.helpMessages.canBeSetOnce')).toBeInTheDocument()

    // SelectField accountingSystemTypeDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.accounting.form.labels.accountingSystemTypeDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'accountingSystemTypeDictionaryValueId' })
    ).toBeEnabled()
    expect(screen.queryByText(dictionaryValuesMock[1].name)).toBeInTheDocument()

    // InputNumberField accountNumberLength
    expect(
      screen.queryByText('bank-settings:tabs.accounting.form.labels.accountNumberLength')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'accountNumberLength' })).toBeEnabled()
    expect(screen.queryByRole('spinbutton', { name: 'accountNumberLength' })).toHaveDisplayValue(
      String(bankSettingsAccountingMock['accountNumberLength'])
    )

    // SelectField accountNumberAllowedSymbolsDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.accounting.form.labels.accountNumberAllowedSymbolsDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'accountNumberAllowedSymbolsDictionaryValueId' })
    ).toBeEnabled()
    expect(screen.queryByText(dictionaryValuesMock[2].name)).toBeInTheDocument()

    // SelectField accountNumberFreeSegmentDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.accounting.form.labels.accountNumberFreeSegmentDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'accountNumberFreeSegmentDictionaryValueId' })
    ).toBeEnabled()
    expect(screen.queryByText(dictionaryValuesMock[3].name)).toBeInTheDocument()

    // CheckboxField isUsedIBAN
    expect(
      screen.queryByLabelText('bank-settings:tabs.accounting.form.labels.isUsedIBAN')
    ).toBeChecked()
    expect(
      screen.queryByLabelText('bank-settings:tabs.accounting.form.labels.isUsedIBAN')
    ).toBeEnabled()

    // InputNumberField IBANLength
    expect(
      screen.queryByText('bank-settings:tabs.accounting.form.labels.IBANLength')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'IBANLength' })).toBeEnabled()
    expect(screen.queryByRole('spinbutton', { name: 'IBANLength' })).toHaveDisplayValue(
      String(bankSettingsAccountingMock['IBANLength'])
    )

    // Controls
    expect(cancelButton).toBeEnabled()
    expect(saveButton).toBeInTheDocument()
  })

  it('should handle success submit of the form', async () => {
    useBankSettingsAccountingMock.mockReturnValue({
      getBankSettingsAccounting: {
        isLoading: false,
        data: bankSettingsAccountingMock,
      },
      editBankSettingsAccounting: {
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
      <BankSettingsAccountingTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: true,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const checkbox = screen.queryByLabelText('bank-settings:tabs.accounting.form.labels.isUsedIBAN')
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
    useBankSettingsAccountingMock.mockReturnValue({
      getBankSettingsAccounting: {
        isLoading: false,
        data: bankSettingsAccountingMock,
      },
      editBankSettingsAccounting: {
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
      <BankSettingsAccountingTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: true,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const checkbox = screen.queryByLabelText('bank-settings:tabs.accounting.form.labels.isUsedIBAN')
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
    useBankSettingsAccountingMock.mockReturnValue({
      getBankSettingsAccounting: {
        isLoading: false,
        data: bankSettingsAccountingMock,
      },
      editBankSettingsAccounting: {
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
      <BankSettingsAccountingTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: true,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: false,
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
