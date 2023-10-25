import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { CoreBankDefaultHeader } from './coreBankDefaultHeader'

jest.mock('../businessDay', () => ({
  BusinessDay: () => <div data-testid="businessDay" />,
}))

describe('CoreBankDefaultHeader', () => {
  it('should render', () => {
    render(<CoreBankDefaultHeader data-testid="header" />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('header')).toBeInTheDocument()
  })
})
