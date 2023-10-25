import { render, screen } from '@testing-library/react'

import { Button } from '../button'
import { Dropdown } from './dropdown'

describe('Dropdown', () => {
  it('should render', () => {
    render(
      <Dropdown data-testid="dropdown">
        <Button>Content</Button>
      </Dropdown>
    )

    const content = screen.getByText('Content')

    expect(content).toBeInTheDocument()
  })
})
