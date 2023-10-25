import { useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { BankSettingsGeneral } from '@/domains/bankSettings'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { DictionaryValue, DictionaryValueStatuses } from '@/domains/dictionaries'

import { BankSettingsGeneralTabContent } from './index'
import { BankSettingsTabsKeys } from '../../consts'
import { useAllDictionaryValuesByDictionaryCode } from '../../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode'
import { useBankSettingsGeneral } from '../../../../domains/bankSettings/useBankSettingsGeneral'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode')
jest.mock('../../../../domains/bankSettings/useBankSettingsGeneral')

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankSettingsGeneralMock = useBankSettingsGeneral as jest.MockedFunction<any>
const useAllDictionaryValuesByDictionaryCodeMock =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAllDictionaryValuesByDictionaryCode as jest.MockedFunction<any>

const setBankSettingsFormsEditModeMapMock = jest.fn()

const bankSettingsGeneralMock: BankSettingsGeneral = {
  defaultLanguageDictionaryValueId: 1,
  dateFormatDictionaryValueId: 2,
  timeModeDictionaryValueId: 3,
  decimalMarkDictionaryValueId: 4,
  thousandSeparatorDictionaryValueId: 5,
  defaultPageSizeDictionaryValueId: 10,
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

describe('BankSettingsGeneralTabContent', () => {
  afterEach(() => {
    useBankSettingsGeneralMock.mockReset()
    useAllDictionaryValuesByDictionaryCodeMock.mockReset()
    setBankSettingsFormsEditModeMapMock.mockReset()
  })

  it('should show component content in a view mode', () => {
    useBankSettingsGeneralMock.mockReturnValue({
      getBankSettingsGeneral: {
        isLoading: false,
        data: bankSettingsGeneralMock,
      },
      editBankSettingsGeneral: {
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
      <BankSettingsGeneralTabContent
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

    expect(screen.queryByText('bank-settings:tabs.general.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeEnabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // SelectField defaultLanguageDictionaryValueId
    expect(
      screen.queryByText('bank-settings:tabs.general.form.labels.defaultLanguageDictionaryValueId')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'defaultLanguageDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(bankSettingsGeneralMock['defaultLanguageDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField dateFormatDictionaryValueId
    expect(
      screen.queryByText('bank-settings:tabs.general.form.labels.dateFormatDictionaryValueId')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'dateFormatDictionaryValueId' })).toBeDisabled()
    expect(
      screen.queryByText(bankSettingsGeneralMock['dateFormatDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField timeModeDictionaryValueId
    expect(
      screen.queryByText('bank-settings:tabs.general.form.labels.timeModeDictionaryValueId')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'timeModeDictionaryValueId' })).toBeDisabled()
    expect(
      screen.queryByText(bankSettingsGeneralMock['timeModeDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField decimalMarkDictionaryValueId
    expect(
      screen.queryByText('bank-settings:tabs.general.form.labels.decimalMarkDictionaryValueId')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'decimalMarkDictionaryValueId' })).toBeDisabled()
    expect(
      screen.queryByText(bankSettingsGeneralMock['decimalMarkDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField thousandSeparatorDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.general.form.labels.thousandSeparatorDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'thousandSeparatorDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(bankSettingsGeneralMock['thousandSeparatorDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField defaultPageSizeDictionaryValueId
    expect(
      screen.queryByText('bank-settings:tabs.general.form.labels.defaultPageSizeDictionaryValueId')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'defaultPageSizeDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(bankSettingsGeneralMock['defaultPageSizeDictionaryValueId'])
    ).toBeInTheDocument()
  })

  it('should show component content in an edit mode', () => {
    useBankSettingsGeneralMock.mockReturnValue({
      getBankSettingsGeneral: {
        isLoading: false,
        data: bankSettingsGeneralMock,
      },
      editBankSettingsGeneral: {
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
      <BankSettingsGeneralTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: true,
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

    const cancelButton = screen.queryByText('common:buttons.cancel')?.closest('button')
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    expect(screen.queryByText('bank-settings:tabs.general.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeDisabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // SelectField defaultLanguageDictionaryValueId
    expect(
      screen.queryByText('bank-settings:tabs.general.form.labels.defaultLanguageDictionaryValueId')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'defaultLanguageDictionaryValueId' })
    ).toBeEnabled()
    expect(
      screen.queryByText(bankSettingsGeneralMock['defaultLanguageDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField dateFormatDictionaryValueId
    expect(
      screen.queryByText('bank-settings:tabs.general.form.labels.dateFormatDictionaryValueId')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'dateFormatDictionaryValueId' })).toBeEnabled()
    expect(
      screen.queryByText(bankSettingsGeneralMock['dateFormatDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField timeModeDictionaryValueId
    expect(
      screen.queryByText('bank-settings:tabs.general.form.labels.timeModeDictionaryValueId')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'timeModeDictionaryValueId' })).toBeEnabled()
    expect(
      screen.queryByText(bankSettingsGeneralMock['timeModeDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField decimalMarkDictionaryValueId
    expect(
      screen.queryByText('bank-settings:tabs.general.form.labels.decimalMarkDictionaryValueId')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'decimalMarkDictionaryValueId' })).toBeEnabled()
    expect(
      screen.queryByText(bankSettingsGeneralMock['decimalMarkDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField thousandSeparatorDictionaryValueId
    expect(
      screen.queryByText(
        'bank-settings:tabs.general.form.labels.thousandSeparatorDictionaryValueId'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'thousandSeparatorDictionaryValueId' })
    ).toBeEnabled()
    expect(
      screen.queryByText(bankSettingsGeneralMock['thousandSeparatorDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField defaultPageSizeDictionaryValueId
    expect(
      screen.queryByText('bank-settings:tabs.general.form.labels.defaultPageSizeDictionaryValueId')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'defaultPageSizeDictionaryValueId' })
    ).toBeEnabled()
    expect(
      screen.queryByText(bankSettingsGeneralMock['defaultPageSizeDictionaryValueId'])
    ).toBeInTheDocument()

    expect(cancelButton).toBeEnabled()
    expect(saveButton).toBeInTheDocument()
  })

  it('should handle success submit of the form', async () => {
    useBankSettingsGeneralMock.mockReturnValue({
      getBankSettingsGeneral: {
        isLoading: false,
        data: bankSettingsGeneralMock,
      },
      editBankSettingsGeneral: {
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
      <BankSettingsGeneralTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: true,
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

    const select = screen.queryByRole('combobox', {
      name: 'defaultLanguageDictionaryValueId',
    })
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    if (!select || !saveButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.mouseDown(select)
    })

    await waitFor(() => {
      fireEvent.click(screen.getByText(dictionaryValuesMock[5].name))
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useBankSettingsGeneralMock.mockReturnValue({
      getBankSettingsGeneral: {
        isLoading: false,
        data: bankSettingsGeneralMock,
      },
      editBankSettingsGeneral: {
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
      <BankSettingsGeneralTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: true,
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

    const select = screen.queryByRole('combobox', {
      name: 'defaultLanguageDictionaryValueId',
    })
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    if (!select || !saveButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.mouseDown(select)
    })

    await waitFor(() => {
      fireEvent.click(screen.getByText(dictionaryValuesMock[5].name))
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
    })
  })

  it('should have unsaved changes handling', async () => {
    useBankSettingsGeneralMock.mockReturnValue({
      getBankSettingsGeneral: {
        isLoading: false,
        data: bankSettingsGeneralMock,
      },
      editBankSettingsGeneral: {
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
      <BankSettingsGeneralTabContent
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

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
