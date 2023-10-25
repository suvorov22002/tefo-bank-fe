import { render, screen } from '@testing-library/react'

import { Avatar } from './avatar'

describe('Avatar', () => {
  it('should render', () => {
    render(<Avatar data-testid="avatar" />)

    expect(screen.getByTestId('avatar')).toBeInTheDocument()
  })
})
