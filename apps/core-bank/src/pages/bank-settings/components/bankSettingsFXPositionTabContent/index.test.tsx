import { useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { BankSettingsFXPosition } from '@/domains/bankSettings'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { BankSettingsTabsKeys } from '../../consts'
import { useBankSettingsFXPosition } from '../../../../domains/bankSettings/useBankSettingsFXPosition'
import { BankSettingsFXPositionTabContent, OPTIONS_MOCK } from './index'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode')
jest.mock('../../../../domains/bankSettings/useBankSettingsFXPosition')

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankSettingsFXPositionMock = useBankSettingsFXPosition as jest.MockedFunction<any>

const setBankSettingsFormsEditModeMapMock = jest.fn()

export const bankSettingsFXPositionMock: BankSettingsFXPosition = {
  FXRateType: '1',
  FXPosition: '1',
  FXPositionEquivalent: '1',
  FXRevaluationGain: '1',
  FXRevaluationLost: '1',
  FXRevaluationTransactionType: '1',
}

describe('BankSettingsFXPositionTabContent', () => {
  afterEach(() => {
    useBankSettingsFXPositionMock.mockReset()
    setBankSettingsFormsEditModeMapMock.mockReset()
  })

  it('should show component content in a view mode', () => {
    useBankSettingsFXPositionMock.mockReturnValue({
      getBankSettingsFXPosition: {
        isLoading: false,
        data: bankSettingsFXPositionMock,
      },
      editBankSettingsFXPosition: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <BankSettingsFXPositionTabContent
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

    expect(screen.queryByText('bank-settings:tabs.FXPosition.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeEnabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // SelectField FXRateType
    expect(
      screen.queryByText('bank-settings:tabs.FXPosition.form.labels.FXRateType')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'FXRateType' })).toBeDisabled()
    expect(screen.queryAllByText(OPTIONS_MOCK[0].label)[0]).toBeInTheDocument()

    // SelectField FXPosition
    expect(
      screen.queryByText('bank-settings:tabs.FXPosition.form.labels.FXPosition')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'FXPosition' })).toBeDisabled()
    expect(screen.queryAllByText(OPTIONS_MOCK[0].label)[1]).toBeInTheDocument()

    // SelectField FXPositionEquivalent
    expect(
      screen.queryByText('bank-settings:tabs.FXPosition.form.labels.FXPositionEquivalent')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'FXPositionEquivalent' })).toBeDisabled()
    expect(screen.queryAllByText(OPTIONS_MOCK[0].label)[2]).toBeInTheDocument()

    // SelectField FXRevaluationGain
    expect(
      screen.queryByText('bank-settings:tabs.FXPosition.form.labels.FXRevaluationGain')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'FXRevaluationGain' })).toBeDisabled()
    expect(screen.queryAllByText(OPTIONS_MOCK[0].label)[3]).toBeInTheDocument()

    // SelectField FXRevaluationLost
    expect(
      screen.queryByText('bank-settings:tabs.FXPosition.form.labels.FXRevaluationLost')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'FXRevaluationLost' })).toBeDisabled()
    expect(screen.queryAllByText(OPTIONS_MOCK[0].label)[4]).toBeInTheDocument()

    // SelectField FXRevaluationTransactionType
    expect(
      screen.queryByText('bank-settings:tabs.FXPosition.form.labels.FXRevaluationTransactionType')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'FXRevaluationTransactionType' })).toBeDisabled()
    expect(screen.queryAllByText(OPTIONS_MOCK[0].label)[5]).toBeInTheDocument()
  })

  it('should show component content in the edit mode', () => {
    useBankSettingsFXPositionMock.mockReturnValue({
      getBankSettingsFXPosition: {
        isLoading: false,
        data: bankSettingsFXPositionMock,
      },
      editBankSettingsFXPosition: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <BankSettingsFXPositionTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: true,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const cancelButton = screen.queryByText('common:buttons.cancel')?.closest('button')
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    expect(screen.queryByText('bank-settings:tabs.FXPosition.subtitle')).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')?.closest('button')).toBeDisabled()

    expect(screen.queryByRole('form')).toBeInTheDocument()

    // SelectField FXRateType
    expect(
      screen.queryByText('bank-settings:tabs.FXPosition.form.labels.FXRateType')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'FXRateType' })).toBeEnabled()
    expect(screen.queryAllByText(OPTIONS_MOCK[0].label)[0]).toBeInTheDocument()

    // SelectField FXPosition
    expect(
      screen.queryByText('bank-settings:tabs.FXPosition.form.labels.FXPosition')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'FXPosition' })).toBeEnabled()
    expect(screen.queryAllByText(OPTIONS_MOCK[0].label)[1]).toBeInTheDocument()

    // SelectField FXPositionEquivalent
    expect(
      screen.queryByText('bank-settings:tabs.FXPosition.form.labels.FXPositionEquivalent')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'FXPositionEquivalent' })).toBeEnabled()
    expect(screen.queryAllByText(OPTIONS_MOCK[0].label)[2]).toBeInTheDocument()

    // SelectField FXRevaluationGain
    expect(
      screen.queryByText('bank-settings:tabs.FXPosition.form.labels.FXRevaluationGain')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'FXRevaluationGain' })).toBeEnabled()
    expect(screen.queryAllByText(OPTIONS_MOCK[0].label)[3]).toBeInTheDocument()

    // SelectField FXRevaluationLost
    expect(
      screen.queryByText('bank-settings:tabs.FXPosition.form.labels.FXRevaluationLost')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'FXRevaluationLost' })).toBeEnabled()
    expect(screen.queryAllByText(OPTIONS_MOCK[0].label)[4]).toBeInTheDocument()

    // SelectField FXRevaluationTransactionType
    expect(
      screen.queryByText('bank-settings:tabs.FXPosition.form.labels.FXRevaluationTransactionType')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'FXRevaluationTransactionType' })).toBeEnabled()
    expect(screen.queryAllByText(OPTIONS_MOCK[0].label)[5]).toBeInTheDocument()

    // Controls
    expect(cancelButton).toBeEnabled()
    expect(saveButton).toBeInTheDocument()
  })

  it('should handle success submit of the form', async () => {
    useBankSettingsFXPositionMock.mockReturnValue({
      getBankSettingsFXPosition: {
        isLoading: false,
        data: bankSettingsFXPositionMock,
      },
      editBankSettingsFXPosition: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <BankSettingsFXPositionTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: true,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const select = screen.queryByRole('combobox', { name: 'FXRateType' })
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    if (!select || !saveButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.mouseDown(select)
    })

    await waitFor(() => {
      fireEvent.click(screen.getByText(OPTIONS_MOCK[1].label))
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useBankSettingsFXPositionMock.mockReturnValue({
      getBankSettingsFXPosition: {
        isLoading: false,
        data: bankSettingsFXPositionMock,
      },
      editBankSettingsFXPosition: {
        isLoading: false,
        mutateAsync: jest.fn(() => Promise.reject({ body: { message: '' } })),
      },
    })

    render(
      <BankSettingsFXPositionTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: true,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const select = screen.queryByRole('combobox', { name: 'FXRateType' })
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    if (!select || !saveButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.mouseDown(select)
    })

    await waitFor(() => {
      fireEvent.click(screen.getByText(OPTIONS_MOCK[1].label))
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
    })
  })

  it('should have unsaved changes handling', () => {
    useBankSettingsFXPositionMock.mockReturnValue({
      getBankSettingsFXPosition: {
        isLoading: false,
        data: bankSettingsFXPositionMock,
      },
      editBankSettingsFXPosition: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <BankSettingsFXPositionTabContent
        bankSettingsFormsEditModeMap={{
          [BankSettingsTabsKeys.General]: false,
          [BankSettingsTabsKeys.Time]: false,
          [BankSettingsTabsKeys.Closures]: false,
          [BankSettingsTabsKeys.Accounting]: false,
          [BankSettingsTabsKeys.Access]: false,
          [BankSettingsTabsKeys.Customers]: false,
          [BankSettingsTabsKeys.Transactions]: false,
          [BankSettingsTabsKeys.FXPosition]: true,
        }}
        setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMapMock}
      />,
      { wrapper: getAppWrapper() }
    )

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
