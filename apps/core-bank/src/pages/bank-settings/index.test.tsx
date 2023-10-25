import { fireEvent, render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import BankSettings from './index.page'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))

jest.mock('./components', () => ({
  BankSettingsGeneralTabContent: () => <div data-testid="bankSettingsGeneralTabContent" />,
  BankSettingsTimeTabContent: () => <div data-testid="bankSettingsTimeTabContent" />,
  BankSettingsClosuresTabContent: () => <div data-testid="bankSettingsClosuresTabContent" />,
  BankSettingsAccountingTabContent: () => <div data-testid="bankSettingsAccountingTabContent" />,
  BankSettingsAccessTabContent: () => <div data-testid="bankSettingsAccessTabContent" />,
  BankSettingsCustomersTabContent: () => <div data-testid="bankSettingsCustomersTabContent" />,
  BankSettingsTransactionsTabContent: () => (
    <div data-testid="bankSettingsTransactionsTabContent" />
  ),
  BankSettingsFXPositionTabContent: () => <div data-testid="bankSettingsFXPositionTabContent" />,
}))

describe('BankSettings page', () => {
  it('should show the page content', () => {
    render(<BankSettings />, { wrapper: getAppWrapper() })

    expect(screen.queryByText('bank-settings:title')).toBeInTheDocument()
    expect(screen.queryByText('bank-settings:tabs.general.label')).toBeInTheDocument()
    expect(screen.queryByText('bank-settings:tabs.time.label')).toBeInTheDocument()
    expect(screen.queryByText('bank-settings:tabs.closures.label')).toBeInTheDocument()
    expect(screen.queryByText('bank-settings:tabs.accounting.label')).toBeInTheDocument()
    expect(screen.queryByText('bank-settings:tabs.access.label')).toBeInTheDocument()
    expect(screen.queryByText('bank-settings:tabs.customers.label')).toBeInTheDocument()
    expect(screen.queryByText('bank-settings:tabs.transactions.label')).toBeInTheDocument()
    expect(screen.queryByText('bank-settings:tabs.FXPosition.label')).toBeInTheDocument()

    expect(screen.queryByTestId('bankSettingsGeneralTabContent')).toBeInTheDocument()
    expect(screen.queryByTestId('bankSettingsTimeTabContent')).not.toBeInTheDocument()
    expect(screen.queryByTestId('bankSettingsClosuresTabContent')).not.toBeInTheDocument()
    expect(screen.queryByTestId('bankSettingsAccountingTabContent')).not.toBeInTheDocument()
    expect(screen.queryByTestId('bankSettingsAccessTabContent')).not.toBeInTheDocument()
    expect(screen.queryByTestId('bankSettingsCustomersTabContent')).not.toBeInTheDocument()
    expect(screen.queryByTestId('bankSettingsTransactionsTabContent')).not.toBeInTheDocument()
    expect(screen.queryByTestId('bankSettingsFXPositionTabContent')).not.toBeInTheDocument()
  })

  it('should switch tabs', () => {
    render(<BankSettings />, { wrapper: getAppWrapper() })

    expect(screen.queryByTestId('bankSettingsGeneralTabContent')).toBeInTheDocument()
    expect(screen.queryByTestId('bankSettingsClosuresTabContent')).not.toBeInTheDocument()

    const bankSettingsClosuresTabLabel = screen.getByText('bank-settings:tabs.closures.label')

    fireEvent.click(bankSettingsClosuresTabLabel)

    expect(screen.queryByTestId('bankSettingsGeneralTabContent')).not.toBeInTheDocument()
    expect(screen.queryByTestId('bankSettingsClosuresTabContent')).toBeInTheDocument()
  })
})
