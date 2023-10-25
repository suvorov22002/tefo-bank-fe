import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { CoreBankDefaultLayout } from './coreBankDefaultLayout'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('./components/coreBankDefaultHeader', () => ({
  CoreBankDefaultHeader: () => <div data-testid="coreBankDefaultHeader" />,
}))

describe('CoreBankDefaultLayout', () => {
  it('should render correct navigation', async () => {
    render(<CoreBankDefaultLayout />, { wrapper: getAppWrapper() })

    await waitFor(() => {
      const structureGroup = screen.getByText('common:navigation.links.structure')
      const accessGroup = screen.getByText('common:navigation.links.access')

      expect(screen.getByText('common:navigation.links.administration')).toBeInTheDocument()
      expect(screen.getByText('common:navigation.links.profile')).toBeInTheDocument()
      expect(screen.getByText('common:navigation.links.settings')).toBeInTheDocument()
      expect(structureGroup).toBeInTheDocument()
      expect(screen.getByText('common:navigation.links.customFields')).toBeInTheDocument()
      expect(screen.getByText('common:navigation.links.customFieldGroups')).toBeInTheDocument()
      expect(screen.getByText('common:navigation.links.dataDictionaries')).toBeInTheDocument()
      expect(screen.getByText('common:navigation.links.currencies')).toBeInTheDocument()
      expect(screen.getByText('common:navigation.links.eod')).toBeInTheDocument()
      expect(screen.getByText('common:navigation.links.access')).toBeInTheDocument()

      fireEvent.click(structureGroup)

      expect(screen.getByText('common:navigation.links.unit')).toBeInTheDocument()
      expect(screen.getByText('common:navigation.links.unitTypes')).toBeInTheDocument()

      fireEvent.click(accessGroup)

      expect(screen.getByText('common:navigation.links.users')).toBeInTheDocument()
      expect(screen.getByText('common:navigation.links.jobTypes')).toBeInTheDocument()

      expect(screen.getByText('common:navigation.links.countries')).toBeInTheDocument()

      expect(screen.getByText('common:navigation.links.customers')).toBeInTheDocument()
      expect(screen.getByText('common:navigation.links.holidayCalendar')).toBeInTheDocument()
    })
  })
})
