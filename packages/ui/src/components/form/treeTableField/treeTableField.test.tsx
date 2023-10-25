import { render, screen } from '@testing-library/react'

import { TreeTable } from './treeTableField'

describe('TreeTable', () => {
  it('should render ', () => {
    render(<TreeTable />)

    expect(screen.getByRole('table')).toBeInTheDocument()
  })
})
