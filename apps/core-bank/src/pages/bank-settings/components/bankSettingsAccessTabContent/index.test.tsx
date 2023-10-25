import { useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { BankSettingsAccessTabContent } from './index'
import { BankSettingsTabsKeys } from '../../consts'
import { useBankSettingsAccess } from '../../../../domains/bankSettings/useBankSettingsAccess'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/bankSettings/useBankSettingsAccess')

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankSettingsAccessMock = useBankSettingsAccess as jest.MockedFunction<any>

const setBankSettingsFormsEditModeMapMock = jest.fn()

export const bankSettingsAccessMock = {
  shouldEnableTwoFactorAuthentication: false,
  shouldEnableUserLoginSelfNotification: false,
  shouldEnableUserLoginSupervisorNotification: false,
  defaultPassword: 'AfriLand1stB@nk',
  invitationText:
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
  invitationValidityDuration: 48,
  minimumPasswordLength: 8,
  minimumNumberOfNumChars: 1,
  minimumNumberOfSpecialChars: 1,
  minimumNumberOfUpperCaseChars: 1,
  passwordResetPeriod: 180,
  passwordReuseCycles: 3,
  failedLoginLimit: 6,
  failedLoginAttemptsTillCoolDown: 3,
  failedLoginCooldownPeriod: 30,
  timeoutDuration: 20,
}

describe('BankSettingsAccessTabContent', () => {
  afterEach(() => {
    useBankSettingsAccessMock.mockReset()
    setBankSettingsFormsEditModeMapMock.mockReset()
  })

  it('should show component content in a view mode', () => {
    useBankSettingsAccessMock.mockReturnValue({
      getBankSettingsAccess: {
        isLoading: false,
        data: bankSettingsAccessMock,
      },
      editBankSettingsAccess: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <BankSettingsAccessTabContent
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

    expect(screen.queryByText('bank-settings:tabs.access.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeEnabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // CheckboxField shouldEnableTwoFactorAuthentication
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.access.form.labels.shouldEnableTwoFactorAuthentication'
      )
    ).toBeDisabled()
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.access.form.labels.shouldEnableTwoFactorAuthentication'
      )
    ).not.toBeChecked()

    // CheckboxField shouldEnableUserLoginSelfNotification
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.access.form.labels.shouldEnableUserLoginSelfNotification'
      )
    ).toBeDisabled()
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.access.form.labels.shouldEnableUserLoginSelfNotification'
      )
    ).not.toBeChecked()

    // CheckboxField shouldEnableUserLoginSupervisorNotification
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.access.form.labels.shouldEnableUserLoginSupervisorNotification'
      )
    ).toBeDisabled()
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.access.form.labels.shouldEnableUserLoginSupervisorNotification'
      )
    ).not.toBeChecked()

    // PasswordInputField defaultPassword
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.defaultPassword')
    ).toBeInTheDocument()
    expect(
      screen.queryByLabelText('bank-settings:tabs.access.form.labels.defaultPassword')
    ).toBeDisabled()
    expect(
      screen.queryByLabelText('bank-settings:tabs.access.form.labels.defaultPassword')
    ).toHaveValue(bankSettingsAccessMock['defaultPassword'])

    // TextAreaField invitationText
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.invitationText')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('textbox', {
        name: 'invitationText',
      })
    ).toBeDisabled()
    expect(
      screen.queryByRole('textbox', {
        name: 'invitationText',
      })
    ).toHaveValue(bankSettingsAccessMock['invitationText'])

    // InputNumberField invitationValidityDuration
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.invitationValidityDuration')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'invitationValidityDuration' })).toBeDisabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'invitationValidityDuration' })
    ).toHaveDisplayValue(String(bankSettingsAccessMock['invitationValidityDuration']))

    // InputNumberField minimumPasswordLength
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.minimumPasswordLength')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'minimumPasswordLength' })).toBeDisabled()
    expect(screen.queryByRole('spinbutton', { name: 'minimumPasswordLength' })).toHaveDisplayValue(
      String(bankSettingsAccessMock['minimumPasswordLength'])
    )

    // InputNumberField minimumNumberOfNumChars
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.minimumNumberOfNumChars')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'minimumNumberOfNumChars' })).toBeDisabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'minimumNumberOfNumChars' })
    ).toHaveDisplayValue(String(bankSettingsAccessMock['minimumNumberOfNumChars']))

    // InputNumberField minimumNumberOfSpecialChars
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.minimumNumberOfSpecialChars')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'minimumNumberOfSpecialChars' })).toBeDisabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'minimumNumberOfSpecialChars' })
    ).toHaveDisplayValue(String(bankSettingsAccessMock['minimumNumberOfSpecialChars']))

    // InputNumberField minimumNumberOfUpperCaseChars
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.minimumNumberOfUpperCaseChars')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('spinbutton', { name: 'minimumNumberOfUpperCaseChars' })
    ).toBeDisabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'minimumNumberOfUpperCaseChars' })
    ).toHaveDisplayValue(String(bankSettingsAccessMock['minimumNumberOfUpperCaseChars']))

    // InputNumberField passwordResetPeriod
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.passwordResetPeriod')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'passwordResetPeriod' })).toBeDisabled()
    expect(screen.queryByRole('spinbutton', { name: 'passwordResetPeriod' })).toHaveDisplayValue(
      String(bankSettingsAccessMock['passwordResetPeriod'])
    )

    // InputNumberField passwordReuseCycles
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.passwordReuseCycles')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'passwordReuseCycles' })).toBeDisabled()
    expect(screen.queryByRole('spinbutton', { name: 'passwordReuseCycles' })).toHaveDisplayValue(
      String(bankSettingsAccessMock['passwordReuseCycles'])
    )

    // InputNumberField failedLoginLimit
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.failedLoginLimit')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'failedLoginLimit' })).toBeDisabled()
    expect(screen.queryByRole('spinbutton', { name: 'failedLoginLimit' })).toHaveDisplayValue(
      String(bankSettingsAccessMock['failedLoginLimit'])
    )

    // InputNumberField failedLoginAttemptsTillCoolDown
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.failedLoginAttemptsTillCoolDown')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('spinbutton', { name: 'failedLoginAttemptsTillCoolDown' })
    ).toBeDisabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'failedLoginAttemptsTillCoolDown' })
    ).toHaveDisplayValue(String(bankSettingsAccessMock['failedLoginAttemptsTillCoolDown']))

    // InputNumberField failedLoginCooldownPeriod
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.failedLoginCooldownPeriod')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'failedLoginCooldownPeriod' })).toBeDisabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'failedLoginCooldownPeriod' })
    ).toHaveDisplayValue(String(bankSettingsAccessMock['failedLoginCooldownPeriod']))

    // InputNumberField timeoutDuration
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.timeoutDuration')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'timeoutDuration' })).toBeDisabled()
    expect(screen.queryByRole('spinbutton', { name: 'timeoutDuration' })).toHaveDisplayValue(
      String(bankSettingsAccessMock['timeoutDuration'])
    )
  })

  it('should show component content in an edit mode', () => {
    useBankSettingsAccessMock.mockReturnValue({
      getBankSettingsAccess: {
        isLoading: false,
        data: bankSettingsAccessMock,
      },
      editBankSettingsAccess: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <BankSettingsAccessTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: true,
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

    expect(screen.queryByText('bank-settings:tabs.access.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeDisabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // CheckboxField shouldEnableTwoFactorAuthentication
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.access.form.labels.shouldEnableTwoFactorAuthentication'
      )
    ).toBeEnabled()
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.access.form.labels.shouldEnableTwoFactorAuthentication'
      )
    ).not.toBeChecked()

    // CheckboxField shouldEnableUserLoginSelfNotification
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.access.form.labels.shouldEnableUserLoginSelfNotification'
      )
    ).toBeEnabled()
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.access.form.labels.shouldEnableUserLoginSelfNotification'
      )
    ).not.toBeChecked()

    // CheckboxField shouldEnableUserLoginSupervisorNotification
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.access.form.labels.shouldEnableUserLoginSupervisorNotification'
      )
    ).toBeEnabled()
    expect(
      screen.queryByLabelText(
        'bank-settings:tabs.access.form.labels.shouldEnableUserLoginSupervisorNotification'
      )
    ).not.toBeChecked()

    // PasswordInputField defaultPassword
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.defaultPassword')
    ).toBeInTheDocument()
    expect(
      screen.queryByLabelText('bank-settings:tabs.access.form.labels.defaultPassword')
    ).toBeEnabled()
    expect(
      screen.queryByLabelText('bank-settings:tabs.access.form.labels.defaultPassword')
    ).toHaveValue(bankSettingsAccessMock['defaultPassword'])

    // TextAreaField invitationText
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.invitationText')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('textbox', {
        name: 'invitationText',
      })
    ).toBeEnabled()
    expect(
      screen.queryByRole('textbox', {
        name: 'invitationText',
      })
    ).toHaveValue(bankSettingsAccessMock['invitationText'])

    // InputNumberField invitationValidityDuration
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.invitationValidityDuration')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'invitationValidityDuration' })).toBeEnabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'invitationValidityDuration' })
    ).toHaveDisplayValue(String(bankSettingsAccessMock['invitationValidityDuration']))

    // InputNumberField minimumPasswordLength
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.minimumPasswordLength')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'minimumPasswordLength' })).toBeEnabled()
    expect(screen.queryByRole('spinbutton', { name: 'minimumPasswordLength' })).toHaveDisplayValue(
      String(bankSettingsAccessMock['minimumPasswordLength'])
    )

    // InputNumberField minimumNumberOfNumChars
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.minimumNumberOfNumChars')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'minimumNumberOfNumChars' })).toBeEnabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'minimumNumberOfNumChars' })
    ).toHaveDisplayValue(String(bankSettingsAccessMock['minimumNumberOfNumChars']))

    // InputNumberField minimumNumberOfSpecialChars
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.minimumNumberOfSpecialChars')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'minimumNumberOfSpecialChars' })).toBeEnabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'minimumNumberOfSpecialChars' })
    ).toHaveDisplayValue(String(bankSettingsAccessMock['minimumNumberOfSpecialChars']))

    // InputNumberField minimumNumberOfUpperCaseChars
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.minimumNumberOfUpperCaseChars')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('spinbutton', { name: 'minimumNumberOfUpperCaseChars' })
    ).toBeEnabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'minimumNumberOfUpperCaseChars' })
    ).toHaveDisplayValue(String(bankSettingsAccessMock['minimumNumberOfUpperCaseChars']))

    // InputNumberField passwordResetPeriod
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.passwordResetPeriod')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'passwordResetPeriod' })).toBeEnabled()
    expect(screen.queryByRole('spinbutton', { name: 'passwordResetPeriod' })).toHaveDisplayValue(
      String(bankSettingsAccessMock['passwordResetPeriod'])
    )

    // InputNumberField passwordReuseCycles
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.passwordReuseCycles')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'passwordReuseCycles' })).toBeEnabled()
    expect(screen.queryByRole('spinbutton', { name: 'passwordReuseCycles' })).toHaveDisplayValue(
      String(bankSettingsAccessMock['passwordReuseCycles'])
    )

    // InputNumberField failedLoginLimit
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.failedLoginLimit')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'failedLoginLimit' })).toBeEnabled()
    expect(screen.queryByRole('spinbutton', { name: 'failedLoginLimit' })).toHaveDisplayValue(
      String(bankSettingsAccessMock['failedLoginLimit'])
    )

    // InputNumberField failedLoginAttemptsTillCoolDown
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.failedLoginAttemptsTillCoolDown')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('spinbutton', { name: 'failedLoginAttemptsTillCoolDown' })
    ).toBeEnabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'failedLoginAttemptsTillCoolDown' })
    ).toHaveDisplayValue(String(bankSettingsAccessMock['failedLoginAttemptsTillCoolDown']))

    // InputNumberField failedLoginCooldownPeriod
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.failedLoginCooldownPeriod')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'failedLoginCooldownPeriod' })).toBeEnabled()
    expect(
      screen.queryByRole('spinbutton', { name: 'failedLoginCooldownPeriod' })
    ).toHaveDisplayValue(String(bankSettingsAccessMock['failedLoginCooldownPeriod']))

    // InputNumberField timeoutDuration
    expect(
      screen.queryByText('bank-settings:tabs.access.form.labels.timeoutDuration')
    ).toBeInTheDocument()
    expect(screen.queryByRole('spinbutton', { name: 'timeoutDuration' })).toBeEnabled()
    expect(screen.queryByRole('spinbutton', { name: 'timeoutDuration' })).toHaveDisplayValue(
      String(bankSettingsAccessMock['timeoutDuration'])
    )

    // Controls
    expect(cancelButton).toBeEnabled()
    expect(saveButton).toBeInTheDocument()
  })

  it('should handle success submit of the form', async () => {
    useBankSettingsAccessMock.mockReturnValue({
      getBankSettingsAccess: {
        isLoading: false,
        data: bankSettingsAccessMock,
      },
      editBankSettingsAccess: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <BankSettingsAccessTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: true,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const checkbox = screen.queryByLabelText(
      'bank-settings:tabs.access.form.labels.shouldEnableTwoFactorAuthentication'
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
    useBankSettingsAccessMock.mockReturnValue({
      getBankSettingsAccess: {
        isLoading: false,
        data: bankSettingsAccessMock,
      },
      editBankSettingsAccess: {
        isLoading: false,
        mutateAsync: jest.fn(() => Promise.reject({ body: { message: '' } })),
      },
    })

    render(
      <BankSettingsAccessTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: true,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: false,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const checkbox = screen.queryByLabelText(
      'bank-settings:tabs.access.form.labels.shouldEnableTwoFactorAuthentication'
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
    useBankSettingsAccessMock.mockReturnValue({
      getBankSettingsAccess: {
        isLoading: false,
        data: bankSettingsAccessMock,
      },
      editBankSettingsAccess: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <BankSettingsAccessTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: true,
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
