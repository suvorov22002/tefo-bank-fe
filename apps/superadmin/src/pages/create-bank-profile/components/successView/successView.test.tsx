import { render, screen } from '@testing-library/react'

import { i18nMock } from '@/_tests/mocks/i18n'

import { SuccessView } from './index'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))

describe('SuccessView', () => {
  it('renders without error and contains expected elements', () => {
    render(<SuccessView />)

    expect(screen.getByText('create-bank-profile:results.successView.title')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent(
      'create-bank-profile:results.successView.goToBankButton'
    )
  })
})
