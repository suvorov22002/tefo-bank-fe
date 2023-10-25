import { render } from '@testing-library/react'

import { i18nMock } from '@/_tests/mocks/i18n'

import Welcome from './index.page'

jest.mock('next-i18next', () => i18nMock)

describe('Welcome page', () => {
  it('renders without error and contains expected elements', () => {
    const { getByText, getByRole } = render(<Welcome />)

    expect(getByText('welcome:emptyDescription')).toBeInTheDocument()
    expect(getByRole('button')).toHaveTextContent('common:buttons.create')
  })
})
