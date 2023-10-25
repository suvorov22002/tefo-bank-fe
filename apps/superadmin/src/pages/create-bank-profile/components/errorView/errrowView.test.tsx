import { render, screen } from '@testing-library/react'

import { i18nMock } from '@/_tests/mocks/i18n'

import { ErrorView } from './index'

jest.mock('next-i18next', () => i18nMock)

describe('ErrorView', () => {
  it('renders without error and contains expected elements', () => {
    render(<ErrorView />)

    expect(screen.getByText('create-bank-profile:results.errorView.title')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('common:buttons.retry')
  })
})
