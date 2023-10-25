import { render, screen } from '@testing-library/react'

import { Table } from './table'

describe('Table', () => {
  it('should render', () => {
    render(<Table data-testid="table" />)

    const table = screen.getByTestId('table')

    expect(table).toBeInTheDocument()
  })
})
