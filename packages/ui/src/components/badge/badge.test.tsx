import { render, screen } from '@testing-library/react'

import { Badge } from './badge'

describe('Badge', () => {
  it('should render', () => {
    render(<Badge data-testid="badge" />)

    expect(screen.getByTestId('badge')).toBeInTheDocument()
  })
})
