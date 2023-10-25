import { useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { BankSettingsClosuresTabContent } from './index'
import { BankSettingsTabsKeys } from '../../consts'
import { useBankSettingsClosures } from '../../../../domains/bankSettings/useBankSettingsClosures'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/bankSettings/useBankSettingsClosures')

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankSettingsClosuresMock = useBankSettingsClosures as jest.MockedFunction<any>

const setBankSettingsFormsEditModeMapMock = jest.fn()

export const bankSettingsClosuresMock = {
  cutOffTime: String(new Date(2000, 1, 1)),
  shouldBlockUsersDuringEOD: true,
  minutesForUserNotificationAboutEODStart: 10,
  EOMDaysForAdjustments: 5,
  EOQDaysForAdjustments: 5,
  EOYDaysForAdjustments: 15,
}

describe('BankSettingsClosuresTabContent', () => {
  afterEach(() => {
    useBankSettingsClosuresMock.mockReset()
    setBankSettingsFormsEditModeMapMock.mockReset()
  })

  it('should show component content in a view mode', () => {
    useBankSettingsClosuresMock.mockReturnValue({
      getBankSettingsClosures: {
        isLoading: false,
        data: bankSettingsClosuresMock,
      },
      editBankSettingsClosures: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <BankSettingsClosuresTabContent
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

    expect(screen.queryByText('bank-settings:tabs.closures.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeEnabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // TimePickerField cutOffTime
    expect(
      screen.queryByText('bank-settings:tabs.closures.form.labels.cutOffTime')
    ).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: 'cutOffTime' })).toBeDisabled()

    // CheckboxField shouldBlockUsersDuringEOD
    expect(
      screen.queryByLabelText('bank-settings:tabs.closures.form.labels.shouldBlockUsersDuringEOD')
    ).toBeChecked()
    expect(
      screen.queryByLabelText('bank-settings:tabs.closures.form.labels.shouldBlockUsersDuringEOD')
    ).toBeDisabled()

    // InputNumberField minutesForUserNotificationAboutEODStart
    expect(
      screen.queryByText(
        'bank-settings:tabs.closures.form.labels.minutesForUserNotificationAboutEODStart'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('spinbutton', { name: 'minutesForUserNotificationAboutEODStart' })
    ).toBeDisabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'minutesForUserNotificationAboutEODStart' })
    ).toHaveDisplayValue(
      String(bankSettingsClosuresMock['minutesForUserNotificationAboutEODStart'])
    )

    // InputNumberField EOMDaysForAdjustments
    expect(
      screen.queryByText('bank-settings:tabs.closures.form.labels.EOMDaysForAdjustments')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'EOMDaysForAdjustments' })).toBeDisabled()
    expect(screen.queryByRole('spinbutton', { name: 'EOMDaysForAdjustments' })).toHaveDisplayValue(
      String(bankSettingsClosuresMock['EOMDaysForAdjustments'])
    )

    // InputNumberField EOQDaysForAdjustments
    expect(
      screen.queryByText('bank-settings:tabs.closures.form.labels.EOQDaysForAdjustments')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'EOQDaysForAdjustments' })).toBeDisabled()
    expect(screen.queryByRole('spinbutton', { name: 'EOQDaysForAdjustments' })).toHaveDisplayValue(
      String(bankSettingsClosuresMock['EOQDaysForAdjustments'])
    )

    // InputNumberField EOYDaysForAdjustments
    expect(
      screen.queryByText('bank-settings:tabs.closures.form.labels.EOYDaysForAdjustments')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'EOYDaysForAdjustments' })).toBeDisabled()
    expect(screen.queryByRole('spinbutton', { name: 'EOYDaysForAdjustments' })).toHaveDisplayValue(
      String(bankSettingsClosuresMock['EOYDaysForAdjustments'])
    )
  })

  it('should show component content in an edit mode', () => {
    useBankSettingsClosuresMock.mockReturnValue({
      getBankSettingsClosures: {
        isLoading: false,
        data: bankSettingsClosuresMock,
      },
      editBankSettingsClosures: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <BankSettingsClosuresTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: true,
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

    expect(screen.queryByText('bank-settings:tabs.closures.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeDisabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // TimePickerField cutOffTime
    expect(
      screen.queryByText('bank-settings:tabs.closures.form.labels.cutOffTime')
    ).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: 'cutOffTime' })).toBeEnabled()

    // CheckboxField shouldBlockUsersDuringEOD
    expect(
      screen.queryByLabelText('bank-settings:tabs.closures.form.labels.shouldBlockUsersDuringEOD')
    ).toBeChecked()
    expect(
      screen.queryByLabelText('bank-settings:tabs.closures.form.labels.shouldBlockUsersDuringEOD')
    ).toBeEnabled()

    // InputNumberField minutesForUserNotificationAboutEODStart
    expect(
      screen.queryByText(
        'bank-settings:tabs.closures.form.labels.minutesForUserNotificationAboutEODStart'
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('spinbutton', { name: 'minutesForUserNotificationAboutEODStart' })
    ).toBeEnabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'minutesForUserNotificationAboutEODStart' })
    ).toHaveDisplayValue(
      String(bankSettingsClosuresMock['minutesForUserNotificationAboutEODStart'])
    )

    // InputNumberField EOMDaysForAdjustments
    expect(
      screen.queryByText('bank-settings:tabs.closures.form.labels.EOMDaysForAdjustments')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'EOMDaysForAdjustments' })).toBeEnabled()
    expect(screen.queryByRole('spinbutton', { name: 'EOMDaysForAdjustments' })).toHaveDisplayValue(
      String(bankSettingsClosuresMock['EOMDaysForAdjustments'])
    )

    // InputNumberField EOQDaysForAdjustments
    expect(
      screen.queryByText('bank-settings:tabs.closures.form.labels.EOQDaysForAdjustments')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'EOQDaysForAdjustments' })).toBeEnabled()
    expect(screen.queryByRole('spinbutton', { name: 'EOQDaysForAdjustments' })).toHaveDisplayValue(
      String(bankSettingsClosuresMock['EOQDaysForAdjustments'])
    )

    // InputNumberField EOYDaysForAdjustments
    expect(
      screen.queryByText('bank-settings:tabs.closures.form.labels.EOYDaysForAdjustments')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'EOYDaysForAdjustments' })).toBeEnabled()
    expect(screen.queryByRole('spinbutton', { name: 'EOYDaysForAdjustments' })).toHaveDisplayValue(
      String(bankSettingsClosuresMock['EOYDaysForAdjustments'])
    )

    expect(cancelButton).toBeEnabled()
    expect(saveButton).toBeInTheDocument()
  })

  it('should handle success submit of the form', async () => {
    useBankSettingsClosuresMock.mockReturnValue({
      getBankSettingsClosures: {
        isLoading: false,
        data: bankSettingsClosuresMock,
      },
      editBankSettingsClosures: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <BankSettingsClosuresTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: true,
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
      'bank-settings:tabs.closures.form.labels.shouldBlockUsersDuringEOD'
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
    useBankSettingsClosuresMock.mockReturnValue({
      getBankSettingsClosures: {
        isLoading: false,
        data: bankSettingsClosuresMock,
      },
      editBankSettingsClosures: {
        isLoading: false,
        mutateAsync: jest.fn(() => Promise.reject({ body: { message: '' } })),
      },
    })

    render(
      <BankSettingsClosuresTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: true,
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
      'bank-settings:tabs.closures.form.labels.shouldBlockUsersDuringEOD'
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
    useBankSettingsClosuresMock.mockReturnValue({
      getBankSettingsClosures: {
        isLoading: false,
        data: bankSettingsClosuresMock,
      },
      editBankSettingsClosures: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <BankSettingsClosuresTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: true,
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
