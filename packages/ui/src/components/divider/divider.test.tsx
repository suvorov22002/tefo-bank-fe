import { render, screen } from '@testing-library/react'

import { Divider } from './divider'

describe('Divider', () => {
  it('should render', () => {
    render(<Divider data-testid="divider" />)

    expect(screen.getByTestId('divider')).toBeInTheDocument()
  })
})
