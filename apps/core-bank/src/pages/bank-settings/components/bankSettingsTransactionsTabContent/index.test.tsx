import { useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { BankSettingsTransactions } from '@/domains/bankSettings'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { DictionaryValue, DictionaryValueStatuses } from '@/domains/dictionaries'

import { BankSettingsTabsKeys } from '../../consts'
import { BankSettingsTransactionsTabContent } from './index'
import { useAllDictionaryValuesByDictionaryCode } from '../../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode'
import { useBankSettingsTransactions } from '../../../../domains/bankSettings/useBankSettingsTransactions'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode')
jest.mock('../../../../domains/bankSettings/useBankSettingsTransactions')

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankSettingsTransactionsMock = useBankSettingsTransactions as jest.MockedFunction<any>
const useAllDictionaryValuesByDictionaryCodeMock =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAllDictionaryValuesByDictionaryCode as jest.MockedFunction<any>

const setBankSettingsFormsEditModeMapMock = jest.fn()

export const bankSettingsTransactionsMock: BankSettingsTransactions = {
  transactionNumberLength: 20,
  transactionNumberSymbolsDictionaryValueId: 1,
  transactionNumberUniquenessTermDictionaryValueId: 2,
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
]

describe('BankSettingsTransactionsTabContent', () => {
  afterEach(() => {
    useBankSettingsTransactionsMock.mockReset()
    useAllDictionaryValuesByDictionaryCodeMock.mockReset()
    setBankSettingsFormsEditModeMapMock.mockReset()
  })

  it('should show component content in a view mode', () => {
    useBankSettingsTransactionsMock.mockReturnValue({
      getBankSettingsTransactions: {
        isLoading: false,
        data: bankSettingsTransactionsMock,
      },
      editBankSettingsTransactions: {
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
      <BankSettingsTransactionsTabContent
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

    expect(screen.queryByText('bank-settings:tabs.transactions.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeEnabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // InputNumberField transactionNumberLength
    expect(
      screen.queryByText('bank-settings:tabs.transactions.form.labels.transactionNumberLength')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'transactionNumberLength' })).toBeDisabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'transactionNumberLength' })
    ).toHaveDisplayValue(String(bankSettingsTransactionsMock['transactionNumberLength']))

    // SelectField transactionNumberSymbolsDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.transactions.form.labels.transactionNumberSymbolsDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'transactionNumberSymbolsDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(bankSettingsTransactionsMock['transactionNumberSymbolsDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField transactionNumberUniquenessTermDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.transactions.form.labels.transactionNumberUniquenessTermDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'transactionNumberUniquenessTermDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(
        bankSettingsTransactionsMock['transactionNumberUniquenessTermDictionaryValueId']
      )
    ).toBeInTheDocument()
  })

  it('should show component content in the edit mode', () => {
    useBankSettingsTransactionsMock.mockReturnValue({
      getBankSettingsTransactions: {
        isLoading: false,
        data: bankSettingsTransactionsMock,
      },
      editBankSettingsTransactions: {
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
      <BankSettingsTransactionsTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: true,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const cancelButton = screen.queryByText('common:buttons.cancel')?.closest('button')
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    expect(screen.queryByText('bank-settings:tabs.transactions.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeDisabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // InputNumberField transactionNumberLength
    expect(
      screen.queryByText('bank-settings:tabs.transactions.form.labels.transactionNumberLength')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'transactionNumberLength' })).toBeEnabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'transactionNumberLength' })
    ).toHaveDisplayValue(String(bankSettingsTransactionsMock['transactionNumberLength']))

    // SelectField transactionNumberSymbolsDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.transactions.form.labels.transactionNumberSymbolsDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'transactionNumberSymbolsDictionaryValueId' })
    ).toBeEnabled()
    expect(
      screen.queryByText(bankSettingsTransactionsMock['transactionNumberSymbolsDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField transactionNumberUniquenessTermDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.transactions.form.labels.transactionNumberUniquenessTermDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'transactionNumberUniquenessTermDictionaryValueId' })
    ).toBeEnabled()
    expect(
      screen.queryByText(
        bankSettingsTransactionsMock['transactionNumberUniquenessTermDictionaryValueId']
      )
    ).toBeInTheDocument()

    // Controls
    expect(cancelButton).toBeEnabled()
    expect(saveButton).toBeInTheDocument()
  })

  it('should handle success submit of the form', async () => {
    useBankSettingsTransactionsMock.mockReturnValue({
      getBankSettingsTransactions: {
        isLoading: false,
        data: bankSettingsTransactionsMock,
      },
      editBankSettingsTransactions: {
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
      <BankSettingsTransactionsTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: true,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const input = screen.queryByRole('spinbutton', { name: 'transactionNumberLength' })
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    if (!input || !saveButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 19,
        },
      })

      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useBankSettingsTransactionsMock.mockReturnValue({
      getBankSettingsTransactions: {
        isLoading: false,
        data: bankSettingsTransactionsMock,
      },
      editBankSettingsTransactions: {
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
      <BankSettingsTransactionsTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: true,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const input = screen.queryByRole('spinbutton', { name: 'transactionNumberLength' })
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    if (!input || !saveButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 19,
        },
      })

      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
    })
  })

  it('should have unsaved changes handling', () => {
    useBankSettingsTransactionsMock.mockReturnValue({
      getBankSettingsTransactions: {
        isLoading: false,
        data: bankSettingsTransactionsMock,
      },
      editBankSettingsTransactions: {
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
      <BankSettingsTransactionsTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: true,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
