import { render, screen } from '@testing-library/react'

import { TreeSelect } from './treeSelect'

describe('TreeSelect', () => {
  it('should mount', () => {
    expect(() => render(<TreeSelect />)).not.toThrow()
  })

  it('should render', () => {
    render(<TreeSelect data-testid="treeSelect" />)

    expect(screen.getByTestId('treeSelect')).toBeInTheDocument()
  })
})
