import { useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { BankSettingsTime } from '@/domains/bankSettings'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { BankSettingsTabsKeys } from '../../consts'
import { BankSettingsTimeTabContent } from './index'
import { useAllDictionaryValuesByDictionaryCode } from '../../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode'
import { useBankSettingsTime } from '../../../../domains/bankSettings/useBankSettingsTime'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode')
jest.mock('../../../../domains/bankSettings/useBankSettingsTime')

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankSettingsTimeMock = useBankSettingsTime as jest.MockedFunction<any>
const useAllDictionaryValuesByDictionaryCodeMock =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAllDictionaryValuesByDictionaryCode as jest.MockedFunction<any>

const setBankSettingsFormsEditModeMapMock = jest.fn()

export const bankSettingsTimeMock: BankSettingsTime = {
  timeZoneWinterDictionaryValueId: 1,
  timeZoneSummerDictionaryValueId: 2,
  isNonBusinessDayMonday: false,
  isNonBusinessDayTuesday: false,
  isNonBusinessDayWednesday: false,
  isNonBusinessDayThursday: false,
  isNonBusinessDayFriday: false,
  isNonBusinessDaySaturday: true,
  isNonBusinessDaySunday: true,
}

describe('BankSettingsTimeTabContent', () => {
  afterEach(() => {
    setBankSettingsFormsEditModeMapMock.mockReset()
    useBankSettingsTimeMock.mockReset()
    useAllDictionaryValuesByDictionaryCodeMock.mockReset()
  })

  it('should show component content in a view mode', () => {
    useBankSettingsTimeMock.mockReturnValue({
      getBankSettingsTime: {
        isLoading: false,
        data: bankSettingsTimeMock,
      },
      editBankSettingsTime: {
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
      <BankSettingsTimeTabContent
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

    expect(screen.queryByText('bank-settings:tabs.time.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeEnabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // SelectField timeZoneWinterDictionaryValueId
    expect(
      screen.queryByText('bank-settings:tabs.time.form.labels.timeZoneWinterDictionaryValueId')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'timeZoneWinterDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(bankSettingsTimeMock['timeZoneWinterDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField timeZoneSummerDictionaryValueId
    expect(
      screen.queryByText('bank-settings:tabs.time.form.labels.timeZoneSummerDictionaryValueId')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'timeZoneSummerDictionaryValueId' })
    ).toBeDisabled()
    expect(
      screen.queryByText(bankSettingsTimeMock['timeZoneSummerDictionaryValueId'])
    ).toBeInTheDocument()

    expect(
      screen.queryByText('bank-settings:tabs.time.form.labels.nonBusinessDays')
    ).toBeInTheDocument()

    const isNonBusinessDayMondayCheckbox = screen.getByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDayMonday'
    )
    const isNonBusinessDayTuesdayCheckbox = screen.getByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDayTuesday'
    )
    const isNonBusinessDayWednesdayCheckbox = screen.getByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDayWednesday'
    )
    const isNonBusinessDayThursdayCheckbox = screen.getByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDayThursday'
    )
    const isNonBusinessDayFridayCheckbox = screen.getByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDayFriday'
    )
    const isNonBusinessDaySaturdayCheckbox = screen.getByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDaySaturday'
    )
    const isNonBusinessDaySundayCheckbox = screen.getByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDaySunday'
    )

    expect(isNonBusinessDayMondayCheckbox).toBeDisabled()
    expect(isNonBusinessDayMondayCheckbox).not.toBeChecked()

    expect(isNonBusinessDayTuesdayCheckbox).toBeDisabled()
    expect(isNonBusinessDayTuesdayCheckbox).not.toBeChecked()

    expect(isNonBusinessDayWednesdayCheckbox).toBeDisabled()
    expect(isNonBusinessDayWednesdayCheckbox).not.toBeChecked()

    expect(isNonBusinessDayThursdayCheckbox).toBeDisabled()
    expect(isNonBusinessDayThursdayCheckbox).not.toBeChecked()

    expect(isNonBusinessDayFridayCheckbox).toBeDisabled()
    expect(isNonBusinessDayFridayCheckbox).not.toBeChecked()

    expect(isNonBusinessDaySaturdayCheckbox).toBeDisabled()
    expect(isNonBusinessDaySaturdayCheckbox).toBeChecked()

    expect(isNonBusinessDaySundayCheckbox).toBeDisabled()
    expect(isNonBusinessDaySundayCheckbox).toBeChecked()
  })

  it('should show component content in an edit mode', () => {
    useBankSettingsTimeMock.mockReturnValue({
      getBankSettingsTime: {
        isLoading: false,
        data: bankSettingsTimeMock,
      },
      editBankSettingsTime: {
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
      <BankSettingsTimeTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: true,
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

    expect(screen.queryByText('bank-settings:tabs.time.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeDisabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // SelectField timeZoneWinterDictionaryValueId
    expect(
      screen.queryByText('bank-settings:tabs.time.form.labels.timeZoneWinterDictionaryValueId')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'timeZoneWinterDictionaryValueId' })
    ).toBeEnabled()
    expect(
      screen.queryByText(bankSettingsTimeMock['timeZoneWinterDictionaryValueId'])
    ).toBeInTheDocument()

    // SelectField timeZoneSummerDictionaryValueId
    expect(
      screen.queryByText('bank-settings:tabs.time.form.labels.timeZoneSummerDictionaryValueId')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('combobox', { name: 'timeZoneSummerDictionaryValueId' })
    ).toBeEnabled()
    expect(
      screen.queryByText(bankSettingsTimeMock['timeZoneSummerDictionaryValueId'])
    ).toBeInTheDocument()

    expect(
      screen.queryByText('bank-settings:tabs.time.form.labels.nonBusinessDays')
    ).toBeInTheDocument()

    const isNonBusinessDayMondayCheckbox = screen.getByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDayMonday'
    )
    const isNonBusinessDayTuesdayCheckbox = screen.getByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDayTuesday'
    )
    const isNonBusinessDayWednesdayCheckbox = screen.getByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDayWednesday'
    )
    const isNonBusinessDayThursdayCheckbox = screen.getByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDayThursday'
    )
    const isNonBusinessDayFridayCheckbox = screen.getByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDayFriday'
    )
    const isNonBusinessDaySaturdayCheckbox = screen.getByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDaySaturday'
    )
    const isNonBusinessDaySundayCheckbox = screen.getByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDaySunday'
    )

    expect(isNonBusinessDayMondayCheckbox).toBeEnabled()
    expect(isNonBusinessDayMondayCheckbox).not.toBeChecked()

    expect(isNonBusinessDayTuesdayCheckbox).toBeEnabled()
    expect(isNonBusinessDayTuesdayCheckbox).not.toBeChecked()

    expect(isNonBusinessDayWednesdayCheckbox).toBeEnabled()
    expect(isNonBusinessDayWednesdayCheckbox).not.toBeChecked()

    expect(isNonBusinessDayThursdayCheckbox).toBeEnabled()
    expect(isNonBusinessDayThursdayCheckbox).not.toBeChecked()

    expect(isNonBusinessDayFridayCheckbox).toBeEnabled()
    expect(isNonBusinessDayFridayCheckbox).not.toBeChecked()

    expect(isNonBusinessDaySaturdayCheckbox).toBeEnabled()
    expect(isNonBusinessDaySaturdayCheckbox).toBeChecked()

    expect(isNonBusinessDaySundayCheckbox).toBeEnabled()
    expect(isNonBusinessDaySundayCheckbox).toBeChecked()

    expect(cancelButton).toBeEnabled()
    expect(saveButton).toBeInTheDocument()
  })

  it('should handle success submit of the form', async () => {
    useBankSettingsTimeMock.mockReturnValue({
      getBankSettingsTime: {
        isLoading: false,
        data: bankSettingsTimeMock,
      },
      editBankSettingsTime: {
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
      <BankSettingsTimeTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: true,
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

    const checkbox = screen.queryByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDayMonday'
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
    useBankSettingsTimeMock.mockReturnValue({
      getBankSettingsTime: {
        isLoading: false,
        data: bankSettingsTimeMock,
      },
      editBankSettingsTime: {
        isLoading: false,
        mutateAsync: jest.fn(() => Promise.reject({ body: { message: '' } })),
      },
    })
    useAllDictionaryValuesByDictionaryCodeMock.mockReturnValue({
      getAllDictionaryValuesByDictionaryCode: {
        isLoading: false,
        data: [],
      },
    })

    render(
      <BankSettingsTimeTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: true,
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

    const checkbox = screen.queryByLabelText(
      'bank-settings:tabs.time.form.labels.isNonBusinessDayMonday'
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
    useBankSettingsTimeMock.mockReturnValue({
      getBankSettingsTime: {
        isLoading: false,
        data: bankSettingsTimeMock,
      },
      editBankSettingsTime: {
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
      <BankSettingsTimeTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: true,
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
